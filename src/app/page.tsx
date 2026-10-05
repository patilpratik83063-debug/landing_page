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
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(diff / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  };
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll(".lux-reveal, .iad-reveal")
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        });
      },
      { threshold: 0.1 }
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
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.18-AM.jpeg`, title: "Student Success Story", tag: "Fresher to Technician" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.16-AM.jpeg`, title: "Mechanic Upgrade Story", tag: "IC to EV Shift" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.20-AM.jpeg`, title: "Garage Owner Story", tag: "Business Growth" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.20-AM-1.jpeg`, title: "EV Training Experience", tag: "Hands-On Learning" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.28-AM.jpeg`, title: "Internship / Job Story", tag: "Career Breakthrough" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM-1.jpeg`, title: "Certificate Moment", tag: "Certified Proud" },
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
  { q: "Is this masterclass free?", a: "No. The masterclass seat price is ₹29 (worth ₹999). Founder batch pricing." },
  { q: "Is this for beginners?", a: "Yes. Beginner, ITI / Diploma / Engineering student, mechanic, technician, garage owner or entrepreneur — session simple Hindi / Hinglish mein hoga." },
  { q: "Will I get certified after only this masterclass?", a: "Masterclass gives you the complete 60-day roadmap. Certification requires completing the full practical training program." },
  { q: "Is job, funding or income guaranteed?", a: "No. Outcomes depend on your skill, effort, training completion, market, location, interview performance and execution." },
  { q: "What will I learn in this masterclass?", a: "EV, BS6, Hybrid, diagnostics, ECU/ECM programming, garage setup, career opportunities and the 60-day EV technician roadmap." },
  { q: "How will I receive the joining details?", a: "Payment ke baad Aapko WhatsApp / Email par joining details milenge." },
];

