"use client";

import { useEffect, useState } from "react";

const PAYMENT_URL = "https://workshop.indianautomobiledoctor.com/payment";
const IMG_BASE =
  "https://workshop.indianautomobiledoctor.com/wp-content/uploads/2026/05";
const YT_ID = "tXWN5T-bd1k";
const TARGET_DATE = new Date("2026-06-28T20:00:00+05:30").getTime();

type TimeLeft = { h: string; m: string; s: string };

function useCountdown(): TimeLeft {
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, TARGET_DATE - now);
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  return { h: pad(h), m: pad(m), s: pad(s) };
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".iad-reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const PROOFS = [
  { n: "Rahul Sharma — Delhi", msg: "Just booked the EV masterclass seat! 🎉" },
  { n: "Amit Verma — Mumbai", msg: "Booked for my garage team of 3! ⚡" },
  { n: "Suresh Kumar — Jaipur", msg: "Joined after watching demo video 🔧" },
  { n: "Imran Khan — Hyderabad", msg: "Just grabbed the ₹29 offer! 🎯" },
  { n: "Vikash Yadav — Lucknow", msg: "ITI student, excited for EV career! 🚀" },
  { n: "Priya Singh — Kolkata", msg: "Booked evening batch seat ✅" },
];

const TESTIMONIALS = [
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.18-AM.jpeg`, title: "Student Success Story" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.16-AM.jpeg`, title: "Mechanic Upgrade Story" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.20-AM.jpeg`, title: "Garage Owner Story" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.20-AM-1.jpeg`, title: "EV Training Experience" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.28-AM.jpeg`, title: "Internship / Job Story" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM-1.jpeg`, title: "Certificate Moment" },
];

const GALLERY = [
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.21-AM.jpeg`, t: "Workshop Training", s: "Practical Session" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.24-AM.jpeg`, t: "EV Battery & BMS", s: "Live Demo" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.26-AM.jpeg`, t: "Scanner Diagnostics", s: "Hands-On" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.25-AM-2.jpeg`, t: "Certificate Moment", s: "Student Achievement" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM.jpeg`, t: "Garage Setup", s: "Real Workshop" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM-1.jpeg`, t: "Training Batch", s: "Live Session" },
];

const FAQS = [
  { q: "Is this masterclass free?", a: "No. The masterclass seat price is ₹29." },
  { q: "Is this for beginners?", a: "Yes. Aap beginner, ITI student, diploma student, engineering student, mechanic, technician, garage owner or entrepreneur ho sakte hain. Session simple Hindi / Hinglish mein hoga." },
  { q: "Will I get certified after only this masterclass?", a: "Masterclass Aapko complete roadmap batayega. Certification ke liye full practical training program complete karna hota hai." },
  { q: "Is job, funding or income guaranteed?", a: "No. Job, placement, funding and income guaranteed nahi hain. Outcomes Aapke skills, effort, training completion, market conditions, location, interview performance and execution par depend karte hain." },
  { q: "What will I learn in this masterclass?", a: "Aap EV, BS6, Hybrid, diagnostics, ECU/ECM programming, garage setup, career opportunities and 60-day EV technician roadmap ka clear overview seekhenge." },
  { q: "How will I receive the joining details?", a: "Payment ke baad Aapko WhatsApp / Email par joining details milenge." },
];

function CTAButton({ dark }: { dark?: boolean }) {
  return (
    <div className="mx-auto mt-4 max-w-[680px] text-center">
      <a
        href={PAYMENT_URL}
        className="iad-cta block w-full rounded-xl px-6 py-4 text-center text-[15px] font-black uppercase tracking-wide text-white sm:text-lg"
      >
        YES! Book my seat @ Just ₹29 →
      </a>
      <p className="mt-2 text-[12px] font-black uppercase text-orange-600 sm:text-[13px]">
        🔥 Last 7 seats left! Join now...
      </p>
      <p className={`mt-1 text-[11px] italic ${dark ? "text-slate-400" : "text-slate-500"}`}>
        After payment, Aapko WhatsApp / Email par joining details milenge.
      </p>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="iad-reveal mx-auto mb-5 max-w-3xl text-center text-[22px] font-black leading-snug sm:text-[28px]">
      {children}
    </h2>
  );
}

