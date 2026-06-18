"use client";
/* Industries — ported from the Claude Design Simple.jsx (Industries). */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";

const el = React.createElement;

// Stable anchor slug from a display name, e.g. "Financial Services" -> "financial-services".
const slug = (s) => s.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// PLACEHOLDER — industry statistics are illustrative; replace with verified numbers before real-domain launch.
const INDUSTRIES = [
  { icon: I.HeartPulse, name: "Healthcare", body: "HIPAA-compliant solutions for hospitals, clinics, and providers.", stats: [["50+", "Clients"], ["200+", "Projects"], ["99%", "Satisfaction"]], specs: ["EHR Systems", "Telemedicine", "Medical Imaging", "Compliance"] },
  { icon: I.Landmark, name: "Financial Services", body: "Secure, scalable solutions for banks, fintech, and institutions.", stats: [["40+", "Clients"], ["150+", "Projects"], ["98%", "Satisfaction"]], specs: ["Digital Banking", "Payment Systems", "Risk Management", "Blockchain"] },
  { icon: I.Factory, name: "Manufacturing", body: "Industry 4.0 solutions for smart manufacturing and supply chain.", stats: [["35+", "Clients"], ["120+", "Projects"], ["97%", "Satisfaction"]], specs: ["IoT Integration", "Predictive Maintenance", "Supply Chain", "Quality Control"] },
  { icon: I.ShoppingCart, name: "Retail & E-commerce", body: "Omnichannel solutions for modern retail and e-commerce.", stats: [["60+", "Clients"], ["300+", "Projects"], ["96%", "Satisfaction"]], specs: ["E-commerce Platforms", "POS Systems", "Inventory", "Customer Analytics"] },
  { icon: I.Landmark, name: "Government & Public Sector", body: "Secure, compliant solutions for agencies and public organizations.", stats: [["25+", "Clients"], ["80+", "Projects"], ["99%", "Satisfaction"]], specs: ["Citizen Services", "Data Management", "Cybersecurity", "Compliance"] },
];

function PageHero({ title, lead }) {
  return el("section", { style: { background: "var(--gradient-brand)" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "84px 24px 88px", textAlign: "center" } },
      el(Reveal, { as: "h1", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, title),
      el(Reveal, { delay: 80, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "62ch", marginInline: "auto", lineHeight: 1.55 } }, lead)));
}

function CTABand({ onNavigate, title }) {
  return el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
      el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, title),
      el(Reveal, { delay: 80, style: { marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
        el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Schedule consultation"),
        el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("services") }, "Explore services"))));
}

export default function IndustriesView() {
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");

  return el("div", null,
    el(PageHero, { title: "Industry expertise", lead: "Deep industry knowledge and specialized solutions to help organizations meet specific regulatory and operational requirements." }),
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }, className: "qr-svc-grid" },
          INDUSTRIES.map((ind, i) =>
            el(Reveal, { key: i, id: slug(ind.name), delay: (i % 2) * 60, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "30px 32px", boxShadow: "var(--shadow-sm)" } },
              el("div", { style: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" } },
                el("div", { style: { width: "48px", height: "48px", borderRadius: "12px", background: "var(--tint)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" } }, el(ind.icon, { size: 24 })),
                el("h3", { style: { fontSize: "21px" } }, ind.name)),
              el("p", { style: { margin: "0 0 20px", fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" } }, ind.body),
              el("div", { style: { display: "flex", gap: "24px", marginBottom: "20px" } },
                ind.stats.map(([v, l], k) => el("div", { key: k },
                  el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "24px", color: "var(--brand)" } }, v),
                  el("div", { style: { fontSize: "12px", color: "var(--muted)", marginTop: "2px" } }, l)))),
              el("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" } }, ind.specs.map((s, k) => el(QR.Badge, { key: k, tone: "neutral" }, s)))))),
        el("p", { style: { marginTop: "28px", textAlign: "center", fontSize: "12.5px", color: "var(--muted)" } }, "Industry statistics shown are illustrative placeholders."))),
    el(CTABand, { onNavigate, title: "Ready to transform your industry operations?" }));
}