function PremiumCTA({ compact }: { compact?: boolean }) {
  return (
    <div className="mx-auto w-full max-w-[680px] text-center">
      <a
        href={PAYMENT_URL}
        className={`lux-cta group relative block w-full overflow-hidden rounded-2xl font-black uppercase tracking-wide text-white ${
          compact ? "px-5 py-3 text-[13px]" : "px-6 py-4 text-[15px] sm:text-lg"
        }`}
      >
        <span className="relative z-[2] flex items-center justify-center gap-3">
          <span className="rounded-lg bg-black/25 px-2 py-1 text-[11px] line-through opacity-80">₹999</span>
          <span>YES! Book my seat @ Just ₹29 →</span>
        </span>
      </a>
      <p className="mt-2.5 text-[12px] font-black uppercase tracking-wider text-amber-300">
        🔥 Last 7 seats left • 581 watching now
      </p>
      <p className="mt-1 text-[11px] text-slate-400">
        Secure checkout • Instant WhatsApp + Email joining details
      </p>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="lux-eyebrow">{children}</span>;
}

export default function Home() {
  const time = useCountdown();
  const [viewers, setViewers] = useState(581);
  const [proofIdx, setProofIdx] = useState(0);
  const [showProof, setShowProof] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const [progress, setProgress] = useState(0);
  useReveal();

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const v = setInterval(() => setViewers(540 + Math.floor(Math.random() * 90)), 5000);
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
      showT = setTimeout(loop, 4600);
    };
    const start = setTimeout(loop, 2200);
    return () => {
      clearTimeout(start);
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  const proof = PROOFS[proofIdx % PROOFS.length];

  return (
    <main className="min-h-screen bg-[#04060d] pb-[90px] font-sans text-slate-100 antialiased">
      {/* scroll progress */}
      <div className="fixed inset-x-0 top-0 z-[70] h-[3px] bg-white/5">
        <div
          className="h-full bg-gradient-to-r from-amber-200 via-orange-500 to-cyan-400 transition-[width]"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* social proof */}
      <div
        className={`fixed bottom-[96px] left-3 z-[60] flex max-w-[300px] items-center gap-3 rounded-2xl border border-amber-200/20 bg-[#0b1322]/95 p-3 shadow-2xl backdrop-blur transition-transform duration-500 ${
          showProof ? "translate-x-0" : "-translate-x-[340px]"
        }`}
      >
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-amber-200 to-orange-500 text-sm font-black text-slate-950">
          {proof.n.charAt(0)}
        </div>
        <div>
          <p className="text-[11px] font-black text-white">{proof.n}</p>
          <p className="text-[10px] font-bold text-emerald-300">{proof.msg}</p>
          <p className="mt-0.5 text-[9px] text-slate-400">Just now • Verified booking</p>
        </div>
      </div>

      {/* top gold bar */}
      <div className="relative overflow-hidden border-b border-amber-200/20 bg-gradient-to-r from-[#1a1206] via-[#2a1c07] to-[#1a1206] px-4 py-2.5 text-center">
        <p className="text-[11px] font-black uppercase tracking-[1.5px] text-amber-200 sm:text-[13px]">
          ⚡ Live EV Career Masterclass
          <span className="mx-2 rounded-md border border-amber-200/30 bg-amber-300/10 px-2 py-0.5">Founder Batch</span>
          <span className="rounded-md bg-gradient-to-r from-amber-300 to-orange-400 px-2 py-0.5 text-slate-950">Just ₹29</span>
        </p>
      </div>

      {/* nav */}
      <header className="sticky top-0 z-40 border-b border-white/8 bg-[#04060d]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-200 via-orange-500 to-violet-600 text-[13px] font-black text-slate-950 shadow-lg">
              IAD
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-emerald-400 ring-2 ring-[#04060d]" style={{ animation: "iad-blink 1.4s infinite" }} />
            </div>
            <div className="leading-tight">
              <p className="text-[13px] font-black uppercase tracking-wide text-white">Indian Automobile Doctor</p>
              <p className="text-[9px] font-bold uppercase tracking-[2px] text-amber-200/70">EV • BS6 • Hybrid • Diagnostics</p>
            </div>
          </div>
          <a href={PAYMENT_URL} className="lux-cta rounded-xl px-4 py-2.5 text-[12px] font-black uppercase text-white">
            Book @ ₹29
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden px-4 pb-10 pt-10 sm:pt-16">
        <div className="lux-grid-bg absolute inset-0" />
        <div className="absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-violet-600/25 blur-[110px]" style={{ animation: "lux-aurora 10s ease-in-out infinite" }} />
        <div className="absolute -right-24 top-24 h-[380px] w-[380px] rounded-full bg-cyan-500/20 blur-[110px]" style={{ animation: "lux-aurora 12s ease-in-out infinite reverse" }} />
        <div className="absolute left-1/2 top-[420px] h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-orange-600/15 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl text-center">
          <Eyebrow>⚡ Certified EV Technician Masterclass • Live on Zoom</Eyebrow>
          <h1 className="lux-reveal mt-5 text-[30px] font-black leading-[1.08] tracking-tight text-white sm:text-[54px]">
            Learn How To Become A <span className="lux-gold-text">Certified EV Technician</span> In 60 Days
            &amp; Earn Up To <span className="lux-cyber-text">₹50,000/Month</span>
          </h1>
          <p className="lux-reveal mx-auto mt-4 max-w-2xl text-[14px] font-medium leading-relaxed text-slate-300 sm:text-[16px]" style={{ transitionDelay: "80ms" }}>
            Master EV Battery, BMS, Motor Controller, BS6 Diagnostics, Hybrid Technology &amp;
            Scanner-Based Troubleshooting — step-by-step, Hindi/Hinglish mein.
          </p>

          <div className="lux-reveal mt-5 flex flex-wrap items-center justify-center gap-2 text-[11px] font-extrabold" style={{ transitionDelay: "140ms" }}>
            <span className="rounded-full border border-white/12 bg-white/6 px-3.5 py-2 text-slate-200">📅 28th June 2026 • 8:00 PM</span>
            <span className="rounded-full border border-white/12 bg-white/6 px-3.5 py-2 text-slate-200">💻 90 Min Live + Q&amp;A</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-3.5 py-2 text-emerald-200">
              <span className="h-2 w-2 rounded-full bg-emerald-400" style={{ animation: "iad-blink 1s infinite" }} />
              {viewers} watching now
            </span>
          </div>

          {/* video */}
          <div className="lux-reveal mx-auto mt-7 max-w-[760px]" style={{ transitionDelay: "200ms" }}>
            <div className="lux-ring-frame">
              <div
                className="relative aspect-video w-full cursor-pointer overflow-hidden rounded-[18px] bg-slate-950"
                onClick={() => setVideoOn(true)}
              >
                {!videoOn ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                      alt="EV Career Revolution Masterclass"
                      className="absolute inset-0 h-full w-full object-cover opacity-75"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-transparent to-transparent" />
                    <span className="absolute left-4 top-4 rounded-lg border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-black tracking-[1.5px] text-white backdrop-blur">
                      ▶ MASTERCLASS FILM
                    </span>
                    <span className="absolute right-4 top-4 rounded-lg bg-red-600 px-2.5 py-1 text-[10px] font-black text-white" style={{ animation: "iad-blink 1.6s infinite" }}>
                      ● LIVE
                    </span>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                      <span className="lux-cta grid h-[72px] w-[72px] place-items-center rounded-full text-2xl text-white">▶</span>
                      <p className="px-6 text-[13px] font-bold text-white drop-shadow-lg">Click to Watch — EV Career Revolution</p>
                    </div>
                  </>
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
            {/* floating mini badges */}
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] font-bold text-slate-300">
              <span className="rounded-full bg-white/6 px-3 py-1.5 ring-1 ring-white/10" style={{ animation: "lux-float-y 3.5s ease-in-out infinite" }}>🔋 Battery + BMS</span>
              <span className="rounded-full bg-white/6 px-3 py-1.5 ring-1 ring-white/10" style={{ animation: "lux-float-y 4s ease-in-out infinite" }}>🖥️ Scanner Diagnostics</span>
              <span className="hidden rounded-full bg-white/6 px-3 py-1.5 ring-1 ring-white/10 sm:inline" style={{ animation: "lux-float-y 4.5s ease-in-out infinite" }}>🏭 Garage Setup</span>
            </div>
          </div>

          <div className="mt-6"><PremiumCTA /></div>

          <div className="mx-auto mt-5 grid max-w-[680px] grid-cols-3 gap-2 text-center">
            {[
              ["1000+", "Students Trained"],
              ["20+", "Years Experience"],
              ["8 Weeks", "Roadmap"],
            ].map(([n, l]) => (
              <div key={l} className="lux-glass rounded-2xl px-2 py-3">
                <p className="lux-gold-text text-xl font-black sm:text-2xl">{n}</p>
                <p className="mt-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:text-[10px]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* brand marquee */}
      <div className="border-y border-amber-200/15 bg-[#070d1a] py-3.5">
        <div className="overflow-hidden">
          <div className="flex w-max items-center gap-3 pr-3" style={{ animation: "lux-ticker 22s linear infinite" }}>
            {[...["Tata Motors", "Kia / MG Motor", "Mercedes-Benz / Audi", "Hyundai / Toyota", "Mahindra", "Maruti Suzuki"], ...["Tata Motors", "Kia / MG Motor", "Mercedes-Benz / Audi", "Hyundai / Toyota", "Mahindra", "Maruti Suzuki"]].map((b, i) => (
              <span key={i} className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.05] px-5 py-2 text-[12px] font-black text-slate-200">
                <span className="mr-1.5 text-amber-300">◆</span>{b}
              </span>
            ))}
          </div>
        </div>
        <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[2px] text-slate-500">Trusted by students working with leading automotive brands</p>
      </div>

      {/* DETAILS + TIMER */}
      <section className="relative px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>🎟 Your masterclass details</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[36px]">
              One Evening. <span className="lux-gold-text">Lifetime Direction.</span>
            </h2>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { i: "📅", l: "Date", v: "28th June 2026" },
              { i: "💻", l: "Format", v: "Live Zoom Session" },
              { i: "⏱️", l: "Duration", v: "90 Min + Q&A" },
              { i: "🕗", l: "Time", v: "8:00 PM IST" },
            ].map(({ i: icon, l, v }, idx) => (
              <div key={l} className="lux-card lux-reveal rounded-2xl p-4" style={{ transitionDelay: `${idx * 70}ms` }}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-200 to-orange-500 text-lg shadow-lg" style={{ animation: "lux-float-y 4s ease-in-out infinite" }}>{icon}</span>
                <p className="mt-3 text-[10px] font-black uppercase tracking-[1.5px] text-slate-400">{l}</p>
                <p className="mt-0.5 text-[15px] font-black text-white">{v}</p>
              </div>
            ))}
          </div>

          <div className="lux-reveal mx-auto mt-6 max-w-[640px] rounded-3xl border border-amber-200/20 bg-gradient-to-b from-amber-300/[0.08] to-transparent p-5 text-center sm:p-7">
            <p className="text-[11px] font-black uppercase tracking-[2px] text-amber-200">⏳ Batch closes in</p>
            <div className="mt-3 flex justify-center gap-2.5">
              {[
                { n: time.h, l: "Hours" },
                { n: time.m, l: "Minutes" },
                { n: time.s, l: "Seconds" },
              ].map((t) => (
                <div key={t.l} className="min-w-[84px] rounded-2xl border border-white/10 bg-[#04060d] px-3 py-3 shadow-inner">
                  <p className="lux-gold-text text-3xl font-black tabular-nums sm:text-4xl">{t.n}</p>
                  <p className="mt-1 text-[9px] font-bold uppercase tracking-[2px] text-slate-500">{t.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-5"><PremiumCTA compact /></div>
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="border-y border-white/8 bg-[#070d1a] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>📚 Curriculum inside</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[36px]">
              Here&apos;s What <span className="lux-gold-text">You&apos;re Going To Learn</span>
            </h2>
          </div>
          <div className="mt-7 grid gap-3 md:grid-cols-2">
            {[
              ["01", "Certified EV Technician Roadmap", "How can Aap become certified with a clear 60-day step-by-step roadmap?"],
              ["02", "Battery • BMS • Motor", "How EV Battery, BMS and Motor Controller skills build a high-value automobile career."],
              ["03", "BS6 • EV • Hybrid Simplified", "Understand modern vehicles without confusing technical jargon."],
              ["04", "Scanner-Based Diagnostics", "OBD tools + live data reading — become more valuable than a normal mechanic."],
              ["05", "Job • Internship • Garage", "Explore job, internship, freelance diagnosis or EV garage setup opportunities."],
              ["06", "Future-Ready Shift", "Stop wasting time on outdated skills. Move to future-ready auto tech."],
            ].map(([n, t, d], i) => (
              <div key={n} className="lux-card lux-reveal group relative overflow-hidden rounded-2xl p-5" style={{ transitionDelay: `${(i % 2) * 80}ms` }}>
                <span className="lux-gold-text text-[13px] font-black tracking-[2px]">{n}</span>
                <h3 className="mt-1.5 text-[16px] font-black text-white">{t}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-slate-400">{d}</p>
                <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-amber-400/10 blur-2xl transition group-hover:bg-amber-400/25" />
              </div>
            ))}
          </div>
          <div className="mt-7"><PremiumCTA /></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>⭐ Real results</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[36px]">
              Powerful <span className="lux-gold-text">Student Stories</span>
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-[13px] text-slate-400">Mechanics, students &amp; garage owners inside the IAD training ecosystem.</p>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div key={t.img} className="lux-card lux-reveal group overflow-hidden rounded-2xl" style={{ transitionDelay: `${(i % 3) * 80}ms` }}>
                <div className="relative aspect-[9/11] overflow-hidden bg-slate-900">
                  <img src={t.img} alt={t.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#04060d] via-transparent to-transparent" />
                  <span className="absolute left-3 top-3 rounded-full border border-amber-200/30 bg-black/60 px-2.5 py-1 text-[9px] font-black uppercase tracking-wider text-amber-200 backdrop-blur">✓ Verified</span>
                </div>
                <div className="p-3.5">
                  <p className="text-[13px] font-black text-white">{t.title}</p>
                  <p className="mt-0.5 text-[11px] font-bold text-amber-300">★★★★★ • {t.tag}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-7"><PremiumCTA /></div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="border-y border-white/8 bg-gradient-to-b from-[#0a0812] to-[#070d1a] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>⚠️ Honest check</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[34px]">If You Are Facing <span className="text-red-300">Any Of These…</span></h2>
          </div>
          <div className="mt-6 flex flex-col gap-2.5">
            {[
              "Aap BS6, EV aur Hybrid technology adopt karne mein challenge feel kar rahe hain.",
              "Aapko BS6, EV aur Hybrid vehicles diagnose aur program karne mein difficulty hoti hai.",
              "Rapid technology change ki wajah se lagta hai current skill outdated ho rahi hai.",
              "Automobile field mein career growth, better income aur new direction chahiye.",
              "Aap mechanic, technician, student ya garage owner hain aur future-ready banna chahte hain.",
            ].map((t, i) => (
              <div key={i} className="lux-reveal flex items-start gap-3 rounded-2xl border border-red-300/15 bg-red-500/[0.06] p-4 text-[13px] font-semibold text-slate-200 sm:text-[14px]">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-red-400 to-orange-500 text-[13px] font-black text-white">✕</span>
                {t}
              </div>
            ))}
          </div>
          <p className="lux-reveal mx-auto mt-5 max-w-3xl rounded-2xl border border-amber-200/25 bg-amber-300/[0.07] p-5 text-center text-[14px] font-bold text-amber-100">
            If Aapne <span className="text-white">ANY</span> point feel kiya — this ₹29 masterclass is built for Aap.
            Random YouTube videos se career nahi banta. Structured direction se banta hai.
          </p>
          <div className="mt-6"><PremiumCTA /></div>
        </div>
      </section>

      {/* TECH + ROADMAP */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>🔋 Hands-on stack</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[36px]">Automotive <span className="lux-cyber-text">Technologies Covered</span></h2>
          </div>
          <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["🔋", "EV Battery Tech", "Lithium-ion pack assembly, BMS wiring, cell balancing & thermal management.", "from-amber-300 to-orange-500"],
              ["⚙️", "Motor & Controller", "BLDC / hub motor winding, controller programming & fault diagnostics.", "from-cyan-300 to-blue-500"],
              ["🖥️", "EV Diagnostics", "Advanced OBD scanners, CAN-bus analysis & electrical troubleshooting.", "from-violet-300 to-fuchsia-500"],
              ["🔧", "Hands-On Workshop", "Live dismantling & assembly of electric 2W / 3W.", "from-emerald-300 to-teal-500"],
              ["🏭", "EV Garage Setup", "Layout, tools, workflow & compliance basics.", "from-orange-300 to-red-500"],
              ["🤝", "Business Support", "Supplier network, spares & placement pathway.", "from-sky-300 to-indigo-500"],
            ].map(([icon, title, desc, grad], i) => (
              <div key={title as string} className="lux-card lux-reveal rounded-2xl p-5" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br text-lg shadow-lg ${grad as string}`}>{icon}</span>
                <h3 className="mt-3 text-[15px] font-black text-white">{title}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-400">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Eyebrow>🗺 60-day roadmap</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[24px] font-black text-white sm:text-[32px]">8-Week Mastery To <span className="lux-gold-text">EV Expert</span></h2>
          </div>
          <div className="relative mx-auto mt-7 max-w-3xl">
            <span className="absolute bottom-4 left-[19px] top-4 w-[2px] bg-gradient-to-b from-amber-200 via-orange-500 to-cyan-400 sm:left-[21px]" />
            {[
              ["Weeks 1–2", "EV Fundamentals & Electrical Basics", "Circuits, multimeters, motors & high-voltage safety protocols."],
              ["Weeks 3–4", "Battery Technology & BMS", "Lithium-ion deep-dive, spot welding, pack building & BMS programming."],
              ["Weeks 5–6", "Motor Controllers & Diagnostics", "Harness, throttle, hall sensors + OBD fault finding & clearing."],
              ["Weeks 7–8", "Live Projects & Garage Setup", "Full teardown-rebuild, business planning, vendors & certification."],
            ].map(([wk, title, desc], i) => (
              <div key={wk as string} className="lux-reveal relative flex gap-4 pb-5 last:pb-0" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="z-[1] grid h-10 w-10 shrink-0 place-items-center rounded-full border border-amber-200/40 bg-[#0b1322] text-[13px] font-black text-amber-200">{i + 1}</span>
                <div className="lux-card flex-1 rounded-2xl p-4">
                  <p className="text-[10px] font-black uppercase tracking-[2px] text-cyan-300">{wk}</p>
                  <h3 className="mt-0.5 text-[15px] font-black text-white">{title}</h3>
                  <p className="mt-1 text-[13px] text-slate-400">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              ["BS6 Universe", "BS4 vs BS6, advanced programming, troubleshooting & ECM programming.", "🔵"],
              ["Hybrid Universe", "Hybrid principles, EV vs Hybrid, programming & troubleshooting.", "🟣"],
              ["EV Universe", "EV principles, programming, diagnostics & troubleshooting.", "🟢"],
            ].map(([t, d, e]) => (
              <div key={t as string} className="lux-reveal rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center">
                <p className="text-xl">{e}</p>
                <h4 className="mt-1 text-[14px] font-black text-white">{t}</h4>
                <p className="mt-1 text-[12px] text-slate-400">{d}</p>
              </div>
            ))}
          </div>
          <div className="mt-8"><PremiumCTA /></div>
        </div>
      </section>

      {/* TRAINER */}
      <section className="border-y border-amber-200/15 bg-[#070d1a] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>👨‍🏫 Your mentor</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[36px]">Meet Your <span className="lux-gold-text">Trainer</span></h2>
          </div>
          <div className="lux-reveal mx-auto mt-7 max-w-4xl overflow-hidden rounded-3xl border border-amber-200/20 bg-[#0b1322] md:grid md:grid-cols-[0.95fr_1.05fr]">
            <div className="relative max-h-[380px] overflow-hidden md:max-h-none md:min-h-[380px]">
              <img
                src={`${IMG_BASE}/WhatsApp-Image-2026-05-13-at-11.03.18-AM.jpeg`}
                alt="Mr. SK Salman Khurshid — Founder IAD"
                className="h-full w-full object-cover object-top"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b1322] via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-[#0b1322]" />
              <span className="absolute bottom-4 left-4 rounded-full border border-amber-200/30 bg-black/60 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-amber-200 backdrop-blur">★ Founder • IAD</span>
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-[26px] font-black leading-tight text-white">Mr. SK Salman Khurshid</h3>
              <p className="mt-1 text-[13px] font-extrabold text-amber-300">Founder & CEO, Automobile Doctor India Pvt. Ltd.</p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-slate-300">
                20+ years in the automobile market. Mentored 1000+ students, served 76k+ auto community
                through parts + service + skilling. This masterclass distils his BS6 • EV • Hybrid journey
                into one actionable evening.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["1000+ Students", "20+ Years", "76k+ Community", "Govt. Skill Programs"].map((b) => (
                  <span key={b} className="rounded-full border border-white/12 bg-white/6 px-3.5 py-1.5 text-[11px] font-black text-slate-200">{b}</span>
                ))}
              </div>
              <div className="mt-6"><PremiumCTA compact /></div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <Eyebrow>📸 Proof wall</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[36px]">Gallery & <span className="lux-gold-text">Training Proof</span></h2>
          </div>
          <div className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-3">
            {GALLERY.map((g, i) => (
              <div key={g.img} className="lux-card lux-reveal group overflow-hidden rounded-2xl" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
                <div className="relative aspect-video overflow-hidden">
                  <img src={g.img} alt={g.t} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                  <span className="absolute bottom-2.5 left-2.5 rounded-lg bg-black/65 px-2.5 py-1 text-[10px] font-black text-amber-200 backdrop-blur">● LIVE PRACTICAL</span>
                </div>
                <div className="flex items-center justify-between p-3">
                  <p className="text-[12px] font-black text-white">{g.t}</p>
                  <p className="text-[10px] font-bold text-cyan-300">{g.s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS + FAQ */}
      <section className="border-t border-white/8 bg-[#070d1a] px-4 py-12 sm:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <Eyebrow>🎁 Included free</Eyebrow>
            <h2 className="lux-reveal mt-3 text-[26px] font-black text-white sm:text-[34px]">Reserve Before <span className="lux-gold-text">It&apos;s Gone</span></h2>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {[
              ["01", "EV Career Checklist", "Exact skills to become future-ready."],
              ["02", "Garage Setup Direction", "Tools, vendors & service pathway."],
              ["03", "Certification Roadmap", "Beginner → skilled → certified in 60 days."],
            ].map(([k, t, d]) => (
              <div key={k as string} className="lux-card lux-reveal rounded-2xl p-5 text-center">
                <p className="text-[10px] font-black uppercase tracking-[2px] text-cyan-300">Clarity {k}</p>
                <h4 className="mt-1.5 text-[14px] font-black text-white">{t}</h4>
                <p className="mt-1 text-[12px] text-slate-400">{d}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-6 max-w-[560px] rounded-3xl border border-amber-200/20 bg-[#04060d] p-5 text-center">
            <div className="flex justify-center gap-2.5">
              {[
                { n: time.h, l: "Hrs" },
                { n: time.m, l: "Min" },
                { n: time.s, l: "Sec" },
              ].map((t) => (
                <div key={t.l} className="min-w-[80px] rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-2.5">
                  <p className="lux-gold-text text-3xl font-black tabular-nums">{t.n}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[2px] text-slate-500">{t.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4"><PremiumCTA /></div>
          </div>

          <h3 className="mt-10 text-center text-xl font-black text-white">Frequently Asked Questions</h3>
          <div className="mx-auto mt-4 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {FAQS.map((f, i) => (
              <div key={f.q} className="border-b border-white/8 last:border-0">
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[13px] font-extrabold text-white sm:text-[14px]"
                >
                  {f.q}
                  <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border border-amber-200/30 text-lg font-black text-amber-200 transition-transform ${faqOpen === i ? "rotate-45" : ""}`}>+</span>
                </button>
                {faqOpen === i && <p className="px-5 pb-4 text-[12.5px] leading-relaxed text-slate-400">{f.a}</p>}
              </div>
            ))}
          </div>
          <div className="mt-6"><PremiumCTA /></div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 bg-[#02040a] px-4 pb-10 pt-8 text-[12px] leading-relaxed text-slate-500">
        <div className="mx-auto max-w-4xl">
          <p className="text-[14px] font-black text-white">Indian Automobile Doctor (IAD)</p>
          <p className="mt-2">20+ years in automobile market. Advanced skilling for EV, BS6, Hybrid, diagnostics, ECU programming &amp; modern servicing.</p>
          <p className="mt-2">Call: <span className="text-slate-200">9827847466</span> • Email: <span className="text-slate-200">hello@indianautomobiledoctor.com</span><br />Address: 2427 NH5 Hitech Square, near Green Field Hotel, Pandra, Bhubaneswar, Odisha 751010</p>
          <p className="mt-2">Service Support: Odisha, Maharashtra, New Delhi, Agra, Hyderabad, Kolkata and South Africa.</p>
          <p className="mt-4 border-t border-white/8 pt-4 text-[11px]">
            Disclaimer: &quot;Earn up to Rs. 50,000/month&quot; is aspirational. Income, job, placement, certification, funding &amp; business outcomes are not guaranteed.
          </p>
        </div>
      </footer>

      {/* sticky */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-amber-200/25 bg-[#04060d]/95 px-3 py-2.5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-2.5">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 truncate text-[12px] font-black text-white">
              <span className="h-2 w-2 shrink-0 rounded-full bg-red-500" style={{ animation: "iad-blink 1s infinite" }} />
              🔥 7 left — ₹29 <span className="font-bold text-slate-400 line-through">₹999</span>
            </p>
            <p className="lux-gold-text mt-0.5 font-mono text-[12px] font-black tabular-nums">{time.h}h : {time.m}m : {time.s}s</p>
          </div>
          <a href={PAYMENT_URL} className="lux-cta shrink-0 rounded-xl px-5 py-3 text-center text-[13px] font-black uppercase leading-tight text-white">
            Book seat →
          </a>
        </div>
      </div>
    </main>
  );
}
