"use client";

import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { useState } from "react";
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
}

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);

  async function pay() {
    setError(null);
    if (paymentId) return;
    setLoading(true);
    try {
      const loaded = await loadCheckoutScript();
      if (!loaded || !window.Razorpay) {
        throw new Error("Payment popup blocked. Please allow popups and try again.");
      }

      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pack }),
      });

      if (res.status === 503 && fallbackHref) {
        window.location.href = fallbackHref;
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Order failed. Please try again.");
      }
      const data = (await res.json()) as OrderPayload;

      await new Promise<void>((resolve, reject) => {
        const rzp = new window.Razorpay!({
          key: data.keyId,
          amount: data.amount,
          currency: data.currency,
          name: "Indian Automobile Doctor",
          description: PACK_LABEL[pack],
          order_id: data.orderId,
          theme: { color: "#f45000" },
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
          modal: { ondismiss: () => reject(new Error("Payment cancelled.")) },
        });
        rzp.on("payment.failed", (e) => {
          reject(new Error(e.error?.description ?? "Payment failed. Try again."));
        });
        rzp.open();
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  if (paymentId) {
    const confirmHref = `${waLink(PACK_LABEL[pack], price)}${encodeURIComponent(` Payment ID: ${paymentId}`)}`;
    return (
      <div className="rounded-xl border-2 border-[#15803d] bg-[#f0fdf4] p-4 text-center">
        <p className="flex items-center justify-center gap-1.5 text-[15px] font-extrabold text-[#15803d]">
          <CheckCircle2 className="h-5 w-5" strokeWidth={2.25} /> Payment successful!
        </p>
        <p className="mt-1 break-all font-mono text-[11px] text-[#3d4756]">ID: {paymentId}</p>
        <p className="mt-1 text-[12px] text-[#3d4756]">
          Screenshot le lo - neeche button se WhatsApp par bhejo, access link turant milega.
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
      <button type="button" onClick={() => void pay()} disabled={loading} className={className}>
        {loading ? (
          <span className="inline-flex items-center justify-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" strokeWidth={2.5} /> Processing, please wait
          </span>
        ) : (
          children
        )}
      </button>
      {error && (
        <p role="alert" className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-center text-[12px] font-semibold text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
