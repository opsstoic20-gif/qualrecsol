import { createClient } from "@/lib/supabase/server";
import { AdminHeader, StatTile, Panel, Empty, PAGE_PAD } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

function fmt(ts: string) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function Overview() {
  const supabase = await createClient();

  const [jobsRes, appsRes, msgsRes, recentApps, recentMsgs, analyticsRes] = await Promise.all([
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("is_published", true),
    supabase.from("applications").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("is_read", false),
    supabase.from("applications").select("id, full_name, job_title, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.from("contact_submissions").select("id, full_name, company, created_at").order("created_at", { ascending: false }).limit(5),
    supabase.rpc("analytics_summary"),
  ]);
  const views7 = (analyticsRes.data as { last7?: number } | null)?.last7 ?? 0;

  const rowStyle = { display: "flex", justifyContent: "space-between", gap: "12px", padding: "14px 20px", borderBottom: "1px solid var(--hairline)", fontSize: "14px" } as const;

  return (
    <div style={PAGE_PAD}>
      <AdminHeader title="Overview" subtitle="Open jobs, new applications, and unread messages at a glance." />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
        <StatTile label="Published jobs" value={jobsRes.count ?? 0} />
        <StatTile label="New applications" value={appsRes.count ?? 0} accent="var(--success)" />
        <StatTile label="Unread messages" value={msgsRes.count ?? 0} accent="var(--accent)" />
        <StatTile label="Pageviews (7d)" value={views7.toLocaleString()} accent="var(--ink)" />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
        <Panel>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--hairline)", fontWeight: 700, fontFamily: "var(--font-display)" }}>Recent applications</div>
          {(recentApps.data || []).length === 0 ? (
            <Empty>No applications yet.</Empty>
          ) : (
            (recentApps.data || []).map((a) => (
              <div key={a.id} style={rowStyle}>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{a.full_name}</span>
                <span style={{ color: "var(--muted)" }}>{a.job_title || "General"} · {fmt(a.created_at)}</span>
              </div>
            ))
          )}
        </Panel>
        <Panel>
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--hairline)", fontWeight: 700, fontFamily: "var(--font-display)" }}>Recent messages</div>
          {(recentMsgs.data || []).length === 0 ? (
            <Empty>No messages yet.</Empty>
          ) : (
            (recentMsgs.data || []).map((m) => (
              <div key={m.id} style={rowStyle}>
                <span style={{ color: "var(--ink)", fontWeight: 600 }}>{m.full_name}</span>
                <span style={{ color: "var(--muted)" }}>{m.company || "—"} · {fmt(m.created_at)}</span>
              </div>
            ))
          )}
        </Panel>
      </div>
    </div>
  );
}
