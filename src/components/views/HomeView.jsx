"use client";
/* Home — ported from the Claude Design Home.jsx + HomeExtra.jsx.
   Hero stock video swapped for a performant cinematic gradient/aurora layer. */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";
import Globe from "@/components/globe/Globe";
import VendorWall from "@/components/sections/VendorWall";

const el = React.createElement;
const Head = QR.SectionHead;

// PLACEHOLDER copy (testimonials / clients / insights) — replace with verified content before real-domain launch.
const SERVICES = [
  { icon: I.Users, title: "Contract-to-Hire", body: "Try-before-you-hire placements that de-risk every hire. Convert when the fit is proven.", flagship: true },
  { icon: I.Briefcase, title: "Direct Hire", body: "Permanent placement of vetted senior talent, sourced globally and matched precisely." },
  { icon: I.Layers, title: "Staff Augmentation", body: "Scale your team with contract specialists who ship from day one." },
  { icon: I.Target, title: "RPO", body: "We run all or part of your recruiting function as an extension of your team." },
  { icon: I.Globe, title: "Payroll / EOR", body: "Compliant employment and payroll for global talent, handled end to end." },
];
const EXPERTISE = ["Software Engineering", "Cloud & DevOps", "Data & AI", "Cybersecurity", "Product & Design", "QA & Automation", "ERP & Salesforce", "Program Management", "Network & Infrastructure", "Mobile Development"];
const WHY = [
  "Proven track record with Fortune 500 companies",
  "Vetted, certified experts in current technologies",
  "Try-before-you-hire de-risks every placement",
  "Dedicated recruiter on every engagement",
  "Global sourcing pipeline, mostly from India",
  "Flexible engagement models that fit your needs",
];
const TESTIMONIALS = [
  { quote: "Qualrec transformed our IT infrastructure. Their expertise in cloud migration saved us 40% in operational costs.", name: "Sarah Johnson", role: "CTO, TechCorp Inc." },
  { quote: "The staff augmentation services helped us scale our development team efficiently and cost-effectively.", name: "Michael Chen", role: "IT Director, HealthPlus" },
  { quote: "Outstanding cybersecurity consulting. They identified vulnerabilities we never knew existed and fixed them.", name: "Emily Rodriguez", role: "VP Technology, RetailMax" },
];
const CLIENTS = ["Northwind Health", "Meridian Bank", "Atlas Manufacturing", "Brightwave Retail", "Sterling Public Sector", "Vantage Fintech", "Cedar Insurance", "Orbit Logistics", "Helix Biotech", "Summit Energy"];
const STEPS = [
  { n: "01", t: "Requirement", d: "We meet your team, learn the role, the stack, and the culture — and agree on what 'great' looks like." },
  { n: "02", t: "Sourced", d: "Our recruiters tap a vetted global pipeline, mostly from India, to surface candidates within days." },
  { n: "03", t: "Vetted", d: "Technical screening, references, and culture-fit checks — only the strongest profiles reach you." },
  { n: "04", t: "Placed", d: "You interview a tight shortlist and place on contract, with onboarding handled end to end." },
  { n: "05", t: "Converted", d: "See the work firsthand, then convert to a permanent hire when the fit is proven." },
];
const INDS = [
  { icon: I.HeartPulse, name: "Healthcare" }, { icon: I.Landmark, name: "Financial Services" },
  { icon: I.Factory, name: "Manufacturing" }, { icon: I.ShoppingCart, name: "Retail & E-commerce" },
  { icon: I.Landmark, name: "Government" }, { icon: I.Cloud, name: "Technology" },
];
const FEATURED = [
  { img: "healthcare", tag: "Healthcare", title: "Regional Hospital EHR Modernization", stat: "40% less documentation time" },
  { img: "financial", tag: "Financial Services", title: "Community Bank Digital Transformation", stat: "300% digital adoption" },
  { img: "cybersecurity", tag: "Cybersecurity", title: "FinTech Security Overhaul", stat: "SOC 2 Type II achieved" },
];
const POSTS = [
  { cat: "Hiring", title: "Why contract-to-hire de-risks senior engineering hires", date: "Jun 2026", read: "5 min read" },
  { cat: "Global talent", title: "Building distributed teams across India and the US", date: "May 2026", read: "7 min read" },
  { cat: "Cybersecurity", title: "What enterprise buyers should ask before a SOC engagement", date: "Apr 2026", read: "4 min read" },
];
const FAQS = [
  ["How fast can you deliver a shortlist?", "For most roles we surface a vetted shortlist within 72 hours, drawing on an active global pipeline rather than starting a search from scratch."],
  ["What does contract-to-hire actually mean?", "You bring a vetted specialist on as a contractor, see the work firsthand, and convert them to a permanent employee when the fit is proven — de-risking the hire."],
  ["Where is your talent sourced from?", "Primarily from India, with consultants placed across the United States. We handle compliant employment, payroll, and onboarding end to end."],
  ["Do you replace a placement that doesn't work out?", "Yes. Direct-hire placements carry a 90-day guarantee, and contract engagements include a no-risk replacement if a fit isn't right."],
  ["Which engagement models do you offer?", "Contract-to-Hire, Direct Hire, Staff Augmentation, RPO, and Payroll/EOR — chosen to match how you want to hire."],
];

