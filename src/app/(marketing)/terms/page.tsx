import type { Metadata } from "next";
import LegalPage from "@/components/views/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms governing your use of the Qualrec Solutions website.",
};

export default function Page() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="June 18, 2026"
      intro="These Terms of Service (“Terms”) govern your access to and use of the Qualrec Solutions website. By using this site you agree to these Terms."
      sections={[
        { h: "Use of the site", p: "You may use this site for lawful purposes only. You agree not to misuse the site, interfere with its operation, or attempt to access it in any way other than through the interface we provide." },
        { h: "Services", p: "Information on this site describes our staffing and IT solutions services and is for general information. It does not constitute a binding offer. Engagements are governed by separate written agreements." },
        { h: "Submissions", p: "By submitting a contact message or job application, you confirm the information is accurate and that you have the right to share it. We may contact you using the details you provide." },
        { h: "Intellectual property", p: "All content on this site — including text, graphics, logos, and the Qualrec name — is owned by or licensed to Qualrec Solutions and is protected by applicable laws. You may not reproduce it without permission." },
        { h: "Disclaimers", p: "The site is provided “as is” without warranties of any kind. We do not guarantee that the site will be uninterrupted or error-free, and statistics or case studies shown may be illustrative." },
        { h: "Limitation of liability", p: "To the fullest extent permitted by law, Qualrec Solutions is not liable for any indirect, incidental, or consequential damages arising from your use of the site." },
        { h: "Changes", p: "We may update these Terms from time to time. Continued use of the site after changes constitutes acceptance of the updated Terms." },
        { h: "Contact", p: "Questions about these Terms can be sent to info@qualrecsol.com." },
      ]}
    />
  );
}
