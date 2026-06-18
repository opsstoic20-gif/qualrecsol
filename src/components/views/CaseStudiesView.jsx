"use client";
/* Case Studies — ported from the Claude Design Simple.jsx (CaseStudies). */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";

const el = React.createElement;
const Head = QR.SectionHead;

// PLACEHOLDER — case study content is illustrative; replace with verified work before real-domain launch.
const CASES = [
  { img: "healthcare.jpg", tag: "Healthcare", title: "Regional Hospital EHR Modernization", challenge: "Replace a legacy EHR while maintaining 24/7 operations across multiple departments.", results: ["Zero downtime during cutover", "40% reduction in documentation time", "75% staff satisfaction"], tech: ["Epic", "HL7 FHIR", "AWS"] },
  { img: "financial.jpg", tag: "Financial Services", title: "Community Bank Digital Transformation", challenge: "Modernize digital banking to compete with fintech disruptors.", results: ["300% increase in digital adoption", "45% lift in new accounts", "Improved compliance posture"], tech: ["React Native", "Node.js", "PostgreSQL"] },
  { img: "manufacturing.jpg", tag: "Manufacturing", title: "Smart Manufacturing Implementation", challenge: "Add real-time visibility into the production line to reduce downtime.", results: ["30% less unplanned downtime", "25% throughput gain", "Predictive maintenance live"], tech: ["IoT", "Azure IoT", "Power BI"] },
  { img: "retail.jpg", tag: "Retail", title: "E-commerce Platform Overhaul", challenge: "Rebuild a slow storefront and unify inventory across channels.", results: ["50% faster page loads", "35% conversion lift", "Unified omnichannel inventory"], tech: ["Shopify Plus", "Next.js", "GraphQL"] },
  { img: "state-agency.png", tag: "Government", title: "State Agency Services Portal", challenge: "Deliver a secure, accessible citizen-facing services portal.", results: ["WCAG 2.1 AA compliant", "60% drop in call volume", "99.9% uptime"], tech: ["React", "Node.js", ".NET"] },
  { img: "cybersecurity.jpg", tag: "Financial Services", title: "FinTech Cybersecurity Overhaul", challenge: "Strengthen security posture and achieve compliance under audit.", results: ["SOC 2 Type II achieved", "Zero breaches post-launch", "60% faster threat response"], tech: ["SIEM", "Zero Trust", "IAM"] },
];

function PageHero({ title, lead }) {
  return el("section", { style: { background: "var(--gradient-brand)" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "84px 24px 88px", textAlign: "center" } },
      el(Reveal, { as: "h1", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, title),
      el(Reveal, { delay: 80, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "62ch", marginInline: "auto", lineHeight: 1.55 } }, lead)));
}

function StatBand({ stats }) {
  return el("div", { style: { maxWidth: "var(--container-max)", margin: "-44px auto 0", padding: "0 24px", position: "relative", zIndex: 5 } },
    el(Reveal, { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", boxShadow: "var(--shadow-md)", padding: "30px", display: "grid", gridTemplateColumns: `repeat(${stats.length},1fr)`, gap: "20px" }, className: "qr-statstrip" },
      stats.map(([v, s, l], i) => el("div", { key: i, style: { textAlign: "center", borderLeft: i ? "1px solid var(--hairline)" : "none" }, className: "qr-statcell" },
        el(QR.StatCounter, { value: parseFloat(v), suffix: s, label: l, style: { alignItems: "center" } })))));
}

function CTABand({ onNavigate, title }) {
  return el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
      el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, title),
      el(Reveal, { delay: 80, style: { marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
        el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Schedule consultation"),
        el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("services") }, "Explore services"))));
}

export default function CaseStudiesView() {
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");

  return el("div", null,
    el(PageHero, { title: "Success stories", lead: "See how we've helped organizations across industries achieve their digital transformation goals and drive measurable results." }),
    el(StatBand, { stats: [["500", "+", "Projects Completed"], ["98", "%", "Client Satisfaction"], ["50", "M+", "Client Savings"], ["15", "+", "Industries Served"]] }),
    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }, className: "qr-svc-grid" },
          CASES.map((c, i) =>
            el(Reveal, { key: i, delay: (i % 2) * 60, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" } },
              el("div", { style: { position: "relative", aspectRatio: "16 / 9", overflow: "hidden" } },
                /* eslint-disable-next-line @next/next/no-img-element */
                el("img", { src: "/case-studies/" + c.img, alt: c.title, loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
                el("span", { style: { position: "absolute", top: "14px", left: "14px", background: "rgba(11,31,77,0.85)", color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "6px 11px", borderRadius: "999px", backdropFilter: "blur(4px)" } }, c.tag)),
              el("div", { style: { padding: "28px 30px", display: "flex", flexDirection: "column", gap: "14px", flex: 1 } },
                el("h3", { style: { fontSize: "20px" } }, c.title),
                el("p", { style: { margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" } }, el("strong", { style: { color: "var(--ink)" } }, "Challenge — "), c.challenge),
                el("ul", { style: { margin: 0, padding: 0, display: "grid", gap: "8px" } }, c.results.map((r, k) => el(QR.CheckItem, { key: k, style: { fontSize: "14px" } }, r))),
                el("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "auto", paddingTop: "6px" } }, c.tech.map((t, k) => el(QR.Badge, { key: k, tone: "neutral" }, t))))))),
        el("p", { style: { marginTop: "28px", textAlign: "center", fontSize: "12.5px", color: "var(--muted)" } }, "Case study content shown is illustrative placeholder material."))),
    el(CTABand, { onNavigate, title: "Ready to create your success story?" }));
}