export default function Home() {
  const time = useCountdown();
  const [viewers, setViewers] = useState(581);
  const [proofIdx, setProofIdx] = useState(0);
  const [showProof, setShowProof] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useReveal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const v = setInterval(
      () => setViewers(540 + Math.floor(Math.random() * 90)),
      5000
    );
    return () => clearInterval(v);
  }, []);

  useEffect(() => {
    let showT: ReturnType<typeof setTimeout>;
    let hideT: ReturnType<typeof setTimeout>;
    let i = 0;
    const loop = () => {
      setProofIdx(i % PROOFS.length);
      setShowProof(true);
      hideT = setTimeout(() => setShowProof(false), 3200);
      i += 1;
      showT = setTimeout(loop, 4500);
    };
    const start = setTimeout(loop, 2000);
    return () => {
      clearTimeout(start);
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  const proof = PROOFS[proofIdx % PROOFS.length];

  return (
    <main className="min-h-screen bg-white pb-[86px] font-sans text-slate-900">
      {/* Social proof popup */}
      <div
        className={`fixed bottom-[92px] left-3 z-[60] flex max-w-[290px] items-center gap-3 rounded-xl border border-slate-200 border-l-4 border-l-green-500 bg-white p-3 shadow-2xl transition-transform duration-500 ${
          showProof ? "translate-x-0" : "-translate-x-[340px]"
        }`}
      >
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-sm font-black">
          {proof.n.charAt(0)}
        </div>
        <div>
          <p className="text-[11px] font-black">{proof.n}</p>
          <p className="text-[10px] font-bold text-green-600">{proof.msg}</p>
          <p className="mt-0.5 text-[9px] text-slate-500">Just now • Verified</p>
        </div>
      </div>

      {/* Scroll alert bar */}
      <div
        className={`fixed inset-x-0 top-0 z-50 bg-red-500 px-4 py-2.5 text-center text-[12px] font-extrabold text-white transition-transform duration-300 ${
          scrolled ? "translate-y-0" : "-translate-y-[110%]"
        }`}
      >
        ⚠️ Wait! Your EV Masterclass seat is still available at just ₹29 — Book now →
      </div>

      {/* Top shimmer bar */}
      <div className="iad-shimmer-bar px-4 py-2.5 text-center text-[11px] font-extrabold uppercase tracking-wider text-white sm:text-sm">
        ⚡ Live EV Career Masterclass
        <span className="ml-2 rounded-md bg-black/25 px-2 py-0.5">Limited Seats</span>
        <span className="ml-2 rounded-md bg-black/25 px-2 py-0.5">Just ₹29</span>
      </div>

      {/* Proof strip */}
      <div className="iad-dark-bg border-b border-white/10">
        <div className="mx-auto grid max-w-3xl grid-cols-3 divide-x divide-white/10 px-2 py-3 text-center">
          {[
            { n: "1000+", l: "Students Trained" },
            { n: "20+", l: "Years Market Experience" },
            { n: "8 Weeks", l: "EV Technician Roadmap" },
          ].map((p) => (
            <div key={p.l} className="px-2">
              <p className="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-lg font-black text-transparent sm:text-2xl">
                {p.n}
              </p>
              <p className="mt-0.5 text-[9px] font-bold text-slate-400 sm:text-[11px]">{p.l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HERO */}
      <section className="iad-hero-bg relative overflow-hidden px-4 py-8 text-center sm:py-12">
        <div
          className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
          style={{ animation: "iad-blob 8s ease-in-out infinite" }}
        />
        <div
          className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
          style={{ animation: "iad-blob 9s ease-in-out infinite reverse" }}
        />
        <div className="relative mx-auto w-full max-w-[720px]">
          <div className="mb-4 inline-flex items-center gap-3 rounded-2xl bg-slate-950 px-4 py-2.5 text-left text-white shadow-xl">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-300 text-sm font-black text-slate-950">
              IAD
            </div>
            <div className="leading-tight">
              <strong className="block text-[13px] uppercase tracking-wide">Indian Automobile Doctor</strong>
              <span className="block text-[9px] uppercase tracking-[1.5px] text-slate-400">
                EV • BS6 • Hybrid • Diagnostics
              </span>
            </div>
          </div>

          <h1 className="iad-reveal text-[24px] font-black leading-[1.2] sm:text-[40px]">
            ⚡ Learn How To Become A{" "}
            <span className="iad-gradient-text">Certified EV Technician</span> In The Next{" "}
            <span className="underline decoration-orange-500 decoration-2 underline-offset-4">60 Days</span>{" "}
            And Earn Up To <span className="iad-gradient-text">Rs. 50,000 Per Month</span>.
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-[13px] font-bold text-slate-700 sm:text-[15px]">
            Master EV Battery, BMS, Motor Controller, BS6 Diagnostics, Hybrid Technology &amp;
            Scanner-Based Troubleshooting.
          </p>

          <p className="mt-4 text-[15px] font-black sm:text-lg">
            ✅ NEXT MASTERCLASS 👇<br />
            <span className="underline decoration-orange-500 decoration-2 underline-offset-4">
              28th June 2026, @ 8:00 PM
            </span>
          </p>

          <div className="mt-3 inline-flex items-center gap-2 rounded-full border-[1.5px] border-orange-200 bg-orange-50 px-4 py-2 text-[12px] font-extrabold text-orange-900">
            <span className="h-2 w-2 rounded-full bg-red-500" style={{ animation: "iad-blink 1s infinite" }} />
            {viewers} People Viewing This Page Right Now
          </div>

          {/* Video */}
          <div className="mx-auto mt-4 max-w-[680px]">
            <div
              className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-slate-950 shadow-2xl"
              onClick={() => setVideoOn(true)}
            >
              {!videoOn ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <img
                    src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                    alt="EV Career Revolution Masterclass"
                    className="absolute inset-0 h-full w-full object-cover opacity-70"
                  />
                  <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2 py-1 text-[9px] font-extrabold tracking-widest text-white">
                    MASTERCLASS VIDEO
                  </span>
                  <span
                    className="relative grid h-[68px] w-[68px] place-items-center rounded-full bg-red-600 text-2xl text-white"
                    style={{ animation: "iad-pulse-ring 2s infinite" }}
                  >
                    ▶
                  </span>
                  <p className="relative px-4 text-[12px] font-bold text-white drop-shadow">
                    Click to Watch — EV Career Revolution Masterclass
                  </p>
                </div>
              ) : (
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={`https://www.youtube.com/embed/${YT_ID}?autoplay=1&rel=0`}
                  title="EV Career Masterclass"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          <CTAButton />
        </div>
      </section>

      {/* DETAILS */}
      <section className="iad-dark-bg px-4 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle>
            Your <span className="text-amber-300">Masterclass</span> Details
          </SectionTitle>
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { i: "📅", l: "Date", v: "28th June 2026" },
              { i: "💻", l: "Live", v: "Zoom Session" },
              { i: "⏱️", l: "Duration", v: "90 Minutes + Q&A" },
              { i: "🕐", l: "Time", v: "8:00 PM" },
            ].map((c) => (
              <div
                key={c.l}
                className="iad-card-hover iad-reveal flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-3 backdrop-blur"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-base">
                  {c.i}
                </span>
                <span>
                  <span className="block text-[9px] font-extrabold uppercase tracking-widest text-slate-400">
                    {c.l}
                  </span>
                  <span className="block text-[13px] font-black sm:text-sm">{c.v}</span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {[
              { n: time.h, l: "Hours" },
              { n: time.m, l: "Minutes" },
              { n: time.s, l: "Seconds" },
            ].map((t) => (
              <div key={t.l} className="min-w-[76px] rounded-lg border border-white/10 bg-slate-950 px-3 py-2 text-center">
                <p className="text-2xl font-black tabular-nums sm:text-3xl">{t.n}</p>
                <p className="mt-0.5 text-[8px] uppercase tracking-widest text-slate-400">{t.l}</p>
              </div>
            ))}
          </div>
          <CTAButton dark />
        </div>
      </section>

      {/* LEARN */}
      <section className="bg-slate-950 px-4 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle>
            ✅ And Here&apos;s What <span className="text-amber-300">&quot;You&apos;re Going To Learn&quot;</span>
          </SectionTitle>
          <div className="flex flex-col gap-2.5">
            {[
              "How can Aap become a Certified EV Technician with a clear 60-day roadmap?",
              "How EV Battery, BMS and Motor Controller skills can help Aap build a high-value automobile career.",
              "How to understand BS6, EV & Hybrid vehicles without getting confused by technical jargon.",
              "How Scanner-Based Diagnostics, OBD tools and live data reading can make Aap more valuable than a normal mechanic.",
              "How Aap can explore job, internship, freelance diagnosis or EV garage setup opportunities.",
              "How to avoid wasting time on outdated skills and move toward future-ready automobile technology.",
            ].map((t, i) => (
              <div
                key={i}
                className="iad-card-hover iad-reveal rounded-r-xl rounded-l-md border border-white/10 border-l-4 border-l-orange-500 bg-white/[0.06] p-3.5 text-[13px] font-semibold leading-relaxed text-slate-200 sm:text-[15px]"
              >
                <span className="mr-2 inline-grid h-6 w-6 place-items-center rounded-md bg-gradient-to-br from-cyan-400 to-violet-500 text-[11px] font-black text-slate-950">
                  {i + 1}
                </span>
                {t}
              </div>
            ))}
          </div>
          <CTAButton dark />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-gradient-to-b from-white to-orange-50 px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-[760px]">
          <SectionTitle>
            Some Powerful <span className="iad-gradient-text">Student Testimonials</span>
          </SectionTitle>
          <p className="mx-auto -mt-2 mb-5 max-w-xl text-center text-[13px] text-slate-600">
            Real experiences from students, mechanics and garage owners who have been part of the IAD
            training ecosystem.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.img}
                className="iad-card-hover iad-reveal overflow-hidden rounded-xl border border-slate-200 bg-white shadow-md"
              >
                <div className="aspect-[9/12] bg-slate-950">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-black">{t.title}</p>
                  <p className="mt-0.5 text-[10px] font-extrabold text-orange-600">⭐ Real Experience</p>
                </div>
              </div>
            ))}
          </div>
          <CTAButton />
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="bg-orange-50 px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle>If You Are Facing Any Of These Problems...</SectionTitle>
          <div className="flex flex-col gap-2.5">
            {[
              "Aap BS6, EV aur Hybrid technology adopt karne mein challenge feel kar rahe hain.",
              "Aapko BS6, EV aur Hybrid vehicles diagnose aur program karne mein difficulty hoti hai.",
              "Rapid technology change ki wajah se Aapko lagta hai ki Aapki current skill outdated ho rahi hai.",
              "Aapko automobile field mein career growth, better income aur new direction chahiye.",
              "Aap mechanic, technician, student ya garage owner hain aur future-ready banna chahte hain.",
            ].map((t, i) => (
              <div
                key={i}
                className="iad-card-hover iad-reveal flex items-start gap-3 rounded-xl border-[1.5px] border-slate-200 bg-white p-3.5 text-[13px] font-bold text-slate-700 sm:text-[15px]"
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md bg-green-600 text-[13px] font-black text-white">
                  ✓
                </span>
                {t}
              </div>
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-[720px] rounded-xl border-[1.5px] border-orange-200 bg-white p-4 text-center text-[14px] font-bold">
            If Aapne inme se <strong>ANY</strong> point feel kiya hai, then this ₹29 masterclass is built
            for Aap. Random YouTube videos se career nahi banta. Structured skill direction se banta hai.
          </p>
          <CTAButton />
        </div>
      </section>

      {/* BACK + BRANDS */}
      <section className="iad-dark-bg px-4 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle>
            Here We&apos;ve <span className="text-amber-300">Got Your Back</span>
          </SectionTitle>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              ["🔧", "Become an all-rounder in Mechanical + Electrical + Electronics + Software systems."],
              ["🚀", "Unlock new career opportunities with practical modules for real-world servicing."],
              ["🔍", "Transition smoothly to modern scanner-based diagnostics and programming."],
              ["⚡", "Master latest EV, BS6 & Hybrid tech with hands-on direction, not just theory."],
            ].map(([icon, txt]) => (
              <div key={txt} className="iad-card-hover iad-reveal rounded-xl border border-white/10 bg-white/[0.06] p-4 text-[13px] font-semibold text-slate-200">
                <span className="text-xl" style={{ display: "inline-block", animation: "iad-float 3s ease-in-out infinite" }}>{icon}</span>
                <p className="mt-2">{txt}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-8 text-center text-lg font-black">
            Trusted By Students Working With <span className="text-amber-300">Leading Brands</span>
          </h3>
          <div className="mt-4 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] py-3">
            <div className="flex w-max gap-3 px-3" style={{ animation: "iad-marquee 18s linear infinite" }}>
              {[...["Tata Motors", "Kia / MG Motor", "Mercedes-Benz / Audi", "Hyundai / Toyota", "Mahindra", "Maruti Suzuki"], ...["Tata Motors", "Kia / MG Motor", "Mercedes-Benz / Audi", "Hyundai / Toyota", "Mahindra", "Maruti Suzuki"]].map((b, i) => (
                <span key={i} className="rounded-full border border-white/10 bg-slate-950 px-4 py-2 text-[12px] font-black whitespace-nowrap">
                  🚗 {b}
                </span>
              ))}
            </div>
          </div>
          <CTAButton dark />
        </div>
      </section>

      {/* TECHNOLOGIES */}
      <section className="bg-white px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-[760px]">
          <SectionTitle>Automotive <span className="iad-gradient-text">Technologies Covered</span></SectionTitle>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              ["🔋", "EV Battery Technology", "Lithium-ion pack assembly, BMS wiring, cell balancing and thermal management."],
              ["⚙️", "Motor & Controller", "BLDC motor, hub motor winding, controller programming and fault diagnostics."],
              ["🖥️", "EV Diagnostics", "Advanced OBD scanners, CAN bus analysis and electrical troubleshooting."],
              ["🔧", "Hands-On Workshop", "Live dismantling and assembly of electric 2-wheelers and 3-wheelers."],
              ["🏭", "EV Garage Setup", "Layout planning, tool procurement, workflow and business compliance basics."],
              ["🤝", "Business Support", "Supplier network, spare parts understanding and placement pathway guidance."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="iad-card-hover iad-reveal rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-orange-50/60 p-4 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-slate-950 text-lg">{icon}</span>
                <h3 className="mt-2 text-[15px] font-black">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
          <CTAButton />
        </div>
      </section>

      {/* ROADMAP */}
      <section className="iad-dark-bg px-4 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-[760px]">
          <SectionTitle>8-Week Mastery Roadmap To Become An <span className="text-amber-300">EV Expert</span></SectionTitle>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {[
              ["Weeks 1-2", "EV Fundamentals & Electrical Basics", "Understand circuits, multimeters, motors and safety protocols for high-voltage systems."],
              ["Weeks 3-4", "Battery Technology & BMS", "Deep dive into lithium-ion, spot welding, pack building and BMS programming."],
              ["Weeks 5-6", "Motor Controllers & Diagnostics", "Wiring harness, throttle, hall sensors and OBD fault finding."],
              ["Weeks 7-8", "Live Projects & Garage Setup", "Vehicle teardown, business planning, vendor sourcing and certification."],
            ].map(([wk, title, desc]) => (
              <div key={wk} className="iad-card-hover iad-reveal rounded-xl border border-white/10 bg-slate-950 p-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-orange-400">{wk}</p>
                <h3 className="mt-1 text-[17px] font-black">{title}</h3>
                <p className="mt-1.5 text-[13px] text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-2.5 sm:grid-cols-3">
            {[
              ["BS6 Universe", "BS4 vs BS6, advanced programming, troubleshooting and ECM programming."],
              ["Hybrid Universe", "Hybrid working principle, EV vs Hybrid, programming and troubleshooting."],
              ["EV Universe", "EV working principle, programming, diagnostics and troubleshooting."],
            ].map(([t, d]) => (
              <div key={t} className="iad-reveal rounded-xl border border-amber-300/20 bg-gradient-to-b from-amber-400/10 to-transparent p-4">
                <h4 className="text-[14px] font-black text-amber-300">{t}</h4>
                <p className="mt-1 text-[12px] text-slate-300">{d}</p>
              </div>
            ))}
          </div>
          <CTAButton dark />
        </div>
      </section>

      {/* TRAINER */}
      <section className="bg-gradient-to-b from-slate-950 to-slate-900 px-4 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle>Meet Your <span className="text-amber-300">Trainer</span></SectionTitle>
          <div className="iad-reveal overflow-hidden rounded-2xl border border-white/10 bg-slate-950 sm:grid sm:grid-cols-[0.9fr_1.1fr]">
            <div className="max-h-[360px] overflow-hidden bg-slate-900 sm:max-h-none sm:min-h-[300px]">
              <img
                src={`${IMG_BASE}/WhatsApp-Image-2026-05-13-at-11.03.18-AM.jpeg`}
                alt="Mr. SK Salman Khurshid — Founder IAD"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
            </div>
            <div className="p-5">
              <h3 className="text-2xl font-black">Mr. SK Salman Khurshid</h3>
              <p className="mt-1 text-[13px] font-extrabold text-orange-400">
                Founder & CEO, Automobile Doctor India Pvt. Ltd.
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-slate-300">
                With genuine passion for mentoring, Salman sir has inspired students and professionals,
                guiding them toward success in BS6, EV and Hybrid sectors. 20+ years market experience,
                1000+ students trained, 76k+ automobile community served.
              </p>
              <div className="mt-4 flex gap-2">
                {["1000+ Students", "20+ Years", "76k+ Community"].map((b) => (
                  <span key={b} className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black">
                    {b}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-white px-4 py-8 sm:py-12">
        <div className="mx-auto max-w-[760px]">
          <SectionTitle>Our Gallery & <span className="iad-gradient-text">Training Proof</span></SectionTitle>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {GALLERY.map((g) => (
              <div key={g.img} className="iad-card-hover iad-reveal overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                <div className="aspect-video bg-slate-950">
                  <img src={g.img} alt={g.t} loading="lazy" className="h-full w-full object-cover" />
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-black">{g.t}</p>
                  <p className="text-[10px] font-bold text-orange-600">{g.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS + FAQ */}
      <section className="bg-slate-950 px-4 py-8 text-white sm:py-12">
        <div className="mx-auto max-w-[720px]">
          <SectionTitle>Reserve Your Seat <span className="text-amber-300">Before It&apos;s Too Late</span></SectionTitle>
          <div className="grid gap-2.5 sm:grid-cols-3">
            {[
              ["Clarity 01", "EV Career Checklist", "What skills Aap need to become future-ready."],
              ["Clarity 02", "EV Garage Setup Direction", "Tools, vendor and service pathway direction."],
              ["Clarity 03", "Training & Certification Roadmap", "60-day roadmap from beginner to certified."],
            ].map(([k, t, d]) => (
              <div key={k} className="iad-reveal rounded-xl border border-white/10 bg-white/[0.06] p-4 text-center">
                <p className="text-[10px] font-black uppercase tracking-widest text-cyan-300">{k}</p>
                <h4 className="mt-1 text-[14px] font-black">{t}</h4>
                <p className="mt-1 text-[12px] text-slate-400">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {[
              { n: time.h, l: "Hours" },
              { n: time.m, l: "Minutes" },
              { n: time.s, l: "Seconds" },
            ].map((t) => (
              <div key={t.l} className="min-w-[76px] rounded-lg border border-white/10 bg-slate-900 px-3 py-2 text-center">
                <p className="text-2xl font-black tabular-nums">{t.n}</p>
                <p className="text-[8px] uppercase tracking-widest text-slate-400">{t.l}</p>
              </div>
            ))}
          </div>
          <CTAButton dark />

          <h3 className="mt-10 text-center text-xl font-black">Frequently Asked Questions</h3>
          <div className="mx-auto mt-4 max-w-[720px] divide-y divide-white/10 rounded-xl border border-white/10 bg-white/[0.04]">
            {FAQS.map((f, i) => (
              <div key={f.q}>
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-4 py-3.5 text-left text-[13px] font-extrabold sm:text-[15px]"
                >
                  {f.q}
                  <span className={`text-xl font-black text-orange-500 transition-transform ${faqOpen === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {faqOpen === i && (
                  <p className="px-4 pb-4 text-[12px] leading-relaxed text-slate-400 sm:text-[14px]">{f.a}</p>
                )}
              </div>
            ))}
          </div>
          <CTAButton dark />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#050b14] px-4 pb-8 pt-8 text-[12px] leading-relaxed text-slate-400">
        <div className="mx-auto max-w-[720px]">
          <p className="text-[14px] font-black text-white">Indian Automobile Doctor (IAD)</p>
          <p className="mt-2">
            We work in the automobile market for over 20 years and focus on advanced automobile skill
            development for EV, BS6, Hybrid, diagnostics, ECU programming and modern vehicle servicing.
          </p>
          <p className="mt-2">
            <b className="text-white">Call:</b> 9827847466<br />
            <b className="text-white">Email:</b> hello@indianautomobiledoctor.com<br />
            <b className="text-white">Address:</b> 2427 NH5 Hitech Square, near Green Field Hotel, Pandra,
            Bhubaneswar, Odisha 751010
          </p>
          <p className="mt-2">
            <b className="text-white">Service Support:</b> Odisha, Maharashtra, New Delhi, Agra, Hyderabad,
            Kolkata and South Africa.
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-[11px]">
            Disclaimer: &quot;Earn up to Rs. 50,000 per month&quot; is aspirational and requires verified
            proof and legal review. Income, job, placement, certification, funding and business outcomes are
            not guaranteed and depend on individual skill, effort, market, location and execution.
          </p>
          <p className="mt-2 text-center text-[11px] text-slate-500">
            Cloned + enhanced for improved design • Original content © Indian Automobile Doctor
          </p>
        </div>
      </footer>

      {/* Sticky bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center justify-between gap-2 border-t-2 border-orange-500 bg-slate-950/95 px-3 py-2.5 backdrop-blur">
        <div className="min-w-0">
          <p className="flex items-center gap-1.5 truncate text-[12px] font-black text-white">
            <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" style={{ animation: "iad-blink 1s infinite" }} />
            🔥 7 Seats Left — Just ₹29
          </p>
          <p className="mt-1 flex gap-1 font-mono text-[11px] font-black text-amber-300 tabular-nums">
            <span>{time.h}h</span>:<span>{time.m}m</span>:<span>{time.s}s</span>
          </p>
        </div>
        <a
          href={PAYMENT_URL}
          className="iad-cta shrink-0 rounded-lg px-4 py-2.5 text-center text-[12px] font-black uppercase leading-tight text-white"
        >
          YES! Book<br />Seat @ ₹29 →
        </a>
      </div>
    </main>
  );
}
