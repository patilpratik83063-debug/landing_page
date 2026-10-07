"use client";

import Image from "next/image";
import { ExternalLink, Play } from "lucide-react";
import { useState } from "react";

const driveEmbed = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
const driveView = (id: string) => `https://drive.google.com/file/d/${id}/view`;

const DRIVE_VIDEOS = [
  { id: "1bE0L5L7XEwqtIOhguz5sQ--NwK3q8pK7", title: "Training video: part 1", sub: "Live practical clip" },
  { id: "1VV9GYZIKI1XDyIhp7CWAVF1upYrQiBt4", title: "Training video: part 2", sub: "Live practical clip" },
];

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
          preload="auto"
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

/** Google Drive preview embed. Loads the iframe only after the click. */
function DriveVideo({ id, title, sub }: { id: string; title: string; sub: string }) {
  const [on, setOn] = useState(false);
  return (
    <div>
      <div className="group relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-[#0a1120]">
        {on ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={driveEmbed(id)}
            title={title}
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setOn(true)}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 grid h-full w-full place-items-center bg-[radial-gradient(120%_120%_at_20%_0%,rgba(244,80,0,0.28),transparent_55%),linear-gradient(160deg,#16233d,#0a1120)]"
          >
            <span className="flex flex-col items-center gap-2.5">
              <PlayDisc size="sm" />
              <span className="text-[13px] font-bold text-white">{title}</span>
            </span>
          </button>
        )}
      </div>
      <div className="mt-2 flex items-center justify-between gap-3 text-[12px] text-white/60">
        <span>{sub}</span>
        <a
          href={driveView(id)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-white/80 transition hover:text-white"
        >
          Open in Drive <ExternalLink className="h-3 w-3" strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

/** Featured promo (local file) + the two Drive training videos. */
export function VideoShowcase() {
  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-6">
      <div className="h-reveal">
        <LocalVideo
          src="/videos/foundation-promo.mp4"
          poster="/media/promo-poster.jpg"
          title="Watch the 20-second course preview"
          className="border border-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.45)]"
        />
        <p className="mt-2 text-[12px] text-white/60">Course preview with Hindi captions</p>
      </div>
      <div className="grid gap-5">
        {DRIVE_VIDEOS.map((v, i) => (
          <div key={v.id} className="h-reveal" style={{ transitionDelay: `${(i + 1) * 90}ms` }}>
            <DriveVideo {...v} />
          </div>
        ))}
      </div>
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
    src: "/media/jobfair-dhenkanal.jpg",
    alt: "Founder receiving a memento at the District Level Job Fair in Dhenkanal",
    cap: "District Level Job Fair, Dhenkanal",
    cls: "aspect-[4/3] lg:col-span-4 lg:row-span-2 lg:aspect-auto",
  },
  {
    src: "/media/jobfair-trophy.jpg",
    alt: "Founder receiving the Mega Job Fair 2025 trophy for Indian Automobile Doctor",
    cap: "Mega Job Fair 2025 recognition",
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
