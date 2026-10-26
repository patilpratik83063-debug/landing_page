import { redirect } from "next/navigation";
import { AlertTriangle, IndianRupee, Receipt, RotateCcw, Users } from "lucide-react";
import { isAdmin } from "@/lib/admin-auth";
import { fetchDashboard, formatIst, inr } from "@/lib/razorpay-admin";
import AdminActions from "./AdminActions";

export const dynamic = "force-dynamic";

const STATUS_STYLE: Record<string, string> = {
  captured: "bg-green-50 text-green-700 border-green-200",
  refunded: "bg-amber-50 text-amber-700 border-amber-200",
  failed: "bg-red-50 text-red-700 border-red-200",
  authorized: "bg-blue-50 text-blue-700 border-blue-200",
  created: "bg-slate-50 text-slate-600 border-slate-200",
};

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide ${
        STATUS_STYLE[status] ?? "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >
      {status}
    </span>
  );
}

function Stat({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="rounded-xl border border-[#e2d6c6] bg-white p-3.5">
      <div className="flex items-center gap-1.5 text-[10.5px] font-extrabold uppercase tracking-wide text-[#8a94a0]">
        {icon}
        {label}
      </div>
      <p className="mt-1 font-display text-[24px] font-bold leading-none">{value}</p>
      {hint && <p className="mt-1 text-[10.5px] text-[#5b6572]">{hint}</p>}
    </div>
  );
}

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");

  const data = await fetchDashboard();
  const { totals } = data;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10.5px] font-extrabold uppercase tracking-[2px] text-[#f45000]">IAD Admin</p>
          <h1 className="mt-1 text-[24px] font-extrabold tracking-tight sm:text-[28px]">Payments & customers</h1>
          <p className="mt-1 text-[12px] text-[#5b6572]">
            Live data from your Razorpay account. Showing the latest 1,000 payments. Time zone: IST.
          </p>
        </div>
        <AdminActions />
      </header>

      {data.error && (
        <div className="mt-5 flex items-start gap-2 rounded-xl border border-amber-300 bg-amber-50 p-3 text-[12.5px] font-semibold text-amber-800">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{data.error}</span>
        </div>
      )}

      <section className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
        <Stat icon={<IndianRupee className="h-3.5 w-3.5" />} label="Collected" value={inr(totals.capturedAmount)} hint="Captured payments" />
        <Stat icon={<Users className="h-3.5 w-3.5" />} label="Payments" value={String(totals.capturedCount)} hint="Successful" />
        <Stat icon={<RotateCcw className="h-3.5 w-3.5" />} label="Refunded" value={inr(totals.refundedAmount)} hint="Total refunds" />
        <Stat icon={<Receipt className="h-3.5 w-3.5" />} label="Fees + tax" value={inr(totals.fees)} hint="Gateway charges" />
        <Stat icon={<AlertTriangle className="h-3.5 w-3.5" />} label="Failed" value={String(totals.failedCount)} hint="Did not go through" />
      </section>

      {totals.byPack.length > 0 && (
        <section className="mt-3 flex flex-wrap gap-2">
          {totals.byPack.map((p) => (
            <span key={p.pack} className="rounded-lg border border-[#e2d6c6] bg-white px-3 py-1.5 text-[11.5px] font-semibold">
              {p.label} · {p.count} paid · {inr(p.amount)}
            </span>
          ))}
        </section>
      )}

      <section className="mt-5 overflow-hidden rounded-xl border border-[#e2d6c6] bg-white">
        {data.rows.length === 0 ? (
          <p className="p-6 text-center text-[13px] text-[#5b6572]">
            {data.error ? "Payments could not be loaded." : "No payments yet. New payments will appear here automatically."}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-[12px]">
              <thead className="bg-[#f7f3ec] text-[10px] font-extrabold uppercase tracking-wide text-[#8a94a0]">
                <tr>
                  <th className="px-3 py-2.5">Date</th>
                  <th className="px-3 py-2.5">Customer</th>
                  <th className="px-3 py-2.5">Course</th>
                  <th className="px-3 py-2.5 text-right">Amount</th>
                  <th className="px-3 py-2.5 text-right">Fee + tax</th>
                  <th className="px-3 py-2.5">Status</th>
                  <th className="px-3 py-2.5">Method</th>
                  <th className="px-3 py-2.5">Payment / Order ID</th>
                </tr>
              </thead>
              <tbody>
                {data.rows.map((r) => (
                  <tr key={r.id} className="border-t border-[#eee4d6] align-top">
                    <td className="whitespace-nowrap px-3 py-2.5 text-[11.5px] text-[#5b6572]">{formatIst(r.createdAt)}</td>
                    <td className="px-3 py-2.5">
                      <p className="font-bold">{r.name || <span className="text-[#8a94a0]">Not captured</span>}</p>
                      {r.phone && (
                        <a href={`tel:${r.phone}`} className="block text-[11px] text-[#5b6572] hover:text-[#f45000]">
                          {r.phone}
                        </a>
                      )}
                      {r.email && (
                        <a href={`mailto:${r.email}`} className="block break-all text-[11px] text-[#5b6572] hover:text-[#f45000]">
                          {r.email}
                        </a>
                      )}
                    </td>
                    <td className="px-3 py-2.5">
                      <p className="font-semibold">{r.course}</p>
                      {r.pack && <p className="text-[10.5px] uppercase tracking-wide text-[#8a94a0]">{r.pack}</p>}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right">
                      <p className="font-bold">{inr(r.amount)}</p>
                      {r.amountRefunded > 0 && (
                        <p className="text-[10.5px] font-semibold text-amber-700">-{inr(r.amountRefunded)} refunded</p>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-right text-[11.5px] text-[#5b6572]">{inr(r.fee + r.tax)}</td>
                    <td className="px-3 py-2.5">
                      <StatusPill status={r.status} />
                      {r.error && <p className="mt-1 max-w-[160px] text-[10px] text-red-600">{r.error}</p>}
                    </td>
                    <td className="px-3 py-2.5 text-[11.5px]">{r.methodDetail || r.method || "-"}</td>
                    <td className="px-3 py-2.5">
                      <p className="font-mono text-[10.5px]">{r.id}</p>
                      {r.orderId && <p className="font-mono text-[10px] text-[#8a94a0]">{r.orderId}</p>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className="mt-3 text-[10.5px] leading-relaxed text-[#5b6572]">
        Customer name, phone and email are collected before checkout. If a buyer skips that step, only the
        details Razorpay captured are shown. PII is for internal use only - do not share this screen or the CSV.
      </p>
    </main>
  );
}
