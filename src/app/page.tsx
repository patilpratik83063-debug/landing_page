"use client";

import { useEffect, useRef, useState } from "react";

const PAYMENT_URL = "https://workshop.indianautomobiledoctor.com/payment";
const IMG_BASE =
  "https://workshop.indianautomobiledoctor.com/wp-content/uploads/2026/05";
const YT_ID = "tXWN5T-bd1k";

/* Evergreen deadline: next 8 PM IST (masterclass runs daily).
   Static June date already passed, so timer was stuck at 00:00:00. */
function getNextDeadline(): number {
  const now = new Date();
  const istOffsetMs = (330 + now.getTimezoneOffset()) * 60000;
  const istNow = now.getTime() + istOffsetMs;
  const d = new Date(istNow);
  d.setHours(20, 0, 0, 0);
  if (d.getTime() <= istNow) d.setDate(d.getDate() + 1);
  return d.getTime() - istOffsetMs;
}

type TimeLeft = { h: string; m: string; s: string };

function useCountdown(): TimeLeft {
  const [deadline] = useState<number>(() => getNextDeadline());
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, deadline - now);
  const pad = (n: number) => String(n).padStart(2, "0");
  return {
    h: pad(Math.floor(diff / 3600000)),
    m: pad(Math.floor((diff % 3600000) / 60000)),
    s: pad(Math.floor((diff % 60000) / 1000)),
  };
}

/* Bulletproof scroll-reveal: elements stay VISIBLE by default.
   Hidden state is applied via JS only to below-fold items,
   so content can never get stuck invisible. */
