"use client";
/* Careers — dynamic notice board. Reads published jobs (passed as prop from the
   server page) and opens the ApplyForm modal. Written empty state when no jobs. */
import React from "react";
import { useRouter } from "next/navigation";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import { ROUTES } from "@/lib/nav";
import ApplyForm from "@/components/forms/ApplyForm";
import { SITE } from "@/lib/content/site";

const el = React.createElement;
const Head = QR.SectionHead;

const PERKS = [
  { icon: I.HeartPulse, title: "Health & Wellness", body: "Comprehensive health insurance, dental, vision, and wellness programs." },
  { icon: I.Scale, title: "Competitive Compensation", body: "Market-leading salaries, performance bonuses, and equity participation." },
  { icon: I.Clock, title: "Work-Life Balance", body: "Flexible hours, remote work options, and a generous PTO policy." },
  { icon: I.TrendingUp, title: "Professional Growth", body: "Training budget, certifications, conference attendance, and mentorship." },
  { icon: I.Users, title: "Great Team Culture", body: "Collaborative environment, team events, and an inclusive workplace." },
  { icon: I.Zap, title: "Innovation Focus", body: "Latest technologies, innovation time, and opportunity to lead initiatives." },
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

function JobCard({ job, onApply }) {
  return el(Reveal, { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "26px 28px", boxShadow: "var(--shadow-sm)", display: "flex", flexDirection: "column", gap: "14px" } },
    el("div", { style: { display: "flex", justifyContent: "space-between", gap: "12px", alignItems: "start" } },
      el("div", null,
        el("h3", { style: { fontSize: "19px" } }, job.title),
        el("div", { style: { color: "var(--brand)", fontSize: "13.5px", fontWeight: 600, marginTop: "4px" } }, job.category)),
      el(QR.Badge, { tone: "success" }, job.employment_type)),
    el("div", { style: { display: "flex", flexWrap: "wrap", gap: "16px", color: "var(--muted)", fontSize: "13.5px" } },
      el("span", { style: { display: "flex", alignItems: "center", gap: "6px" } }, el(I.MapPin, { size: 15 }), job.location),
      job.salary_range && el("span", { style: { display: "flex", alignItems: "center", gap: "6px" } }, el(I.TrendingUp, { size: 15 }), job.salary_range)),
    job.summary && el("p", { style: { margin: 0, fontSize: "14px", lineHeight: 1.55, color: "var(--body)" } }, job.summary),
    job.requirements && job.requirements.length > 0 && el("div", null,
      el("div", { style: { fontSize: "13px", fontWeight: 600, color: "var(--ink)", marginBottom: "8px" } }, "Key requirements"),
      el("ul", { style: { margin: 0, padding: 0, display: "grid", gap: "8px" } }, job.requirements.map((r, k) => el(QR.CheckItem, { key: k, style: { fontSize: "13.5px" } }, r)))),
    el(QR.Button, { variant: "primary", onClick: () => onApply({ id: job.id, title: job.title }), iconRight: el(I.ArrowRight, { size: 16 }), style: { width: "100%", marginTop: "auto" } }, "Apply now"));
}

export default function CareersView({ jobs }) {
  jobs = Array.isArray(jobs) ? jobs : [];
  const router = useRouter();
  const onNavigate = (id) => router.push(ROUTES[id] || "/");
  const [applyFor, setApplyFor] = React.useState(undefined); // undefined = closed; null = general; {id,title} = job

  return el("div", null,
    el(PageHero, { title: "Join our team", lead: "Build your career with a leading IT consulting firm. Work on challenging projects, grow your skills, and make a meaningful impact for Fortune 500 clients." }),
    el(StatBand, { stats: [["1000", "+", "Team Members"], ["95", "%", "Employee Satisfaction"], ["4.8", "/5", "Glassdoor Rating"], ["2.5", "y", "Avg Tenure"]] }),

    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Open positions", title: "Find your next role", lead: jobs.length ? "Current openings across our organization." : undefined }),

        jobs.length > 0
          ? el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }, className: "qr-svc-grid" },
              jobs.map((j) => el(JobCard, { key: j.id, job: j, onApply: setApplyFor })))
          : el(Reveal, { style: { marginTop: "40px", textAlign: "center", background: "#fff", border: "1px dashed var(--border-strong)", borderRadius: "16px", padding: "48px 32px", maxWidth: "640px", marginInline: "auto" } },
              el("div", { style: { width: "52px", height: "52px", margin: "0 auto 18px", borderRadius: "14px", background: "var(--tint)", color: "var(--brand)", display: "flex", alignItems: "center", justifyContent: "center" } }, el(I.Briefcase, { size: 24 })),
              el("h3", { style: { fontSize: "20px", marginBottom: "10px" } }, "No open roles right now"),
              el("p", { style: { margin: "0 0 22px", color: "var(--body)", fontSize: "15px", lineHeight: 1.6 } }, "Send your profile to ", el("strong", { style: { color: "var(--ink)" } }, SITE.careersEmail), " and we'll reach out when something fits."),
              el(QR.Button, { variant: "primary", onClick: () => setApplyFor(null), iconRight: el(I.ArrowRight, { size: 16 }) }, "Submit your profile")),

        jobs.length > 0 && el(Reveal, { style: { marginTop: "40px", textAlign: "center", background: "#fff", border: "1px dashed var(--border-strong)", borderRadius: "16px", padding: "32px" } },
          el("p", { style: { margin: "0 0 16px", color: "var(--body)", fontSize: "var(--fs-body)" } }, "Don't see a perfect match? Send your profile to ", el("strong", { style: { color: "var(--ink)" } }, SITE.careersEmail), " and we'll reach out when something fits."),
          el(QR.Button, { variant: "secondary", onClick: () => setApplyFor(null), iconRight: el(I.ArrowRight, { size: 16 }) }, "Submit your profile")))),

    // Perks
    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Why work with us", title: "Benefits that support your best work" }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          PERKS.map((p, i) => el(Reveal, { key: i, delay: (i % 3) * 60 }, el(QR.Card, { icon: el(p.icon, { size: 22 }), title: p.title, interactive: true, style: { height: "100%" } }, p.body)))))),

    // CTA
    el("section", { style: { background: "var(--gradient-brand)", padding: "84px 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", textAlign: "center" } },
        el(Reveal, { as: "h2", style: { color: "#fff", maxWidth: "20ch", margin: "0 auto" } }, "Don't see the right role yet?"),
        el(Reveal, { delay: 80, style: { marginTop: "28px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" } },
          el(QR.Button, { variant: "secondary", size: "lg", onClick: () => setApplyFor(null), iconRight: el(I.ArrowRight, { size: 18 }) }, "Submit your profile"),
          el(QR.Button, { variant: "ghost", size: "lg", onClick: () => onNavigate("contact") }, "Contact us")))),

    applyFor !== undefined && el(ApplyForm, { job: applyFor, onClose: () => setApplyFor(undefined) }));
}
