import type { Metadata } from "next";
import ServicesView from "@/components/views/ServicesView";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Contract-to-Hire, Direct Hire, Staff Augmentation, RPO, and Payroll/EOR — plus full IT solutions across ten talent domains.",
};

export default function Page() {
  return <ServicesView />;
}
