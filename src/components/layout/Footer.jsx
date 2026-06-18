"use client";
/* Footer — Brand-ink background, 2px gradient top edge.
   Ported from the Claude Design Footer.jsx; wired to Next routing. */
import React from "react";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { SITE } from "@/lib/content/site";

const { Mail, Phone, MapPin, Linkedin, Facebook } = Icons;

function Col({ heading, items }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <h4 style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", margin: "0 0 4px" }}>{heading}</h4>
      {items.map(([label, href], i) => (
        <Link
          key={i}
          href={href}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}
          style={{ textAlign: "left", padding: 0, fontFamily: "var(--font-body)", fontSize: "14.5px", color: "rgba(255,255,255,0.72)", transition: "color .15s" }}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{ background: "var(--brand-ink)", position: "relative" }}>
      <div style={{ height: "2px", background: "var(--gradient-brand)" }} />
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "64px 24px 28px" }}>
        <div className="qr-foot-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 1fr", gap: "48px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "360px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-qualrec.png" alt="Qualrec Solutions" style={{ height: "46px", width: "auto", alignSelf: "flex-start" }} width="118" height="46" />
            <p style={{ margin: 0, fontFamily: "var(--font-body)", fontSize: "14.5px", lineHeight: 1.65, color: "rgba(255,255,255,0.65)" }}>{SITE.positioning}</p>
            <div style={{ display: "flex", gap: "10px" }}>
              {[[Linkedin, SITE.social.linkedin, "LinkedIn"], [Facebook, SITE.social.facebook, "Facebook"]].map(([Ic, href, label], i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "var(--brand)"; e.currentTarget.style.borderColor = "var(--brand)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
                  style={{ width: "38px", height: "38px", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", transition: "background .2s, border-color .2s" }}
                >
                  <Ic size={18} />
                </a>
              ))}
            </div>
          </div>
          <Col heading="Services" items={[["IT staffing", "/services"], ["Contract-to-Hire", "/services"], ["Direct hire", "/services"], ["RPO", "/services"], ["Cloud & Data", "/services"], ["Cybersecurity", "/services"]]} />
          <Col heading="Company" items={[["About us", "/about"], ["Careers", "/careers"], ["Case studies", "/case-studies"], ["Industries", "/industries"], ["Contact", "/contact"]]} />
        </div>
        <div style={{ height: "1px", background: "rgba(255,255,255,0.12)", margin: "44px 0 24px" }} />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "28px", marginBottom: "28px" }}>
          {[[Mail, SITE.email], [Phone, `USA: ${SITE.phoneUsa}`], [Phone, `India: ${SITE.phoneIndia}`], [MapPin, "St. Petersburg, FL"]].map(([Ic, txt], i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "9px", color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-body)", fontSize: "14px" }}>
              <span style={{ color: "var(--brand-bright)", display: "flex" }}><Ic size={16} /></span>{txt}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "12px", fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
          <span>© 2026 Qualrec Solutions. All rights reserved.</span>
          <div style={{ display: "flex", gap: "20px" }}>
            <Link href="/privacy" style={{ color: "rgba(255,255,255,0.5)" }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: "rgba(255,255,255,0.5)" }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
