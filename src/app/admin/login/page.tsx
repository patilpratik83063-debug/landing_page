import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { isAdmin } from "@/lib/admin-auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect("/admin");

  return (
    <main className="grid min-h-screen place-items-center px-4 py-10">
      <div className="w-full max-w-sm rounded-2xl border border-[#e2d6c6] bg-white p-6 shadow-[0_18px_44px_rgba(19,26,38,0.10)]">
        <div className="flex items-center gap-2 text-[#f45000]">
          <ShieldCheck className="h-5 w-5" strokeWidth={2.25} />
          <span className="text-[11px] font-extrabold uppercase tracking-[2px]">IAD Admin</span>
        </div>
        <h1 className="mt-2 text-[22px] font-extrabold tracking-tight">Payments dashboard</h1>
        <p className="mt-1 text-[12.5px] text-[#5b6572]">
          Enter the admin password to view all course payments and customer details.
        </p>
        <LoginForm />
      </div>
    </main>
  );
}
