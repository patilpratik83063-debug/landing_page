const API_BASE = (process.env.RAZORPAY_API_BASE ?? "https://api.razorpay.com/v1").replace(/\/$/, "");

const PACK_LABELS: Record<string, string> = {
  masterclass: "EV Masterclass Seat (₹29)",
  starter: "Foundation Pack (₹999)",
  mastery: "Mastery Pack (₹4,999)",
};

export interface OrderInfo {
  id: string;
  amount: number;
  notes: Record<string, string>;
  receipt: string | null;
}

export interface PaymentRow {
  id: string;
  orderId: string;
  createdAt: number;
  name: string;
  email: string;
  phone: string;
  course: string;
  pack: string;
  amount: number;
  amountRefunded: number;
  fee: number;
  tax: number;
  status: string;
  method: string;
  methodDetail: string;
  error: string;
  notes: Record<string, string>;
}

export interface Dashboard {
  configured: boolean;
  error: string | null;
  rows: PaymentRow[];
  totals: {
    capturedAmount: number;
    capturedCount: number;
    refundedAmount: number;
    fees: number;
    failedCount: number;
    byPack: { pack: string; label: string; count: number; amount: number }[];
  };
}

type RazorpayPayment = {
  id: string;
  order_id?: string | null;
  amount?: number;
  amount_refunded?: number;
  fee?: number;
  tax?: number;
  status?: string;
  method?: string;
  description?: string;
  email?: string;
  contact?: string;
  vpa?: string | null;
  wallet?: string | null;
  bank?: string | null;
  card?: { network?: string | null; last4?: string | null };
  error_description?: string | null;
  created_at?: number;
  notes?: Record<string, string>;
};

type RazorpayOrder = {
  id: string;
  amount?: number;
  receipt?: string | null;
  notes?: Record<string, string>;
};

export function paymentsConfigured(): boolean {
  return Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);
}

async function rpGet<T>(path: string): Promise<T> {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) throw new Error("Razorpay keys are not configured on this deployment.");

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    if (res.status === 401) throw new Error("Razorpay rejected the API keys (401). Check the dashboard keys.");
    throw new Error(`Razorpay request failed (${res.status}).`);
  }
  return (await res.json()) as T;
}

function unwrapCollection<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  if (payload && typeof payload === "object") {
    const items = (payload as { items?: unknown }).items;
    if (Array.isArray(items)) return items as T[];
    if ((payload as { count?: unknown }).count === 0) return [];
  }
  throw new Error("Unexpected response from Razorpay. Check that the API keys belong to an activated account.");
}

async function fetchPaged<T>(path: string, maxPages = 10): Promise<T[]> {
  const out: T[] = [];
  for (let page = 0; page < maxPages; page += 1) {
    const payload = await rpGet<unknown>(`${path}?count=100&skip=${page * 100}`);
    const batch = unwrapCollection<T>(payload);
    out.push(...batch);
    if (batch.length < 100) break;
  }
  return out;
}

function detailOf(p: RazorpayPayment): string {
  if (p.vpa) return `UPI · ${p.vpa}`;
  if (p.card) return `${p.card.network ?? "Card"} ···· ${p.card.last4 ?? "----"}`;
  if (p.wallet) return `Wallet · ${p.wallet}`;
  if (p.bank) return `Netbanking · ${p.bank}`;
  return "";
}

function money(paise: number | undefined): number {
  return Number.isFinite(paise) ? Number(paise) : 0;
}

export async function fetchDashboard(): Promise<Dashboard> {
  const empty: Dashboard = {
    configured: paymentsConfigured(),
    error: null,
    rows: [],
    totals: { capturedAmount: 0, capturedCount: 0, refundedAmount: 0, fees: 0, failedCount: 0, byPack: [] },
  };

  if (!empty.configured) {
    return { ...empty, error: "Razorpay keys are missing. Add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET." };
  }

  try {
    const [payments, orders] = await Promise.all([
      fetchPaged<RazorpayPayment>("/payments"),
      fetchPaged<RazorpayOrder>("/orders").catch(() => []),
    ]);

    const orderMap = new Map<string, RazorpayOrder>();
    for (const order of orders) orderMap.set(order.id, order);

    const rows: PaymentRow[] = payments.map((p) => {
      const order = p.order_id ? orderMap.get(p.order_id) : undefined;
      const notes = { ...(order?.notes ?? {}), ...(p.notes ?? {}) };
      const pack = notes.pack ?? "";
      const label = notes.label ?? PACK_LABELS[pack] ?? p.description ?? "Payment";

      return {
        id: p.id,
        orderId: p.order_id ?? "",
        createdAt: money(p.created_at),
        name: notes.name ?? "",
        email: notes.email ?? p.email ?? "",
        phone: notes.phone ?? p.contact ?? "",
        course: label,
        pack,
        amount: money(p.amount),
        amountRefunded: money(p.amount_refunded),
        fee: money(p.fee),
        tax: money(p.tax),
        status: p.status ?? "unknown",
        method: p.method ?? "",
        methodDetail: detailOf(p),
        error: p.error_description ?? "",
        notes,
      };
    });

    rows.sort((a, b) => b.createdAt - a.createdAt);

    const captured = rows.filter((r) => r.status === "captured" || r.status === "refunded");
    const byPackMap = new Map<string, { count: number; amount: number }>();
    for (const r of captured) {
      const key = r.pack || "other";
      const entry = byPackMap.get(key) ?? { count: 0, amount: 0 };
      entry.count += 1;
      entry.amount += r.amount;
      byPackMap.set(key, entry);
    }

    return {
      configured: true,
      error: null,
      rows,
      totals: {
        capturedAmount: captured.reduce((sum, r) => sum + r.amount, 0),
        capturedCount: captured.length,
        refundedAmount: rows.reduce((sum, r) => sum + r.amountRefunded, 0),
        fees: captured.reduce((sum, r) => sum + r.fee + r.tax, 0),
        failedCount: rows.filter((r) => r.status === "failed").length,
        byPack: [...byPackMap.entries()].map(([pack, v]) => ({
          pack,
          label: PACK_LABELS[pack] ?? pack,
          count: v.count,
          amount: v.amount,
        })),
      },
    };
  } catch (e) {
    return { ...empty, error: e instanceof Error ? e.message : "Could not load payments." };
  }
}

export function toCsv(rows: PaymentRow[]): string {
  const headers = [
    "Created (IST)",
    "Name",
    "Phone",
    "Email",
    "Course",
    "Amount (INR)",
    "Refunded (INR)",
    "Fee+Tax (INR)",
    "Status",
    "Method",
    "Payment ID",
    "Order ID",
    "Notes",
  ];

  const cell = (value: string | number) => {
    const text = String(value ?? "");
    return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
  };

  const lines = rows.map((r) =>
    [
      formatIst(r.createdAt),
      r.name,
      r.phone,
      r.email,
      r.course,
      (r.amount / 100).toFixed(2),
      (r.amountRefunded / 100).toFixed(2),
      ((r.fee + r.tax) / 100).toFixed(2),
      r.status,
      r.methodDetail || r.method,
      r.id,
      r.orderId,
      Object.entries(r.notes)
        .map(([k, v]) => `${k}=${v}`)
        .join("; "),
    ]
      .map(cell)
      .join(",")
  );

  return [headers.join(","), ...lines].join("\r\n");
}

export function formatIst(epochSeconds: number): string {
  if (!epochSeconds) return "-";
  const ms = epochSeconds > 1e12 ? epochSeconds : epochSeconds * 1000;
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(ms));
}

export function inr(paise: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(paise / 100);
}
