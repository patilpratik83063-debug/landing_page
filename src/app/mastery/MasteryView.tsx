"use client";

import Link from "next/link";
import { useState } from "react";
import { VideoShowcase } from "@/components/media";
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
  waLink,
} from "@/components/course-blocks";

const PACK = "Mastery Pack";
const PRICE = "4,999";

const MODULES: CourseModule[] = [
  {
    title: "Advanced ECM Repairing",
    desc: "ECU/ECM component-level repair: track testing, IC replacement, soldering and load testing - with workshop-grade practice.",
  },
  {
    title: "BS6 Diagnostic & Programming",
    desc: "Advanced BS6 systems: DPF/EGR logic, sensor networks, ECM programming and complex fault tracing.",
  },
  {
    title: "EV + Hybrid Diagnostic & Programming",
    tag: "Level 3-10",
    desc: "The pro zone: BMS programming, motor-controller tuning, deep CAN-bus diagnostics and hybrid drive systems - the work that pays the most in the market.",
  },
  {
    title: "ABS Diagnostic & Programming",
    desc: "Advanced ABS/ESP: sensor graphs, modulator bleeding, coding and a permanent fix for intermittent faults.",
  },
  {
    title: "EPS Diagnostic & Programming",
    desc: "Pro fixes for electric steering: angle calibration, torque-sensor mapping and motor control reset.",
  },
  {
    title: "SRS (Airbag) Diagnostic & Programming",
    desc: "Crash-data reset, seat-belt and sensor coding, module programming - complete command of airbag systems.",
  },
  {
    title: "BCM Diagnostic & Programming",
    desc: "Body electronics coding: immobilizer link, lighting logic, key programming and retrofit setups.",
  },
  {
    title: "Cluster Meter Diagnostic & Programming",
    desc: "Digital clusters: calibration, EEPROM work, backlight and warning strategy - right up to premium meters.",
  },
  {
    title: "Engine Repair Training",
    desc: "Pro-level engine work: overhaul, timing strategy, compression diagnostics and performance faults.",
  },
];

const COMPARE = [
  { label: "Advanced ECM Repairing", starter: "✓ Included", mastery: "✓ Included" },
  { label: "BS6 Diagnostic + Programming", starter: "✓ Included", mastery: "✓ Included" },
  { label: "EV / Hybrid levels", starter: "Level 1-2", mastery: "Level 3-10" },
  { label: "ABS · EPS · SRS", starter: "✓ Included", mastery: "✓ Included" },
  { label: "BCM · Cluster Meter", starter: "✓ Included", mastery: "✓ Included" },
  { label: "Engine Repair Training", starter: "✓ Included", mastery: "✓ Included" },
  { label: "Premium-car practical videos", starter: "✓ Included", mastery: "✓ Included" },
  { label: "Price (one-time)", starter: "₹999", mastery: "₹4,999" },
];

const FAQS = [
  {
    q: "Who is the ₹4,999 Mastery Pack for?",
    a: "For anyone who wants to be a complete pro, not just cover the basics - full mastery of all modules, with advanced EV/Hybrid Level 3-10 diagnostics and programming.",
  },
  {
    q: "What exactly do I get extra compared to the ₹999 pack?",
    a: "All 9 modules are the same in both. The only difference is the depth of EV/Hybrid content: the ₹999 pack covers Level 1-2 (basics), while this one covers Level 3-10 (BMS programming, controller tuning, deep CAN-bus diagnostics, hybrid drive systems).",
  },
  {
    q: "How will I receive the training videos?",
    a: "After you enroll, access to all training videos arrives on WhatsApp and email right away - with live practicals and hands-on experience, shot on premium cars.",
  },
  {
    q: "Can a beginner do it?",
    a: "Yes. If you are starting from absolute zero, the Foundation Pack will be easier to follow - this pack takes that same depth up to L3-L10.",
  },
  {
    q: "How do I enroll?",
    a: "Use the Pay ₹4,999 button above or below to pay securely by UPI/card. The access link arrives on WhatsApp + email right after payment. You can message us on WhatsApp if you have any question.",
  },
];

