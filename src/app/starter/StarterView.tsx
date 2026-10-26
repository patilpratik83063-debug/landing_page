"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HeroVideo,
  PhotoMosaic,
  REVIEW_SHOTS,
  ReviewWall,
  TrainerProof,
  VideoShowcase,
} from "@/components/media";
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

const PACK = "Foundation Pack";
const PRICE = "999";
const REGULAR_PRICE = "4,999";
/** Change this one value when the access period is confirmed. */
const ACCESS_PERIOD = "12 months";

const MODULES: CourseModule[] = [
  {
    title: "Advanced ECM Repairing",
    desc: "Open and repair ECU/ECM units: track testing, component-level fault finding and repair - from soldering to testing, with hands-on practice.",
  },
  {
    title: "BS6 Diagnostic & Programming",
    desc: "BS6 sensors, ECM programming, fault codes and troubleshooting - the core skill for modern vehicles.",
  },
  {
    title: "EV + Hybrid Diagnostic & Programming",
    tag: "Level 1-2",
    desc: "Start with EV/Hybrid: battery safety, the basic systems, entry-level diagnostics and programming - your foundation starts here.",
  },
  {
    title: "ABS Diagnostic & Programming",
    desc: "Wheel-speed sensors, modulator testing, the bleeding procedure and module programming, step by step.",
  },
  {
    title: "EPS Diagnostic & Programming",
    desc: "Steering angle calibration, torque sensor checking and motor reset - a permanent fix for the EPS light.",
  },
  {
    title: "SRS (Airbag) Diagnostic & Programming",
    desc: "Crash-data reset, module programming and the right fix for an airbag warning light.",
  },
  {
    title: "BCM Diagnostic & Programming",
    desc: "Body control module coding - set up and fix key, lighting and power-window functions.",
  },
  {
    title: "Cluster Meter Diagnostic & Programming",
    desc: "Meter calibration, dial and backlight settings and warning configuration - everything about the cluster.",
  },
  {
    title: "Engine Repair Training",
    desc: "Engine overhaul basics: timing, compression testing and practical repair of common faults.",
  },
];

const INCLUDED = [
  "Advanced ECM Repairing",
  "BS6 Diagnostic + Programming",
  "EV / Hybrid - Level 1 & 2",
  "ABS · EPS · SRS modules",
  "BCM · Cluster Meter",
  "Engine Repair Training",
  "Premium-car practical videos",
  `Access for ${ACCESS_PERIOD}`,
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
    q: "Who is the ₹999 pack for?",
    a: "Beginners, ITI/Diploma students, mechanics and garage owners who want a strong foundation in ECM, BS6, EV Level 1-2 and the other major modules. You can start from zero.",
  },
  {
    q: "How will I receive the training videos?",
    a: "The access link arrives on WhatsApp and email right after payment. All training videos include live practicals shot on premium cars.",
  },
  {
    q: "How long is the access valid?",
    a: `The Foundation Pack gives you access for ${ACCESS_PERIOD}. You can watch at your own pace, whenever your schedule allows.`,
  },
  {
    q: "Can I get a refund?",
    a: "Yes, within 7 days of payment - as long as you have not watched a large part of the course (more than 20%). The full policy is on the Refund Policy page.",
  },
  {
    q: "What is the difference between Level 1-2 and Level 3-10?",
    a: "Level 1-2 covers EV/Hybrid basics, safety and entry-level diagnostics. Level 3-10 (the ₹4,999 Mastery Pack) covers advanced systems, deep programming and pro-level diagnostics.",
  },
  {
    q: "Is a job or income guaranteed?",
    a: "No. This is skill training. A job, placement or income depends on your practice, skill, market and consistency - no guarantee is given.",
  },
  {
    q: "How do I enroll?",
    a: "Use the Pay ₹999 button above to pay securely. Access is instant. You can message us on WhatsApp if you have any question.",
  },
];

