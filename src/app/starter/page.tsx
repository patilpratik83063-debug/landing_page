import type { Metadata } from "next";
import StarterView from "./StarterView";

const TITLE = "Foundation Pack ₹999 - 9 Modules, EV Diagnostics | IAD";
const DESCRIPTION =
  "Advanced ECM repair, BS6 diagnostics and programming, EV/Hybrid Level 1-2, ABS, EPS, SRS, BCM, cluster meter and engine repair - 9 practical modules on premium cars. One-time ₹999.";
const OG_IMAGE = {
  url: "/media/poster-main.jpg",
  width: 1920,
  height: 1080,
  alt: "Foundation Pack: practical EV and BS6 diagnostics training on premium cars",
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/starter" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: "Indian Automobile Doctor",
    url: "/starter",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export default function StarterPage() {
  return <StarterView />;
}
