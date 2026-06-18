import type { Metadata } from "next";
import CaseStudiesView from "@/components/views/CaseStudiesView";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Success stories across healthcare, financial services, manufacturing, retail, and government — outcomes we've delivered.",
};

export default function Page() {
  return <CaseStudiesView />;
}
