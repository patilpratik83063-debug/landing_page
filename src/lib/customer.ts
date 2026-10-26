export interface CustomerDetails {
  name: string;
  phone: string;
  email: string;
}

export type CustomerField = keyof CustomerDetails;

export interface CustomerInput {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
}

export const CUSTOMER_STORAGE_KEY = "iad_customer";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const LETTER_RE = /\p{L}/u;

/** Normalises a phone number to +91XXXXXXXXXX (India) or +<digits> for other lengths. */
export function normalizePhone(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = digits.replace(/^0+/, "");
  if (digits.length === 10) return `+91${digits}`;
  if (digits.length === 12 && digits.startsWith("91")) return `+${digits}`;
  if (digits.length >= 11 && digits.length <= 15) return `+${digits}`;
  return "";
}

export function sanitizeCustomer(input: CustomerInput | null | undefined): {
  value?: CustomerDetails;
  errors: Partial<Record<CustomerField, string>>;
} {
  const errors: Partial<Record<CustomerField, string>> = {};
  const name = typeof input?.name === "string" ? input.name.trim().replace(/\s+/g, " ") : "";
  const email = typeof input?.email === "string" ? input.email.trim().toLowerCase() : "";
  const phone = typeof input?.phone === "string" ? normalizePhone(input.phone) : "";

  if (name.length < 2 || name.length > 80 || !LETTER_RE.test(name)) {
    errors.name = "Enter your full name.";
  }
  if (!phone) {
    errors.phone = "Enter a valid phone number (10 digits, or with country code).";
  }
  if (email.length > 120 || !EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (Object.keys(errors).length > 0) return { errors };
  return { value: { name, phone, email }, errors };
}

export function readStoredCustomer(): CustomerDetails | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CUSTOMER_STORAGE_KEY) ?? "null") as
      | CustomerInput
      | null;
    return sanitizeCustomer(parsed).value ?? null;
  } catch {
    return null;
  }
}

export function storeCustomer(customer: CustomerDetails): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(customer));
  } catch {
    /* storage may be unavailable in private mode */
  }
}