function useReveal() {
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
            // clear stagger delay after entrance so hovers stay snappy
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
    // safety net: reveal anything missed after 2.5s
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

function useScrolled(threshold = 8) {
  const [s, setS] = useState(false);
  useEffect(() => {
    const onScroll = () => setS(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return s;
}

function CountUp({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !done.current) {
          done.current = true;
          const start = performance.now();
          const dur = 1200;
          const step = (t: number) => {
            const p = Math.min(1, (t - start) / dur);
            setVal(Math.round(to * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return (
    <span ref={ref}>
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

const PROOFS = [
  { n: "Rahul Sharma — Delhi", msg: "Just booked the EV masterclass seat!" },
  { n: "Amit Verma — Mumbai", msg: "Booked for my garage team of 3" },
  { n: "Suresh Kumar — Jaipur", msg: "Joined after watching demo video" },
  { n: "Imran Khan — Hyderabad", msg: "Just grabbed the ₹29 offer" },
  { n: "Vikash Yadav — Lucknow", msg: "ITI student, excited for EV career" },
  { n: "Priya Singh — Kolkata", msg: "Booked evening batch seat" },
];

const TESTIMONIALS = [
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.18-AM.jpeg`, title: "Student Success Story", tag: "Fresher → Technician" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.16-AM.jpeg`, title: "Mechanic Upgrade Story", tag: "IC engine → EV" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.20-AM.jpeg`, title: "Garage Owner Story", tag: "Business growth" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.20-AM-1.jpeg`, title: "EV Training Experience", tag: "Hands-on learning" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.28-AM.jpeg`, title: "Internship / Job Story", tag: "Career breakthrough" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM-1.jpeg`, title: "Certificate Moment", tag: "Certified, proud" },
];

const GALLERY = [
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.21-AM.jpeg`, t: "Workshop training", s: "Practical session" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.24-AM.jpeg`, t: "EV battery & BMS", s: "Live demo" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.26-AM.jpeg`, t: "Scanner diagnostics", s: "Hands-on" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.25-AM-2.jpeg`, t: "Certificate moment", s: "Student achievement" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM.jpeg`, t: "Garage setup", s: "Real workshop" },
  { img: `${IMG_BASE}/WhatsApp-Image-2026-05-13-at-10.36.22-AM-1.jpeg`, t: "Training batch", s: "Live session" },
];

const FAQS = [
  { q: "Is this masterclass free?", a: "No. The seat price is ₹29 (founder batch, worth ₹999)." },
  { q: "Is this for beginners?", a: "Yes. Beginner, ITI / Diploma / Engineering student, mechanic, technician, garage owner or entrepreneur — session simple Hindi / Hinglish mein hoga." },
  { q: "Will I get certified after only this masterclass?", a: "Masterclass gives you the complete 60-day roadmap. Certification needs the full practical training program." },
  { q: "Is job, funding or income guaranteed?", a: "No. Outcomes depend on your skill, effort, training completion, market, location, interview performance and execution." },
  { q: "What will I learn?", a: "EV, BS6, Hybrid, diagnostics, ECU/ECM programming, garage setup, career options and the 60-day roadmap — clear overview in 90 minutes." },
  { q: "How do I get joining details?", a: "Payment ke baad WhatsApp + Email par joining link milta hai." },
];

const BRANDS = ["Tata Motors", "Mahindra", "Maruti Suzuki", "Hyundai", "Kia", "MG Motor", "Toyota", "Mercedes-Benz"];

function BookButton({ small }: { small?: boolean }) {
  return (
    <a
      href={PAYMENT_URL}
      className={`btn-brand group block w-full rounded-xl text-center font-bold uppercase tracking-wide text-white ${
        small ? "px-4 py-3 text-[13px]" : "px-6 py-4 text-[15px] sm:text-base"
      }`}
    >
      <span className="mr-2 font-medium normal-case text-white/70 line-through">₹999</span>
      Yes! Book my seat @ ₹29
      <span className="ml-1 inline-block transition-transform duration-200 group-hover:translate-x-1">→</span>
    </a>
  );
}

export default function Home() {
  const time = useCountdown();
  const [viewers, setViewers] = useState(581);
  const [proofIdx, setProofIdx] = useState(0);
  const [showProof, setShowProof] = useState(false);
  const [videoOn, setVideoOn] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);
  const headerShadow = useScrolled(8);
  useReveal();

  useEffect(() => {
    const v = setInterval(() => setViewers(540 + Math.floor(Math.random() * 90)), 6000);
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
      showT = setTimeout(loop, 4800);
    };
    const start = setTimeout(loop, 2500);
    return () => {
      clearTimeout(start);
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, []);

  const proof = PROOFS[proofIdx % PROOFS.length];

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-white pb-[76px] text-[#131a26]">
      {/* booking toast */}
      <div
        className={`fixed bottom-[84px] left-3 z-[60] flex max-w-[290px] items-center gap-2.5 rounded-xl border border-[#eadfd2] bg-white p-3 shadow-[0_12px_32px_rgba(19,26,38,0.16)] transition-transform duration-500 ${
          showProof ? "translate-x-0" : "-translate-x-[320px]"
        }`}
      >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#131a26] text-[13px] font-bold text-white">
          {proof.n.charAt(0)}
        </span>
        <span>
          <span className="block text-[11px] font-bold">{proof.n}</span>
          <span className="block text-[10.5px] text-[#15803d]">{proof.msg}</span>
          <span className="block text-[9.5px] text-[#5b6572]">Just now · Verified</span>
        </span>
      </div>

      {/* top bar */}
      <div className="bg-[#131a26] px-3 py-2 text-center text-[11.5px] font-semibold text-white sm:text-[13px]">
        Live EV career masterclass — 28th June, 8 PM
        <span className="ml-2 rounded-md bg-[#f45000] px-2 py-0.5 text-[11px] font-bold">Just ₹29</span>
      </div>

      {/* header */}
      <header
        className={`sticky top-0 z-40 border-b border-[#eee5d6] bg-white/95 backdrop-blur transition-shadow duration-300 ${
          headerShadow ? "shadow-[0_6px_24px_rgba(19,26,38,0.10)]" : ""
        }`}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-[#131a26] text-[12px] font-extrabold text-white">
              IAD
            </span>
            <span className="leading-tight">
              <span className="block text-[13px] font-bold">Indian Automobile Doctor</span>
              <span className="block text-[10px] font-medium tracking-wide text-[#5b6572]">
                EV · BS6 · Hybrid · Diagnostics
              </span>
            </span>
          </div>
          <a
            href={PAYMENT_URL}
            className="rounded-lg bg-[#131a26] px-3.5 py-2 text-[12px] font-bold text-white transition hover:-translate-y-px hover:bg-black hover:shadow-lg"
          >
            Book seat
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="bg-[#fff6ec] px-4 pb-10 pt-7 sm:px-6 lg:pb-14 lg:pt-12">
        <div className="mx-auto w-full max-w-6xl lg:grid lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-12">
          <div className="text-center lg:text-left">
            <p className="h-reveal inline-block -rotate-1 rounded-md border-2 border-[#131a26] bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-[1.5px]">
              ● Live on Zoom · Hindi / Hinglish
            </p>
            <h1 className="h-reveal mt-4 text-[26px] font-extrabold leading-[1.15] tracking-tight sm:text-[34px] lg:text-[44px]">
              Become a{" "}
              <span className="relative inline-block text-[#f45000]">
                Certified EV Technician
                <svg viewBox="0 0 220 10" className="absolute -bottom-1 left-0 w-full" preserveAspectRatio="none">
                  <path d="M3 7 Q 60 1 110 5 T 217 4" fill="none" stroke="#f45000" strokeWidth="3.5" strokeLinecap="round" opacity="0.45" />
                </svg>
              </span>{" "}
              in 60 days — earn up to ₹50,000/month
            </h1>
            <p className="h-reveal mx-auto mt-3 max-w-xl text-[13.5px] leading-relaxed text-[#3d4756] sm:text-[15px] lg:mx-0">
              EV battery, BMS, motor controller, BS6 diagnostics, hybrid tech &amp; scanner-based
              troubleshooting — sikhiye step-by-step, zero se.
            </p>
            <div className="h-reveal mt-5 hidden max-w-md lg:block">
              <BookButton />
              <p className="mt-2.5 text-[11.5px] text-[#5b6572]">
                Secure payment · Joining link on WhatsApp + Email right after payment
              </p>
            </div>
          </div>

          <div className="mt-6 lg:mt-0">
            {/* ticket */}
            <div className="h-reveal overflow-hidden rounded-2xl border border-[#eadfd2] bg-white text-left shadow-[0_10px_30px_rgba(19,26,38,0.07)]">
              <div className="flex items-center justify-between gap-3 px-4 py-3.5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#5b6572]">Next masterclass</p>
                  <p className="font-display mt-0.5 text-[22px] font-bold leading-none">28th June · 8:00 PM</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#5b6572]">Duration</p>
                  <p className="mt-0.5 text-[15px] font-bold">90 min + Q&amp;A</p>
                </div>
              </div>
              <div className="ticket-edge mx-4" />
              <div className="flex items-center justify-between px-4 py-3">
                <p className="flex items-center gap-1.5 text-[12px] font-semibold text-[#3d4756]">
                  <span className="h-2 w-2 rounded-full bg-[#16a34a]" style={{ animation: "h-soft-blink 1.6s infinite" }} />
                  <span className="font-bold text-[#131a26]">{viewers}</span> people viewing now
                </p>
                <p className="text-[12px] font-bold text-[#f45000]">Only 7 seats left</p>
              </div>
            </div>

            {/* video */}
            <div className="h-reveal group mt-3">
              <div
                className="relative aspect-video cursor-pointer overflow-hidden rounded-2xl border border-[#131a26]/10 bg-[#0e1626] shadow-[0_18px_44px_rgba(19,26,38,0.18)]"
                onClick={() => setVideoOn(true)}
              >
                {!videoOn ? (
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${YT_ID}/maxresdefault.jpg`}
                      alt="EV Career Revolution Masterclass"
                      className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
                      <span className="grid h-16 w-16 place-items-center rounded-full bg-[#e11d2e] pl-1 text-[22px] text-white shadow-xl transition duration-300 group-hover:scale-110">
                        ▶
                      </span>
                      <p className="px-6 text-[12.5px] font-semibold text-white">
                        Watch: how EV technicians actually get work
                      </p>
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

            <div className="h-reveal mt-4 lg:hidden">
              <BookButton />
              <p className="mt-2.5 text-center text-[11.5px] text-[#5b6572]">
                Secure payment · Joining link on WhatsApp + Email right after payment
              </p>
            </div>

            {/* stats */}
            <dl className="h-reveal mt-5 grid grid-cols-3 divide-x divide-[#eadfd2] rounded-2xl border border-[#eadfd2] bg-white/60 py-4">
              {[
                { v: <CountUp to={1000} suffix="+" />, l: "students trained" },
                { v: <CountUp to={20} suffix="+" />, l: "yrs in auto market" },
                { v: <span>8 weeks</span>, l: "technician roadmap" },
              ].map((s) => (
                <div key={s.l} className="px-2 text-center">
                  <dt className="sr-only">{s.l}</dt>
                  <dd className="font-display text-[24px] font-bold leading-none sm:text-[28px]">{s.v}</dd>
                  <dd className="mt-1 text-[10.5px] font-medium text-[#5b6572]">{s.l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* brand strip */}
      <div className="overflow-hidden border-b border-[#eee5d6] bg-white py-3.5">
        <div className="h-marquee flex w-max items-center gap-2.5 pr-2.5">
          {[...BRANDS, ...BRANDS].map((b, i) => (
            <span
              key={i}
              className="whitespace-nowrap rounded-full border border-[#eadfd2] bg-[#fffdf8] px-4 py-1.5 text-[11.5px] font-bold text-[#3d4756]"
            >
              {b}
            </span>
          ))}
        </div>
        <p className="mt-2 text-center text-[10px] font-semibold uppercase tracking-[1.5px] text-[#8a94a0]">
          Students working across leading automotive brands
        </p>
      </div>

      {/* DETAILS */}
      <section className="bg-[#0e1626] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-white/50">The details</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
              One evening. Clear direction.
            </h2>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
            {[
              ["Date", "28th June 2026"],
              ["Format", "Live Zoom call"],
              ["Duration", "90 min + Q&A"],
              ["Language", "Hindi / Hinglish"],
            ].map(([l, v], i) => (
              <div
                key={l}
                className="h-reveal rounded-xl border border-white/10 bg-white/[0.05] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-white/50">{l}</p>
                <p className="mt-1 text-[14.5px] font-bold text-white">{v}</p>
              </div>
            ))}
          </div>
          <div className="h-reveal mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center sm:p-6">
            <p className="text-[11px] font-bold uppercase tracking-[2px] text-white/50">Registration closes in</p>
            <p className="mt-2 font-mono text-[32px] font-bold tabular-nums tracking-tight text-white sm:text-[38px]">
              <span key={`h-${time.h}`} className="h-tick inline-block">{time.h}</span>
              <span className="text-white/30">:</span>
              <span key={`m-${time.m}`} className="h-tick inline-block">{time.m}</span>
              <span className="text-white/30">:</span>
              <span key={`s-${time.s}`} className="h-tick inline-block">{time.s}</span>
            </p>
            <div className="mx-auto mt-4 max-w-md">
              <BookButton small />
            </div>
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Inside the 90 minutes</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              What you&apos;ll actually learn
            </h2>
          </div>
          <ol className="mt-5 grid gap-x-10 md:grid-cols-2">
            {[
              ["The 60-day roadmap", "Certified EV technician banne ka exact step-by-step plan — kya, kab, kaise."],
              ["Battery, BMS, motor", "Ye 3 skills aapko normal mechanic se 10x valuable banati hain. Kaise seekhein, live samjhiye."],
              ["BS6 · EV · Hybrid, simplified", "Confusing jargon nahi — kaam ki भाषा mein samajh, taaki customer ko confident jawab de sako."],
              ["Scanner + OBD diagnostics", "Live data reading, fault codes, aur woh mistakes jo 90% beginners karte hain."],
              ["Job, internship, apna garage", "Naukri, freelance diagnosis ya EV garage — teeno raste, aur pehla kadam kya ho."],
              ["Outdated hone se bachna", "Kaunsi skills chhodni hain, kaunsi pakadni hain — 2026 ke hisaab se seedhi baat."],
            ].map(([t, d], i) => (
              <li
                key={t}
                className="h-reveal group flex gap-4 border-t border-[#f0e7d8] py-4 transition-colors duration-200 last:border-b hover:bg-[#fffdf8] md:last:border-b"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <span className="font-display text-[20px] font-bold text-[#f45000]/70 transition-colors group-hover:text-[#f45000]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>
                  <span className="block text-[14.5px] font-bold">{t}</span>
                  <span className="mt-0.5 block text-[13px] leading-relaxed text-[#3d4756]">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <div className="h-reveal mt-6 max-w-md">
            <BookButton small />
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Student stories</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Log kya keh rahe hain
            </h2>
            <p className="h-reveal mt-1.5 text-[13px] text-[#5b6572]">
              Students, mechanics aur garage owners — IAD training ecosystem se.
            </p>
          </div>
          <div className="mt-5 grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.img}
                className="h-reveal card-lift overflow-hidden rounded-xl border border-[#eadfd2] bg-white"
                style={{ transitionDelay: `${(i % 3) * 80}ms` }}
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#e9e2d4] min-[420px]:aspect-[4/5]">
                  <img
                    src={t.img}
                    alt={t.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                  />
                </div>
                <figcaption className="p-3">
                  <p className="text-[12.5px] font-bold leading-snug">{t.title}</p>
                  <p className="mt-0.5 text-[10.5px] font-medium text-[#5b6572]">{t.tag}</p>
                  <p className="mt-1 text-[10px] tracking-wide text-[#d97706]">★★★★★</p>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="h-reveal mt-6 max-w-md">
            <BookButton small />
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Sach bolo…</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">
              Ye 5 me se koi 1 bhi lagta hai?
            </h2>
          </div>
          <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
            {[
              "BS6 / EV / Hybrid dekh ke lagta hai — “ye to mere bas ka nahi”?",
              "Diagnose karne me dikkat hoti hai, scanner haath me leke dar lagta hai?",
              "Lagta hai technology itni fast badal rahi, meri skill purani pad rahi hai?",
              "Mehnat poori, par income aur growth wahi atki hui hai?",
              "Mechanic, student ya garage owner ho — par future ka clear plan nahi hai?",
            ].map((t, i) => (
              <li
                key={t}
                className="h-reveal flex items-start gap-3 rounded-xl border border-[#eadfd2] bg-[#fffdf8] p-3.5 text-[13.5px] font-medium leading-relaxed transition duration-200 hover:border-[#15803d]/40 hover:shadow-[0_10px_24px_rgba(19,26,38,0.08)]"
                style={{ transitionDelay: `${(i % 2) * 80}ms` }}
              >
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#15803d] text-[12px] font-bold text-white">✓</span>
                {t}
              </li>
            ))}
          </ul>
          <p className="h-reveal mt-4 max-w-2xl rounded-xl bg-[#fff6ec] p-4 text-center text-[13.5px] font-semibold md:text-left">
            Agar ek bhi point “haan, ye to mai hu” laga — to ye ₹29 wali evening aapke liye hi hai.
          </p>
          <div className="h-reveal mt-5 max-w-md">
            <BookButton small />
          </div>
        </div>
      </section>

      {/* TECH + ROADMAP */}
      <section className="bg-[#0e1626] px-4 py-10 text-white sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-white/50">Hands-on stack</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight text-white sm:text-[30px]">
              Kaunsi technologies cover hongi
            </h2>
          </div>
          <div className="mt-5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["Battery + BMS", "Pack assembly, wiring, cell balancing, thermal basics."],
              ["Motor + controller", "BLDC / hub motor, winding, programming, fault tracing."],
              ["Diagnostics", "OBD scanners, CAN-bus, live data, troubleshooting."],
              ["Workshop practice", "Electric 2W / 3W kholna-jodna, real floor work."],
              ["Garage setup", "Layout, tools, workflow, compliance — business lens se."],
              ["Supplier + career", "Spare network, placement direction, next steps."],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="h-reveal rounded-xl border border-white/10 bg-white/[0.05] p-4 transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.08]"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <p className="text-[14px] font-bold text-white">{t}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-white/60">{d}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 max-w-3xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-white/50">60-day roadmap</p>
            <h3 className="h-reveal mt-1 text-[20px] font-extrabold text-white sm:text-[24px]">8 hafte, 4 steps</h3>
            <ol className="mt-5">
              {[
                ["1–2", "Basics pakke karo", "Circuit, multimeter, motor, high-voltage safety."],
                ["3–4", "Battery master karo", "Lithium-ion, spot welding, pack + BMS programming."],
                ["5–6", "Diagnostics seekho", "Wiring, sensors, OBD se fault pakadna + clear karna."],
                ["7–8", "Real kaam + setup", "Poori gaadi teardown, garage planning, certification."],
              ].map(([w, t, d], i) => (
                <li
                  key={w}
                  className="h-reveal group relative flex gap-4 pb-5 last:pb-0"
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  {i < 3 && <span className="absolute left-[15px] top-9 h-[calc(100%-28px)] w-px bg-white/15" />}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#f45000] text-[12px] font-extrabold transition-transform duration-300 group-hover:scale-110">
                    {i + 1}
                  </span>
                  <div className="rounded-xl pt-0.5 transition-colors duration-200 group-hover:bg-white/[0.03] sm:px-3 sm:py-2 sm:pt-0.5">
                    <p className="text-[10.5px] font-bold uppercase tracking-[1.5px] text-white/50">Week {w}</p>
                    <p className="text-[14.5px] font-bold text-white">{t}</p>
                    <p className="mt-0.5 text-[12.5px] text-white/60">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 max-w-md">
            <BookButton small />
          </div>
        </div>
      </section>

      {/* TRAINER */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Your mentor</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">Sikha kaun raha hai?</h2>
          </div>
          <div className="h-reveal card-lift mx-auto mt-5 max-w-3xl overflow-hidden rounded-2xl border border-[#eadfd2] sm:grid sm:grid-cols-[240px_1fr]">
            <div className="aspect-[4/3] overflow-hidden bg-[#e9e2d4] sm:aspect-auto sm:min-h-[280px]">
              <img
                src={`${IMG_BASE}/WhatsApp-Image-2026-05-13-at-11.03.18-AM.jpeg`}
                alt="Mr. SK Salman Khurshid — Founder IAD"
                className="h-full w-full object-cover object-top transition duration-500 hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <div className="p-5 sm:p-6">
              <p className="text-[18px] font-extrabold leading-tight">Mr. SK Salman Khurshid</p>
              <p className="mt-0.5 text-[12px] font-semibold text-[#f45000]">Founder & CEO, Automobile Doctor India Pvt. Ltd.</p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#3d4756]">
                20+ saal auto market me. 1000+ students train kiye, 76,000+ auto community serve ki.
                BS6 · EV · Hybrid ka poora tajurba — ek shaam me, seedhi भाषा me.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["1000+ students", "20+ yrs", "76k+ community"].map((b) => (
                  <span key={b} className="rounded-full border border-[#eadfd2] px-2.5 py-1 text-[10.5px] font-bold text-[#3d4756]">{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="bg-[#fff6ec] px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-2xl">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Proof wall</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">Workshop ki jhalak</h2>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {GALLERY.map((g, i) => (
              <figure
                key={g.img}
                className="h-reveal group"
                style={{ transitionDelay: `${(i % 3) * 70}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[#eadfd2] bg-[#e9e2d4]">
                  <img
                    src={g.img}
                    alt={g.t}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <figcaption className="mt-1.5 text-[11.5px] font-bold">{g.t}</figcaption>
                <figcaption className="-mt-0.5 text-[10.5px] text-[#5b6572]">{g.s}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BONUS + FAQ */}
      <section className="bg-white px-4 py-10 sm:px-6 lg:py-14">
        <div className="mx-auto w-full max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="h-reveal text-[11px] font-bold uppercase tracking-[2px] text-[#f45000]">Free ke saath</p>
            <h2 className="h-reveal mt-1 text-[24px] font-extrabold tracking-tight sm:text-[30px]">Seat ke saath ye 3 bhi</h2>
          </div>
          <div className="mx-auto mt-4 grid max-w-4xl gap-2.5 sm:grid-cols-3">
            {[
              ["EV career checklist", "Future-ready banne ke exact skills."],
              ["Garage setup guide", "Tools, vendors, service ka rasta."],
              ["Certification roadmap", "Beginner → certified, 60 din."],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="h-reveal rounded-xl border border-[#eadfd2] bg-[#fffdf8] p-4 transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(19,26,38,0.10)]"
                style={{ transitionDelay: `${i * 70}ms` }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#5b6572]">Bonus {i + 1}</p>
                <p className="mt-1 text-[13.5px] font-bold">{t}</p>
                <p className="mt-0.5 text-[12px] text-[#5b6572]">{d}</p>
              </div>
            ))}
          </div>
          <div className="h-reveal mx-auto mt-6 max-w-md text-center">
            <p className="font-mono text-[28px] font-bold tabular-nums">
              <span key={`bh-${time.h}`} className="h-tick inline-block">{time.h}</span>:
              <span key={`bm-${time.m}`} className="h-tick inline-block">{time.m}</span>:
              <span key={`bs-${time.s}`} className="h-tick inline-block">{time.s}</span>
            </p>
            <p className="mb-3 text-[11px] font-semibold text-[#5b6572]">ke baad founder-batch pricing band</p>
            <BookButton small />
          </div>

          <div className="mx-auto mt-10 max-w-2xl">
            <h3 className="h-reveal text-[18px] font-extrabold sm:text-[20px]">Aksar puche jaane wale sawaal</h3>
            <div className="mt-3 overflow-hidden rounded-xl border border-[#f0e7d8]">
              {FAQS.map((f, i) => {
                const open = faqOpen === i;
                return (
                  <div key={f.q} className="border-b border-[#f0e7d8] last:border-0">
                    <button
                      onClick={() => setFaqOpen(open ? null : i)}
                      aria-expanded={open}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left text-[13.5px] font-bold transition-colors hover:bg-[#fffdf8]"
                    >
                      {f.q}
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border text-[16px] font-bold leading-none transition-all duration-300 ${
                          open
                            ? "rotate-45 border-[#f45000] bg-[#f45000] text-white"
                            : "border-[#eadfd2] text-[#f45000]"
                        }`}
                      >
                        +
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-out ${
                        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-4 pb-4 text-[12.5px] leading-relaxed text-[#3d4756]">{f.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="h-reveal mx-auto mt-5 max-w-md">
              <BookButton small />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#0e1626] px-4 pb-8 pt-8 text-[12px] leading-relaxed text-white/55 sm:px-6">
        <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-[13px] font-bold text-white">Indian Automobile Doctor (IAD)</p>
            <p className="mt-2 max-w-md">20+ saal se auto market me. EV, BS6, Hybrid, diagnostics aur ECU programming ki practical training.</p>
            <p className="mt-2">Call: <span className="text-white/85">9827847466</span> · Email: <span className="text-white/85">hello@indianautomobiledoctor.com</span></p>
          <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12px] font-bold">
            <a href="/starter" className="text-white/85 underline hover:text-white">Foundation Pack @ ₹999 →</a>
            <a href="/mastery" className="text-white/85 underline hover:text-white">Mastery Pack @ ₹4,999 →</a>
          </p>
            <p className="mt-1">2427 NH5 Hitech Square, Pandra, Bhubaneswar, Odisha 751010</p>
          </div>
          <div className="md:text-right">
            <a
              href={PAYMENT_URL}
              className="inline-block rounded-lg bg-[#f45000] px-5 py-2.5 text-[12.5px] font-extrabold uppercase text-white transition hover:-translate-y-px hover:bg-[#ff5a0a]"
            >
              Book seat @ ₹29 →
            </a>
            <p className="mt-2 text-[11px]">Live · 28th June · 8 PM · Hindi</p>
          </div>
        </div>
        <div className="mx-auto w-full max-w-6xl">
          <p className="mt-4 border-t border-white/10 pt-3 text-[10.5px]">
            Note: “₹50,000/month tak” ek aspirational udaharan hai. Job, income ya placement guaranteed nahi — mehnat, skill aur market par depend karta hai.
          </p>
        </div>
      </footer>

      {/* sticky */}
      <div
        className="fixed inset-x-0 bottom-0 z-50 border-t border-[#eadfd2] bg-white/97 px-3 backdrop-blur"
        style={{ paddingTop: "10px", paddingBottom: "calc(10px + env(safe-area-inset-bottom))" }}
      >
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3">
          <div>
            <p className="text-[13px] font-extrabold">₹29 <span className="text-[11px] font-medium text-[#5b6572] line-through">₹999</span></p>
            <p className="font-mono text-[11px] font-bold tabular-nums text-[#f45000]">{time.h}h : {time.m}m : {time.s}s left</p>
          </div>
          <a href={PAYMENT_URL} className="btn-brand rounded-xl px-6 py-3 text-[13.5px] font-extrabold uppercase sm:px-8">
            Book seat →
          </a>
        </div>
      </div>
    </main>
  );
}
