"use client";
/* Contact — ported from the Claude Design Contact.jsx; form wired to a Server Action. */
import React from "react";
import { QR } from "@/components/ui";
import { Reveal } from "@/components/ui/Reveal";
import { Icons as I } from "@/components/icons";
import ContactForm from "@/components/forms/ContactForm";
import { SITE } from "@/lib/content/site";

const el = React.createElement;
const Head = QR.SectionHead;

const CONTACT_CARDS = [
  { icon: I.Mail, title: "Email us", value: SITE.email, note: "Send us an email anytime" },
  { icon: I.Phone, title: "Call us (USA)", value: SITE.phoneUsa, note: "Mon–Fri 9am to 6pm EST" },
  { icon: I.Phone, title: "Call us (India)", value: SITE.phoneIndia, note: "Mon–Fri 9am to 6pm IST" },
  { icon: I.MapPin, title: "Visit us", value: SITE.hqAddress, note: "Our US headquarters" },
  { icon: I.Clock, title: "Business hours", value: SITE.hours, note: "We respond within 24 hours" },
];

export default function ContactView() {
  return el("div", null,
    el("section", { style: { background: "var(--gradient-brand)" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "84px 24px 88px", textAlign: "center" } },
        el(Reveal, { as: "h1", style: { color: "#fff" } }, "Contact us"),
        el(Reveal, { delay: 80, as: "p", style: { marginTop: "20px", fontSize: "var(--fs-lead)", color: "rgba(255,255,255,0.82)", maxWidth: "60ch", marginInline: "auto", lineHeight: 1.55 } },
          "Ready to build your team or transform your business? Tell us what you need and we'll get back to you within 24 hours."))),

    el("section", { style: { background: "#fff", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "48px", alignItems: "start" }, className: "qr-why-grid" },
        el(Reveal, null, el(ContactForm)),
        el(Reveal, { delay: 80 },
          el("h3", { style: { fontSize: "24px", marginBottom: "20px" } }, "Get in touch"),
          el("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } },
            CONTACT_CARDS.map((c, i) =>
              el("div", { key: i, style: { display: "flex", gap: "16px", background: "var(--tint)", borderRadius: "14px", padding: "18px 20px" } },
                el("div", { style: { width: "44px", height: "44px", flex: "0 0 auto", borderRadius: "12px", background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" } }, el(c.icon, { size: 20 })),
                el("div", null,
                  el("div", { style: { fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "15px", color: "var(--ink)" } }, c.title),
                  el("div", { style: { color: "var(--brand)", fontSize: "14.5px", fontWeight: 600, margin: "3px 0" } }, c.value),
                  el("div", { style: { color: "var(--muted)", fontSize: "13px" } }, c.note)))))))),

    // Offices
    el("section", { style: { background: "var(--surface-2)", padding: "var(--section-py) 0" } },
      el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
        el(Head, { eyebrow: "Our offices", title: "Where to find us", lead: "Offices across the United States and India to serve our global client base." }),
        el("div", { style: { marginTop: "48px", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "24px" }, className: "qr-svc-grid" },
          SITE.offices.map((o, i) =>
            el(Reveal, { key: i, delay: (i % 3) * 70, style: { background: "#fff", border: "1px solid var(--hairline)", borderRadius: "16px", padding: "28px", boxShadow: "var(--shadow-sm)" } },
              el("div", { style: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" } },
                el("span", { style: { color: "var(--brand)", display: "flex" } }, el(I.MapPin, { size: 20 })),
                el("h3", { style: { fontSize: "19px" } }, o.city)),
              el("div", { style: { display: "flex", flexDirection: "column", gap: "6px", color: "var(--body)", fontSize: "14.5px", lineHeight: 1.5 } },
                o.lines.map((l, k) => el("div", { key: k }, l)))))),
        // Find us — embedded map of the St. Petersburg HQ
        el(Reveal, { style: { marginTop: "48px", borderRadius: "16px", overflow: "hidden", border: "1px solid var(--hairline)", boxShadow: "var(--shadow-sm)" } },
          el("iframe", {
            title: "Qualrec Solutions — St. Petersburg, FL",
            src: "https://www.google.com/maps?q=7901%204th%20St%20N%20Ste%204138%2C%20St.%20Petersburg%2C%20FL%2033702&output=embed",
            loading: "lazy",
            referrerPolicy: "no-referrer-when-downgrade",
            style: { width: "100%", height: "360px", border: 0, display: "block" },
          })))));
}