export default function StarterView() {
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const shadow = useScrolled(8);
  useReveal();

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white pb-[76px] text-[#131a26]">
      <TopBar text="Foundation Pack - 9 modules + practical videos" price={PRICE} />
      <SiteHeader shadow={shadow} />

      {/* HERO */}
      <section className="bg-[#fff6ec] px-4 pb-9 pt-7 sm:px-6 lg:pb-12 lg:pt-10">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-10">
          <div className="text-center lg:text-left">
            <p className="h-reveal inline-block -rotate-1 rounded-md border-2 border-[#131a26] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px]">
              Foundation Pack · Beginner friendly
            </p>
            <h1 className="h-reveal mt-4 text-[27px] font-extrabold leading-[1.14] tracking-tight sm:text-[34px] lg:text-[42px]">
              Find the vehicle{" "}
              <span className="relative inline-block text-[#f45000]">
                fault yourself with a scanner
                <svg viewBox="0 0 220 10" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                  <path d="M3 7 Q 60 1 110 5 T 217 4" fill="none" stroke="#f45000" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
                </svg>
              </span>{" "}
              - stop sending customers away
            </h1>
            <p className="h-reveal mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#3d4756] sm:text-[15px] lg:mx-0">
              Advanced ECM repairing, BS6 programming, EV/Hybrid Level 1-2, ABS, EPS, SRS, BCM,
              cluster meter and engine repair - 9 modules with live practicals on premium cars.
            </p>

            <div className="h-reveal mt-4 flex flex-wrap items-end justify-center gap-x-2.5 gap-y-1 lg:justify-start">
              <span className="text-[15px] font-semibold text-[#8a94a0] line-through">₹{REGULAR_PRICE}</span>
              <span className="font-display text-[36px] font-bold leading-none">₹{PRICE}</span>
              <span className="mb-0.5 rounded-md bg-[#15803d]/10 px-2 py-0.5 text-[10.5px] font-extrabold uppercase tracking-wide text-[#15803d]">
                one-time
              </span>
            </div>
            <p className="h-reveal mt-1 text-[11.5px] font-semibold text-[#5b6572]">
              9 modules = ₹111 per module · introductory price
            </p>

            <div className="h-reveal mx-auto mt-4 max-w-md lg:mx-0">
              <DualCta pack={PACK} price={PRICE} payPack="starter" />
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            <div className="h-reveal">
              <HeroVideo title="20-second preview - see what's inside" />
            </div>

            <dl className="h-reveal mt-3 grid grid-cols-3 divide-x divide-[#eadfd2] rounded-2xl border border-[#eadfd2] bg-white/70 py-3">
              {[
                ["1000+", "students trained"],
                ["20+", "years in auto"],
                ["9", "practical modules"],
              ].map(([v, l]) => (
                <div key={l} className="px-2 text-center">
                  <dd className="font-display text-[22px] font-bold leading-none">{v}</dd>
                  <dt className="mt-1 text-[10px] font-medium text-[#5b6572]">{l}</dt>
                </div>
              ))}
            </dl>

            <p className="h-reveal mt-2 flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#5b6572]">
              <span className="grid h-4 w-4 place-items-center rounded-full bg-[#15803d] text-[9px] font-bold text-white">✓</span>
              7-day refund policy · instant access
            </p>
          </div>
        </div>
      </section>

      {/* PROOF - right under the hero */}
      <section id="reviews" className="scroll-mt-16 bg-white px-4 py-9 sm:px-6 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Proof, not promises</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Who teaches you, and what students say
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] leading-relaxed text-[#5b6572]">
              Real classrooms, real workshops and students&apos; own WhatsApp messages - no made-up
              reviews.
            </p>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <TrainerProof />
            <div className="rounded-2xl border border-[#eadfd2] bg-[#fffdf8] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#f45000]">Student messages</p>
              <p className="mt-1 text-[13px] font-bold leading-snug">
                Placement, scanner practice and doubt support - straight from the students.
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[12px] leading-relaxed text-[#3d4756]">
                {[
                  "Placed at Skoda, Pune - 2024 diploma batch",
                  "Workshop owner earned customer trust through scanner diagnosis",
                  "ECU coding, immobilizer and key programming practice",
                  "References and interview calls after training",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#15803d]" />
                    {t}
                  </li>
                ))}
              </ul>
              <a
                href="#reviews-wall"
                className="mt-3 inline-block text-[12px] font-extrabold text-[#f45000] underline"
              >
                View screenshots →
              </a>
            </div>
          </div>

          <div id="reviews-wall" className="mt-5 scroll-mt-16">
            <ReviewWall shots={REVIEW_SHOTS.slice(0, 6)} />
          </div>

          <div className="mt-6">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Inside the workshop</p>
            <PhotoMosaic />
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Course curriculum</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              What you will learn in this pack
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              Every module comes with a practical demo - you watch it, then do it yourself.
            </p>
          </div>
          <ModuleList modules={MODULES} />
        </div>
      </section>

      {/* PREMIUM CARS + VIDEOS */}
      <section className="bg-[#0e1626] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-white/50">Hands-on experience</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
              Live practicals on premium cars
            </h2>
            <p className="h-reveal mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/65">
              All training videos come with live practicals - you learn hands-on with premium cars:
              connecting the scanner, tracing the fault, doing the programming. No rote theory, just
              real floor work.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2.5 lg:mt-0">
            {[
              ["9", "modules"],
              ["100%", "practical"],
              ["Live", "practicals"],
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
        <div className="mx-auto mt-8 w-full max-w-6xl">
          <div className="h-reveal relative aspect-[1024/492] overflow-hidden rounded-2xl border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.4)]">
            <Image
              src="/media/workshop-panels.jpg"
              alt="Foundation Pack overview: ECM repair, BS6 diagnostics, EV and hybrid systems, professional workshop"
              fill
              sizes="(min-width: 1152px) 1100px, 100vw"
              className="object-cover"
            />
          </div>
          <VideoShowcase hidePromo />
        </div>
      </section>

      {/* WHO */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Who this pack is for</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              If you are one of these, join us
            </h2>
          </div>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🔧 Mechanics", "Afraid of the scanner? Build confidence from the foundation."],
              ["🎓 ITI / Diploma students", "Practical skills alongside theory - become job-ready."],
              ["🏠 Garage owners", "Stop turning away BS6 + EV vehicles."],
              ["🚀 Beginners", "Start from zero, step by step."],
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
      <section id="pricing" className="scroll-mt-16 bg-white px-4 pb-10 sm:px-6">
        <div className="mx-auto w-full max-w-2xl">
          <div className="text-center">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Enroll now</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Foundation Pack - only ₹999
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              One-time payment · All training videos included · WhatsApp support
            </p>
          </div>

          <div className="h-reveal mt-5 overflow-hidden rounded-2xl border-2 border-[#131a26] bg-[#fffdf8]">
            <div className="flex items-end justify-center gap-2.5 bg-[#131a26] px-5 py-4">
              <span className="text-[13px] font-semibold text-white/45 line-through">₹{REGULAR_PRICE}</span>
              <span className="font-display text-[40px] font-bold leading-none text-white">₹{PRICE}</span>
              <span className="mb-1 text-[11px] font-semibold text-white/55">one-time</span>
            </div>

            <ul className="grid gap-2 px-5 py-4 text-[13px] font-medium sm:grid-cols-2">
              {INCLUDED.map((t) => (
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
                fallbackHref={waLink(PACK, PRICE)}
                className="btn-brand group block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-extrabold uppercase text-white disabled:cursor-wait disabled:opacity-70"
              >
                Pay ₹999 &amp; get instant access
                <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </PayButton>
              <p className="mt-2 text-center text-[11px] text-[#5b6572]">
                Secure UPI / card payment · Instant access on WhatsApp + email
              </p>
              <p className="mt-1 text-center text-[11px] text-[#5b6572]">
                Change of mind?{" "}
                <Link href="/refund" className="font-bold underline">
                  7-day refund policy
                </Link>
              </p>
            </div>
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

      {/* COMPARE - after the FAQ, kept low-key */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#8a94a0]">The next step</p>
            <h2 className="h-reveal mt-1 text-[22px] font-extrabold tracking-tight sm:text-[26px]">
              ₹999 vs ₹4,999 - what&apos;s the difference?
            </h2>
            <p className="h-reveal mt-1.5 text-[12.5px] text-[#5b6572]">
              All 9 modules are the same in both. Only the depth of EV/Hybrid content differs. Start
              with the Foundation and upgrade later.
            </p>
          </div>
          <div className="mt-4">
            <CompareTable rows={COMPARE} highlight="starter" />
          </div>
          <p className="h-reveal mx-auto mt-3 max-w-2xl rounded-xl border border-[#eadfd2] bg-[#fffdf8] p-3.5 text-center text-[12.5px] font-semibold">
            Want to become an advanced pro?{" "}
            <Link href="/mastery" className="font-extrabold text-[#f45000] underline">
              See the Mastery Pack (L3-10) →
            </Link>
          </p>
        </div>
      </section>

      <CourseFooter pack={PACK} price={PRICE} />
      <StickyCourseBar pack={PACK} price={PRICE} payPack="starter" />
    </main>
  );
}