export default function HomeView() {
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");

  // ---- Hero (cinematic gradient, no stock video) ----
  function Hero() {
    return el("section", { style: { position: "relative", background: "var(--brand-ink)", overflow: "hidden" } },
      // Background video (decorative). Falls back to the brand-ink base if it can't load.
      el("video", { autoPlay: true, muted: true, loop: true, playsInline: true, preload: "auto", "aria-hidden": "true", style: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 0, opacity: 0.2 } },
        el("source", { src: "/hero-bg.mp4", type: "video/mp4" })),
      // Matte legibility veil (flat, low-sheen — keeps copy crisp over the dim video).
      el("div", { "aria-hidden": "true", style: { position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(110deg, rgba(10,21,40,0.82) 0%, rgba(10,21,40,0.55) 60%, rgba(10,21,40,0.42) 100%)", pointerEvents: "none" } }),
      el("div", { className: "qr-grid", "aria-hidden": "true", style: { position: "absolute", inset: 0, zIndex: 1, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "64px 64px", maskImage: "radial-gradient(circle at 78% 8%, #000, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 78% 8%, #000, transparent 70%)", pointerEvents: "none", opacity: 0.45 } }),
      // Fade the bottom edge to white so the hero melts into the page.
      el("div", { "aria-hidden": "true", style: { position: "absolute", left: 0, right: 0, bottom: 0, height: "32%", zIndex: 1, background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 45%, #FFFFFF 100%)", pointerEvents: "none" } }),
      el("div", { className: "qr-hero-pad", style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "118px 24px 140px", position: "relative", zIndex: 2 } },
        el("div", { style: { maxWidth: "760px" } },
          el("div", { className: "qr-rise", style: { animationDelay: "0ms" } }, el(QR.Eyebrow, { tone: "onDark" }, "IT Talent & Solutions")),
          el("h1", { className: "qr-rise", style: { animationDelay: "80ms", marginTop: "20px", color: "#fff", maxWidth: "13ch" } },
            "Talent that fits. ", el("span", { style: { color: "#93B4F7" } }, "Hires that stick.")),
          el("p", { className: "qr-rise", style: { animationDelay: "150ms", marginTop: "22px", fontSize: "var(--fs-lead)", lineHeight: 1.55, color: "rgba(255,255,255,0.82)", maxWidth: "60ch" } },
            "We connect skilled tech talent to enterprises across borders — and our contract-to-hire model lets you try before you commit, so every hire is the right one."),
          el("div", { className: "qr-rise", style: { animationDelay: "220ms", marginTop: "34px", display: "flex", flexWrap: "wrap", gap: "14px" } },
            el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Get Started"),
            el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("services") }, "Explore Services"))),
        el("div", { className: "qr-rise", style: { animationDelay: "300ms", marginTop: "72px", maxWidth: "880px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "18px", padding: "30px 34px", backdropFilter: "blur(4px)" } },
          el("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" } },
            el("span", { style: { fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)" } }, "The Contract-to-Hire pipeline")),
          el(QR.Pipeline, { tone: "dark" }))));
  }

  function StatStrip() {
    const stats = [["500", "+", "Projects Completed"], ["98", "%", "Client Satisfaction"], ["1000", "+", "Expert Consultants"], ["50", "+", "Fortune 500 Clients"]];
    return el("div", { style: { maxWidth: "var(--container-max)", margin: "-64px auto 0", padding: "0 24px", position: "relative", zIndex: 10 } },
      el(Reveal, { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "18px", boxShadow: "var(--shadow-md)", padding: "36px 28px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }, className: "qr-statstrip" },
        stats.map(([v, s, l], i) =>
          el("div", { key: i, style: { textAlign: "center", borderLeft: i ? "1px solid var(--hairline)" : "none" }, className: "qr-statcell" },
            el(QR.StatCounter, { value: Number(v), suffix: s, label: l, style: { alignItems: "center" } })))));
  }

  function Clients() {
    const row = (items, reverse) =>
      el("div", { className: "qr-tst-track", style: { display: "flex", gap: "56px", paddingRight: "56px", width: "max-content", animation: `qrMarquee${reverse ? "Rev" : ""} 38s linear infinite` } },
        items.concat(items).map((c, i) => el("span", { key: i, style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "22px", color: "#94A3B8", letterSpacing: "-0.01em", flex: "0 0 auto" } }, c)));
    return el("section", { style: { background: "#fff", padding: "56px 0", borderBottom: "1px solid var(--hairline)" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Reveal, { style: { textAlign: "center", marginBottom: "32px" } },
          el("span", { style: { fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" } }, "Trusted by enterprise teams across industries"))),
      el("div", { className: "qr-tst-marquee", style: { overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)" } }, row(CLIENTS, false)),
      el("p", { style: { textAlign: "center", fontSize: "12px", color: "var(--muted)", marginTop: "26px", opacity: 0.7 } }, "Client names shown are illustrative placeholders."));
  }

  function Services() {
    return el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "How we place talent", title: "Five ways to build your team", lead: "From a single contract specialist to a fully managed recruiting function — matched to how you want to hire." }),
        el("div", { style: { marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          SERVICES.map((s, i) =>
            el(Reveal, { key: i, delay: (i % 3) * 70 },
              el(QR.Card, { icon: el(s.icon, { size: 22 }), title: s.title, href: ROUTES.services, linkLabel: "Learn more", onClick: (e) => { e.preventDefault(); onNavigate("services"); }, badge: s.flagship ? "Flagship" : undefined, featured: s.flagship, style: { height: "100%" } }, s.body))))));
  }

  function Process() {
    return el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "How we work", title: "From requirement to converted hire", lead: "One disciplined pipeline — the same five steps behind every placement we make." }),
        el("div", { style: { marginTop: "56px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "20px", position: "relative" }, className: "qr-proc-grid" },
          el("div", { "aria-hidden": "true", style: { position: "absolute", top: "26px", left: "10%", right: "10%", height: "2px", background: "var(--hairline)" }, className: "qr-proc-line" }),
          STEPS.map((s, i) =>
            el(Reveal, { key: i, delay: i * 80, style: { display: "flex", flexDirection: "column", gap: "14px", position: "relative" } },
              el("div", { style: { width: "52px", height: "52px", borderRadius: "50%", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "17px", boxShadow: "0 0 0 6px #fff, 0 0 0 7px var(--hairline)" } }, s.n),
              el("h3", { style: { fontSize: "17px" } }, s.t),
              el("p", { style: { margin: 0, fontSize: "14px", lineHeight: 1.55, color: "var(--body)" } }, s.d))))));
  }

  function Why() {
    return el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }, className: "qr-why-grid" },
        el("div", null,
          el(Reveal, null, el(QR.Eyebrow, null, "Why Qualrec")),
          el(Reveal, { delay: 60, as: "h2", style: { marginTop: "14px" } }, "A decade of placing talent that performs"),
          el(Reveal, { delay: 120, as: "p", style: { marginTop: "16px", fontSize: "var(--fs-lead)", color: "var(--body)", lineHeight: 1.55 } }, "We pair deep technical vetting with a global sourcing pipeline, so the people we place are productive from week one."),
          el("ul", { style: { marginTop: "28px", padding: 0, display: "grid", gap: "14px" } }, WHY.map((w, i) => el(Reveal, { key: i, delay: 60 * i, as: "div" }, el(QR.CheckItem, null, w)))),
          el(Reveal, { delay: 120, style: { marginTop: "32px" } }, el(QR.Button, { variant: "primary", onClick: () => onNavigate("about"), iconRight: el(I.ArrowRight, { size: 16 }) }, "Learn more about us"))),
        el(Reveal, { delay: 120, style: { background: "var(--gradient-brand)", borderRadius: "20px", padding: "44px 40px", color: "#fff" } },
          el("div", { style: { fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.62)", marginBottom: "26px" } }, "From requirement to converted hire"),
          el(QR.Pipeline, { tone: "dark" }),
          el("div", { style: { marginTop: "40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "28px" } },
            [["72h", "Median time to first shortlist"], ["91%", "Contract-to-hire conversion"]].map(([n, l], i) =>
              el("div", { key: i },
                el("div", { style: { fontFamily: "var(--font-display)", fontSize: "40px", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 } }, n),
                el("div", { style: { marginTop: "8px", fontSize: "13.5px", color: "rgba(255,255,255,0.72)", lineHeight: 1.4 } }, l)))))));
  }

  function IndustriesPreview() {
    return el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Industries", title: "Deep expertise where you operate", lead: "Specialized teams that already speak your domain, its regulations, and its stack." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "16px" }, className: "qr-exp-grid" },
          INDS.map((ind, i) =>
            el(Reveal, { key: i, delay: (i % 6) * 50, onClick: () => onNavigate("industries"),
              style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "14px", padding: "24px 18px", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", textAlign: "center", cursor: "pointer", transition: "border-color .2s, transform .2s, box-shadow .2s" },
              onMouseEnter: (e) => { e.currentTarget.style.borderColor = "var(--brand-15)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; },
              onMouseLeave: (e) => { e.currentTarget.style.borderColor = "var(--hairline)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; } },
              el("div", { style: { width: "48px", height: "48px", borderRadius: "12px", background: "var(--tint)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" } }, el(ind.icon, { size: 24 })),
              el("span", { style: { fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" } }, ind.name)))),
        el(Reveal, { delay: 120, style: { marginTop: "36px", textAlign: "center" } },
          el(QR.Button, { variant: "secondary", onClick: () => onNavigate("industries"), iconRight: el(I.ArrowRight, { size: 16 }) }, "Explore industries"))));
  }

  function CasePreview() {
    return el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "24px", flexWrap: "wrap" } },
          el("div", { style: { maxWidth: "560px" } },
            el(Reveal, null, el(QR.Eyebrow, null, "Case studies")),
            el(Reveal, { delay: 60, as: "h2", style: { marginTop: "14px" } }, "Outcomes we've delivered"),
            el(Reveal, { delay: 120, as: "p", style: { marginTop: "16px", fontSize: "var(--fs-lead)", color: "var(--body)", lineHeight: 1.55 } }, "Real engagements across the industries we serve.")),
          el(Reveal, { delay: 120 }, el(QR.Button, { variant: "secondary", onClick: () => onNavigate("case-studies"), iconRight: el(I.ArrowRight, { size: 16 }) }, "View all"))),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          FEATURED.map((c, i) =>
            el(Reveal, { key: i, delay: (i % 3) * 70, onClick: () => onNavigate("case-studies"),
              style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", overflow: "hidden", boxShadow: "var(--shadow-sm)", cursor: "pointer", transition: "transform .2s, box-shadow .2s, border-color .2s" },
              onMouseEnter: (e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; e.currentTarget.style.borderColor = "var(--brand-15)"; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; e.currentTarget.style.borderColor = "var(--hairline)"; } },
              el("div", { style: { position: "relative", aspectRatio: "16 / 10", overflow: "hidden" } },
                /* eslint-disable-next-line @next/next/no-img-element */
                el("img", { src: "/case-studies/" + c.img + ".jpg", alt: c.title, loading: "lazy", style: { width: "100%", height: "100%", objectFit: "cover", display: "block" } }),
                el("span", { style: { position: "absolute", top: "14px", left: "14px", background: "rgba(11,31,77,0.85)", color: "#fff", fontSize: "11px", fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", padding: "6px 11px", borderRadius: "999px", backdropFilter: "blur(4px)" } }, c.tag)),
              el("div", { style: { padding: "22px 24px" } },
                el("h3", { style: { fontSize: "18px", lineHeight: 1.3 } }, c.title),
                el("div", { style: { marginTop: "12px", display: "flex", alignItems: "center", gap: "8px", color: "var(--success)", fontSize: "14px", fontWeight: 600 } }, el(I.TrendingUp, { size: 16 }), c.stat)))))));
  }

  function Expertise() {
    return el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Areas of expertise", title: "Ten talent domains we know deeply", lead: "Specialized recruiters per domain means we speak your stack — and screen for it." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: "16px" }, className: "qr-exp-grid" },
          EXPERTISE.map((d, i) =>
            el(Reveal, { key: i, delay: (i % 5) * 50,
              style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "18px 18px", fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", display: "flex", alignItems: "center", gap: "10px", cursor: "default", transition: "border-color .2s, transform .2s" },
              onMouseEnter: (e) => { e.currentTarget.style.borderColor = "var(--brand-15)"; e.currentTarget.style.transform = "translateY(-2px)"; },
              onMouseLeave: (e) => { e.currentTarget.style.borderColor = "var(--hairline)"; e.currentTarget.style.transform = "none"; } },
              el("span", { style: { width: "7px", height: "7px", borderRadius: "50%", background: "var(--brand)", flex: "0 0 auto" } }), d))),
        el(Reveal, { delay: 120, style: { marginTop: "36px", textAlign: "center" } },
          el(QR.Button, { variant: "secondary", onClick: () => onNavigate("services"), iconRight: el(I.ArrowRight, { size: 16 }) }, "See all expertise"))));
  }

  function Impact() {
    const stats = [["12", "+", "Years in business"], ["15", "+", "Industries served"], ["850", "+", "Projects delivered"], ["92", "%", "Consultant retention"]];
    return el("section", { style: { background: "var(--brand-ink)", padding: "72px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Reveal, { style: { textAlign: "center", marginBottom: "44px" } },
          el(QR.Eyebrow, { tone: "onDark" }, "By the numbers"),
          el("h2", { style: { color: "#fff", marginTop: "12px" } }, "A track record that compounds")),
        el("div", { style: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "24px" }, className: "qr-statstrip" },
          stats.map(([v, s, l], i) => el("div", { key: i, style: { textAlign: "center", borderLeft: i ? "1px solid rgba(255,255,255,0.14)" : "none" }, className: "qr-statcell" },
            el(QR.StatCounter, { value: Number(v), suffix: s, label: l, tone: "onDark", style: { alignItems: "center" } }))))));
  }

  function Testimonials() {
    return el("section", { style: { background: "var(--brand-ink)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "What our clients say", title: "Trusted by teams that ship", tone: "dark" }),
        el("div", { style: { marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-tst-grid" },
          TESTIMONIALS.map((t, i) =>
            el(Reveal, { key: i, delay: i * 80, style: { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "16px", padding: "30px 28px", display: "flex", flexDirection: "column", gap: "18px" } },
              el("div", { style: { display: "flex", gap: "3px", color: "#FBBF24" } }, Array.from({ length: 5 }).map((_, k) => el(I.Star, { key: k, size: 16 }))),
              el("p", { style: { margin: 0, fontFamily: "var(--font-body)", fontSize: "16px", lineHeight: 1.6, color: "rgba(255,255,255,0.9)" } }, "“", t.quote, "”"),
              el("div", { style: { marginTop: "auto", paddingTop: "6px" } },
                el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "#fff" } }, t.name),
                el("div", { style: { fontSize: "13px", color: "rgba(255,255,255,0.6)", marginTop: "2px" } }, t.role))))),
        el("p", { style: { marginTop: "28px", textAlign: "center", fontSize: "12.5px", color: "rgba(255,255,255,0.4)" } }, "Testimonials shown are illustrative placeholders.")));
  }

  function Insights() {
    return el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Insights", title: "Ideas worth your time", lead: "Practical notes on hiring, global talent, and modern delivery." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          POSTS.map((p, i) =>
            el(Reveal, { key: i, delay: (i % 3) * 70,
              style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "14px", cursor: "pointer", transition: "transform .2s, box-shadow .2s" },
              onMouseEnter: (e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; },
              onMouseLeave: (e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; } },
              el(QR.Badge, { tone: "brand", style: { alignSelf: "flex-start" } }, p.cat),
              el("h3", { style: { fontSize: "19px", lineHeight: 1.35 } }, p.title),
              el("div", { style: { marginTop: "auto", display: "flex", gap: "12px", color: "var(--muted)", fontSize: "13px" } }, el("span", null, p.date), el("span", null, "·"), el("span", null, p.read)),
              el("span", { style: { display: "inline-flex", alignItems: "center", gap: "6px", color: "var(--brand)", fontSize: "14px", fontWeight: 600 } }, "Read article", el(I.ArrowRight, { size: 15 }))))),
        el("p", { style: { marginTop: "24px", textAlign: "center", fontSize: "12px", color: "var(--muted)", opacity: 0.8 } }, "Article previews are illustrative placeholders.")));
  }

  function FaqRow({ q, a }) {
    const [open, setOpen] = React.useState(false);
    return el("div", { style: { borderBottom: "1px solid var(--hairline)" } },
      el("button", { onClick: () => setOpen(!open), "aria-expanded": open, style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", padding: "22px 4px", background: "none", border: "none", cursor: "pointer", textAlign: "left" } },
        el("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "18px", color: "var(--ink)" } }, q),
        el("span", { style: { color: "var(--brand)", display: "flex", flex: "0 0 auto", transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" } }, el(I.ChevronDown, { size: 20 }))),
      el("div", { style: { maxHeight: open ? "240px" : "0", overflow: "hidden", transition: "max-height .3s var(--ease-out)" } },
        el("p", { style: { margin: "0", padding: "0 4px 22px", fontSize: "15.5px", lineHeight: 1.6, color: "var(--body)", maxWidth: "70ch" } }, a)));
  }

  function FAQ() {
    return el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "860px", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "FAQ", title: "Questions, answered" }),
        el("div", { style: { marginTop: "44px" } }, FAQS.map(([q, a], i) => el(Reveal, { key: i, delay: 20 }, el(FaqRow, { q, a }))))));
  }

  function GlobalNetwork() {
    return el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0", position: "relative", overflow: "hidden" } },
      el("div", { className: "qr-dots-ink", "aria-hidden": "true", style: { position: "absolute", inset: 0, opacity: 0.7, pointerEvents: "none" } }),
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", position: "relative", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }, className: "qr-why-grid" },
        el("div", null,
          el(Reveal, null, el(QR.Eyebrow, null, "Global Workforce")),
          el(Reveal, { delay: 60, as: "h2", style: { marginTop: "14px" } }, "Hire anywhere. We handle the rest."),
          el(Reveal, { delay: 120, as: "p", style: { marginTop: "16px", fontSize: "var(--fs-lead)", color: "var(--body)", lineHeight: 1.55 } }, "We source and place vetted talent across borders — and as your employer of record we own payroll, benefits, and compliance in-country. India and Mexico are hire-ready today, with four more markets opening through 2026."),
          el("div", { style: { marginTop: "28px", display: "flex", gap: "36px", flexWrap: "wrap" } },
            [["2", "Countries hire-ready"], ["4", "Markets opening 2026"], ["48h", "To a compliant offer"]].map(([n, l], i) =>
              el(Reveal, { key: i, delay: 60 * i },
                el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "32px", color: "var(--brand)", lineHeight: 1, letterSpacing: "-0.02em" } }, n),
                el("div", { style: { marginTop: "6px", fontSize: "13px", color: "var(--muted)" } }, l)))),
          el(Reveal, { delay: 160, style: { marginTop: "32px", display: "flex", gap: "12px", flexWrap: "wrap" } },
            el(QR.Button, { variant: "primary", onClick: () => onNavigate("global"), iconRight: el(I.ArrowRight, { size: 16 }) }, "Explore Global Workforce"),
            el(QR.Button, { variant: "secondary", onClick: () => onNavigate("contact") }, "Talk to an expert"))),
        el(Reveal, { delay: 120 }, el(Globe))));
  }

  function CTA() {
    return el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "18ch", margin: "0 auto" } }, "Ready to build your team?"),
        el(Reveal, { delay: 60, as: "p", style: { marginTop: "16px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "56ch", marginInline: "auto" } }, "Tell us what you need and we'll have a shortlist of vetted candidates in front of you within days."),
        el(Reveal, { delay: 120, style: { marginTop: "32px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Get Started"),
          el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("case-studies") }, "View our work"))));
  }

  return el("div", null,
    el(Hero), el(StatStrip), el(VendorWall), el(GlobalNetwork), el(Services), el(Process), el(Why),
    el(IndustriesPreview), el(Expertise), el(CasePreview), el(Impact),
    el(Testimonials), el(Insights), el(FAQ), el(CTA));
}
