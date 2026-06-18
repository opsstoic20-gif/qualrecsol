"use client";
import React from "react";
import { useActionState } from "react";
import { QR } from "@/components/ui";
import { Icons as I } from "@/components/icons";
import { submitApplication } from "@/app/actions/application";

const el = React.createElement;
const initial = { ok: false };

/* Modal apply form. Pass { job: {id?, title} | null, onClose }.
   When job is null but open, treat as a general application. */
export default function ApplyForm({ job, onClose }) {
  const [state, formAction, pending] = useActionState(submitApplication, initial);
  const fe = state.fieldErrors || {};

  React.useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const title = job?.title || "General application";

  return el("div", { role: "dialog", "aria-modal": "true", "aria-label": `Apply: ${title}`, onClick: onClose,
    style: { position: "fixed", inset: 0, zIndex: 200, background: "rgba(11,31,77,0.55)", backdropFilter: "blur(4px)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "32px 16px", overflowY: "auto" } },
    el("div", { onClick: (e) => e.stopPropagation(), style: { background: "#fff", borderRadius: "18px", width: "100%", maxWidth: "560px", boxShadow: "var(--shadow-md)", overflow: "hidden" } },
      el("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", padding: "26px 28px 0" } },
        el("div", null,
          el("div", { style: { fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--brand)" } }, "Apply now"),
          el("h3", { style: { fontSize: "22px", marginTop: "6px" } }, title)),
        el("button", { onClick: onClose, "aria-label": "Close", style: { background: "none", border: "none", cursor: "pointer", color: "var(--muted)", padding: "4px" } }, el(I.X, { size: 22 }))),

      state.ok
        ? el("div", { style: { padding: "30px 28px 40px", textAlign: "center" } },
            el("div", { style: { width: "56px", height: "56px", margin: "8px auto 18px", borderRadius: "50%", background: "rgba(16,185,129,0.12)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center" } }, el(I.Check, { size: 28 })),
            el("h3", { style: { fontSize: "20px", marginBottom: "8px" } }, "Application received"),
            el("p", { style: { margin: "0 0 22px", color: "var(--body)", fontSize: "15px", lineHeight: 1.6 } }, "Thanks — our talent team will review your profile and reach out if there's a fit."),
            el(QR.Button, { variant: "secondary", onClick: onClose }, "Close"))
        : el("form", { action: formAction, noValidate: true, style: { padding: "22px 28px 30px" } },
            el("input", { type: "hidden", name: "job_id", value: job?.id || "" }),
            el("input", { type: "hidden", name: "job_title", value: job?.title || "" }),
            el("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }, className: "qr-why-grid" },
              el(QR.Input, { label: "Full name", name: "full_name", placeholder: "Jane Smith", error: fe.full_name, required: true }),
              el(QR.Input, { label: "Email", name: "email", type: "email", placeholder: "jane@email.com", error: fe.email, required: true }),
              el(QR.Input, { label: "Phone", name: "phone", placeholder: "+1 (555) 000-0000", error: fe.phone }),
              el(QR.Input, { label: "Current role", name: "current_role", placeholder: "Senior Engineer", error: fe.current_role })),
            el("div", { style: { marginTop: "16px" } },
              el(QR.Input, { label: "LinkedIn URL", name: "linkedin_url", placeholder: "https://linkedin.com/in/you", error: fe.linkedin_url })),
            el("div", { style: { marginTop: "16px", display: "flex", flexDirection: "column", gap: "7px" } },
              el("label", { htmlFor: "qr-apply-msg", style: { fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" } }, "Message"),
              el("textarea", { id: "qr-apply-msg", name: "message", rows: 4, placeholder: "A short note about why you're a fit (optional)", style: { fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink)", padding: "12px 14px", borderRadius: "10px", border: "1px solid var(--hairline)", resize: "vertical", outline: "none", width: "100%", boxSizing: "border-box" } })),
            el("div", { "aria-hidden": "true", style: { position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" } },
              el("input", { type: "text", name: "company_url", tabIndex: -1, autoComplete: "off" })),
            state.error && el("div", { role: "alert", style: { marginTop: "14px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.25)", color: "#B91C1C", borderRadius: "10px", padding: "11px 14px", fontSize: "14px" } }, state.error),
            el("div", { style: { marginTop: "22px" } },
              el(QR.Button, { variant: "primary", size: "lg", type: "submit", disabled: pending, iconRight: el(I.ArrowRight, { size: 18 }), style: { width: "100%" } }, pending ? "Submitting…" : "Submit application")))));
}
