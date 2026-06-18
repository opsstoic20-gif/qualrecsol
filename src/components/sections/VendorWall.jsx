/* Top vendors — partner logos in a continuous left-scrolling marquee,
   greyscale until hovered (track pauses on hover so a logo can be focused). */
import React from "react";
const el = React.createElement;

const VENDORS = [
  { src: "/vendors/kforce.png", alt: "Kforce", h: 30 },
  { src: "/vendors/randstad.png", alt: "Randstad", h: 26 },
  { src: "/vendors/robert-half.png", alt: "Robert Half", h: 30 },
  { src: "/vendors/ilabor.svg", alt: "iLabor", h: 30 },
  { src: "/vendors/beeline.webp", alt: "Beeline", h: 34 },
];

export default function VendorWall() {
  // Duplicate the set so translateX(-50%) loops seamlessly.
  const logos = VENDORS.concat(VENDORS);
  return el("section", { style: { background: "#fff", padding: "60px 0", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" } },
    el("div", { style: { maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px" } },
      el("p", { style: { textAlign: "center", margin: "0 0 30px", fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--muted)" } }, "Top vendors we partner with")),
    el("div", { className: "qr-tst-marquee", style: { overflow: "hidden", maskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #000 7%, #000 93%, transparent)" } },
      el("div", { className: "qr-tst-track", style: { display: "flex", alignItems: "center", gap: "72px", paddingRight: "72px", width: "max-content", animation: "qrMarquee 32s linear infinite" } },
        logos.map((v, i) =>
          /* eslint-disable-next-line @next/next/no-img-element */
          el("img", { key: i, className: "qr-vendor", src: v.src, alt: i >= VENDORS.length ? "" : v.alt, "aria-hidden": i >= VENDORS.length ? "true" : undefined, loading: "lazy", style: { height: v.h + "px", width: "auto", maxWidth: "150px", objectFit: "contain", display: "block", flex: "0 0 auto" } })))));
}
