"use client";
/* Country guide — employment, payroll, benefits & compliance for a live market. */
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";

const el = React.createElement;
const Head = QR.SectionHead;

export default function CountryGuideView(props) {
  const c = props.country;
  const router = useRouter();
  const go = (href) => router.push(href);

  return el("div", null,
    // Hero
    el("section", { style: { background: "var(--brand-ink)", position: "relative", overflow: "hidden" } },
      el("div", { className: "qr-dots", "aria-hidden": "true", style: { position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" } }),
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "40px 24px 0", position: "relative" } },
        el("div", { style: { fontSize: "13px", color: "rgba(255,255,255,0.6)", display: "flex", gap: "8px", alignItems: "center" } },
          el(Link, { href: ROUTES.global, style: { color: "rgba(255,255,255,0.7)" } }, "Global Workforce"), el("span", null, "/"), el("span", { style: { color: "#fff" } }, c.name))),
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "40px 24px 92px", position: "relative", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "48px", alignItems: "center" }, className: "qr-why-grid" },
        el("div", null,
          el(Reveal, { style: { display: "flex", alignItems: "center", gap: "12px" } },
            el("span", { style: { fontSize: "34px" } }, c.flag),
            el("span", { style: { display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "12px", fontWeight: 700, color: "#fff", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "999px", padding: "5px 12px" } },
              el("span", { style: { width: "7px", height: "7px", borderRadius: "50%", background: "#34D399" } }), "Live")),
          el(Reveal, { delay: 70, as: "h1", style: { color: "#fff", marginTop: "18px", maxWidth: "16ch" } }, "Easily hire and employ in ", c.name, "."),
          el(Reveal, { delay: 130, as: "p", style: { marginTop: "18px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.8)", lineHeight: 1.55, maxWidth: "54ch" } }, c.lead),
          el(Reveal, { delay: 190, style: { marginTop: "30px", display: "flex", gap: "14px", flexWrap: "wrap" } },
            el(QR.Button, { variant: "secondary", size: "lg", onClick: () => go(ROUTES.contact), iconRight: el(I.ArrowRight, { size: 18 }) }, "Talk to an expert"),
            el(QR.Button, { variant: "ghost", size: "lg", onClick: () => go(ROUTES.global) }, "All countries"))),
        el(Reveal, { delay: 120, style: { borderRadius: "18px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.14)", aspectRatio: "4 / 3", boxShadow: "var(--shadow-md)" } },
          /* eslint-disable-next-line @next/next/no-img-element */
          el("img", { src: c.photo, alt: c.name, style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } })))),

    // Landscape stat band
    el("div", { style: { maxWidth: "var(--container-max)", margin: "-44px auto 0", padding: "0 24px", position: "relative", zIndex: 5 } },
      el(Reveal, { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", boxShadow: "var(--shadow-md)", padding: "26px 22px", display: "grid", gridTemplateColumns: `repeat(${c.landscape.length},1fr)`, gap: "18px" }, className: "qr-statstrip" },
        c.landscape.map((s, i) => el("div", { key: i, style: { borderLeft: i ? "1px solid var(--hairline)" : "none", paddingLeft: i ? "18px" : 0 }, className: "qr-statcell" },
          el("div", { style: { fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 } }, s.label),
          el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "var(--ink)", marginTop: "5px" } }, s.value),
          s.sub && el("div", { style: { fontSize: "11.5px", color: "var(--muted)", marginTop: "2px" } }, s.sub))))),

    // Overview
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px" }, className: "qr-why-grid" },
        el("div", null,
          el(Reveal, null, el(QR.Eyebrow, null, "Overview")),
          el(Reveal, { delay: 60, as: "h2", style: { marginTop: "14px" } }, "Grow your team in ", c.name, " with QualRec."),
          el(Reveal, { delay: 120, as: "p", style: { marginTop: "16px", fontSize: "var(--fs-body)", color: "var(--body)", lineHeight: 1.65 } }, c.overview.body),
          el(Reveal, null, el("ul", { style: { marginTop: "24px", padding: 0, display: "grid", gap: "12px" } },
            c.overview.bullets.map((b, i) => el(QR.CheckItem, { key: i }, b))))),
        el(Reveal, { delay: 120, style: { background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "30px 32px" } },
          el("div", { style: { fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "18px" } }, "Talent strengths in " + c.name),
          el("div", { style: { display: "flex", flexWrap: "wrap", gap: "10px" } },
            c.overview.talents.map((t, i) => el("span", { key: i, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "999px", padding: "9px 16px", fontSize: "14px", fontWeight: 600, color: "var(--ink)" } }, t)))))),

    // Employment law
    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Employment law", title: "Employing in " + c.name + ".", lead: c.law.intro, center: true, max: 760 }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }, className: "qr-why-grid" },
          c.law.items.map((it, i) =>
            el(Reveal, { key: i, delay: (i % 2) * 60, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "14px", padding: "26px 28px" } },
              el("h3", { style: { fontSize: "18px", marginBottom: "10px" } }, it.h),
              el("p", { style: { margin: 0, fontSize: "14.5px", lineHeight: 1.6, color: "var(--body)" } }, it.p)))))),

    // Holidays
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Leave & holidays", title: c.holidays.count + "." }),
        el("div", { style: { marginTop: "44px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px" }, className: "qr-svc-grid" },
          c.holidays.list.map((h, i) =>
            el(Reveal, { key: i, delay: (i % 3) * 50, style: { display: "flex", alignItems: "center", gap: "16px", background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "14px", padding: "18px 22px" } },
              el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "15px", color: "var(--brand)", minWidth: "62px" } }, h.when),
              el("div", { style: { fontSize: "15px", color: "var(--ink)", fontWeight: 600 } }, h.name)))))),

    // Benefits
    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Benefits package", title: "Competitive benefits in " + c.name + ".", lead: "Every full-time hire gets a complete, locally-compliant benefits package — administered by us, with no markup." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px" }, className: "qr-svc-grid" },
          c.benefits.map((b, i) => el(Reveal, { key: i, delay: (i % 3) * 60 }, el(QR.Card, { title: b.title, interactive: true, style: { height: "100%" } }, b.body)))))),

    // Facts
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Facts & stats", title: c.name + " at a glance." }),
        el("div", { style: { marginTop: "44px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "16px" }, className: "qr-svc-grid" },
          c.facts.map(([k, v], i) =>
            el(Reveal, { key: i, delay: (i % 4) * 40, style: { background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "14px", padding: "20px 22px" } },
              el("div", { style: { fontSize: "11.5px", letterSpacing: ".06em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 } }, k),
              el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "var(--ink)", marginTop: "6px" } }, v)))))),

    // CTA
    el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "22ch", margin: "0 auto" } }, "Hire your first ", c.name, " employee in days."),
        el(Reveal, { delay: 70, as: "p", style: { marginTop: "16px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "58ch", marginInline: "auto" } }, "Tell us the role and we'll come back with candidates, total employment cost, and a compliant offer letter — usually within 48 hours."),
        el(Reveal, { delay: 130, style: { marginTop: "30px", display: "flex", justifyContent: "center" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => go(ROUTES.contact), iconRight: el(I.ArrowRight, { size: 18 }) }, "Start hiring")))));
}
