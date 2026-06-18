import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/content/site";
import Analytics from "@/components/Analytics";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qualrecsol.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Qualrec Solutions — IT Talent & Solutions",
    template: "%s · Qualrec Solutions",
  },
  description:
    "Qualrec Solutions connects skilled tech talent to enterprises across borders. Contract-to-Hire specialists placing vetted professionals with MNCs across the US, Canada, UK, and Europe.",
  keywords: [
    "IT staffing",
    "contract to hire",
    "tech talent",
    "staff augmentation",
    "RPO",
    "direct hire",
    "IT consulting",
  ],
  authors: [{ name: "Qualrec Solutions" }],
  openGraph: {
    type: "website",
    siteName: "Qualrec Solutions",
    title: "Qualrec Solutions — IT Talent & Solutions",
    description:
      "Contract-to-Hire specialists placing vetted tech talent with enterprises across the US, Canada, UK, and Europe.",
    url: siteUrl,
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Qualrec Solutions" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Qualrec Solutions — IT Talent & Solutions",
    description:
      "Contract-to-Hire specialists placing vetted tech talent with enterprises across the US, Canada, UK, and Europe.",
    images: ["/og-default.png"],
  },
  icons: { icon: "/logo-qualrec.png" },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Qualrec Solutions",
      url: siteUrl,
      logo: `${siteUrl}/logo-qualrec.png`,
      description:
        "US-based IT talent & solutions firm. Contract-to-Hire specialists sourcing vetted tech professionals globally and placing them with enterprises across the US, Canada, UK, and Europe.",
      foundingDate: "2015",
      sameAs: [SITE.social.linkedin, SITE.social.facebook],
      address: {
        "@type": "PostalAddress",
        streetAddress: "7901 4th St N Ste 4138",
        addressLocality: "St. Petersburg",
        addressRegion: "FL",
        postalCode: "33702",
        addressCountry: "US",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: SITE.phoneUsa,
          contactType: "sales",
          areaServed: "US",
          availableLanguage: ["English"],
        },
        {
          "@type": "ContactPoint",
          telephone: SITE.phoneIndia,
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: ["English"],
        },
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Qualrec Solutions",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
