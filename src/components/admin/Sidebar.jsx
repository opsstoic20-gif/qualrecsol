"use client";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Icons as I } from "@/components/icons";

const el = React.createElement;

const NAV = [
  { href: "/admin", label: "Overview", icon: I.LayoutDashboard, exact: true },
  { href: "/admin/jobs", label: "Jobs", icon: I.Briefcase },
  { href: "/admin/applications", label: "Applications", icon: I.Inbox },
  { href: "/admin/messages", label: "Messages", icon: I.Mail },
];

export default function Sidebar({ email }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = React.useMemo(() => createClient(), []);

  async function signOut() {
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const active = (n) => (n.exact ? pathname === n.href : pathname.startsWith(n.href));

  return el("aside", { style: { width: "248px", flex: "0 0 auto", background: "var(--brand-ink)", color: "#fff", display: "flex", flexDirection: "column", position: "sticky", top: 0, height: "100vh" } },
    el("div", { style: { padding: "22px 22px 18px", borderBottom: "1px solid rgba(255,255,255,0.1)" } },
      /* eslint-disable-next-line @next/next/no-img-element */
      el("img", { src: "/logo-qualrec.png", alt: "Qualrec", style: { height: "34px", width: "auto" } }),
      el("div", { style: { marginTop: "8px", fontSize: "11px", letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", fontWeight: 600 } }, "Admin panel")),
    el("nav", { style: { padding: "16px 12px", display: "flex", flexDirection: "column", gap: "4px", flex: 1 } },
      NAV.map((n) => el(Link, { key: n.href, href: n.href,
        style: { display: "flex", alignItems: "center", gap: "11px", padding: "11px 14px", borderRadius: "10px", fontFamily: "var(--font-body)", fontSize: "14.5px", fontWeight: 600, color: active(n) ? "#fff" : "rgba(255,255,255,0.65)", background: active(n) ? "rgba(255,255,255,0.10)" : "transparent", transition: "background .15s, color .15s" } },
        el(n.icon, { size: 18 }), n.label))),
    el("div", { style: { padding: "16px", borderTop: "1px solid rgba(255,255,255,0.1)" } },
      el("div", { style: { fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "10px", wordBreak: "break-all" } }, email),
      el("button", { onClick: signOut, style: { width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "10px", padding: "10px", fontFamily: "var(--font-body)", fontSize: "14px", fontWeight: 600, cursor: "pointer" } },
        el(I.LogOut, { size: 16 }), "Sign out")));
}
