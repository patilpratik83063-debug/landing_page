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
} from "@/components/course-blocks";

const PACK = "Foundation Pack";
const PRICE = "999";
const REGULAR_PRICE = "4,999";
/** Change this one value when the access period is confirmed. */
const ACCESS_PERIOD = "12 months";

const MODULES: CourseModule[] = [
  {
    title: "Advanced ECM Repairing",
    desc: "ECU/ECM kholna, track testing, component-level fault pakadna aur repair - soldering se testing tak, practical ke saath.",
  },
  {
    title: "BS6 Diagnostic & Programming",
    desc: "BS6 sensors, ECM programming, fault codes aur troubleshooting - modern gaadiyon ka core skill.",
  },
  {
    title: "EV + Hybrid Diagnostic & Programming",
    tag: "Level 1-2",
    desc: "EV/Hybrid ki shuruaat: battery safety, basic systems, entry-level diagnostics aur programming - foundation yahin banta hai.",
  },
  {
    title: "ABS Diagnostic & Programming",
    desc: "Wheel-speed sensors, modulator testing, bleeding procedure aur module programming step-by-step.",
  },
  {
    title: "EPS Diagnostic & Programming",
    desc: "Steering angle calibration, torque sensor checking, motor reset - EPS light ka permanent fix.",
  },
  {
    title: "SRS (Airbag) Diagnostic & Programming",
    desc: "Crash-data reset, module programming aur airbag warning light ka sahi solution.",
  },
  {
    title: "BCM Diagnostic & Programming",
    desc: "Body control module coding - key, lighting, power-window jaise functions ka setup aur fault fix.",
  },
  {
    title: "Cluster Meter Diagnostic & Programming",
    desc: "Meter calibration, dial/backlight setting aur warning configuration - cluster ka A to Z.",
  },
  {
    title: "Engine Repair Training",
    desc: "Engine overhaul basics: timing, compression testing aur common faults ka practical repair.",
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
    q: "Ye ₹999 pack kis ke liye hai?",
    a: "Beginners, ITI/Diploma students, mechanics aur garage owners ke liye jo ECM, BS6, EV Level 1-2 aur baaki major modules ka strong foundation banana chahte hain. Zero se shuru kar sakte ho.",
  },
  {
    q: "Training videos kaise milengi?",
    a: "Payment ke turant baad access link WhatsApp aur email par milta hai. Saari training videos simple Hindi/Hinglish me hain - premium cars par shoot ki hui live practical ke saath.",
  },
  {
    q: "Access kitne din ke liye valid hai?",
    a: `Foundation Pack ka access ${ACCESS_PERIOD} ke liye milta hai. Apne schedule ke hisaab se apni speed se dekh sakte ho.`,
  },
  {
    q: "Kya refund milega?",
    a: "Haan, payment ke 7 din ke andar - agar course ka bada hissa (20% se zyada) nahi dekha hai. Poori policy Refund Policy page par hai.",
  },
  {
    q: "Level 1-2 aur Level 3-10 me kya farak hai?",
    a: "Level 1-2 me EV/Hybrid ke basics, safety aur entry-level diagnostics seekhte ho. Level 3-10 (₹4,999 Mastery Pack) me advanced systems, deep programming aur pro-level diagnostics cover hota hai.",
  },
  {
    q: "Kya job ya income guaranteed hai?",
    a: "Nahi. Ye ek skill training hai. Job, placement ya income aapki practice, skill, market aur consistency par depend karta hai - koi guarantee nahi di jaati.",
  },
  {
    q: "Enroll kaise karun?",
    a: "Upar diye Pay ₹999 button se secure payment karo. Access turant milta hai. Koi doubt ho to WhatsApp par message kar sakte ho.",
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
              Foundation Pack · Hindi / Hinglish
            </p>
            <h1 className="h-reveal mt-4 text-[27px] font-extrabold leading-[1.14] tracking-tight sm:text-[34px] lg:text-[42px]">
              Scanner se gaadi ka{" "}
              <span className="relative inline-block text-[#f45000]">
                fault khud pakdo
                <svg viewBox="0 0 220 10" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                  <path d="M3 7 Q 60 1 110 5 T 217 4" fill="none" stroke="#f45000" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
                </svg>
              </span>{" "}
              - customer ko wapas mat bhejo
            </h1>
            <p className="h-reveal mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#3d4756] sm:text-[15px] lg:mx-0">
              Advanced ECM repairing, BS6 programming, EV/Hybrid Level 1-2, ABS, EPS, SRS, BCM,
              cluster meter + engine repair - 9 modules, Hindi me, premium cars par live practical.
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
              <HeroVideo title="20 second preview - andar kya milta hai" />
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
              7-day refund policy · access turant
            </p>
          </div>
        </div>
      </section>

      {/* PROOF - right under the hero */}
      <section id="reviews" className="scroll-mt-16 bg-white px-4 py-9 sm:px-6 lg:py-12">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Proof, promise nahi</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Sikha kaun raha hai, aur students kya keh rahe hain
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] leading-relaxed text-[#5b6572]">
              Asli classroom, asli workshop aur students ke apne WhatsApp messages - koi banaya hua
              review nahi.
            </p>
          </div>

          <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_1.1fr] lg:items-start">
            <TrainerProof />
            <div className="rounded-2xl border border-[#eadfd2] bg-[#fffdf8] p-4">
              <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#f45000]">Student messages</p>
              <p className="mt-1 text-[13px] font-bold leading-snug">
                Placement, scanner practice aur doubt support - seedha students se.
              </p>
              <ul className="mt-2.5 space-y-1.5 text-[12px] leading-relaxed text-[#3d4756]">
                {[
                  "Skoda, Pune me placement - 2024 diploma batch",
                  "Scanner diagnosis se workshop owner ka customer trust",
                  "ECU coding, immobilizer aur key programming practice",
                  "References aur interview calls after training",
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
                Screenshots dekho →
              </a>
            </div>
          </div>

          <div id="reviews-wall" className="mt-5 scroll-mt-16">
            <ReviewWall shots={REVIEW_SHOTS.slice(0, 6)} />
          </div>

          <div className="mt-6">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Workshop ki jhalak</p>
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
              Is pack me kya-kya seekhoge
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              Har module practical demo ke saath - dekhna + khud karna, dono.
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
              Premium cars par live practical
            </h2>
            <p className="h-reveal mt-2 max-w-xl text-[13.5px] leading-relaxed text-white/65">
              Saari training videos live practical ke saath di jaati hain - premium cars par haath
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
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Ye pack kiske liye</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Agar inme se ho, to join karo
            </h2>
          </div>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["🔧 Mechanics", "Scanner se dar lagta hai? Foundation se confidence lao."],
              ["🎓 ITI / Diploma students", "Theory ke saath practical skill - job-ready bano."],
              ["🏠 Garage owners", "BS6 + EV gaadiyan wapas nahi bhejni padengi."],
              ["🚀 Beginners", "Zero se start - Hindi me, step-by-step."],
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
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Enroll karo</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Foundation Pack - sirf ₹999
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              One-time payment · Saari training videos included · WhatsApp support
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
                className="btn-brand group block w-full rounded-xl px-4 py-3.5 text-center text-[14px] font-extrabold uppercase text-white disabled:cursor-wait disabled:opacity-70"
              >
                Pay ₹999 &amp; get instant access
                <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
              </PayButton>
              <p className="mt-2 text-center text-[11px] text-[#5b6572]">
                Secure UPI / card payment · Access turant WhatsApp + email par
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
          <h3 className="h-reveal text-[18px] font-extrabold sm:text-[20px]">Aksar puche jaane wale sawaal</h3>
          <CourseFaq faqs={FAQS} open={faqOpen} setOpen={setFaqOpen} />
        </div>
      </section>

      {/* COMPARE - after the FAQ, kept low-key */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-12">
        <div className="mx-auto w-full max-w-4xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#8a94a0]">Aage ka rasta</p>
            <h2 className="h-reveal mt-1 text-[22px] font-extrabold tracking-tight sm:text-[26px]">
              ₹999 vs ₹4,999 - farak kya hai?
            </h2>
            <p className="h-reveal mt-1.5 text-[12.5px] text-[#5b6572]">
              Dono me saare 9 modules same hain. Sirf EV/Hybrid ki depth alag hai. Foundation se
              shuru karo - baad me upgrade kar sakte ho.
            </p>
          </div>
          <div className="mt-4">
            <CompareTable rows={COMPARE} highlight="starter" />
          </div>
          <p className="h-reveal mx-auto mt-3 max-w-2xl rounded-xl border border-[#eadfd2] bg-[#fffdf8] p-3.5 text-center text-[12.5px] font-semibold">
            Advanced pro banna hai?{" "}
            <Link href="/mastery" className="font-extrabold text-[#f45000] underline">
              Mastery Pack (L3-10) dekho →
            </Link>
          </p>
        </div>
      </section>

      <CourseFooter pack={PACK} price={PRICE} />
      <StickyCourseBar pack={PACK} price={PRICE} payPack="starter" />
    </main>
  );
}
