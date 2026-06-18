// Maps the design's page-ids (used in onNavigate) to real Next.js routes.
export const ROUTES: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
  global: "/global",
  "case-studies": "/case-studies",
  careers: "/careers",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
};

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "/" },
  {
    id: "about",
    label: "About",
    href: "/about",
    menu: [
      ["Our story", "/about#story"],
      ["Core values", "/about#values"],
      ["Careers", "/careers"],
    ] as [string, string][],
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    menu: [
      ["Staffing models", "/services#staffing-models"],
      ["Areas of expertise", "/services#expertise"],
      ["IT solutions", "/services#it-solutions"],
    ] as [string, string][],
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
    menu: [
      ["Healthcare", "/industries#healthcare"],
      ["Financial services", "/industries#financial-services"],
      ["Manufacturing", "/industries#manufacturing"],
    ] as [string, string][],
  },
  {
    id: "global",
    label: "Global",
    href: "/global",
    menu: [
      ["Global Workforce", "/global"],
      ["Hire in India", "/global/india"],
      ["Hire in Mexico", "/global/mexico"],
    ] as [string, string][],
  },
  { id: "case-studies", label: "Case Studies", href: "/case-studies" },
  { id: "careers", label: "Careers", href: "/careers" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function routeFor(pageId: string): string {
  return ROUTES[pageId] || "/";
}
