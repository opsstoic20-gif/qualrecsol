"use client";
/* Services — ported from the Claude Design Services.jsx. Wired to Next routing. */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";

const el = React.createElement;
const Head = QR.SectionHead;

const MODELS = [
  { icon: I.Users, title: "Contract-to-Hire", flagship: true,
    body: "Our flagship model. Bring on a vetted specialist on contract, see the work firsthand, and convert to a permanent hire when the fit is proven — de-risking every decision.",
    points: ["Try-before-you-hire evaluation period", "Seamless conversion paperwork", "No-risk replacement guarantee"] },
  { icon: I.Briefcase, title: "Direct Hire",
    body: "Permanent placement of senior talent, sourced globally and screened against your exact stack and culture.",
    points: ["Executive and senior IC search", "Technical + culture vetting", "90-day placement guarantee"] },
  { icon: I.Layers, title: "Staff Augmentation",
    body: "Extend your team with contract specialists who are productive from day one and scale up or down as your roadmap shifts.",
    points: ["Flexible team scaling", "Pre-vetted bench", "Managed by your leads"] },
  { icon: I.Target, title: "RPO",
    body: "We run all or part of your recruiting function as an embedded extension of your team.",
    points: ["Embedded recruiters", "Employer-brand alignment", "Pipeline analytics"] },
  { icon: I.Globe, title: "Payroll / EOR",
    body: "Compliant employment, payroll, and benefits for global talent — handled end to end so you can hire anywhere.",
    points: ["Global compliance", "Multi-country payroll", "Benefits administration"] },
];

const IT_SOLUTIONS = [
  { icon: I.Code, title: "Application Development", body: "Custom software built with current technologies and proven engineering practices." },
  { icon: I.Cloud, title: "Cloud Services", body: "Migrate, optimize, and manage your cloud infrastructure with expert guidance." },
  { icon: I.BarChart, title: "Data & AI", body: "Turn data into actionable insight with modern analytics and ML pipelines." },
  { icon: I.Shield, title: "Cybersecurity", body: "Protect your assets with assessment, hardening, and implementation services." },
  { icon: I.Zap, title: "Project Consulting", body: "End-to-end program management for digital transformation initiatives." },
];

const EXPERTISE = [
  ["Software Engineering", ["Java", "Python", ".NET", "React", "Node", "Go"]],
  ["Cloud & DevOps", ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "CI/CD"]],
  ["Data & AI", ["Snowflake", "Databricks", "Spark", "LLMs", "Airflow", "dbt"]],
  ["Cybersecurity", ["SOC", "IAM", "Pen testing", "GRC", "SIEM", "Zero trust"]],
  ["ERP & Salesforce", ["SAP", "Workday", "Salesforce", "ServiceNow", "Oracle"]],
  ["Product & Design", ["PM", "UX research", "UI design", "Design systems"]],
];

function Expandable({ title, skills }) {
  const [open, setOpen] = React.useState(false);
  return el("div", { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "12px", overflow: "hidden" } },
    el("button", { onClick: () => setOpen(!open), "aria-expanded": open, style: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "18px 22px", background: "none", border: "none", cursor: "pointer", textAlign: "left" } },
      el("span", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "17px", color: "var(--ink)" } }, title),
      el("span", { style: { color: "var(--brand)", display: "flex", transform: open ? "rotate(180deg)" : "none", transition: "transform .25s" } }, el(I.ChevronDown, { size: 20 }))),
    el("div", { style: { maxHeight: open ? "200px" : "0", transition: "max-height .3s var(--ease-out)", overflow: "hidden" } },
      el("div", { style: { padding: "0 22px 20px", display: "flex", flexWrap: "wrap", gap: "8px" } }, skills.map((s, i) => el(QR.Badge, { key: i, tone: "neutral" }, s)))));
}

function PageHero({ onNavigate }) {
  return el("section", { style: { background: "var(--gradient-brand)" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "84px 24px 88px", textAlign: "center" } },
      el(Reveal, { as: "h1", style: { color: "#fff", maxWidth: "18ch", margin: "0 auto" } }, "Our services"),
      el(Reveal, { delay: 80, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "60ch", marginInline: "auto", lineHeight: 1.55 } },
        "From staffing models to full IT solutions — comprehensive services that drive digital transformation and business growth."),
      el(Reveal, { delay: 140, style: { marginTop: "30px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
        el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Get started today"))));
}

export default function ServicesView() {
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");

  return el("div", null,
    el(PageHero, { onNavigate }),

    // Staffing models
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Staffing models", title: "Five ways to build your team" }),
        el("div", { style: { marginTop: "52px", display: "flex", flexDirection: "column", gap: "20px" } },
          MODELS.map((m, i) =>
            el(Reveal, { key: i, delay: 30,
              style: { display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "28px", alignItems: "start", background: m.flagship ? "var(--surface-2)" : "#fff", border: `1px solid ${m.flagship ? "var(--brand-15)" : "var(--hairline)"}`, borderRadius: "18px", padding: "30px 32px" }, className: "qr-model-row" },
              el("div", { style: { width: "52px", height: "52px", borderRadius: "14px", background: "var(--tint)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" } }, el(m.icon, { size: 26 })),
              el("div", null,
                el("div", { style: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" } },
                  el("h3", { style: { fontSize: "22px" } }, m.title),
                  m.flagship && el(QR.Badge, { tone: "brand" }, "Flagship")),
                el("p", { style: { margin: "10px 0 0", fontSize: "var(--fs-body)", lineHeight: 1.6, color: "var(--body)", maxWidth: "62ch" } }, m.body)),
              el("ul", { style: { margin: 0, padding: 0, display: "grid", gap: "10px", minWidth: "240px" }, className: "qr-model-points" },
                m.points.map((p, k) => el(QR.CheckItem, { key: k, style: { fontSize: "14px" } }, p)))))))),

    // Areas of expertise (expandable)
    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Areas of expertise", title: "Specialized recruiters per domain", lead: "Expand a domain to see the skills we screen for." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }, className: "qr-why-grid" },
          EXPERTISE.map(([t, skills], i) => el(Reveal, { key: i, delay: (i % 2) * 60 }, el(Expandable, { title: t, skills })))))),

    // IT solutions
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "IT solutions", title: "Beyond staffing", lead: "When you need outcomes, not just headcount, our delivery teams take the build." }),
        el("div", { style: { marginTop: "52px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          IT_SOLUTIONS.map((s, i) => el(Reveal, { key: i, delay: (i % 3) * 70 }, el(QR.Card, { icon: el(s.icon, { size: 22 }), title: s.title, interactive: true, style: { height: "100%" } }, s.body)))))),

    // CTA
    el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff" } }, "Ready to transform your business?"),
        el(Reveal, { delay: 80, style: { marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => onNavigate("contact"), iconRight: el(I.ArrowRight, { size: 18 }) }, "Contact us today"),
          el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("case-studies") }, "View our work")))));
}
