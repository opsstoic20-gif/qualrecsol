import type { Metadata } from "next";
import ContactView from "@/components/views/ContactView";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Ready to build your team or transform your business? Tell us what you need and we'll get back to you within 24 hours.",
};

export default function Page() {
  return <ContactView />;
}
