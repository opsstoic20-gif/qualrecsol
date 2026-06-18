"use client";
import React from "react";
import { useActionState } from "react";
import { QR } from "@/components/ui";
import { Icons as I } from "@/components/icons";
import { submitContact } from "@/app/actions/contact";
import { SITE } from "@/lib/content/site";

const el = React.createElement;
const initial = { ok: false };

export default function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const fe = state.fieldErrors || {};

  if (state.ok) {
    return el("div", { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "18px", padding: "44px 34px", boxShadow: "var(--shadow-sm)", textAlign: "center" } },
      el("div", { style: { width: "56px", height: "56px", margin: "0 auto 18px", borderRadius: "50%", background: "rgba(16,185,129,0.12)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center" } }, el(I.Check, { size: 28 })),
      el("h3", { style: { fontSize: "22px", marginBottom: "8px" } }, "Message sent"),
      el("p", { style: { margin: 0, color: "var(--body)", fontSize: "15px", lineHeight: 1.6 } }, "Thanks for reaching out — we'll be in touch within 24 hours."));
  }

  return el("form", { action: formAction, noValidate: true, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "18px", padding: "34px", boxShadow: "var(--shadow-sm)" } },
    el("h3", { style: { fontSize: "24px", marginBottom: "24px" } }, "Send us a message"),
    el("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px 16px" }, className: "qr-why-grid" },
      el(QR.Input, { label: "Full name", name: "full_name", placeholder: "John Doe", error: fe.full_name, required: true }),
      el(QR.Input, { label: "Email address", name: "email", type: "email", placeholder: "john@company.com", error: fe.email, required: true }),
      el(QR.Input, { label: "Company", name: "company", placeholder: "Your company", error: fe.company }),
      el(QR.Input, { label: "Phone number", name: "phone", placeholder: "+1 (555) 123-4567", error: fe.phone })),
    el("div", { style: { marginTop: "18px" } },
      el(QR.Select, { label: "Service of interest", name: "service_interest", placeholder: "Select a service", options: SITE.serviceOptions })),
    el("div", { style: { marginTop: "18px", display: "flex", flexDirection: "column", gap: "7px" } },
      el("label", { htmlFor: "qr-msg", style: { fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" } }, "Message ", el("span", { style: { color: "var(--brand)" } }, "*")),
      el("textarea", { id: "qr-msg", name: "message", rows: 5, placeholder: "Tell us about your project or requirements…", style: { fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink)", padding: "12px 14px", borderRadius: "10px", border: `1px solid ${fe.message ? "#DC2626" : "var(--hairline)"}`, resize: "vertical", outline: "none", width: "100%", boxSizing: "border-box" } }),
      fe.message && el("span", { style: { fontSize: "13px", color: "#DC2626" } }, fe.message)),
    // Honeypot — visually hidden, off-screen, not focusable.
    el("div", { "aria-hidden": "true", style: { position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" } },
      el("label", null, "Company URL", el("input", { type: "text", name: "company_url", tabIndex: -1, autoComplete: "off" }))),
    state.error && el("div", { role: "alert", style: { marginTop: "16px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", color: "#B91C1C", borderRadius: "10px", padding: "12px 16px", fontSize: "14px" } }, state.error),
    el("div", { style: { marginTop: "24px" } },
      el(QR.Button, { variant: "primary", size: "lg", type: "submit", disabled: pending, iconRight: el(I.ArrowRight, { size: 18 }), style: { width: "100%" } }, pending ? "Sending…" : "Send message")));
}
