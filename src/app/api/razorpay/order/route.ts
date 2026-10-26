import { NextResponse } from "next/server";
import { sanitizeCustomer, type CustomerDetails } from "@/lib/customer";

export const runtime = "nodejs";

const API_BASE = (process.env.RAZORPAY_API_BASE ?? "https://api.razorpay.com/v1").replace(/\/$/, "");

const PACKS = {
  masterclass: { amount: 2900, label: "EV Masterclass Seat" },
  starter: { amount: 99900, label: "Foundation Pack" },
  mastery: { amount: 499900, label: "Mastery Pack" },
} as const;

type PackId = keyof typeof PACKS;

interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
}

export async function POST(req: Request) {
  let body: { pack?: unknown; customer?: unknown };
  try {
    body = (await req.json()) as { pack?: unknown; customer?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const pack = body.pack;
  if (typeof pack !== "string" || !(pack in PACKS)) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }

  const parsed = sanitizeCustomer(body.customer as { name?: unknown; phone?: unknown; email?: unknown });
  if (!parsed.value) {
    return NextResponse.json(
      { error: "Please check your contact details.", fields: parsed.errors },
      { status: 400 }
    );
  }
  const customer: CustomerDetails = parsed.value;
  const id = pack as PackId;

  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) {
    return NextResponse.json(
      { error: "Payments not configured yet. Please contact us on WhatsApp to enroll." },
      { status: 503 }
    );
  }

  const auth = Buffer.from(`${keyId}:${secret}`).toString("base64");
  let orderRes: Response;
  try {
    orderRes = await fetch(`${API_BASE}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: PACKS[id].amount,
        currency: "INR",
        receipt: `rcpt_${id}_${Date.now()}`,
        notes: {
          pack: id,
          label: PACKS[id].label,
          name: customer.name,
          phone: customer.phone,
          email: customer.email,
        },
      }),
    });
  } catch {
    return NextResponse.json({ error: "Could not reach payment gateway. Try again." }, { status: 502 });
  }

  if (!orderRes.ok) {
    let detail = "Order creation failed. Try again.";
    try {
      const err = (await orderRes.json()) as { error?: { description?: string } };
      if (err.error?.description) detail = err.error.description;
    } catch {
      /* keep default */
    }
    return NextResponse.json({ error: detail }, { status: 502 });
  }

  const order = (await orderRes.json()) as RazorpayOrder;
  return NextResponse.json({
    keyId,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    prefill: customer,
  });
}
