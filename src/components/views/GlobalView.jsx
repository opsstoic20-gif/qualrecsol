"use client";
/* Global Workforce landing — live markets + 2026 roadmap. */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";
import { LIVE_MARKETS, OPENING_MARKETS, OFFICES } from "@/lib/content/countries";

const el = React.createElement;
const Head = QR.SectionHead;

export default function GlobalView() {
  const router = useRouter();
  const go = (href) => router.push(href);

  function Hero() {
    return el("section", { style: { background: "var(--brand-ink)", position: "relative", overflow: "hidden" } },
      el("div", { className: "qr-dots", "aria-hidden": "true", style: { position: "absolute", inset: 0, opacity: 0.5, pointerEvents: "none" } }),
      el("div", { className: "qr-hero-pad", style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "92px 24px 96px", position: "relative", textAlign: "center" } },
        el(Reveal, null, el("span", { style: { display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--font-body)", fontSize: "12.5px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "999px", padding: "6px 14px" } },
          el("span", { style: { width: "7px", height: "7px", borderRadius: "50%", background: "#34D399", display: "inline-block" } }), "Available now")),
        el(Reveal, { delay: 70, as: "h1", style: { color: "#fff", marginTop: "22px", maxWidth: "16ch", marginInline: "auto" } }, "Hire anywhere. We handle the rest."),
        el(Reveal, { delay: 130, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.8)", maxWidth: "62ch", marginInline: "auto", lineHeight: 1.55 } },
          "Pick a country to see how employment, payroll, benefits, and compliance work — and what it costs to hire there with QualRec as your employer of record."),
        el(Reveal, { delay: 190, style: { marginTop: "32px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => go(ROUTES.contact), iconRight: el(I.ArrowRight, { size: 18 }) }, "Talk to an expert"))));
  }

  function LiveCard(m) {
    return el(Reveal, { key: m.slug, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "18px", overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", cursor: "pointer", transition: "transform .2s, box-shadow .2s, border-color .2s" },
      onClick: () => go("/global/" + m.slug),
      onMouseEnter: (e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--brand-15)"; },
      onMouseLeave: (e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--hairline)"; } },
      el("div", { style: { position: "relative", aspectRatio: "16 / 9", overflow: "hidden", background: "var(--surface-2)" } },
        /* eslint-disable-next-line @next/next/no-img-element */
        el("img", { src: m.photo, alt: m.name, loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
        el("span", { style: { position: "absolute", top: "14px", left: "14px", display: "inline-flex", alignItems: "center", gap: "7px", background: "rgba(255,255,255,0.92)", color: "#0F172A", fontSize: "12px", fontWeight: 700, padding: "6px 12px", borderRadius: "999px" } },
          el("span", { style: { width: "7px", height: "7px", borderRadius: "50%", background: "var(--success)" } }), "Live"),
        el("span", { style: { position: "absolute", top: "12px", right: "14px", fontSize: "34px", lineHeight: 1 } }, m.flag)),
      el("div", { style: { padding: "24px 26px", display: "flex", flexDirection: "column", gap: "16px", flex: 1 } },
        el("h3", { style: { fontSize: "22px" } }, m.name),
        el("p", { style: { margin: 0, fontSize: "15px", color: "var(--body)", lineHeight: 1.55 } }, m.tagline),
        el("div", { style: { display: "flex", gap: "10px", flexWrap: "wrap", marginTop: "2px" } },
          [["Timezone", m.timezone], ["Savings", m.savings], ["Payroll", m.payroll]].map(([k, v], i) =>
            el("div", { key: i, style: { flex: "1 1 30%", minWidth: "90px", background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "12px 14px" } },
              el("div", { style: { fontSize: "11px", letterSpacing: ".08em", textTransform: "uppercase", color: "var(--muted)", fontWeight: 600 } }, k),
              el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "16px", color: "var(--ink)", marginTop: "3px" } }, v)))),
        el("span", { style: { marginTop: "auto", display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--brand)", fontWeight: 600, fontSize: "15px", paddingTop: "4px" } }, "Explore ", m.name, " guide", el(I.ArrowRight, { size: 16 }))));
  }

  return el("div", null,
    el(Hero),
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Hire-ready today", title: "3 countries, hire-ready today.", lead: "Domestic US staffing plus live entities in India and Mexico — statutory benefits and full compliance, start hiring in days, not months." }),
        el("div", { style: { marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "28px" }, className: "qr-svc-grid" },
          LIVE_MARKETS.map(LiveCard)))),

    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Where we operate", title: "Our offices & delivery hubs.", lead: "On-the-ground teams across the United States, India, and Mexico — not a remote-only outsourcer." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }, className: "qr-svc-grid" },
          OFFICES.map((o, i) =>
            el(Reveal, { key: i, delay: (i % 4) * 60, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "26px 24px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "10px" } },
              el("span", { style: { fontSize: "30px", lineHeight: 1 } }, o.flag),
              el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", color: "var(--ink)", marginTop: "4px" } }, o.city),
              el("div", { style: { fontSize: "13px", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", color: "var(--brand)" } }, o.region),
              el("div", { style: { fontSize: "13.5px", color: "var(--muted)", lineHeight: 1.5 } }, o.note)))))),

    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Opening soon", title: "4 new markets through 2026.", lead: "We're standing up local entities so you'll get the same hire-ready, fully compliant employment in each." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }, className: "qr-svc-grid" },
          OPENING_MARKETS.map((o, i) =>
            el(Reveal, { key: i, delay: (i % 4) * 60, style: { background: "#fff", border: "1px dashed var(--border-strong)", borderRadius: "16px", padding: "26px 22px", display: "flex", flexDirection: "column", gap: "12px" } },
              el("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" } },
                el("span", { style: { fontSize: "30px", lineHeight: 1 } }, o.flag),
                el(QR.Badge, { tone: "neutral" }, o.quarter)),
              el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "var(--ink)" } }, o.label),
              el("div", { style: { display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13px", color: "var(--muted)" } },
                el("span", { style: { width: "7px", height: "7px", borderRadius: "50%", background: "var(--muted)" } }), "Opening soon"))))) ),

    el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, "Tell us the role. We'll handle the country."),
        el(Reveal, { delay: 80, style: { marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => go(ROUTES.contact), iconRight: el(I.ArrowRight, { size: 18 }) }, "Start hiring"),
          el(QR.Button, { variant: "ghost", size: "lg", onClick: () => go(ROUTES.services) }, "See our services")))));
}
