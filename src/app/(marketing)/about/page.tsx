import type { Metadata } from "next";
import AboutView from "@/components/views/AboutView";

export const metadata: Metadata = {
  title: "About",
  description:
    "Since 2019, Qualrec Solutions has connected skilled tech talent to enterprises across borders — and US-to-US — combining deep technical vetting with a global sourcing pipeline.",
};

export default function Page() {
  return <AboutView />;
}
