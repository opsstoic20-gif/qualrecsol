/* Shared admin UI bits (server-safe, no hooks). */
import React from "react";
const el = React.createElement;

export function AdminHeader(props) {
  const { title, subtitle, action } = props;
  return el("div", { style: { display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "24px" } },
    el("div", null,
      el("h1", { style: { fontSize: "26px", letterSpacing: "-0.01em" } }, title),
      subtitle && el("p", { style: { margin: "6px 0 0", color: "var(--muted)", fontSize: "14px" } }, subtitle)),
    action);
}

export function Panel({ children, style = {} }) {
  return el("div", { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "14px", boxShadow: "var(--shadow-sm)", ...style } }, children);
}

export function StatTile(props) {
  const { label, value, accent } = props;
  return el("div", { style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "14px", padding: "22px 24px", boxShadow: "var(--shadow-sm)" } },
    el("div", { style: { fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: 800, color: accent || "var(--brand)", lineHeight: 1 } }, value),
    el("div", { style: { marginTop: "8px", fontSize: "13px", color: "var(--muted)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase" } }, label));
}

export function Empty({ children }) {
  return el("div", { style: { padding: "48px 24px", textAlign: "center", color: "var(--muted)", fontSize: "15px" } }, children);
}

export function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: { color: "var(--muted)", background: "var(--surface-2)", border: "1px solid var(--hairline)" },
    brand: { color: "var(--brand)", background: "var(--tint)" },
    success: { color: "#047857", background: "rgba(16,185,129,0.12)" },
    warn: { color: "#B45309", background: "rgba(245,158,11,0.14)" },
  };
  return el("span", { style: { display: "inline-flex", alignItems: "center", fontSize: "12px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", ...tones[tone] } }, children);
}

export const PAGE_PAD = { padding: "36px 40px", maxWidth: "1100px" };
