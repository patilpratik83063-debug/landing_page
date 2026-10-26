"use client";

import { Download, LogOut, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminActions() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [leaving, setLeaving] = useState(false);

  function refresh() {
    setRefreshing(true);
    router.refresh();
    window.setTimeout(() => setRefreshing(false), 1200);
  }

  async function logout() {
    setLeaving(true);
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => null);
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={refresh}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8cdbe] bg-white px-3 py-2 text-[12px] font-bold text-[#131a26] hover:border-[#f45000] hover:text-[#f45000]"
      >
        <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
      </button>
      <a
        href="/api/admin/export"
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8cdbe] bg-white px-3 py-2 text-[12px] font-bold text-[#131a26] hover:border-[#f45000] hover:text-[#f45000]"
      >
        <Download className="h-3.5 w-3.5" /> Export CSV
      </a>
      <button
        type="button"
        onClick={() => void logout()}
        disabled={leaving}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[#d8cdbe] bg-white px-3 py-2 text-[12px] font-bold text-red-700 hover:border-red-400 disabled:opacity-60"
      >
        <LogOut className="h-3.5 w-3.5" /> Log out
      </button>
    </div>
  );
}
