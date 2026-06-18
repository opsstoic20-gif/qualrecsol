/* Qualrec icon set — lucide-style, 24x24, stroke 2, currentColor.
   Ported from the Claude Design system (icons.jsx). */
import React from "react";

const S = ({ children, size = 24, sw = 2, ...p }) =>
  React.createElement(
    "svg",
    { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", ...p },
    children
  );
const P = (d) => React.createElement("path", { d });
const el = React.createElement;

export const Icons = {
  Code: (p) => el(S, p, P("M16 18l6-6-6-6"), P("M8 6l-6 6 6 6")),
  Cloud: (p) => el(S, p, P("M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z")),
  BarChart: (p) => el(S, p, el("line", { x1: 12, y1: 20, x2: 12, y2: 10 }), el("line", { x1: 18, y1: 20, x2: 18, y2: 4 }), el("line", { x1: 6, y1: 20, x2: 6, y2: 16 })),
  Shield: (p) => el(S, p, P("M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z")),
  Zap: (p) => el(S, p, el("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })),
  Users: (p) => el(S, p, P("M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"), el("circle", { cx: 9, cy: 7, r: 4 }), P("M23 21v-2a4 4 0 0 0-3-3.87"), P("M16 3.13a4 4 0 0 1 0 7.75")),
  Award: (p) => el(S, p, el("circle", { cx: 12, cy: 8, r: 7 }), el("polyline", { points: "8.21 13.89 7 23 12 20 17 23 15.79 13.88" })),
  TrendingUp: (p) => el(S, p, el("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }), el("polyline", { points: "17 6 23 6 23 12" })),
  Check: (p) => el(S, p, el("polyline", { points: "20 6 9 17 4 12" })),
  ArrowRight: (p) => el(S, p, el("line", { x1: 5, y1: 12, x2: 19, y2: 12 }), el("polyline", { points: "12 5 19 12 12 19" })),
  Mail: (p) => el(S, p, P("M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"), el("polyline", { points: "22,6 12,13 2,6" })),
  Phone: (p) => el(S, p, P("M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z")),
  MapPin: (p) => el(S, p, P("M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"), el("circle", { cx: 12, cy: 10, r: 3 })),
  Clock: (p) => el(S, p, el("circle", { cx: 12, cy: 12, r: 10 }), el("polyline", { points: "12 6 12 12 16 14" })),
  Linkedin: (p) => el(S, p, P("M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"), el("rect", { x: 2, y: 9, width: 4, height: 12 }), el("circle", { cx: 4, cy: 4, r: 2 })),
  Facebook: (p) => el(S, p, P("M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z")),
  Target: (p) => el(S, p, el("circle", { cx: 12, cy: 12, r: 10 }), el("circle", { cx: 12, cy: 12, r: 6 }), el("circle", { cx: 12, cy: 12, r: 2 })),
  Heart: (p) => el(S, p, P("M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z")),
  Menu: (p) => el(S, p, el("line", { x1: 3, y1: 6, x2: 21, y2: 6 }), el("line", { x1: 3, y1: 12, x2: 21, y2: 12 }), el("line", { x1: 3, y1: 18, x2: 21, y2: 18 })),
  X: (p) => el(S, p, el("line", { x1: 18, y1: 6, x2: 6, y2: 18 }), el("line", { x1: 6, y1: 6, x2: 18, y2: 18 })),
  Star: (p) => el(S, { fill: "currentColor", stroke: "none", ...p }, el("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })),
  ChevronDown: (p) => el(S, p, el("polyline", { points: "6 9 12 15 18 9" })),
  Quote: (p) => el(S, { fill: "currentColor", stroke: "none", ...p }, P("M10 11H6a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h0a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zm0 0c0 3-1 5-4 6m17-6h-4a1 1 0 0 1-1-1V7a3 3 0 0 1 3-3h0a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1zm0 0c0 3-1 5-4 6")),
  Building: (p) => el(S, p, el("rect", { x: 4, y: 2, width: 16, height: 20, rx: 2 }), el("line", { x1: 9, y1: 6, x2: 9, y2: 6 }), el("line", { x1: 15, y1: 6, x2: 15, y2: 6 }), P("M9 22v-4h6v4"), el("line", { x1: 9, y1: 10, x2: 9, y2: 10 }), el("line", { x1: 15, y1: 10, x2: 15, y2: 10 }), el("line", { x1: 9, y1: 14, x2: 9, y2: 14 }), el("line", { x1: 15, y1: 14, x2: 15, y2: 14 })),
  Briefcase: (p) => el(S, p, el("rect", { x: 2, y: 7, width: 20, height: 14, rx: 2 }), P("M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16")),
  Layers: (p) => el(S, p, el("polygon", { points: "12 2 2 7 12 12 22 7 12 2" }), el("polyline", { points: "2 17 12 22 22 17" }), el("polyline", { points: "2 12 12 17 22 12" })),
  HeartPulse: (p) => el(S, p, P("M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"), P("M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27")),
  Scale: (p) => el(S, p, P("M16 11V3M3 6h18M8 6l-3 7h6l-3-7zM19 6l-3 7h6l-3-7zM7 21h10M12 6v15")),
  Globe: (p) => el(S, p, el("circle", { cx: 12, cy: 12, r: 10 }), el("line", { x1: 2, y1: 12, x2: 22, y2: 12 }), P("M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z")),
  ShoppingCart: (p) => el(S, p, el("circle", { cx: 9, cy: 21, r: 1 }), el("circle", { cx: 20, cy: 21, r: 1 }), P("M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6")),
  Factory: (p) => el(S, p, P("M2 20h20M4 20V8l5 4V8l5 4V8l5 4v8")),
  Landmark: (p) => el(S, p, el("line", { x1: 3, y1: 22, x2: 21, y2: 22 }), el("line", { x1: 6, y1: 18, x2: 6, y2: 11 }), el("line", { x1: 10, y1: 18, x2: 10, y2: 11 }), el("line", { x1: 14, y1: 18, x2: 14, y2: 11 }), el("line", { x1: 18, y1: 18, x2: 18, y2: 11 }), el("polygon", { points: "12 2 20 7 4 7" })),
  LogOut: (p) => el(S, p, P("M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"), el("polyline", { points: "16 17 21 12 16 7" }), el("line", { x1: 21, y1: 12, x2: 9, y2: 12 })),
  LayoutDashboard: (p) => el(S, p, el("rect", { x: 3, y: 3, width: 7, height: 9 }), el("rect", { x: 14, y: 3, width: 7, height: 5 }), el("rect", { x: 14, y: 12, width: 7, height: 9 }), el("rect", { x: 3, y: 16, width: 7, height: 5 })),
  Inbox: (p) => el(S, p, el("polyline", { points: "22 12 16 12 14 15 10 15 8 12 2 12" }), P("M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z")),
  Trash: (p) => el(S, p, el("polyline", { points: "3 6 5 6 21 6" }), P("M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"), el("line", { x1: 10, y1: 11, x2: 10, y2: 17 }), el("line", { x1: 14, y1: 11, x2: 14, y2: 17 })),
  Edit: (p) => el(S, p, P("M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"), P("M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z")),
  Plus: (p) => el(S, p, el("line", { x1: 12, y1: 5, x2: 12, y2: 19 }), el("line", { x1: 5, y1: 12, x2: 19, y2: 12 })),
  Eye: (p) => el(S, p, P("M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"), el("circle", { cx: 12, cy: 12, r: 3 })),
  EyeOff: (p) => el(S, p, P("M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"), el("line", { x1: 1, y1: 1, x2: 23, y2: 23 })),
};

export default Icons;
