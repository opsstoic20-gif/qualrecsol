import type { Metadata } from "next";
import LegalPage from "@/components/views/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Qualrec Solutions collects, uses, and protects your information.",
};

export default function Page() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="June 18, 2026"
      intro="Qualrec Solutions (“Qualrec,” “we,” “us”) respects your privacy. This policy explains what information we collect through our website and how we use it. By using this site you agree to the practices described here."
      sections={[
        { h: "Information we collect", p: "When you submit the contact or application forms, we collect the information you provide — such as your name, email address, phone number, company, LinkedIn URL, and any message or role details. We may also collect standard technical data (such as IP address and browser type) for security and analytics." },
        { h: "How we use your information", p: ["We use your information to respond to enquiries, evaluate job applications, provide our staffing and IT services, and improve our website.", "We do not sell your personal information."] },
        { h: "How we store and protect it", p: "Form submissions are stored securely in our database (Supabase) with row-level security, and notifications are sent to our internal team via a transactional email provider. We retain information only as long as needed for the purposes above or as required by law." },
        { h: "Sharing", p: "We may share information with service providers who help us operate the website and our business (for example, hosting and email delivery), and with clients in the course of presenting candidates, with your consent. We may disclose information where required by law." },
        { h: "Your rights", p: "You may request access to, correction of, or deletion of your personal information by emailing info@qualrecsol.com. We will respond within a reasonable timeframe." },
        { h: "Cookies", p: "We use only essential cookies required for the site to function. We do not use advertising trackers." },
        { h: "Contact", p: "Questions about this policy can be sent to info@qualrecsol.com or by mail to 7901 4th St N Ste 4138, St. Petersburg, FL 33702." },
      ]}
    />
  );
}
