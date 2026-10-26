import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin · IAD",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-[#f7f3ec] text-[#131a26]">{children}</div>;
}
