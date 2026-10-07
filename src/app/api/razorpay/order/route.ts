import { NextResponse } from "next/server";

export const runtime = "nodejs";

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
  let pack: unknown;
  try {
    pack = (await req.json())?.pack;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof pack !== "string" || !(pack in PACKS)) {
    return NextResponse.json({ error: "Invalid pack" }, { status: 400 });
  }
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
    orderRes = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: PACKS[id].amount,
        currency: "INR",
        receipt: `rcpt_${id}_${Date.now()}`,
        notes: { pack: id, label: PACKS[id].label },
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
  });
}
