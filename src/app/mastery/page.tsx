import type { Metadata } from "next";
import MasteryView from "./MasteryView";

export const metadata: Metadata = {
  title: "Mastery Pack @ ₹4999 — EV/Hybrid Level 3–10 Pro Diagnostics | IAD",
  description:
    "Advance ECM repairing, BS6 programming, EV/Hybrid Level 3–10 advanced diagnostics, ABS, EPS, SRS, BCM, cluster meter + engine repair with live practical videos on premium cars. Enroll @ ₹4999.",
};

export default function MasteryPage() {
  return <MasteryView />;
}
