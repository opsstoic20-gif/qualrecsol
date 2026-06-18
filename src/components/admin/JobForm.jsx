"use client";
import React from "react";
import Link from "next/link";
import { QR } from "@/components/ui";
import { saveJob } from "@/app/actions/admin";
import { EXPERTISE_CATEGORIES, EMPLOYMENT_TYPES } from "@/lib/content/site";

const el = React.createElement;

export default function JobForm(props) {
  const job = props.job;
  const editing = !!job;
  const labelStyle = { fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", display: "block", marginBottom: "7px" };
  const fieldStyle = { fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink)", background: "#fff", padding: "11px 14px", borderRadius: "10px", border: "1px solid var(--hairline)", outline: "none", width: "100%", boxSizing: "border-box" };

  const Field = (label, child) => el("div", null, el("label", { style: labelStyle }, label), child);

  return el("form", { action: saveJob, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "14px", boxShadow: "var(--shadow-sm)", padding: "28px" } },
    editing && el("input", { type: "hidden", name: "id", defaultValue: job.id }),
    el("h2", { style: { fontSize: "20px", marginBottom: "20px" } }, editing ? "Edit job" : "New job"),
    el("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 16px" } },
      Field("Title", el("input", { name: "title", required: true, defaultValue: job?.title || "", style: fieldStyle, placeholder: "Senior Full-Stack Developer" })),
      Field("Category", el("select", { name: "category", required: true, defaultValue: job?.category || EXPERTISE_CATEGORIES[0], style: { ...fieldStyle, cursor: "pointer" } }, EXPERTISE_CATEGORIES.map((c) => el("option", { key: c, value: c }, c)))),
      Field("Employment type", el("select", { name: "employment_type", defaultValue: job?.employment_type || EMPLOYMENT_TYPES[0], style: { ...fieldStyle, cursor: "pointer" } }, EMPLOYMENT_TYPES.map((c) => el("option", { key: c, value: c }, c)))),
      Field("Work mode", el("select", { name: "work_mode", defaultValue: job?.work_mode || "", style: { ...fieldStyle, cursor: "pointer" } }, ["", "Remote", "Hybrid", "Onsite"].map((c) => el("option", { key: c || "any", value: c }, c || "—")))),
      Field("Location", el("input", { name: "location", defaultValue: job?.location || "Remote", style: fieldStyle, placeholder: "Remote (US)" })),
      Field("Salary range", el("input", { name: "salary_range", defaultValue: job?.salary_range || "", style: fieldStyle, placeholder: "$120k – $150k" }))),
    el("div", { style: { marginTop: "18px" } }, Field("Summary", el("textarea", { name: "summary", rows: 2, defaultValue: job?.summary || "", style: { ...fieldStyle, resize: "vertical" }, placeholder: "One or two sentences shown on the careers card." }))),
    el("div", { style: { marginTop: "18px" } }, Field("Description (optional)", el("textarea", { name: "description", rows: 3, defaultValue: job?.description || "", style: { ...fieldStyle, resize: "vertical" } }))),
    el("div", { style: { marginTop: "18px" } }, Field("Requirements (one per line)", el("textarea", { name: "requirements", rows: 4, defaultValue: (job?.requirements || []).join("\n"), style: { ...fieldStyle, resize: "vertical" }, placeholder: "5+ years React / Node.js\nCloud experience (AWS or Azure)" }))),
    el("label", { style: { display: "flex", alignItems: "center", gap: "10px", marginTop: "18px", fontSize: "14.5px", color: "var(--ink)", cursor: "pointer" } },
      el("input", { type: "checkbox", name: "is_published", defaultChecked: job?.is_published || false, style: { width: "18px", height: "18px" } }), "Published (visible on the public careers page)"),
    el("div", { style: { marginTop: "24px", display: "flex", gap: "12px" } },
      el(QR.Button, { type: "submit", variant: "primary" }, editing ? "Save changes" : "Create job"),
      el(Link, { href: "/admin/jobs", style: { display: "inline-flex", alignItems: "center", padding: "12px 20px", borderRadius: "10px", border: "1px solid var(--hairline)", color: "var(--ink)", fontSize: "15px", fontWeight: 600 } }, "Cancel")));
}
