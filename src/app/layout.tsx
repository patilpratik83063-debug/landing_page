import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const barlow = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const SITE_NAME = "Indian Automobile Doctor";
const TITLE = "EV, BS6 & Hybrid Masterclass in Hindi - ₹29 Seat | IAD";
const DESCRIPTION =
  "Live EV, BS6 & Hybrid diagnostics masterclass in simple Hindi - ₹29 seat (worth ₹999). 90 min + Q&A, 60-day roadmap. Today 8 PM IST on Zoom.";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

const OG_IMAGE = {
  url: "/media/poster-main.jpg",
  width: 1920,
  height: 1080,
  alt: "Indian Automobile Doctor practical diagnostics training on premium cars",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    locale: "en_IN",
    siteName: SITE_NAME,
    url: "/",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE.url],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e1626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
