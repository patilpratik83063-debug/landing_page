import type { Metadata } from "next";
import StarterView from "./StarterView";

export const metadata: Metadata = {
  title: "Foundation Pack @ ₹999 - ECM, BS6, EV Level 1-2 Diagnostics | IAD",
  description:
    "Advance ECM repairing, BS6 diagnostic & programming, EV/Hybrid Level 1-2, ABS, EPS, SRS, BCM, cluster meter + engine repair training with live practical videos on premium cars. Enroll @ ₹999.",
};

export default function StarterPage() {
  return <StarterView />;
}
