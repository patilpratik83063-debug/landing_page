import { isAdmin } from "@/lib/admin-auth";
import { fetchDashboard, toCsv } from "@/lib/razorpay-admin";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await fetchDashboard();
  if (data.error) {
    return new Response(data.error, { status: 502 });
  }

  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(toCsv(data.rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="iad-payments-${stamp}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
