"use client";
/* Qualrec design-system components — ported from the Claude Design project.
   Exported individually AND bundled as `QR` so ported views can call QR.Button etc. */
import React from "react";
import { Reveal } from "./Reveal";

/* ---------------------------------- Button --------------------------------- */
export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  href,
  children,
  iconRight,
  iconLeft,
  disabled = false,
  className = "",
  style = {},
  ...props
}) {
  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    fontFamily: "var(--font-body)",
    fontWeight: 600,
    lineHeight: 1,
    borderRadius: "var(--radius-button)",
    border: "1px solid transparent",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.55 : 1,
    transition:
      "background 160ms var(--ease-out), border-color 160ms var(--ease-out), transform 160ms var(--ease-out), box-shadow 160ms var(--ease-out)",
    textDecoration: "none",
    whiteSpace: "nowrap",
  };
  const sizes = {
    sm: { fontSize: "14px", padding: "8px 14px" },
    md: { fontSize: "15px", padding: "12px 20px" },
    lg: { fontSize: "16px", padding: "15px 26px" },
  };
  const variants = {
    primary: { background: "var(--brand)", color: "#fff" },
    secondary: { background: "var(--surface)", color: "var(--ink)", borderColor: "var(--hairline)" },
    ghost: { background: "transparent", color: "#fff", borderColor: "rgba(255,255,255,0.6)" },
  };
  const [hover, setHover] = React.useState(false);
  const hoverStyle =
    hover && !disabled
      ? variant === "primary"
        ? { background: "var(--brand-bright)", transform: "translateY(-1px)", boxShadow: "var(--shadow-md)" }
        : variant === "secondary"
        ? { background: "var(--tint)" }
        : { background: "var(--white-10)", borderColor: "#fff" }
      : {};
  const Tag = href ? "a" : as;
  return (
    <Tag
      href={href}
      className={`qr-btn ${className}`}
      style={{ ...base, ...sizes[size], ...variants[variant], ...hoverStyle, ...style }}
      disabled={Tag === "button" ? disabled : undefined}
      aria-disabled={disabled || undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...props}
    >
      {iconLeft}
      <span>{children}</span>
      {iconRight && (
        <span style={{ display: "inline-flex", transition: "transform 160ms var(--ease-out)", transform: hover && !disabled ? "translateX(2px)" : "translateX(0)" }}>
          {iconRight}
        </span>
      )}
    </Tag>
  );
}

