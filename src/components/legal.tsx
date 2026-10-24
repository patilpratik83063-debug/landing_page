import Link from "next/link";

export const LEGAL_UPDATED = "24 October 2026";
export const LEGAL_ENTITY = "Automobile Doctor India Pvt. Ltd. (Indian Automobile Doctor)";
export const LEGAL_ADDRESS = "2427 NH5 Hitech Square, Pandra, Bhubaneswar, Odisha 751010";
export const LEGAL_EMAIL = "hello@indianautomobiledoctor.com";
export const LEGAL_PHONE = "+91 80937 77701";

export function LegalShell({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-[#fffdf8] text-[#131a26]">
      <header className="border-b border-[#eadfd2] bg-white">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#131a26] text-[12px] font-extrabold text-white">
              IAD
            </span>
            <span className="text-[13px] font-bold">Indian Automobile Doctor</span>
          </Link>
          <Link href="/starter" className="text-[12px] font-bold text-[#f45000] underline">
            Foundation Pack →
          </Link>
        </div>
      </header>

      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
        <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Legal</p>
        <h1 className="mt-1 text-[28px] font-extrabold tracking-tight sm:text-[34px]">{title}</h1>
        <p className="mt-2 text-[13.5px] leading-relaxed text-[#3d4756]">{intro}</p>
        <p className="mt-2 text-[11.5px] font-semibold text-[#5b6572]">Last updated: {LEGAL_UPDATED}</p>

        <div className="mt-7 space-y-6">{children}</div>

        <div className="mt-10 rounded-xl border border-[#eadfd2] bg-white p-4 text-[12.5px] leading-relaxed">
          <p className="font-extrabold">Contact</p>
          <p className="mt-1">{LEGAL_ENTITY}</p>
          <p>{LEGAL_ADDRESS}</p>
          <p className="mt-1">
            Email: <a className="underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>
            <span className="mx-2 text-[#c9bfae]">|</span>
            Phone / WhatsApp: <a className="underline" href="tel:+918093777701">{LEGAL_PHONE}</a>
          </p>
        </div>

        <nav className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-[12px] font-bold text-[#5b6572]">
          <Link href="/" className="underline hover:text-[#131a26]">Home</Link>
          <Link href="/privacy" className="underline hover:text-[#131a26]">Privacy Policy</Link>
          <Link href="/terms" className="underline hover:text-[#131a26]">Terms</Link>
          <Link href="/refund" className="underline hover:text-[#131a26]">Refund Policy</Link>
        </nav>
      </article>
    </main>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-[#eadfd2] bg-white p-4 sm:p-5">
      <h2 className="text-[15px] font-extrabold">{heading}</h2>
      <div className="mt-2 space-y-2 text-[13px] leading-relaxed text-[#3d4756]">{children}</div>
    </section>
  );
}
