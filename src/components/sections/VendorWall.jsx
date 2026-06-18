/* Top vendors — partner logos, greyscale until hovered. */
import React from "react";
const el = React.createElement;

const VENDORS = [
  { src: "/vendors/kforce.png", alt: "Kforce", h: 30 },
  { src: "/vendors/adecco.png", alt: "Adecco", h: 30 },
  { src: "/vendors/randstad.png", alt: "Randstad", h: 26 },
  { src: "/vendors/robert-half.png", alt: "Robert Half", h: 30 },
  { src: "/vendors/ilabor.svg", alt: "iLabor", h: 30 },
  { src: "/vendors/beeline.webp", alt: "Beeline", h: 34 },
];

export default function VendorWall() {
  return el("section", { style: { background: "#fff", padding: "60px 0", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
      el("p", { style: { textAlign: "center", margin: "0 0 30px", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" } }, "Top vendors we partner with"),
      el("div", { style: { display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "44px 56px" } },
        VENDORS.map((v, i) =>
          /* eslint-disable-next-line @next/next/no-img-element */
          el("img", { key: i, className: "qr-vendor", src: v.src, alt: v.alt, loading: "lazy", style: { height: v.h + "px", width: "auto", maxWidth: "150px", objectFit: "contain", display: "block" } })))));
}
