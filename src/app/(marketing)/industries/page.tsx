import type { Metadata } from "next";
import IndustriesView from "@/components/views/IndustriesView";

export const metadata: Metadata = {
  title: "Industries",
  description:
    "Deep industry expertise across Healthcare, Financial Services, Manufacturing, Retail & E-commerce, and Government & Public Sector.",
};

export default function Page() {
  return <IndustriesView />;
}
