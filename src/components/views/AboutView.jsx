"use client";
/* About — ported from the Claude Design About.jsx. Wired to Next routing.
   Team photos load from /team/<slug>.png and fall back to brand monograms. */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";

const el = React.createElement;
const Head = QR.SectionHead;

const TEAM = [
  { slug: "avinash-singh", name: "Avinash Singh", role: "Director & Co-founder", founder: true,
    linkedin: "https://www.linkedin.com/in/avinash-singh-290208195/",
    bio: "Avinash is the strategic pillar of the company. Together with Mr. Rajesh Pal, he co-founded the company in 2015, navigating it through major industry disruptions. Under his leadership, the company has not only survived but thrived through challenges such as the COVID-19 pandemic and the tech downturn of 2023–24." },
  { slug: "anubhav-tyagi", name: "Anubhav Tyagi", role: "Chief Technology Officer (CTO)",
    bio: "Anubhav drives our technical vision and innovation strategy, leading cutting-edge technology initiatives that keep Qualrec Solutions at the forefront of digital transformation and emerging technologies." },
  { slug: "nitish-kumar", name: "Nitish Kumar", role: "Vice President of Operations",
    bio: "Nitish ensures operational excellence across all service delivery channels, focusing on scalable processes, client satisfaction, and strategic team development to maintain our industry-leading standards." },
  { slug: "hitanshu-rajput", name: "Hitanshu Rajput", role: "Head of Talent Acquisition",
    bio: "Hitanshu leads our global talent acquisition strategy, connecting exceptional IT professionals with clients across India and the United States, ensuring perfect alignment between technical expertise and organizational culture." },
];

const VALUES = [
  { icon: I.Award, title: "Excellence", body: "We strive for excellence in every project, delivering solutions that exceed expectations and drive measurable results." },
  { icon: I.Users, title: "Collaboration", body: "We believe in the power of teamwork, fostering collaborative relationships with clients and within our organization." },
  { icon: I.Heart, title: "Integrity", body: "We conduct business with the highest ethical standards, building trust through transparency and honest communication." },
  { icon: I.Zap, title: "Innovation", body: "We embrace cutting-edge technologies and methodologies to provide innovative solutions for complex challenges." },
];

const JOURNEY = [
  { year: "2015", title: "Foundation", body: "Avinash Singh and Rajesh Pal launched the company in NOIDA with a mission to bridge the gap between talent and opportunity." },
  { year: "2019–2022", title: "Crisis & Resilience", body: "Through the COVID-19 pandemic we leaned into innovation and empathy — restructuring our pipeline and retaining major partnerships." },
  { year: "2023–2024", title: "Growth Amid Uncertainty", body: "Amid tech-industry layoffs we introduced adaptive, career-first strategies that helped us grow while others downsized." },
  { year: "2025–26", title: "Global Excellence", body: "Today Qualrec operates with 1000+ consultants across India and the United States, serving Fortune 500 and growing enterprises." },
];

function Avatar({ slug, name, founder }) {
  const [failed, setFailed] = React.useState(false);
  const initials = name.split(" ").map((w) => w[0]).slice(0, 2).join("");
  return el("div", { style: { position: "relative", aspectRatio: "1 / 1", borderRadius: "14px", overflow: "hidden", background: "var(--tint)" } },
    !failed && /* eslint-disable-next-line @next/next/no-img-element */ el("img", { src: "/team/" + slug + ".jpg", alt: name, loading: "lazy", onError: () => setFailed(true), style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
    failed && el("div", { style: { position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #E7EFFE, #EFF6FF)" } },
      el("span", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "38px", color: "var(--brand)", letterSpacing: "-0.02em" } }, initials)),
    founder && el("span", { style: { position: "absolute", top: "12px", left: "12px", background: "var(--brand)", color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 10px", borderRadius: "999px" } }, "Founder"));
}

function PageHero({ title, lead }) {
  return el("section", { style: { background: "var(--gradient-brand)" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "84px 24px 88px", textAlign: "center" } },
      el(Reveal, { as: "h1", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, title),
      el(Reveal, { delay: 80, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "62ch", marginInline: "auto", lineHeight: 1.55 } }, lead)));
}

export default function AboutView() {
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");

  return el("div", null,
    el(PageHero, { title: "About Qualrec Solutions", lead: "Since 2015, Qualrec has connected skilled tech talent to enterprises across borders — combining deep technical vetting with a global sourcing pipeline." }),

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

    // Leadership
    el("section", { id: "leadership", style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Leadership team", title: "The people who guide our strategy", lead: "Experienced professionals leading our vision and operational excellence." }),
        el("div", { style: { marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          TEAM.map((p, i) =>
            el(Reveal, { key: i, delay: (i % 4) * 70, style: { background: "#fff", border: `1px solid ${p.founder ? "var(--brand-15)" : "var(--hairline)"}`, borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column" } },
              el("div", { style: { padding: "16px 16px 0" } }, el(Avatar, { slug: p.slug, name: p.name, founder: p.founder })),
              el("div", { style: { padding: "18px 20px 22px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 } },
                el("h3", { style: { fontSize: "18px" } }, p.name),
                el("div", { style: { color: "var(--brand)", fontSize: "13.5px", fontWeight: 600 } }, p.role),
                el("p", { style: { margin: "4px 0 0", fontSize: "13.5px", lineHeight: 1.55, color: "var(--body)" } }, p.bio),
                el("div", { style: { marginTop: "auto", paddingTop: "14px", display: "flex", gap: "10px" } },
                  p.linkedin && el("a", { href: p.linkedin, target: "_blank", rel: "noopener noreferrer", "aria-label": p.name + " on LinkedIn",
                    onMouseEnter: (e) => { e.currentTarget.style.background = "var(--brand)"; e.currentTarget.style.color = "#fff"; },
                    onMouseLeave: (e) => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.color = "var(--muted)"; },
                    style: { width: "34px", height: "34px", borderRadius: "9px", background: "var(--surface-2)", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s, color .2s" } }, el(I.Linkedin, { size: 16 })),
                  el("a", { href: "mailto:info@qualrecsol.com", "aria-label": "Email " + p.name,
                    onMouseEnter: (e) => { e.currentTarget.style.background = "var(--brand)"; e.currentTarget.style.color = "#fff"; },
                    onMouseLeave: (e) => { e.currentTarget.style.background = "var(--surface-2)"; e.currentTarget.style.color = "var(--muted)"; },
                    style: { width: "34px", height: "34px", borderRadius: "9px", background: "var(--surface-2)", color: "var(--muted)", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s, color .2s" } }, el(I.Mail, { size: 16 }))))))))),

    // Journey timeline
    el("section", { id: "story", style: { background: "var(--brand-ink)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "920px", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Our journey", title: "From three founders to a global firm", tone: "dark" }),
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
    el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff" } }, "Want to work with us?"),
        el(Reveal, { delay: 80, style: { marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Get in touch"),
          el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("careers") }, "View careers")))));
}