/* ----------------------------------- Card ---------------------------------- */
export function Card({
  icon,
  title,
  children,
  href,
  linkLabel,
  featured = false,
  badge,
  interactive = true,
  className = "",
  style = {},
  ...props
}) {
  const [hover, setHover] = React.useState(false);
  const lifted = interactive && hover;
  return (
    <div
      className={`qr-card ${className}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        background: "var(--surface)",
        border: `1px solid ${lifted ? "var(--brand-15)" : featured ? "var(--brand-15)" : "var(--hairline)"}`,
        borderRadius: "var(--radius-card)",
        padding: "24px",
        boxShadow: lifted ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: lifted ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 200ms var(--ease-out), box-shadow 200ms var(--ease-out), border-color 200ms var(--ease-out)",
        ...style,
      }}
      {...props}
    >
      {badge && (
        <span style={{ position: "absolute", top: "18px", right: "18px", fontFamily: "var(--font-body)", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--brand)", background: "var(--tint)", padding: "5px 10px", borderRadius: "999px" }}>
          {badge}
        </span>
      )}
      {icon && (
        <div aria-hidden="true" style={{ width: "var(--icon-chip-size)", height: "var(--icon-chip-size)", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--tint)", borderRadius: "var(--radius-icon-chip)", color: "var(--brand)" }}>
          {icon}
        </div>
      )}
      {title && (
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-h3)", fontWeight: 700, lineHeight: 1.25, color: "var(--ink)", margin: 0 }}>{title}</h3>
      )}
      {children && (
        <div style={{ color: "var(--body)", fontSize: "var(--fs-body)", lineHeight: 1.6 }}>{children}</div>
      )}
      {href && (
        <a href={href} onClick={props.onClick} style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 600, color: "var(--brand)" }}>
          {linkLabel || "Learn more"}
          <span style={{ transition: "transform 160ms var(--ease-out)", transform: lifted ? "translateX(3px)" : "translateX(0)" }}>→</span>
        </a>
      )}
    </div>
  );
}

/* ---------------------------------- Badge ---------------------------------- */
export function Badge({ tone = "brand", children, className = "", style = {}, ...props }) {
  const tones = {
    brand: { color: "var(--brand)", background: "var(--tint)" },
    success: { color: "#047857", background: "rgba(16,185,129,0.12)" },
    neutral: { color: "var(--muted)", background: "var(--surface-2)", border: "1px solid var(--hairline)" },
    accent: { color: "var(--accent)", background: "rgba(14,116,144,0.10)" },
    onDark: { color: "#fff", background: "rgba(255,255,255,0.14)" },
  };
  return (
    <span className={`qr-badge ${className}`} style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--font-body)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", padding: "5px 12px", borderRadius: "999px", ...tones[tone], ...style }} {...props}>
      {children}
    </span>
  );
}

/* --------------------------------- Eyebrow --------------------------------- */
export function Eyebrow({ children, tone = "brand", className = "", style = {}, ...props }) {
  const color = tone === "onDark" ? "rgba(255,255,255,0.85)" : "var(--brand)";
  return (
    <span className={`qr-eyebrow ${className}`} style={{ fontFamily: "var(--font-body)", fontSize: "var(--fs-eyebrow)", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color, display: "inline-block", ...style }} {...props}>
      {children}
    </span>
  );
}

/* -------------------------------- CheckItem -------------------------------- */
export function CheckItem({ children, className = "", style = {}, ...props }) {
  return (
    <li className={`qr-check ${className}`} style={{ display: "flex", alignItems: "flex-start", gap: "12px", fontFamily: "var(--font-body)", fontSize: "var(--fs-body)", lineHeight: 1.55, color: "var(--body)", listStyle: "none", ...style }} {...props}>
      <span aria-hidden="true" style={{ flex: "0 0 auto", width: "24px", height: "24px", marginTop: "1px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "999px", background: "rgba(16,185,129,0.12)", color: "var(--success)" }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </span>
      <span>{children}</span>
    </li>
  );
}

/* ------------------------------- StatCounter ------------------------------- */
export function StatCounter({ value, label, prefix = "", suffix = "", tone = "brand", duration = 1200, className = "", style = {} }) {
  const ref = React.useRef(null);
  const [display, setDisplay] = React.useState(0);
  const target = typeof value === "number" ? value : parseFloat(String(value).replace(/[^0-9.]/g, "")) || 0;
  const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (reduced) { setDisplay(target); return; }
    const node = ref.current;
    if (!node) return;
    let raf;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplay(target * eased);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setDisplay(target);
      };
      raf = requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    io.observe(node);
    return () => { io.disconnect(); if (raf) cancelAnimationFrame(raf); };
  }, [target, duration, reduced]);

  const isFloat = !Number.isInteger(target);
  const shown = isFloat ? display.toFixed(1) : Math.round(display).toLocaleString();
  const numColor = tone === "onDark" ? "#fff" : "var(--brand)";
  const labelColor = tone === "onDark" ? "rgba(255,255,255,0.7)" : "var(--muted)";

  return (
    <div ref={ref} className={`qr-stat ${className}`} style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: "var(--fs-stat)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: numColor }}>
        {prefix}{shown}{suffix}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>{label}</span>
    </div>
  );
}

/* ----------------------------------- Input --------------------------------- */
export function Input({ label, id, type = "text", error, hint, required = false, className = "", style = {}, ...props }) {
  const reactId = React.useId();
  const inputId = id || `qr-input-${reactId}`;
  const [focus, setFocus] = React.useState(false);
  return (
    <div className={`qr-field ${className}`} style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label htmlFor={inputId} style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
          {label}{required && <span style={{ color: "var(--brand)" }}> *</span>}
        </label>
      )}
      <input
        id={inputId}
        type={type}
        aria-invalid={!!error}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        style={{
          fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink)", background: "var(--surface)",
          padding: "11px 14px", borderRadius: "var(--radius-input)",
          border: `1px solid ${error ? "#DC2626" : focus ? "var(--brand-bright)" : "var(--hairline)"}`,
          boxShadow: focus && !error ? "0 0 0 3px rgba(37,99,235,0.15)" : "none",
          outline: "none", transition: "border-color 140ms var(--ease-out), box-shadow 140ms var(--ease-out)",
          width: "100%", boxSizing: "border-box",
        }}
        {...props}
      />
      {error ? <span style={{ fontSize: "13px", color: "#DC2626" }}>{error}</span> : hint ? <span style={{ fontSize: "13px", color: "var(--muted)" }}>{hint}</span> : null}
    </div>
  );
}

/* ----------------------------------- Select -------------------------------- */
export function Select({ label, id, options = [], placeholder, error, required = false, className = "", style = {}, ...props }) {
  const reactId = React.useId();
  const selectId = id || `qr-select-${reactId}`;
  const [focus, setFocus] = React.useState(false);
  return (
    <div className={`qr-field ${className}`} style={{ display: "flex", flexDirection: "column", gap: "7px", ...style }}>
      {label && (
        <label htmlFor={selectId} style={{ fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, color: "var(--ink)" }}>
          {label}{required && <span style={{ color: "var(--brand)" }}> *</span>}
        </label>
      )}
      <div style={{ position: "relative" }}>
        <select
          id={selectId}
          aria-invalid={!!error}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          defaultValue=""
          style={{
            appearance: "none", WebkitAppearance: "none", fontFamily: "var(--font-body)", fontSize: "15px",
            color: "var(--ink)", background: "var(--surface)", padding: "11px 40px 11px 14px",
            borderRadius: "var(--radius-input)",
            border: `1px solid ${error ? "#DC2626" : focus ? "var(--brand-bright)" : "var(--hairline)"}`,
            boxShadow: focus && !error ? "0 0 0 3px rgba(37,99,235,0.15)" : "none",
            outline: "none", width: "100%", boxSizing: "border-box", cursor: "pointer",
            transition: "border-color 140ms var(--ease-out), box-shadow 140ms var(--ease-out)",
          }}
          {...props}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options.map((o) => {
            const value = typeof o === "string" ? o : o.value;
            const text = typeof o === "string" ? o : o.label;
            return <option key={value} value={value}>{text}</option>;
          })}
        </select>
        <span aria-hidden="true" style={{ position: "absolute", right: "14px", top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--muted)", fontSize: "12px" }}>▾</span>
      </div>
      {error && <span style={{ fontSize: "13px", color: "#DC2626" }}>{error}</span>}
    </div>
  );
}

/* --------------------------------- Pipeline -------------------------------- */
const DEFAULT_STAGES = ["Requirement", "Sourced", "Vetted", "Placed", "Converted"];
export function Pipeline({ stages = DEFAULT_STAGES, variant = "feature", tone = "light", animate = true, className = "", style = {} }) {
  const ref = React.useRef(null);
  const [active, setActive] = React.useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  React.useEffect(() => {
    if (!animate || reduced) { setActive(true); return; }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setActive(true); io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [animate, reduced]);

  const isDark = tone === "dark";
  const isDivider = variant === "divider";
  const lineBase = isDivider ? (isDark ? "rgba(255,255,255,0.18)" : "var(--hairline)") : isDark ? "rgba(255,255,255,0.25)" : "var(--hairline)";
  const lineFill = isDark ? "rgba(255,255,255,0.85)" : "var(--brand)";
  const nodeOff = isDark ? "rgba(255,255,255,0.30)" : "#CBD5E1";
  const nodeOn = isDark ? "#fff" : "var(--brand)";
  const labelColor = isDark ? "var(--white-70)" : "var(--muted)";
  const count = stages.length;

  return (
    <div ref={ref} className={`qr-pipeline ${className}`} role="img" aria-label={`Pipeline: ${stages.join(" to ")}`} style={{ width: "100%", ...style }}>
      <div style={{ position: "relative", padding: isDivider ? "0" : "0 0 4px" }}>
        <div style={{ position: "absolute", top: isDivider ? "50%" : "5px", left: 0, right: 0, height: "2px", background: lineBase, transform: "translateY(-1px)" }} />
        <div style={{ position: "absolute", top: isDivider ? "50%" : "5px", left: 0, height: "2px", background: lineFill, transform: "translateY(-1px)", width: active ? "100%" : "0%", transition: "width 900ms var(--ease-out)", opacity: isDivider ? 0.5 : 1 }} />
        <div style={{ position: "relative", display: "grid", gridTemplateColumns: `repeat(${count}, 1fr)` }}>
          {stages.map((label, i) => {
            const lit = active;
            const delay = `${i * 140}ms`;
            return (
              <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: i === 0 ? "flex-start" : i === count - 1 ? "flex-end" : "center", gap: isDivider ? 0 : "10px" }}>
                <span style={{ width: isDivider ? "7px" : "12px", height: isDivider ? "7px" : "12px", borderRadius: "50%", background: lit ? nodeOn : nodeOff, boxShadow: lit && !isDivider ? (isDark ? "0 0 0 4px rgba(255,255,255,0.18)" : "0 0 0 4px rgba(29,78,216,0.14)") : "none", transition: "background 300ms var(--ease-out), box-shadow 300ms var(--ease-out)", transitionDelay: delay }} />
                {!isDivider && (
                  <span className="qr-pl-label" style={{ fontFamily: "var(--font-body)", fontSize: "13px", fontWeight: 600, color: lit ? (isDark ? "#fff" : "var(--ink)") : labelColor, letterSpacing: "0.01em", whiteSpace: "nowrap", textAlign: "center", transition: "color 300ms var(--ease-out)", transitionDelay: delay }}>{label}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------- SectionHead ------------------------------- */
export function SectionHead({ eyebrow, title, lead, tone = "light", center = true, max = 640 }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? max : "none", margin: center ? "0 auto" : 0 }}>
      <Reveal>
        <Eyebrow tone={tone === "dark" ? "onDark" : "brand"}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={60} as="h2" style={{ marginTop: "14px", color: tone === "dark" ? "#fff" : "var(--ink)" }}>{title}</Reveal>
      {lead && (
        <Reveal delay={120} as="p" style={{ marginTop: "16px", fontSize: "var(--fs-lead)", lineHeight: 1.55, color: tone === "dark" ? "rgba(255,255,255,0.78)" : "var(--body)" }}>{lead}</Reveal>
      )}
    </div>
  );
}

/* Bundled object so ported views can use QR.Button, QR.Card, ... */
export const QR = {
  Button, Card, Badge, Eyebrow, CheckItem, StatCounter, Input, Select, Pipeline, SectionHead,
};

export default QR;
