"use client";
// Lightweight first-party pageview beacon. Records public page views to Supabase
// (RLS allows anon insert). Skips the admin area. Best-effort, never blocks.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function Analytics() {
  const pathname = usePathname();
  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    try {
      const supabase = createClient();
      const device = typeof window !== "undefined" && window.innerWidth < 768 ? "mobile" : "desktop";
      supabase
        .from("page_views")
        .insert({ path: pathname, referrer: (typeof document !== "undefined" && document.referrer) || null, device })
        .then(() => {}, () => {});
    } catch {
      /* ignore */
    }
  }, [pathname]);
  return null;
}
