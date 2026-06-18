// Maps the design's page-ids (used in onNavigate) to real Next.js routes.
export const ROUTES: Record<string, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  industries: "/industries",
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
      ["Our story", "/about"],
      ["Leadership", "/about"],
      ["Core values", "/about"],
    ] as [string, string][],
  },
  {
    id: "services",
    label: "Services",
    href: "/services",
    menu: [
      ["Staffing models", "/services"],
      ["Areas of expertise", "/services"],
      ["IT solutions", "/services"],
    ] as [string, string][],
  },
  {
    id: "industries",
    label: "Industries",
    href: "/industries",
    menu: [
      ["Healthcare", "/industries"],
      ["Financial services", "/industries"],
      ["Manufacturing", "/industries"],
    ] as [string, string][],
  },
  { id: "case-studies", label: "Case Studies", href: "/case-studies" },
  { id: "careers", label: "Careers", href: "/careers" },
  { id: "contact", label: "Contact", href: "/contact" },
];

export function routeFor(pageId: string): string {
  return ROUTES[pageId] || "/";
}
