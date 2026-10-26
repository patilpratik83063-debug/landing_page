import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { fetchDashboard } from "@/lib/razorpay-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const data = await fetchDashboard();
  return NextResponse.json(data, { headers: { "Cache-Control": "no-store" } });
}
