"use client";
/* Sticky top nav — white, hairline + blur on scroll, scroll-progress edge.
   Ported from the Claude Design Nav.jsx; wired to Next routing. */
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";
import { Icons } from "@/components/icons";

const { ArrowRight, ChevronDown, Menu, X } = Icons;

function NavLink({ link, active }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ position: "relative" }} onMouseEnter={() => link.menu && setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link
        href={link.href}
        style={{
          display: "inline-flex", alignItems: "center", gap: "5px", background: "none", border: "none", cursor: "pointer",
          fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: active ? 600 : 500,
          color: active ? "var(--brand)" : "var(--ink)", padding: "8px 2px", position: "relative",
        }}
      >
        {link.label}
        {link.menu && <ChevronDown size={14} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />}
        <span style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "2px", background: "var(--brand)", borderRadius: "2px", transform: active ? "scaleX(1)" : "scaleX(0)", transformOrigin: "left", transition: "transform .25s var(--ease-out)" }} />
      </Link>
      {link.menu && open && (
        <div style={{ position: "absolute", top: "calc(100% + 6px)", left: "-12px", minWidth: "210px", background: "#fff", border: "1px solid var(--hairline)", borderRadius: "12px", boxShadow: "var(--shadow-md)", padding: "8px", zIndex: 60 }}>
          {link.menu.map(([label, target], i) => (
            <Link
              key={i}
              href={target}
              onClick={() => setOpen(false)}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--tint)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              style={{ display: "block", width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, color: "var(--body)", transition: "background .15s" }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [mobile, setMobile] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => { setMobile(false); }, [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.98)", backdropFilter: "saturate(180%) blur(12px)", WebkitBackdropFilter: "saturate(180%) blur(12px)", borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`, transition: "border-color .3s, background .3s" }}>
      <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }} aria-label="Qualrec Solutions — home">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-qualrec.png" alt="Qualrec Solutions" style={{ height: "38px", width: "auto", display: "block" }} width="97" height="38" />
        </Link>
        <nav className="qr-nav-links" style={{ display: "flex", alignItems: "center", gap: "22px" }}>
          {NAV_LINKS.map((l) => <NavLink key={l.id} link={l} active={isActive(l.href)} />)}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <Link href="/contact" className="qr-nav-cta" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--brand)", color: "#fff", borderRadius: "10px", padding: "9px 16px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600 }}>
            Get Started <ArrowRight size={16} />
          </Link>
          <button className="qr-nav-burger" onClick={() => setMobile(true)} aria-label="Open menu" style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--ink)", padding: "6px" }}>
            <Menu size={24} />
          </button>
        </div>
      </div>
      {/* scroll progress edge */}
      <div aria-hidden="true" style={{ position: "absolute", left: 0, bottom: 0, height: "2px", width: `${progress * 100}%`, background: "var(--gradient-brand)", opacity: scrolled ? 1 : 0, transition: "opacity .3s" }} />

      {mobile && (
        <div style={{ position: "fixed", inset: 0, zIndex: 100, background: "#fff", padding: "24px", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-qualrec.png" alt="Qualrec" style={{ height: "36px", width: "auto" }} width="92" height="36" />
            <button onClick={() => setMobile(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)" }}><X size={28} /></button>
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {NAV_LINKS.map((l) => (
              <Link key={l.id} href={l.href} onClick={() => setMobile(false)} style={{ textAlign: "left", background: "none", border: "none", borderBottom: "1px solid var(--hairline)", padding: "18px 4px", fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: 700, color: isActive(l.href) ? "var(--brand)" : "var(--ink)" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/contact" onClick={() => setMobile(false)} style={{ marginTop: "28px", background: "var(--brand)", color: "#fff", border: "none", borderRadius: "10px", padding: "16px", fontFamily: "var(--font-body)", fontSize: "16px", fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
            Get Started <ArrowRight size={18} />
          </Link>
        </div>
      )}
    </header>
  );
}
