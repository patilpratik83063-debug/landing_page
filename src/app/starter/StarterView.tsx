"use client";

import Link from "next/link";
import { useState } from "react";
import PayButton from "@/components/pay-button";
import {
  AfterPayment,
  CompareTable,
  CourseFaq,
  CourseFooter,
  CourseModule,
  DualCta,
  ModuleList,
  SiteHeader,
  StickyCourseBar,
  TopBar,
  useReveal,
  useScrolled,
} from "@/components/course-blocks";

const PACK = "Foundation Pack";
const PRICE = "999";

const MODULES: CourseModule[] = [
  {
    title: "Advance ECM Repairing",
    desc: "ECU/ECM kholna, track testing, component-level fault pakadna aur repair — soldering se testing tak, practical ke saath.",
  },
  {
    title: "BS6 Diagnostic & Programming",
    desc: "BS6 sensors, ECM programming, fault codes aur troubleshooting — modern gaadiyon ka core skill.",
  },
  {
    title: "EV + Hybrid Diagnostic & Programming",
    tag: "Level 1–2",
    desc: "EV/Hybrid ki shuruaat: battery safety, basic systems, entry-level diagnostics aur programming — foundation yahin banta hai.",
  },
  {
    title: "ABS Diagnostic & Programming",
    desc: "Wheel-speed sensors, modulator testing, bleeding procedure aur module programming step-by-step.",
  },
  {
    title: "EPS Diagnostic & Programming",
    desc: "Steering angle calibration, torque sensor checking, motor reset — EPS light ka permanent fix.",
  },
  {
    title: "SRS (Airbag) Diagnostic & Programming",
    desc: "Crash-data reset, module programming aur airbag warning light ka sahi solution.",
  },
  {
    title: "BCM Diagnostic & Programming",
    desc: "Body control module coding — key, lighting, power-window jaise functions ka setup aur fault fix.",
  },
  {
    title: "Cluster Meter Diagnostic & Programming",
    desc: "Meter calibration, dial/backlight setting aur warning configuration — cluster ka A to Z.",
  },
  {
    title: "Engine Repair Training",
    desc: "Engine overhaul basics: timing, compression testing aur common faults ka practical repair.",
  },
];

const COMPARE = [
  { label: "Advance ECM Repairing", starter: "✓ Included", mastery: "✓ Included" },
  { label: "BS6 Diagnostic + Programming", starter: "✓ Included", mastery: "✓ Included" },
  { label: "EV / Hybrid levels", starter: "Level 1–2", mastery: "Level 3–10" },
  { label: "ABS · EPS · SRS", starter: "✓ Included", mastery: "✓ Included" },
  { label: "BCM · Cluster Meter", starter: "✓ Included", mastery: "✓ Included" },
  { label: "Engine Repair Training", starter: "✓ Included", mastery: "✓ Included" },
  { label: "Premium-car practical videos", starter: "✓ Included", mastery: "✓ Included" },
  { label: "Price (one-time)", starter: "₹999", mastery: "₹4,999" },
];

const FAQS = [
  {
    q: "Ye ₹999 pack kis ke liye hai?",
    a: "Beginners, students, mechanics aur garage owners ke liye jo ECM, BS6, EV Level 1–2 aur saare major modules ka strong foundation banana chahte hain.",
  },
  {
    q: "Training videos kaise milengi?",
    a: "Enroll ke baad saari training videos ka access WhatsApp par milta hai — live practical aur hands-on experience ke saath, premium cars par shoot ki hui.",
  },
  {
    q: "Level 1–2 aur Level 3–10 me kya farak hai?",
    a: "Level 1–2 me EV/Hybrid ke basics, safety aur entry-level diagnostics seekhte ho. Level 3–10 (₹4,999 Mastery Pack) me advanced systems, deep programming aur pro-level diagnostics cover hota hai.",
  },
  {
    q: "Kya ye Hindi me hai?",
    a: "Haan, poori training simple Hindi / Hinglish me hai — practical demo ke saath.",
  },
  {
    q: "Enroll kaise karun?",
    a: "Neeche WhatsApp button dabao ya call karo — “Foundation Pack” likh ke bhejo, payment + access details turant mil jayengi.",
  },
];