export default function MasteryView() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const shadow = useScrolled(8);
  useReveal();

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white pb-[76px] text-[#131a26]">
      <TopBar text="Mastery Pack - complete pro training + videos" price={PRICE} />
      <SiteHeader shadow={shadow} />

      {/* HERO */}
      <section className="bg-[#0e1626] px-4 pb-10 pt-7 text-white sm:px-6 lg:pb-14 lg:pt-12">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-12">
          <div className="text-center lg:text-left">
            <p className="h-reveal inline-block -rotate-1 rounded-md border-2 border-[#f45000] bg-[#f45000]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px] text-[#ff8a4d]">
              Mastery Pack · Level 3-10 · Beginner to pro
            </p>
            <h1 className="h-reveal mt-4 text-[26px] font-extrabold leading-[1.15] tracking-tight text-white sm:text-[34px] lg:text-[42px]">
              Don&apos;t stay just a mechanic -{" "}
              <span className="relative inline-block text-[#ff6a2b]">
                become a pro in EV diagnostics
                <svg viewBox="0 0 220 10" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                  <path d="M3 7 Q 60 1 110 5 T 217 4" fill="none" stroke="#f45000" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
                </svg>
              </span>
            </h1>
            <p className="h-reveal mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-white/65 sm:text-[15px] lg:mx-0">
              From ECM repairing to EV/Hybrid Level 3-10 - ABS, EPS, SRS, BCM, cluster and engine
              repair: the full stack, advanced depth, with live practical videos on premium cars.
            </p>
            <div className="h-reveal mt-4 flex flex-wrap justify-center gap-1.5 lg:justify-start">
              {["9 pro modules", "Level 3-10 EV", "Practical videos", "Premium cars"].map((c) => (
                <span key={c} className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1.5 text-[11px] font-bold text-white/80">
                  {c}
                </span>
              ))}
            </div>
            <div className="h-reveal mx-auto mt-5 max-w-md lg:mx-0">
              <DualCta pack={PACK} price={PRICE} payPack="mastery" />
            </div>
          </div>

          {/* price card */}
          <div className="mt-6 lg:mt-0">
            <div className="h-reveal overflow-hidden rounded-2xl border-2 border-[#f45000] bg-white text-[#131a26] shadow-[0_16px_44px_rgba(244,80,0,0.22)]">
              <div className="bg-[#f45000] px-5 py-3 text-center">
                <p className="text-[11px] font-bold uppercase tracking-[2px] text-white/80">★ Most complete · Mastery Pack</p>
                <p className="font-display mt-1 text-[44px] font-bold leading-none text-white">
                  ₹4,999 <span className="text-[14px] font-semibold text-white/70">one-time</span>
                </p>
              </div>
              <ul className="space-y-2 px-5 py-4 text-[13px] font-medium">
                {[
                  "Advanced ECM Repairing (pro depth)",
                  "BS6 Diagnostic + Programming",
                  "EV / Hybrid - Level 3 to 10",
                  "ABS · EPS · SRS advanced",
                  "BCM · Cluster Meter coding",
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
                  pack="mastery"
                  price={PRICE}
                  fallbackHref={waLink(PACK, PRICE)}
                  className="btn-brand group block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-extrabold uppercase text-white disabled:cursor-wait disabled:opacity-70"
                >
                  Pay ₹4,999 & enroll now
                  <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
                </PayButton>
                <p className="mt-2 text-center text-[11px] text-[#5b6572]">
                  Secure UPI / card payment · Access link delivered instantly
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
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Pro curriculum</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              9 modules, taken to advanced depth
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              Every module comes with a practical demo - the L3-L10 EV levels are the heart of this pack.
            </p>
          </div>
          <ModuleList modules={MODULES} />
        </div>
      </section>

      {/* PREMIUM CARS */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Hands-on experience</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Live practicals on premium cars
            </h2>
            <p className="h-reveal mt-2 max-w-xl text-[13.5px] leading-relaxed text-[#3d4756]">
              You do not become a pro from theory. That is why every training video comes with a live
              practical - connecting the scanner on premium cars, tracing faults, doing the
              programming. You learn exactly what is used in showrooms and large garages.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2.5 lg:mt-0">
            {[
              ["L3-10", "EV depth"],
              ["100%", "practical"],
              ["Live", "practicals"],
            ].map(([n, l], i) => (
              <div
                key={l}
                className="h-reveal rounded-xl border border-[#eadfd2] bg-white p-4 text-center shadow-[0_8px_22px_rgba(19,26,38,0.06)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="font-display text-[24px] font-bold leading-none">{n}</p>
                <p className="mt-1 text-[10.5px] font-bold uppercase tracking-wider text-[#5b6572]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS */}
      <section className="bg-[#0e1626] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <h2 className="h-reveal text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
            See for yourself how the training works
          </h2>
          <p className="h-reveal mt-1.5 max-w-xl text-[13px] text-white/65">
            Course preview and live practical videos. Watch them, then decide.
          </p>
          <VideoShowcase />
        </div>
      </section>

      {/* COMPARE */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">No more confusion</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              ₹999 vs ₹4,999 - what&apos;s the difference?
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              All 9 modules are the same in both. Only the depth of EV/Hybrid content differs, and that is the biggest difference.
            </p>
          </div>
          <div className="mt-5">
            <CompareTable rows={COMPARE} highlight="mastery" />
          </div>
          <p className="h-reveal mx-auto mt-4 max-w-2xl rounded-xl bg-[#fff6ec] p-4 text-center text-[13px] font-semibold">
            L3-L10 work commands the highest market rate - that is why pros choose this pack. If your budget is tight,{" "}
            <Link href="/starter" className="font-extrabold text-[#f45000] underline">
              start with the ₹999 Foundation →
            </Link>
          </p>
        </div>
      </section>

      {/* WHO */}
      <section className="bg-[#0e1626] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-white/50">Who this pack is for</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
              If you are ready to go pro
            </h2>
          </div>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🔧 Working mechanics", "Trace everyday faults in minutes with advanced scanner command."],
              ["🏠 Garage owners", "Handle premium + EV vehicles yourself instead of sending them out."],
              ["🎓 Serious students", "L3-L10 skills alongside your degree - stand out in placements."],
              ["🚀 Future entrepreneurs", "The complete technical base for setting up an EV service business."],
            ].map(([t, d], i) => (
              <div
                key={t as string}
                className="h-reveal rounded-xl border border-white/10 bg-white/[0.05] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25"
                style={{ transitionDelay: `${(i % 4) * 60}ms` }}
              >
                <p className="text-[14px] font-extrabold text-white">{t}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="bg-white px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-2xl text-center">
          <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Enroll now</p>
          <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
            Mastery Pack - only ₹4,999
          </h2>
          <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
            One-time payment · L3-L10 + all practical videos included · WhatsApp support
          </p>
          <div className="h-reveal mx-auto mt-5 max-w-md">
            <DualCta pack={PACK} price={PRICE} payPack="mastery" />
          </div>
          <AfterPayment pack={PACK} />
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6">
        <div className="mx-auto w-full max-w-2xl">
          <h3 className="h-reveal text-[18px] font-extrabold sm:text-[20px]">Frequently asked questions</h3>
          <CourseFaq faqs={FAQS} open={faqOpen} setOpen={setFaqOpen} />
        </div>
      </section>

      <CourseFooter pack={PACK} price={PRICE} />
      <StickyCourseBar pack={PACK} price={PRICE} payPack="mastery" />
    </main>
  );
}
