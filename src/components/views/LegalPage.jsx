/* Simple, readable legal page shell. Server-safe (no hooks). */
import React from "react";

const el = React.createElement;

export default function LegalPage({ title, updated, intro, sections }) {
  return el("div", null,
    el("section", { style: { background: "var(--gradient-brand)" } },
      el("div", { style: { maxWidth: "860px", margin: "0 auto", padding: "72px 24px 60px" } },
        el("h1", { style: { color: "#fff", fontSize: "clamp(2rem,1.5rem+2vw,2.75rem)" } }, title),
        el("p", { style: { marginTop: "14px", color: "rgba(255,255,255,0.8)", fontSize: "15px" } }, "Last updated: " + updated))),
    el("section", { style: { background: "#fff", padding: "64px 0 96px" } },
      el("div", { style: { maxWidth: "780px", margin: "0 auto", padding: "0 24px" } },
        el("div", { style: { background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "12px", padding: "16px 20px", fontSize: "13.5px", color: "var(--muted)", marginBottom: "32px" } },
          "This is a general template. Review with qualified legal counsel before relying on it."),
        intro && el("p", { style: { fontSize: "16px", lineHeight: 1.7, color: "var(--body)", marginBottom: "32px" } }, intro),
        sections.map((s, i) =>
          el("div", { key: i, style: { marginBottom: "32px" } },
            el("h2", { style: { fontSize: "22px", marginBottom: "12px" } }, s.h),
            (Array.isArray(s.p) ? s.p : [s.p]).map((para, k) =>
              el("p", { key: k, style: { fontSize: "15.5px", lineHeight: 1.7, color: "var(--body)", marginBottom: "12px" } }, para)))))));
}
