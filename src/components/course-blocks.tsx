"use client";

import { MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import PayButton, { PayPack } from "./pay-button";

export const WA_NUMBER = "918093777701";
export const CALL_NUMBER = "+91 80937 77701";

export function waLink(pack: string, price: string): string {
  const msg = `Namaste! Mujhe ${pack} (₹${price}) join karna hai. Details bhejiye.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

/* Bulletproof scroll-reveal (same system as home page) */
export function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>(".h-reveal")
    );
    els.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight * 0.94) el.classList.add("h-pre");
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const t = e.target as HTMLElement;
          if (e.isIntersecting) {
            t.classList.add("is-visible");
            window.setTimeout(() => {
              t.style.transitionDelay = "0ms";
            }, 750);
            io.unobserve(t);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -6% 0px" }
    );
    els.forEach((el) => io.observe(el));
    const fallback = window.setTimeout(() => {
      document
        .querySelectorAll<HTMLElement>(".h-reveal.h-pre:not(.is-visible)")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight) el.classList.add("is-visible");
        });
    }, 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);
}

/** True once the page is scrolled past `threshold` px. Uses an observed sentinel, not a scroll listener. */
export function useScrolled(threshold = 8) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText = `position:absolute;top:0;left:0;width:1px;height:${threshold}px;pointer-events:none;`;
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(([e]) => setS(!e.isIntersecting));
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, [threshold]);
  return s;
}

export function TopBar({ text, price }: { text: string; price: string }) {
  return (
    <div className="bg-[#131a26] px-3 py-2 text-center text-[11.5px] font-semibold text-white sm:text-[13px]">
      {text}
      <span className="ml-2 rounded-md bg-[#f45000] px-2 py-0.5 text-[11px] font-bold">
        Just ₹{price}
      </span>
    </div>
  );
}

export function SiteHeader({ shadow }: { shadow: boolean }) {
  return (
    <header
      className={`sticky top-0 z-40 border-b border-[#eee5d6] bg-white/95 backdrop-blur transition-shadow duration-300 ${
        shadow ? "shadow-[0_6px_24px_rgba(19,26,38,0.10)]" : ""
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#131a26] text-[12px] font-extrabold text-white">
            IAD
          </span>
          <span className="leading-tight">
            <span className="block text-[13px] font-bold">Indian Automobile Doctor</span>
            <span className="block text-[10px] font-medium tracking-wide text-[#5b6572]">
              EV · BS6 · Hybrid · Diagnostics
            </span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="hidden rounded-lg border border-[#eadfd2] px-3.5 py-2 text-[12px] font-bold text-[#3d4756] transition hover:border-[#131a26] sm:block"
          >
            ← Home
          </Link>
          <a
            href={`tel:${WA_NUMBER}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#131a26] px-3.5 py-2 text-[12px] font-bold text-white transition hover:bg-black"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={2.25} /> Call
          </a>
        </div>
      </div>
    </header>
  );
}

export type CourseModule = { title: string; desc: string; tag?: string };

export function ModuleList({ modules }: { modules: CourseModule[] }) {
  return (
    <ol className="mt-5 grid gap-x-10 md:grid-cols-2">
      {modules.map((m, i) => (
        <li
          key={m.title}
          className="h-reveal group flex gap-4 border-t border-[#f0e7d8] py-4 transition-colors duration-200 last:border-b hover:bg-[#fffdf8] md:last:border-b"
          style={{ transitionDelay: `${(i % 2) * 80}ms` }}
        >
          <span className="font-display text-[20px] font-bold text-[#f45000]/70 transition-colors group-hover:text-[#f45000]">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="flex flex-wrap items-center gap-2 text-[14.5px] font-bold">
              {m.title}
              {m.tag && (
                <span className="rounded-md bg-[#f45000]/10 px-1.5 py-0.5 text-[9.5px] font-extrabold uppercase tracking-wider text-[#f45000]">
                  {m.tag}
                </span>
              )}
            </span>
            <span className="mt-0.5 block text-[13px] leading-relaxed text-[#3d4756]">
              {m.desc}
            </span>
          </span>
        </li>
      ))}
    </ol>
  );
}

export type CompareRow = { label: string; starter: string; mastery: string };

export function CompareTable({
  rows,
  highlight,
}: {
  rows: CompareRow[];
  highlight: "starter" | "mastery";
}) {
  return (
    <div className="h-reveal overflow-hidden rounded-2xl border border-[#eadfd2]">
      <div className="grid grid-cols-[1.3fr_1fr_1fr] bg-[#131a26] text-white">
        <p className="px-3 py-3 text-[11px] font-bold uppercase tracking-wider sm:px-4">Kya milega</p>
        <p
          className={`px-2 py-3 text-center text-[11px] font-extrabold uppercase tracking-wider sm:text-[12px] ${
            highlight === "starter" ? "bg-[#f45000]" : "text-white/60"
          }`}
        >
          ₹999 Pack
        </p>
        <p
          className={`px-2 py-3 text-center text-[11px] font-extrabold uppercase tracking-wider sm:text-[12px] ${
            highlight === "mastery" ? "bg-[#f45000]" : "text-white/60"
          }`}
        >
          ₹4999 Pack
        </p>
      </div>
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid grid-cols-[1.3fr_1fr_1fr] text-[12px] sm:text-[13px] ${
            i % 2 === 0 ? "bg-white" : "bg-[#fffdf8]"
          }`}
        >
          <p className="border-t border-[#f0e7d8] px-3 py-3 font-semibold sm:px-4">{r.label}</p>
          <p
            className={`border-t border-[#f0e7d8] px-2 py-3 text-center font-bold ${
              highlight === "starter" ? "bg-[#f45000]/[0.07] text-[#c93a00]" : "text-[#3d4756]"
            }`}
          >
            {r.starter}
          </p>
          <p
            className={`border-t border-[#f0e7d8] px-2 py-3 text-center font-bold ${
              highlight === "mastery" ? "bg-[#f45000]/[0.07] text-[#c93a00]" : "text-[#3d4756]"
            }`}
          >
            {r.mastery}
          </p>
        </div>
      ))}
    </div>
  );
}

