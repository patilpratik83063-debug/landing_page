import type { Metadata } from "next";
import MasteryView from "./MasteryView";

const TITLE = "Mastery Pack ₹4,999 - EV/Hybrid Level 3-10 | IAD";
const DESCRIPTION =
  "Advanced ECM repair, BS6 programming and EV/Hybrid Level 3-10 pro diagnostics, plus ABS, EPS, SRS, BCM, cluster meter and engine repair - practical videos on premium cars. One-time ₹4,999.";
const OG_IMAGE = {
  url: "/media/poster-main.jpg",
  width: 1920,
  height: 1080,
  alt: "Mastery Pack: pro-level EV and hybrid diagnostics training on premium cars",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/mastery" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: "Indian Automobile Doctor",
    url: "/mastery",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function MasteryPage() {
  return <MasteryView />;
}
