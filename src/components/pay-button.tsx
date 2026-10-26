"use client";

import { CheckCircle2, Loader2, MessageCircle, ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  readStoredCustomer,
  sanitizeCustomer,
  storeCustomer,
  type CustomerDetails,
  type CustomerField,
} from "@/lib/customer";
import { waLink } from "./course-blocks";

export type PayPack = "masterclass" | "starter" | "mastery";

const PACK_LABEL: Record<PayPack, string> = {
  masterclass: "EV Masterclass Seat",
  starter: "Foundation Pack",
  mastery: "Mastery Pack",
};

interface RazorpaySuccessResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  theme?: { color?: string };
  prefill?: { name?: string; contact?: string; email?: string };
  handler: (r: RazorpaySuccessResponse) => void;
  modal?: { ondismiss?: () => void };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: "payment.failed", cb: (err: { error?: { description?: string } }) => void) => void;
}

declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

const CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

function loadCheckoutScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false);
    if (window.Razorpay) return resolve(true);
    if (document.querySelector(`script[src="${CHECKOUT_SRC}"]`)) {
      const check = window.setInterval(() => {
        if (window.Razorpay) {
          window.clearInterval(check);
          resolve(true);
        }
      }, 200);
      window.setTimeout(() => {
        window.clearInterval(check);
        resolve(Boolean(window.Razorpay));
      }, 8000);
      return;
    }
    const s = document.createElement("script");
    s.src = CHECKOUT_SRC;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

interface OrderPayload {
  keyId: string;
  orderId: string;
  amount: number;
  currency: string;
  prefill?: CustomerDetails;
}

const EMPTY_FORM: CustomerDetails = { name: "", phone: "", email: "" };