export default function StarterView() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const shadow = useScrolled(8);
  useReveal();

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white pb-[76px] text-[#131a26]">
      <TopBar text="Foundation Pack — 9 modules + practical videos" price={PRICE} />
      <SiteHeader shadow={shadow} />

      {/* HERO */}
      <section className="bg-[#fff6ec] px-4 pb-10 pt-7 sm:px-6 lg:pb-14 lg:pt-12">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-12">
          <div className="text-center lg:text-left">
            <p className="h-reveal inline-block -rotate-1 rounded-md border-2 border-[#131a26] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px]">
              Foundation Pack · Hindi
            </p>
            <h1 className="h-reveal mt-4 text-[26px] font-extrabold leading-[1.15] tracking-tight sm:text-[34px] lg:text-[42px]">
              ECM se EV tak —{" "}
              <span className="relative inline-block text-[#f45000]">
                diagnostics ka foundation
                <svg viewBox="0 0 220 10" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                  <path d="M3 7 Q 60 1 110 5 T 217 4" fill="none" stroke="#f45000" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
                </svg>
              </span>{" "}
              pakka karo
            </h1>
            <p className="h-reveal mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#3d4756] sm:text-[15px] lg:mx-0">
              Advance ECM repairing, BS6 programming, EV/Hybrid Level 1–2, ABS, EPS, SRS, BCM,
              cluster meter + engine repair — sab kuch practical videos ke saath, premium cars par.
            </p>
            <div className="h-reveal mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
              {["9 modules", "Hindi/Hinglish", "Practical videos", "Premium cars"].map((c) => (
                <span key={c} className="rounded-full border border-[#eadfd2] bg-white px-3 py-1.5 text-[11px] font-bold text-[#3d4756]">
                  {c}
                </span>
              ))}
            </div>
            <div className="h-reveal mx-auto mt-5 max-w-md lg:mx-0">
              <DualCta pack={PACK} price={PRICE} payPack="starter" />
            </div>
          </div>

          {/* price card */}
          <div className="relative mt-6 lg:mt-0">
            <p className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#131a26] px-3.5 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-white shadow-lg">
              ★ Best for beginners
            </p>
            <div className="h-reveal overflow-hidden rounded-2xl border-2 border-[#131a26] bg-white shadow-[0_16px_40px_rgba(19,26,38,0.12)]">
              <div className="bg-[#131a26] px-5 py-3 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-white/60">Foundation Pack</p>
                <p className="font-display mt-1 text-[44px] font-bold leading-none text-white">
                  ₹999 <span className="text-[14px] font-semibold text-white/50">one-time</span>
                </p>
              </div>
              <ul className="space-y-2 px-5 py-4 text-[13px] font-medium">
                {[
                  "Advance ECM Repairing",
                  "BS6 Diagnostic + Programming",
                  "EV / Hybrid — Level 1 & 2",
                  "ABS · EPS · SRS modules",
                  "BCM · Cluster Meter",
                  "Engine Repair Training",
                  "Premium-car practical videos",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#15803d] text-[10px] font-bold text-white">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              <div className="ticket-edge mx-5" />
              <div className="px-5 py-4">
                <PayButton
                  pack="starter"
                  price={PRICE}
                  className="btn-brand group block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-extrabold uppercase text-white disabled:cursor-wait disabled:opacity-70"
                >
                  Pay ₹999 & enroll now
                  <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </PayButton>
                <p className="mt-2 text-center text-[11px] text-[#5b6572]">
                  Secure UPI / card payment · Access link turant milega
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Course curriculum</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Is pack me kya-kya seekhoge
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              Har module practical demo ke saath — dekhna + khud karna, dono.
            </p>
          </div>
          <ModuleList modules={MODULES} />
        </div>
      </section>

      {/* PREMIUM CARS */}
      <section className="bg-[#0e1626] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-white/50">Hands-on experience</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
              Premium cars par live practical
            </h2>
            <p className="h-reveal mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/65">
              Saari training videos live practical ke saath di jaati hain — premium cars par haath
              laga ke seekhoge: scanner lagana, fault pakadna, programming karna. Theory wala
              ratta system nahi, floor wala kaam.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2.5 lg:mt-0">
            {[
              ["9", "modules"],
              ["100%", "practical"],
              ["Hindi", "language"],
            ].map(([n, l], i) => (
              <div
                key={l}
                className="h-reveal rounded-xl border border-white/10 bg-white/[0.05] p-4 text-center"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="font-display text-[26px] font-bold leading-none text-white">{n}</p>
                <p className="mt-1 text-[10.5px] font-bold uppercase tracking-wider text-white/50">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARE */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Confusion clear</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              ₹999 vs ₹4,999 — farak kya hai?
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              Dono me 8 modules same hain. Sirf EV/Hybrid ki depth alag hai.
            </p>
          </div>
          <div className="mt-5">
            <CompareTable rows={COMPARE} highlight="starter" />
          </div>
          <p className="h-reveal mx-auto mt-4 max-w-2xl rounded-xl border border-[#eadfd2] bg-white p-4 text-center text-[13px] font-semibold">
            Shuruaat karni hai, budget tight hai → <span className="font-extrabold">ye ₹999 pack perfect hai.</span>{" "}
            Advanced pro banna hai →{" "}
            <Link href="/mastery" className="font-extrabold text-[#f45000] underline">
              Mastery Pack (L3–10) dekho →
            </Link>
          </p>
        </div>
      </section>

      {/* WHO */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Ye pack kiske liye</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Agar inme se ho, to join karo
            </h2>
          </div>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🔧 Mechanics", "Scanner se dar lagta hai? Foundation se confidence lao."],
              ["🎓 ITI / Diploma students", "Theory ke saath practical skill — job-ready bano."],
              ["🏠 Garage owners", "BS6 + EV gaadiyan wapas nahi bhejni padengi."],
              ["🚀 Beginners", "Zero se start — Hindi me, step-by-step."],
            ].map(([t, d], i) => (
              <div
                key={t as string}
                className="h-reveal card-lift rounded-xl border border-[#eadfd2] bg-[#fffdf8] p-4"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <p className="text-[14px] font-extrabold">{t}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-[#3d4756]">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white px-4 pb-10 sm:px-6">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Enroll karo</p>
          <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
            Foundation Pack — sirf ₹999
          </h2>
          <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
            One-time payment · Saari training videos included · WhatsApp support
          </p>
          <div className="h-reveal mx-auto mt-5 max-w-md">
            <DualCta pack={PACK} price={PRICE} payPack="starter" />
          </div>
          <AfterPayment pack={PACK} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-2xl">
          <h3 className="h-reveal text-[18px] font-extrabold sm:text-[20px]">Aksar puche jaane wale sawaal</h3>
          <CourseFaq faqs={FAQS} open={faqOpen} setOpen={setFaqOpen} />
        </div>
      </section>

      <CourseFooter pack={PACK} price={PRICE} />
      <StickyCourseBar pack={PACK} price={PRICE} payPack="starter" />
    </main>
  );
}
