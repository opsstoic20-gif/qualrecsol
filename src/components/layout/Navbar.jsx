"use client";
/* Sticky top nav — white, hairline + blur on scroll, scroll-progress edge.
   Desktop dropdowns use a hover-intent grace; the mobile menu is portaled to
   <body> so the header's backdrop-filter can't trap it as a containing block. */
import React from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/nav";
import { Icons } from "@/components/icons";

const { ArrowRight, ChevronDown, Menu, X } = Icons;

// Grace period before a hovered dropdown closes — short, just enough to cross the gap.
const MENU_CLOSE_DELAY = 500;

// Controlled by Navbar so only ONE dropdown is ever open (opening one closes the rest).
function NavLink({ link, active, open, onOpen, onCloseSoon, onCloseNow }) {
  return (
    <div style={{ position: "relative" }} onMouseEnter={() => link.menu && onOpen()} onMouseLeave={() => link.menu && onCloseSoon()}>
      <Link
        href={link.href}
        onClick={onCloseNow}
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
        // Transparent paddingTop bridges the trigger→menu gap so the hover never drops.
        <div
          onMouseEnter={onOpen}
          onMouseLeave={onCloseSoon}
          style={{ position: "absolute", top: "100%", left: "-12px", paddingTop: "10px", minWidth: "232px", zIndex: 60 }}
        >
          <div style={{ background: "#fff", border: "1px solid var(--hairline)", borderRadius: "12px", boxShadow: "var(--shadow-md)", padding: "8px" }}>
            {link.menu.map(([label, target], i) => (
              <Link
                key={i}
                href={target}
                onClick={onCloseNow}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--tint)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                style={{ display: "block", width: "100%", textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "10px 12px", borderRadius: "8px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 500, color: "var(--body)", transition: "background .15s" }}
              >
                {label}
              </Link>
            ))}
          </div>
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
  const [mounted, setMounted] = React.useState(false);
  // Single shared "which dropdown is open" — guarantees one-at-a-time (stack) behaviour.
  const [openMenu, setOpenMenu] = React.useState(null);
  const menuTimer = React.useRef(null);

  const openMenuNow = (id) => { if (menuTimer.current) { clearTimeout(menuTimer.current); menuTimer.current = null; } setOpenMenu(id); };
  const closeMenuSoon = () => { if (menuTimer.current) clearTimeout(menuTimer.current); menuTimer.current = setTimeout(() => setOpenMenu(null), MENU_CLOSE_DELAY); };
  const closeMenuNow = () => { if (menuTimer.current) { clearTimeout(menuTimer.current); menuTimer.current = null; } setOpenMenu(null); };

  React.useEffect(() => setMounted(true), []);
  React.useEffect(() => () => { if (menuTimer.current) clearTimeout(menuTimer.current); }, []);

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

  // Close the mobile sheet + any open dropdown on route change.
  React.useEffect(() => { setMobile(false); setOpenMenu(null); }, [pathname]);

  // Lock background scroll while the mobile sheet is open.
  React.useEffect(() => {
    if (!mobile) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [mobile]);

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const mobileSheet = (
    <div
      className="qr-mnav"
      style={{ position: "fixed", inset: 0, zIndex: 2000, background: "#fff", display: "flex", flexDirection: "column", padding: "20px 22px calc(env(safe-area-inset-bottom, 0px) + 24px)", overflowY: "auto", WebkitOverflowScrolling: "touch" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo-qualrec.png" alt="Qualrec" style={{ height: "36px", width: "auto" }} width="92" height="36" />
        <button onClick={() => setMobile(false)} aria-label="Close menu" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink)", padding: "6px" }}><X size={28} /></button>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
        {NAV_LINKS.map((l) => (
          <div key={l.id} style={{ borderBottom: "1px solid var(--hairline)", padding: "4px 0" }}>
            <Link
              href={l.href}
              onClick={() => setMobile(false)}
              style={{ display: "block", padding: "14px 4px", fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, color: isActive(l.href) ? "var(--brand)" : "var(--ink)" }}
            >
              {l.label}
            </Link>
            {l.menu && (
              <div style={{ display: "flex", flexDirection: "column", padding: "0 0 10px 4px" }}>
                {l.menu.map(([label, target], i) => (
                  <Link
                    key={i}
                    href={target}
                    onClick={() => setMobile(false)}
                    style={{ padding: "9px 4px", fontFamily: "var(--font-body)", fontSize: "15px", fontWeight: 500, color: "var(--body)" }}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
      <Link href="/contact" onClick={() => setMobile(false)} style={{ marginTop: "26px", background: "var(--brand)", color: "#fff", border: "none", borderRadius: "10px", padding: "16px", fontFamily: "var(--font-body)", fontSize: "16px", fontWeight: 600, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        Get Started <ArrowRight size={18} />
      </Link>
    </div>
  );

  return (
    <>
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.98)", backdropFilter: "saturate(180%) blur(12px)", WebkitBackdropFilter: "saturate(180%) blur(12px)", borderBottom: `1px solid ${scrolled ? "var(--hairline)" : "transparent"}`, transition: "border-color .3s, background .3s" }}>
        <div style={{ maxWidth: "var(--container-max)", margin: "0 auto", padding: "0 24px", height: "68px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "20px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center" }} aria-label="Qualrec Solutions — home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-qualrec.png" alt="Qualrec Solutions" style={{ height: "38px", width: "auto", display: "block" }} width="97" height="38" />
          </Link>
          <nav className="qr-nav-links" style={{ display: "flex", alignItems: "center", gap: "22px" }}>
            {NAV_LINKS.map((l) => <NavLink key={l.id} link={l} active={isActive(l.href)} open={openMenu === l.id} onOpen={() => openMenuNow(l.id)} onCloseSoon={closeMenuSoon} onCloseNow={closeMenuNow} />)}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/contact" className="qr-nav-cta" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--brand)", color: "#fff", borderRadius: "10px", padding: "9px 16px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600 }}>
              Get Started <ArrowRight size={16} />
            </Link>
            <button className="qr-nav-burger" onClick={() => setMobile(true)} aria-label="Open menu" aria-expanded={mobile} style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: "var(--ink)", padding: "6px" }}>
              <Menu size={24} />
            </button>
          </div>
        </div>
        {/* scroll progress edge */}
        <div aria-hidden="true" style={{ position: "absolute", left: 0, bottom: 0, height: "2px", width: `${progress * 100}%`, background: "var(--gradient-brand)", opacity: scrolled ? 1 : 0, transition: "opacity .3s" }} />
      </header>

      {/* Portaled to <body> so no transformed/filtered ancestor (the header's backdrop-filter)
          becomes its containing block. Guarantees a full-viewport, opaque overlay. */}
      {mounted && mobile && createPortal(mobileSheet, document.body)}
    </>
  );
}