export default function PayButton({
  pack,
  price,
  className,
  fallbackHref,
  children,
}: {
  pack: PayPack;
  price: string;
  className?: string;
  fallbackHref?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [form, setForm] = useState<CustomerDetails>(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<CustomerField, string>>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, loading]);

  function openForm() {
    if (loading || paymentId) return;
    const stored = readStoredCustomer();
    if (stored) setForm(stored);
    setFieldErrors({});
    setFormError(null);
    setError(null);
    setOpen(true);
  }

  function update(field: CustomerField, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;

    const parsed = sanitizeCustomer(form);
    if (!parsed.value) {
      setFieldErrors(parsed.errors);
      return;
    }
    const details = parsed.value;
    storeCustomer(details);

    setLoading(true);
    setFormError(null);
    setError(null);
    let stage: "order" | "payment" = "order";

    try {
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack, customer: details }),
      });

      if (res.status === 503 && fallbackHref) {
        window.location.href = fallbackHref;
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string; fields?: Partial<Record<CustomerField, string>> }
          | null;
        if (data?.fields) setFieldErrors(data.fields);
        throw new Error(data?.error ?? "Order failed. Please try again.");
      }
      const data = (await res.json()) as OrderPayload;
      stage = "payment";

      const loaded = await loadCheckoutScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Payment popup was blocked. Allow popups and try again.");
      }

      setOpen(false);

      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay!({
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: "Indian Automobile Doctor",
          description: PACK_LABEL[pack],
          order_id: data.orderId,
          theme: { color: "#f45000" },
          prefill: {
            name: details.name,
            contact: details.phone,
            email: details.email,
          },
          handler: (r) => {
            void (async () => {
              try {
                const v = await fetch("/api/razorpay/verify", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    orderId: r.razorpay_order_id,
                    paymentId: r.razorpay_payment_id,
                    signature: r.razorpay_signature,
                  }),
                });
                const out = (await v.json()) as { valid?: boolean };
                if (out.valid) {
                  setCustomer(details);
                  setPaymentId(r.razorpay_payment_id);
                  resolve();
                } else {
                  reject(new Error("Payment verification failed. Contact us with your payment ID."));
                }
              } catch {
                reject(new Error("Verification error. Contact us with your payment ID."));
              }
            })();
          },
          modal: { ondismiss: () => reject(new Error("Payment cancelled. You can try again.")) },
        });
        rzp.on("payment.failed", (ev) => {
          reject(new Error(ev.error?.description ?? "Payment failed. Try again."));
        });
        rzp.open();
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Something went wrong. Try again.";
      if (stage === "order") setFormError(message);
      else setError(message);
    } finally {
      setLoading(false);
    }
  }

  if (paymentId) {
    const extra = customer
      ? ` My details - Name: ${customer.name}, Phone: ${customer.phone}, Email: ${customer.email}.`
      : "";
    const confirmHref = `${waLink(PACK_LABEL[pack], price, extra)}${encodeURIComponent(` Payment ID: ${paymentId}`)}`;
    return (
      <div className="rounded-xl border-2 border-[#15803d] bg-[#f0fdf4] p-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-[15px] font-extrabold text-[#15803d]">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2.25} /> Payment successful!
        </p>
        <p className="mt-1 break-all font-mono text-[11px] text-[#3d4756]">ID: {paymentId}</p>
        {customer && (
          <p className="mt-1 text-[11.5px] text-[#3d4756]">
            {customer.name} · {customer.phone} · {customer.email}
          </p>
        )}
        <p className="mt-1 text-[12px] text-[#3d4756]">
          Take a screenshot, then send it to us on WhatsApp with the button below - your access link will arrive right away.
        </p>
        <a
          href={confirmHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa mt-3 flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-center text-[13px] font-extrabold uppercase text-white"
        >
          <MessageCircle className="h-4 w-4" strokeWidth={2.25} /> Send payment ID on WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="w-full">
      <button type="button" onClick={openForm} disabled={loading} className={className}>
        {children}
      </button>
      {error && (
        <p role="alert" className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-center text-[12px] font-semibold text-red-700">
          {error}
        </p>
      )}

      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/55 p-0 backdrop-blur-sm sm:items-center sm:p-4"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget && !loading) setOpen(false);
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="pay-dialog-title"
              className="w-full max-w-md rounded-t-2xl bg-white p-5 text-left shadow-2xl sm:rounded-2xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 id="pay-dialog-title" className="text-[17px] font-extrabold leading-tight">
                    Your details
                  </h2>
                  <p className="mt-0.5 text-[12px] text-[#5b6572]">
                    {PACK_LABEL[pack]} · ₹{price}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  disabled={loading}
                  aria-label="Close"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-[#e2d6c6] text-[#5b6572] transition hover:bg-[#f7f3ec] disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={submit} className="mt-4 space-y-3" noValidate>
                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#5b6572]">Full name</span>
                  <input
                    autoFocus
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.name)}
                    className="mt-1 w-full rounded-xl border border-[#d8cdbe] px-3 py-2.5 text-[14px] outline-none focus:border-[#f45000] focus:ring-2 focus:ring-[#f45000]/20"
                    placeholder="Your name"
                  />
                  {fieldErrors.name && <span className="mt-1 block text-[11px] font-semibold text-red-600">{fieldErrors.name}</span>}
                </label>

                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#5b6572]">WhatsApp number</span>
                  <input
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.phone)}
                    className="mt-1 w-full rounded-xl border border-[#d8cdbe] px-3 py-2.5 text-[14px] outline-none focus:border-[#f45000] focus:ring-2 focus:ring-[#f45000]/20"
                    placeholder="10-digit mobile number"
                  />
                  {fieldErrors.phone && <span className="mt-1 block text-[11px] font-semibold text-red-600">{fieldErrors.phone}</span>}
                </label>

                <label className="block">
                  <span className="text-[11px] font-bold uppercase tracking-wide text-[#5b6572]">Email</span>
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    aria-invalid={Boolean(fieldErrors.email)}
                    className="mt-1 w-full rounded-xl border border-[#d8cdbe] px-3 py-2.5 text-[14px] outline-none focus:border-[#f45000] focus:ring-2 focus:ring-[#f45000]/20"
                    placeholder="you@example.com"
                  />
                  {fieldErrors.email && <span className="mt-1 block text-[11px] font-semibold text-red-600">{fieldErrors.email}</span>}
                </label>

                {formError && (
                  <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-[12px] font-semibold text-red-700">
                    {formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-brand flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-[13px] font-extrabold uppercase tracking-wide text-white disabled:cursor-wait disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  {loading ? "Opening secure checkout" : `Pay ₹${price}`}
                </button>

                <p className="text-center text-[10.5px] leading-relaxed text-[#5b6572]">
                  Secure payment via Razorpay. We use these details only for your course access and support.
                </p>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