export function DualCta({ pack, price, payPack }: { pack: string; price: string; payPack: PayPack }) {
  return (
    <div className="grid gap-2.5 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <PayButton
          pack={payPack}
          price={price}
          className="btn-brand group block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-extrabold uppercase tracking-wide text-white disabled:cursor-wait disabled:opacity-70"
        >
          Pay ₹{price} & enroll now
          <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
        </PayButton>
      </div>
      <a
        href={waLink(pack, price)}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-wa block rounded-xl px-4 py-3 text-center text-[13px] font-extrabold uppercase tracking-wide text-white"
      >
        <MessageCircle className="mr-1.5 inline h-4 w-4 -translate-y-px" strokeWidth={2.25} /> WhatsApp
      </a>
      <a
        href={`tel:${WA_NUMBER}`}
        className="block rounded-xl border-2 border-[#131a26] bg-white px-4 py-3 text-center text-[13px] font-extrabold uppercase tracking-wide text-[#131a26] transition hover:bg-[#131a26] hover:text-white"
      >
        <Phone className="mr-1.5 inline h-4 w-4 -translate-y-px" strokeWidth={2.25} /> {CALL_NUMBER}
      </a>
      <p className="text-center text-[11.5px] text-[#5b6572] sm:col-span-2">
        WhatsApp par pack ka naam likh ke bhejo - videos + joining details turant milengi
      </p>
      <div className="flex flex-wrap justify-center gap-1.5 sm:col-span-2">
        {["Hindi me training", "Practical videos", "WhatsApp support", "One-time payment"].map((t) => (
          <span key={t} className="rounded-full bg-[#15803d]/10 px-2.5 py-1 text-[10.5px] font-bold text-[#15803d]">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CourseFaq({
  faqs,
  open,
  setOpen,
}: {
  faqs: { q: string; a: string }[];
  open: number | null;
  setOpen: (v: number | null) => void;
}) {
  return (
    <div className="mt-3 overflow-hidden rounded-xl border border-[#f0e7d8]">
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q} className="border-b border-[#f0e7d8] last:border-0">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[13.5px] font-bold transition-colors hover:bg-[#fffdf8]"
            >
              {f.q}
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[16px] font-bold leading-none transition-all duration-300 ${
                  isOpen
                    ? "rotate-45 border-[#f45000] bg-[#f45000] text-white"
                    : "border-[#eadfd2] text-[#f45000]"
                }`}
              >
                +
              </span>
            </button>
            <div
              className={`grid transition-all duration-300 ease-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden" inert={!isOpen}>
                <p className="px-4 pb-4 text-[12.5px] leading-relaxed text-[#3d4756]">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function AfterPayment({ pack }: { pack: string }) {
  const steps = [
    ["1", "WhatsApp par confirm karo", `Neeche button dabao - "${pack}" likha message ready milega, bas send karo.`],
    ["2", "Payment complete karo", "Pay button dabao - UPI, card, netbanking se secure payment karo. Paise seedha IAD account me jate hain."],
    ["3", "Access link turant pao", "Payment ke turant baad training videos ka access link + joining details WhatsApp par mil jayengi."],
  ] as const;
  return (
    <div className="h-reveal mt-6 rounded-2xl border-2 border-dashed border-[#f45000]/40 bg-[#fff6ec] p-5 sm:p-6">
      <p className="text-center text-[11px] font-extrabold uppercase tracking-[2px] text-[#f45000]">
        Payment ke baad kya hoga?
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <div key={n} className="rounded-xl bg-white p-4 shadow-[0_8px_22px_rgba(19,26,38,0.06)]">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#131a26] text-[13px] font-extrabold text-white">
              {n}
            </span>
            <p className="mt-2 text-[13.5px] font-extrabold">{t}</p>
            <p className="mt-1 text-[12px] leading-relaxed text-[#3d4756]">{d}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11.5px] font-semibold text-[#5b6572]">
        Koi dikkat aaye to isi number par call/WhatsApp karo - team turant help karegi
      </p>
    </div>
  );
}

export function StickyCourseBar({ pack, price, payPack }: { pack: string; price: string; payPack: PayPack }) {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#eadfd2] bg-white/97 px-3 backdrop-blur"
      style={{ paddingTop: "10px", paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
        <div>
          <p className="text-[15px] font-extrabold">
            ₹{price} <span className="text-[11px] font-medium text-[#5b6572]">one-time</span>
          </p>
          <p className="max-w-[170px] truncate text-[10.5px] font-semibold text-[#5b6572] sm:max-w-none">
            {pack} · Videos included
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <a
            href={`tel:${WA_NUMBER}`}
            aria-label="Call to enroll"
            className="grid h-11 w-11 place-items-center rounded-xl border-2 border-[#131a26] text-lg transition hover:bg-[#131a26] hover:text-white"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={2.25} />
          </a>
          <PayButton
            pack={payPack}
            price={price}
            className="btn-wa rounded-xl px-5 py-3 text-[13px] font-extrabold uppercase disabled:opacity-70"
          >
            Enroll →
          </PayButton>
        </div>
      </div>
    </div>
  );
}

export function CourseFooter({ pack, price }: { pack: string; price: string }) {
  return (
    <footer className="bg-[#0e1626] px-4 pb-8 pt-8 text-[12px] leading-relaxed text-white/55 sm:px-6">
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="text-[13px] font-bold text-white">Indian Automobile Doctor (IAD)</p>
          <p className="mt-2 max-w-md">
            20+ saal se auto market me. EV, BS6, Hybrid, diagnostics aur ECU programming ki practical training.
          </p>
          <p className="mt-2">
            Call/WhatsApp: <span className="text-white/85">{CALL_NUMBER}</span>
          </p>
          <p className="mt-1">2427 NH5 Hitech Square, Pandra, Bhubaneswar, Odisha 751010</p>
        </div>
        <div className="md:text-right">
          <a
            href={waLink(pack, price)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-[#f45000] px-5 py-2.5 text-[12.5px] font-extrabold uppercase text-white transition hover:-translate-y-px hover:bg-[#ff5a0a]"
          >
            Enroll @ ₹{price} →
          </a>
          <p className="mt-2 flex justify-start gap-2 text-[11px] md:justify-end">
            <Link href="/" className="underline hover:text-white">Home</Link>
            <Link href="/starter" className="underline hover:text-white">₹999 Pack</Link>
            <Link href="/mastery" className="underline hover:text-white">₹4999 Pack</Link>
            <a href={waLink(pack, price)} target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              WhatsApp
            </a>
          </p>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl">
        <p className="mt-4 border-t border-white/10 pt-3 text-[10.5px]">
          Note: Training outcomes aapki practice, skill aur consistency par depend karte hain. Videos + practical direction included hai.
        </p>
      </div>
    </footer>
  );
}
