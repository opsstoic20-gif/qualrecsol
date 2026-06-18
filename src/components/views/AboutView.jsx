"use client";
/* About — mission, values, journey/timeline, CTA. No leadership/people section. */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";

const el = React.createElement;
const Head = QR.SectionHead;

const VALUES = [
  { icon: I.Award, title: "Excellence", body: "We strive for excellence in every project, delivering solutions that exceed expectations and drive measurable results." },
  { icon: I.Users, title: "Collaboration", body: "We believe in the power of teamwork, fostering collaborative relationships with clients and within our organization." },
  { icon: I.Heart, title: "Integrity", body: "We conduct business with the highest ethical standards, building trust through transparency and honest communication." },
  { icon: I.Zap, title: "Innovation", body: "We embrace cutting-edge technologies and methodologies to provide innovative solutions for complex challenges." },
];

const JOURNEY = [
  { year: "2019", title: "Founded in NOIDA", body: "Qualrec Solutions launched in NOIDA, India, with a mission to bridge the gap between talent and opportunity." },
  { year: "2020–2022", title: "Crisis & Resilience", body: "Through the COVID-19 pandemic we leaned into innovation and empathy — restructuring our pipeline and retaining major partnerships." },
  { year: "2023–2024", title: "Growth Amid Uncertainty", body: "Amid tech-industry layoffs we introduced adaptive, career-first strategies that helped us grow while others downsized." },
  { year: "2025–26", title: "Global & Domestic Reach", body: "Today Qualrec hires across borders and US-to-US — placing talent into US MNCs and jobs as well as sourcing globally from India and Mexico, serving Fortune 500 and growing enterprises." },
];

// Shared subtle video backdrop for the dark brand bands — low opacity + dark veil
// so the motion reads as a quiet texture, never competing with the copy.
function BandVideo({ veil = "linear-gradient(180deg, rgba(14,27,51,0.80) 0%, rgba(14,27,51,0.66) 100%)" }) {
  return el(React.Fragment, null,
    el("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", "aria-hidden": "true", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.2 } },
      el("source", { src: "/hero-bg.mp4", type: "video/mp4" })),
    el("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, zIndex: 1, background: veil, pointerEvents: "none" } }));
}

function PageHero({ title, lead }) {
  return el("section", { style: { position: "relative", overflow: "hidden", background: "var(--gradient-brand)" } },
    el(BandVideo, null),
    el("div", { style: { position: "relative", zIndex: 2, maxWidth: "var(--container-max)", margin: "0 auto", padding: "84px 24px 88px", textAlign: "center" } },
      el(Reveal, { as: "h1", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, title),
      el(Reveal, { delay: 80, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "62ch", marginInline: "auto", lineHeight: 1.55 } }, lead)));
}

export default function AboutView() {
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");

  return el("div", null,
    el(PageHero, { title: "About Qualrec Solutions", lead: "Since 2019, Qualrec has connected skilled tech talent to enterprises across borders — and US-to-US — combining deep technical vetting with a global sourcing pipeline." }),

    // Mission / Vision
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }, className: "qr-why-grid" },
        [["Our Mission", I.Target, "To empower businesses through innovative IT solutions and exceptional talent — enabling clients to achieve their strategic objectives and maintain a competitive edge.", "var(--tint)", "var(--brand)"],
         ["Our Vision", I.Heart, "To be the most trusted IT consulting partner globally, recognized for our commitment to excellence, innovation, and the impact we create for the communities we serve.", "rgba(16,185,129,0.10)", "var(--success)"]].map(([t, Ic, b, bg, c], i) =>
          el(Reveal, { key: i, delay: i * 80, style: { background: i ? "rgba(16,185,129,0.04)" : "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "18px", padding: "40px 36px" } },
            el("div", { style: { width: "52px", height: "52px", borderRadius: "14px", background: bg, color: c, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "22px" } }, el(Ic, { size: 26 })),
            el("h3", { style: { fontSize: "26px", marginBottom: "12px" } }, t),
            el("p", { style: { margin: 0, fontSize: "var(--fs-body)", lineHeight: 1.6, color: "var(--body)" } }, b))))),

    // Core values
    el("section", { id: "values", style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Core values", title: "Principles that guide every engagement", lead: "These shape how we interact with clients, partners, and each other." }),
        el("div", { style: { marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "20px" }, className: "qr-svc-grid" },
          VALUES.map((v, i) => el(Reveal, { key: i, delay: (i % 4) * 60 }, el(QR.Card, { icon: el(v.icon, { size: 22 }), title: v.title, interactive: true, style: { height: "100%" } }, v.body)))))),

    // Journey timeline
    el("section", { id: "story", style: { background: "var(--brand-ink)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "920px", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Our journey", title: "From a NOIDA startup to a global firm", tone: "dark" }),
        el("div", { style: { position: "relative", marginTop: "56px", paddingLeft: "0" } },
          el("div", { style: { position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", background: "rgba(255,255,255,0.16)", transform: "translateX(-1px)" }, className: "qr-tl-spine" }),
          JOURNEY.map((j, i) =>
            el(Reveal, { key: i, delay: 40, style: { position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px", marginBottom: i === JOURNEY.length - 1 ? 0 : "40px" }, className: "qr-tl-row" },
              el("div", { style: { gridColumn: i % 2 === 0 ? "1" : "2", textAlign: i % 2 === 0 ? "right" : "left" }, className: "qr-tl-card" },
                el("div", { style: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "14px", padding: "24px 26px", display: "inline-block", textAlign: "left", maxWidth: "100%" } },
                  el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "20px", color: "#93B4F7", letterSpacing: "-0.01em" } }, j.year),
                  el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "#fff", margin: "6px 0 8px" } }, j.title),
                  el("p", { style: { margin: 0, fontSize: "14px", lineHeight: 1.55, color: "rgba(255,255,255,0.7)" } }, j.body))),
              el("span", { style: { position: "absolute", left: "50%", top: "26px", width: "13px", height: "13px", borderRadius: "50%", background: "var(--brand-bright)", border: "3px solid var(--brand-ink)", transform: "translateX(-50%)", boxShadow: "0 0 0 4px rgba(37,99,235,0.25)" }, className: "qr-tl-node" })))))),

    // CTA
    el("section", { style: { position: "relative", overflow: "hidden", background: "var(--gradient-brand)", padding: "84px 0" } },
      el(BandVideo, { veil: "linear-gradient(180deg, rgba(14,27,51,0.78) 0%, rgba(14,27,51,0.70) 100%)" }),
      el("div", { style: { position: "relative", zIndex: 2, maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, "Want to work with us?"),
        el(Reveal, { delay: 70, as: "p", style: { marginTop: "18px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.84)", maxWidth: "58ch", marginInline: "auto", lineHeight: 1.55 } }, "Hiring a team or chasing your next role — either way, we move fast. Vetted talent in days, compliant placement across the US, India, and Mexico, and a partner who stays in it for the long run. Tell us what you need; we'll take it from there."),
        el(Reveal, { delay: 130, style: { marginTop: "30px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Get in touch"),
          el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("careers") }, "View careers")))));
}
