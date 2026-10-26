import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Admin credentials live in code on purpose: Vercel deploys then need no extra env
 * setup. Keep this file out of public bundles - it is only imported by server code.
 */
const ADMIN_PASSWORD = "Patil@4321";
const SESSION_SECRET = `iad-admin-session::${ADMIN_PASSWORD}`;
const SESSION_TTL_SECONDS = 60 * 60 * 12;

export const ADMIN_COOKIE = "iad_admin_session";
export const SESSION_MAX_AGE = SESSION_TTL_SECONDS;

function sign(payload: string): string {
  return createHmac("sha256", SESSION_SECRET).update(payload).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function checkPassword(input: unknown): boolean {
  return typeof input === "string" && safeEqual(input, ADMIN_PASSWORD);
}

export function createSessionToken(now = Date.now()): string {
  const exp = Math.floor(now / 1000) + SESSION_TTL_SECONDS;
  const payload = `v1.${exp}`;
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token: string | undefined, now = Date.now()): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [version, exp, signature] = parts;
  if (version !== "v1") return false;
  const expiresAt = Number(exp);
  if (!Number.isFinite(expiresAt) || expiresAt * 1000 <= now) return false;
  return safeEqual(signature, sign(`${version}.${exp}`));
}

/** True when the current request carries a valid admin session cookie. */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return verifySessionToken(store.get(ADMIN_COOKIE)?.value);
}

type Attempt = { count: number; resetAt: number };
const attempts = new Map<string, Attempt>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

/** Cheap in-memory brute-force guard, keyed by client IP (per server instance). */
export function noteLoginAttempt(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  if (attempts.size > 5000) attempts.clear();
  const entry = attempts.get(key);
  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  if (entry.count > MAX_ATTEMPTS) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { allowed: true, retryAfter: 0 };
}

export function clearLoginAttempts(key: string): void {
  attempts.delete(key);
}
