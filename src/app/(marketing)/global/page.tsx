import type { Metadata } from "next";
import GlobalView from "@/components/views/GlobalView";

export const metadata: Metadata = {
  title: "Global Workforce",
  description:
    "Hire anywhere — QualRec is your employer of record. India and Mexico are hire-ready today, with four more markets opening through 2026.",
};

export default function Page() {
  return <GlobalView />;
}
