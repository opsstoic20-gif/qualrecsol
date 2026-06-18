/* Animated talent-network globe — matte SVG sphere with graticule, pulsing
   location nodes, and arcs that draw from the US hub. CSS-only animation. */
import React from "react";

const el = React.createElement;

const C = { x: 500, y: 500, r: 430 };

// Approximate placements on the sphere face.
const NODES = [
  { id: "us", name: "United States", x: 300, y: 432, hub: true, lx: 318, ly: 420, anchor: "start" },
  { id: "in", name: "India", x: 722, y: 490, lx: 740, ly: 480, anchor: "start" },
  { id: "mx", name: "Mexico", x: 340, y: 560, lx: 360, ly: 552, anchor: "start" },
  { id: "br", name: "Brazil", x: 458, y: 690, lx: 478, ly: 684, anchor: "start" },
  { id: "ar", name: "Argentina", x: 415, y: 790, lx: 435, ly: 784, anchor: "start" },
];

const ARCS = [
  { d: "M300,432 Q545,332 722,490", delay: "0s" },
  { d: "M300,432 Q288,506 340,560", delay: "1.1s" },
  { d: "M300,432 Q300,588 458,690", delay: "2.2s" },
  { d: "M300,432 Q266,624 415,790", delay: "3.3s" },
];

const meridians = [430, 330, 205, 80];
const parallels = [
  { cy: 500, rx: 430 },
  { cy: 372, rx: 408 }, { cy: 628, rx: 408 },
  { cy: 256, rx: 338 }, { cy: 744, rx: 338 },
  { cy: 158, rx: 222 }, { cy: 842, rx: 222 },
];

const LINE = "rgba(33,71,201,0.20)";
const BRAND = "#2147C9";

export default function Globe({ className = "", style = {} }) {
  return el("div", { className: `qr-globe ${className}`, style: { width: "100%", maxWidth: "560px", margin: "0 auto", ...style } },
    el("svg", { viewBox: "0 0 1000 1000", width: "100%", height: "100%", role: "img", "aria-label": "QualRec global talent network — sourcing across the United States, India, Mexico, Brazil and Argentina", style: { display: "block", overflow: "visible" } },
      el("defs", null,
        el("radialGradient", { id: "qrSphere", cx: "42%", cy: "36%", r: "75%" },
          el("stop", { offset: "0%", stopColor: "#F4F8FF" }),
          el("stop", { offset: "62%", stopColor: "#E5ECFA" }),
          el("stop", { offset: "100%", stopColor: "#D2DCF1" })),
        el("clipPath", { id: "qrClip" }, el("circle", { cx: C.x, cy: C.y, r: C.r }))),

      // Sphere body (matte, low-contrast)
      el("circle", { cx: C.x, cy: C.y, r: C.r, fill: "url(#qrSphere)" }),
      el("circle", { cx: C.x, cy: C.y, r: C.r, fill: "none", stroke: "rgba(33,71,201,0.28)", strokeWidth: 1.5 }),

      // Graticule (clipped to sphere)
      el("g", { clipPath: "url(#qrClip)", fill: "none", stroke: LINE, strokeWidth: 1 },
        meridians.map((rx, i) => el("ellipse", { key: "m" + i, cx: C.x, cy: C.y, rx, ry: C.r })),
        parallels.map((p, i) => el("ellipse", { key: "p" + i, cx: C.x, cy: p.cy, rx: p.rx, ry: Math.max(10, p.rx * 0.16) }))),

      // Connection arcs (draw from US hub)
      el("g", { fill: "none", stroke: BRAND, strokeWidth: 2.4, strokeLinecap: "round", clipPath: "url(#qrClip)" },
        ARCS.map((a, i) => el("path", { key: "a" + i, className: "qr-arc", d: a.d, pathLength: 1, style: { strokeDasharray: 1, animationDelay: a.delay } }))),

      // Nodes
      NODES.map((n) =>
        el("g", { key: n.id },
          el("circle", { className: "qr-ping", cx: n.x, cy: n.y, r: n.hub ? 14 : 11, fill: "none", stroke: BRAND, strokeWidth: 2, style: { animationDelay: (NODES.indexOf(n) * 0.5) + "s" } }),
          el("circle", { cx: n.x, cy: n.y, r: n.hub ? 9 : 7, fill: "#fff", stroke: BRAND, strokeWidth: n.hub ? 4 : 3 }),
          n.hub && el("circle", { cx: n.x, cy: n.y, r: 3, fill: BRAND }),
          el("text", { x: n.lx, y: n.ly, textAnchor: n.anchor, style: { fontFamily: "var(--font-display)", fontWeight: n.hub ? 800 : 700, fontSize: n.hub ? "26px" : "23px", fill: "var(--ink)", letterSpacing: "-0.01em" } }, n.name)))));
}
