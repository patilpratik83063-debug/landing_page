"use client";

import Image from "next/image";
import { Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function PlayDisc({ size = "lg" }: { size?: "lg" | "sm" }) {
  return (
    <span
      className={`grid place-items-center rounded-full bg-[#f45000] text-white shadow-[0_10px_30px_rgba(244,80,0,0.45)] ring-4 ring-white/20 transition duration-300 group-hover:scale-110 ${
        size === "lg" ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12"
      }`}
    >
      <Play className={size === "lg" ? "ml-1 h-7 w-7 sm:h-8 sm:w-8" : "ml-0.5 h-5 w-5"} fill="currentColor" strokeWidth={0} />
    </span>
  );
}

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

/**
 * Autoplaying muted preview reel for the top of the page.
 *
 * Speed-first rules:
 * - the poster is the LCP image; the clip is only attached after mount
 * - a smaller mobile encode is picked at runtime
 * - no download at all on save-data / 2G, or when the user prefers reduced motion
 * - the centre play button is the fallback when autoplay is blocked
 */
export function HeroReel({
  src = "/videos/hero-reel.mp4",
  mobileSrc = "/videos/hero-reel-sm.mp4",
  poster = "/media/poster-main.jpg",
  title = "EV Career Revolution masterclass - 20 second preview",
}: {
  src?: string;
  mobileSrc?: string;
  poster?: string;
  title?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [failed, setFailed] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const conn = (navigator as Navigator & { connection?: NetworkInfo }).connection;
    if (conn?.saveData || conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return;

    const pick = () => {
      const small = window.matchMedia("(max-width: 640px)").matches;
      setVideoSrc(small ? mobileSrc : src);
    };
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(pick, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(pick, 800);
    return () => window.clearTimeout(t);
  }, [reduced, mobileSrc, src]);

  function playNow() {
    const v = videoRef.current;
    if (v?.src) {
      void v.play().then(() => setPlaying(true)).catch(() => setFailed(true));
      return;
    }
    const small = window.matchMedia("(max-width: 640px)").matches;
    setVideoSrc(small ? mobileSrc : src);
  }

  function retry() {
    setFailed(false);
    setVideoSrc(src);
  }

  return (
    <div
      className="group relative aspect-video overflow-hidden rounded-2xl border border-[#131a26]/10 bg-[#0e1626] shadow-[0_18px_44px_rgba(19,26,38,0.18)]"
      aria-label={title}
    >
      <Image
        src={poster}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 45vw, 100vw"
        className="object-cover opacity-90"
      />

      {videoSrc && !failed && (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted={muted}
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => (videoSrc === src ? setFailed(true) : retry())}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            playing ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

      {!playing && (
        <button
          type="button"
          onClick={playNow}
          aria-label={`Play preview: ${title}`}
          className="absolute inset-0 grid h-full w-full place-items-center"
        >
          <span className="flex flex-col items-center gap-2.5">
            <PlayDisc />
            <span className="px-6 text-center text-[12px] font-semibold text-white drop-shadow sm:text-[13px]">
              {failed ? "Preview unavailable - tap to retry" : "Tap to play the 20 sec preview"}
            </span>
          </span>
        </button>
      )}

      {playing && (
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          aria-label={muted ? "Unmute preview" : "Mute preview"}
          className="absolute bottom-2.5 right-2.5 z-10 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
        >
          {muted ? <VolumeX className="h-4 w-4" strokeWidth={2.25} /> : <Volume2 className="h-4 w-4" strokeWidth={2.25} />}
        </button>
      )}

      <span className="pointer-events-none absolute bottom-2.5 left-3 z-10 rounded-md bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white">
        Live practical preview · 0:20
      </span>
    </div>
  );
}

/** Local MP4 with a poster facade. The file is only requested after the click. */
export function LocalVideo({
  src,
  poster,
  title,
  className = "",
}: {
  src: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <div className={`group relative aspect-video overflow-hidden rounded-2xl bg-[#0a1120] ${className}`}>
      {on ? (
        <video
          className="absolute inset-0 h-full w-full bg-black object-contain"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOn(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 grid h-full w-full place-items-center"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(min-width: 1024px) 60vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-[#0a1120]/75 via-[#0a1120]/10 to-transparent" />
          <span className="relative flex flex-col items-center gap-3">
            <PlayDisc />
            <span className="px-4 text-center text-[13px] font-semibold text-white drop-shadow">{title}</span>
          </span>
        </button>
      )}
    </div>
  );
}

type Clip = { src: string; poster: string; title: string; caption: string };

const MAIN_CLIP: Clip = {
  src: "/videos/training-main.mp4",
  poster: "/media/poster-main.jpg",
  title: "Watch live EV diagnostics on a premium car",
  caption: "Full practical walkthrough, about 3 minutes",
};

const SIDE_CLIPS: Clip[] = [
  {
    src: "/videos/training-funnel.mp4",
    poster: "/images/classroom-lecture.jpg",
    title: "EV systems and scanner basics",
    caption: "Quick overview, about 1 minute",
  },
  {
    src: "/videos/foundation-promo.mp4",
    poster: "/images/practical-demo-class.jpg",
    title: "Foundation Pack course preview",
    caption: "20-second preview of the practical training",
  },
];

/** Featured practical video + two shorter clips. All files are self-hosted. */
export function VideoShowcase({ hidePromo = false }: { hidePromo?: boolean }) {
  const side = hidePromo ? SIDE_CLIPS.filter((c) => c.src.includes("funnel")) : SIDE_CLIPS;
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-6">
      <div className="h-reveal">
        <LocalVideo
          {...MAIN_CLIP}
          className="border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        />
        <p className="mt-2 text-[12px] text-white/60">{MAIN_CLIP.caption}</p>
      </div>
      <div className="grid gap-5">
        {side.map((c, i) => (
          <div key={c.src} className="h-reveal" style={{ transitionDelay: `${(i + 1) * 90}ms` }}>
            <LocalVideo {...c} className="border border-white/10" />
            <p className="mt-2 text-[12px] text-white/60">{c.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export type ReviewShot = {
  name: string;
  role: string;
  note: string;
};

/** Written feedback shared by students (translated from their messages). */
export const REVIEW_SHOTS: ReviewShot[] = [
  {
    name: "Rohan Sahu",
    role: "Placed at Skoda, Pune",
    note: "The practical training and diagnostics workshop made the difference in my interview. The placement support was genuine.",
  },
  {
    name: "Rohit",
    role: "IAD student",
    note: "I joined knowing only the basics. The step-by-step diagnosis practice gave me real confidence for interviews.",
  },
  {
    name: "Ritesh",
    role: "Workshop owner",
    note: "Scanner-based diagnosis changed how my customers see my workshop. They trust the process now.",
  },
  {
    name: "Vikash",
    role: "Service Technician, Cuttack",
    note: "They arranged a reference call and guided me through joining. The support continued well after the course.",
  },
  {
    name: "Imran",
    role: "Final year student",
    note: "ECU coding, immobilizer and key programming were taught on real vehicles, not just on paper.",
  },
  {
    name: "Aditya",
    role: "Self employed",
    note: "I set up a mobile scanning service after the course. The practical sessions covered everything I needed.",
  },
  {
    name: "Kaif",
    role: "Ongoing batch",
    note: "Wiring diagrams, sensor testing and faculty support - whenever I got stuck, someone explained it again.",
  },
  {
    name: "Prajwal",
    role: "ITI student",
    note: "Real engine and sensor practice instead of theory. That is exactly what I was missing.",
  },
  {
    name: "Aman",
    role: "IAD student",
    note: "Scanner, live diagnostics and wiring practice every session. The workshop feels like a real garage.",
  },
];

export type ProofPhoto = { src: string; alt: string; cap: string };

/** Real workshop, classroom and award photos. */
export const PROOF_PHOTOS: ProofPhoto[] = [
  { src: "/images/classroom-lecture.jpg", alt: "IAD trainers teaching a full classroom of students", cap: "Classroom session" },
  { src: "/images/workshop-floor-batch.jpg", alt: "Students working on vehicles during a workshop session", cap: "Workshop floor, live practice" },
  { src: "/images/practical-demo-class.jpg", alt: "Trainer demonstrating a diagnostic procedure to students", cap: "Practical demo" },
  { src: "/images/certificate-handover.jpg", alt: "Student receiving a certificate from the IAD team", cap: "Certificate handover" },
  { src: "/images/batch-skill-india.jpg", alt: "IAD training batch group photo at the Skill India centre", cap: "Training batch" },
  { src: "/images/inside-cover-stage.jpg", alt: "IAD receiving an award on stage at an Inside Cover event", cap: "Inside Cover award" },
  { src: "/images/odisha-skills-certificates.jpg", alt: "IAD students with certificates at Odisha Skills 2025-26", cap: "Odisha Skills 2025-26" },
  { src: "/images/certificate-distribution.jpg", alt: "IAD students receiving certificates at a training ceremony", cap: "Certificate day" },
  { src: "/images/ev-scooter-workshop.jpg", alt: "Trainer with an electric scooter at the IAD workshop", cap: "EV workshop" },
  { src: "/images/leadership-award-stage.jpg", alt: "IAD founder receiving the State Business Leadership award", cap: "Leadership award" },
];

/** Short 20-second preview clip. Poster first, file only on click. */
export function HeroVideo({
  src = "/videos/foundation-promo.mp4",
  poster = "/media/poster-main.jpg",
  title = "Foundation Pack - 20 second preview",
}: {
  src?: string;
  poster?: string;
  title?: string;
}) {
  const [on, setOn] = useState(false);
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-[#131a26]/10 bg-[#0e1626] shadow-[0_18px_44px_rgba(19,26,38,0.18)]">
      {on ? (
        <video
          className="absolute inset-0 h-full w-full bg-black object-contain"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
        />
      ) : (
        <button
          type="button"
          onClick={() => setOn(true)}
          aria-label={`Play video: ${title}`}
          className="absolute inset-0 grid h-full w-full place-items-center"
        >
          <Image
            src={poster}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="object-cover opacity-85 transition duration-500 group-hover:scale-[1.02] group-hover:opacity-95"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <span className="relative flex flex-col items-center gap-2.5">
            <PlayDisc />
            <span className="px-5 text-center text-[12px] font-semibold text-white drop-shadow sm:text-[13px]">
              {title}
            </span>
          </span>
          <span className="absolute bottom-2.5 right-3 rounded-md bg-black/60 px-2 py-0.5 text-[10.5px] font-bold text-white">
            0:20
          </span>
        </button>
      )}
    </div>
  );
}

/** Trainer credibility card, meant to sit directly under the hero. */
export function TrainerProof() {
  return (
    <div className="h-reveal overflow-hidden rounded-2xl border border-[#eadfd2] bg-white shadow-[0_12px_32px_rgba(19,26,38,0.08)] sm:grid sm:grid-cols-[190px_1fr]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#e9e2d4] sm:aspect-auto sm:min-h-[210px]">
        <Image
          src="/images/trainer-portrait.jpg"
          alt="Mr. SK Salman Khurshid, Founder of Indian Automobile Doctor, in the workshop"
          fill
          sizes="(min-width: 640px) 190px, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#f45000]">Your trainer</p>
        <p className="mt-1 text-[17px] font-extrabold leading-tight">Mr. SK Salman Khurshid</p>
        <p className="mt-0.5 text-[11.5px] font-semibold text-[#5b6572]">
          Founder &amp; CEO, Automobile Doctor India Pvt. Ltd.
        </p>
        <p className="mt-2 text-[12.5px] leading-relaxed text-[#3d4756]">
          20+ years in the auto market. 1000+ students trained, 76,000+ auto community. ECM, BS6, EV
          and hybrid diagnostics - taught by working on the floor, not just theory.
        </p>
        <dl className="mt-3 grid grid-cols-3 divide-x divide-[#eadfd2] rounded-xl border border-[#eadfd2] bg-[#fffdf8] py-2">
          {[
            ["20+", "years"],
            ["1000+", "students"],
            ["9", "modules"],
          ].map(([v, l]) => (
            <div key={l} className="px-1 text-center">
              <dd className="font-display text-[20px] font-bold leading-none">{v}</dd>
              <dt className="mt-0.5 text-[10px] font-semibold text-[#5b6572]">{l}</dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}

/** Grid of written student feedback cards. */
export function ReviewWall({ shots = REVIEW_SHOTS.slice(0, 6) }: { shots?: ReviewShot[] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {shots.map((r, i) => (
          <figure
            key={r.name}
            className="h-reveal card-lift flex flex-col justify-between rounded-xl border border-[#eadfd2] bg-white p-4"
            style={{ transitionDelay: `${(i % 3) * 60}ms` }}
          >
            <blockquote className="text-[12.5px] leading-relaxed text-[#3f4854]">
              &ldquo;{r.note}&rdquo;
            </blockquote>
            <figcaption className="mt-3 border-t border-[#eadfd2] pt-2.5">
              <p className="text-[12.5px] font-extrabold leading-tight">{r.name}</p>
              <p className="mt-0.5 text-[10.5px] font-semibold text-[#f45000]">{r.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="mt-2 text-[10.5px] leading-relaxed text-[#5b6572]">
        Feedback shared by students and translated into English. Every student&apos;s result is
        different - it depends on skill, practice and the market.
      </p>
    </>
  );
}

/** Compact photo mosaic of real classroom / workshop / award moments. */
export function PhotoMosaic({ photos = PROOF_PHOTOS.slice(0, 8) }: { photos?: ProofPhoto[] }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {photos.map((p, i) => (
        <figure
          key={p.src}
          className={`h-reveal group relative overflow-hidden rounded-xl border border-[#eadfd2] bg-[#e9e2d4] ${
            i === 0 ? "col-span-2 aspect-[2/1]" : "aspect-square"
          }`}
          style={{ transitionDelay: `${(i % 4) * 60}ms` }}
        >
          <Image
            src={p.src}
            alt={p.alt}
            fill
            sizes={i === 0 ? "(min-width: 640px) 50vw, 100vw" : "(min-width: 640px) 25vw, 50vw"}
            className="object-cover transition duration-700 group-hover:scale-[1.05]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1120]/85 via-[#0a1120]/35 to-transparent px-2.5 pb-2 pt-8 text-[10.5px] font-semibold text-white">
            {p.cap}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

type Shot = {
  src: string;
  alt: string;
  cap: string;
  /** desktop grid placement (12-col grid, 150px rows) + mobile aspect */
  cls: string;
  pos?: string;
};

const SHOTS: Shot[] = [
  {
    src: "/media/odisha-skills-students.jpg",
    alt: "Founder with students holding certificates and medals at Odisha Skills 2025-26",
    cap: "Odisha Skills 2025-26: our students with certificates and medals",
    cls: "col-span-2 aspect-[3/4] sm:aspect-[4/5] lg:col-span-4 lg:row-span-4 lg:aspect-auto",
    pos: "object-top",
  },
  {
    src: "/images/certificate-distribution.jpg",
    alt: "Students receiving training certificates from the IAD team",
    cap: "Certificate distribution day",
    cls: "aspect-[4/3] lg:col-span-4 lg:row-span-2 lg:aspect-auto",
  },
  {
    src: "/images/leadership-summit-crowd.jpg",
    alt: "IAD team on stage at the State Business Leadership Awards and Summit",
    cap: "State Business Leadership Summit",
    cls: "aspect-[4/3] lg:col-span-4 lg:row-span-2 lg:aspect-auto",
    pos: "object-[50%_30%]",
  },
  {
    src: "/media/award-brands-of-odisha.jpg",
    alt: "Founder receiving an award at Brands of Odisha, 6th edition",
    cap: "Brands of Odisha, 6th edition",
    cls: "aspect-[4/3] lg:col-span-4 lg:row-span-2 lg:aspect-auto",
    pos: "object-[50%_25%]",
  },
  {
    src: "/media/award-inside-cover.jpg",
    alt: "Founder receiving an award on stage at an Inside Cover event",
    cap: "Honoured on stage, Inside Cover awards",
    cls: "aspect-[4/3] lg:col-span-4 lg:row-span-2 lg:aspect-auto",
    pos: "object-[50%_30%]",
  },
  {
    src: "/media/award-state-business.jpg",
    alt: "Founder receiving a trophy at the State Business Awards",
    cap: "State Business Awards",
    cls: "aspect-[16/10] lg:col-span-6 lg:row-span-2 lg:aspect-auto",
    pos: "object-[50%_35%]",
  },
  {
    src: "/media/award-leadership-2023.jpg",
    alt: "Founder receiving an award at the State Business Leadership Awards and Summit 2023",
    cap: "State Business Leadership Awards 2023",
    cls: "aspect-[16/10] lg:col-span-6 lg:row-span-2 lg:aspect-auto",
    pos: "object-[50%_30%]",
  },
];

/** Asymmetric proof wall: 7 real photos, no empty cells. */
export function RecognitionWall() {
  return (
    <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3 lg:auto-rows-[150px] lg:grid-cols-12">
      {SHOTS.map((s, i) => (
        <figure
          key={s.src}
          className={`h-reveal group relative overflow-hidden rounded-2xl border border-[#eadfd2] bg-[#e9e2d4] shadow-[0_10px_28px_rgba(19,26,38,0.08)] ${s.cls} ${
            i > 0 && i < 5 ? "col-span-2 sm:col-span-1" : i > 4 ? "col-span-2" : ""
          }`}
          style={{ transitionDelay: `${(i % 3) * 70}ms` }}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes={i === 0 ? "(min-width: 1024px) 380px, 100vw" : i > 4 ? "(min-width: 1024px) 570px, 100vw" : "(min-width: 1024px) 380px, 50vw"}
            className={`object-cover transition duration-700 group-hover:scale-[1.04] ${s.pos ?? ""}`}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1120]/85 via-[#0a1120]/45 to-transparent px-3.5 pb-3 pt-10 text-[12px] font-semibold leading-snug text-white sm:text-[12.5px]">
            {s.cap}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
