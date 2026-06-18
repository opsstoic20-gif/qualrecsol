import { createClient } from "@/lib/supabase/server";
import { AdminHeader, StatTile, Panel, Empty, PAGE_PAD } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

type Summary = {
  total: number;
  last7: number;
  last24: number;
  top_paths: { path: string; views: number }[];
  by_day: { day: string; views: number }[];
};

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const { data } = await supabase.rpc("analytics_summary");
  const s: Summary = (data as Summary) || { total: 0, last7: 0, last24: 0, top_paths: [], by_day: [] };
  const maxDay = Math.max(1, ...s.by_day.map((d) => d.views));

  return (
    <div style={PAGE_PAD}>
      <AdminHeader title="Site analytics" subtitle="First-party pageviews from the public site (admin pages excluded)." />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "20px", marginBottom: "28px" }}>
        <StatTile label="Total pageviews" value={s.total.toLocaleString()} />
        <StatTile label="Last 7 days" value={s.last7.toLocaleString()} accent="var(--success)" />
        <StatTile label="Last 24 hours" value={s.last24.toLocaleString()} accent="var(--accent)" />
      </div>

      <Panel style={{ padding: "24px 26px", marginBottom: "20px" }}>
        <div style={{ fontWeight: 700, fontFamily: "var(--font-display)", marginBottom: "20px" }}>Last 14 days</div>
        {s.by_day.length === 0 ? (
          <Empty>No views recorded yet. Visit the public site to generate data.</Empty>
        ) : (
          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", height: "180px" }}>
            {s.by_day.map((d) => (
              <div key={d.day} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%", justifyContent: "flex-end" }} title={`${d.day}: ${d.views}`}>
                <div style={{ fontSize: "11px", color: "var(--muted)", fontWeight: 600 }}>{d.views}</div>
                <div style={{ width: "100%", maxWidth: "34px", height: `${(d.views / maxDay) * 100}%`, minHeight: "4px", background: "var(--brand)", borderRadius: "6px 6px 0 0" }} />
                <div style={{ fontSize: "10px", color: "var(--muted)" }}>{d.day.slice(5)}</div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel>
        <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--hairline)", fontWeight: 700, fontFamily: "var(--font-display)" }}>Top pages</div>
        {s.top_paths.length === 0 ? (
          <Empty>No pages tracked yet.</Empty>
        ) : (
          s.top_paths.map((p) => (
            <div key={p.path} style={{ display: "flex", justifyContent: "space-between", padding: "13px 20px", borderBottom: "1px solid var(--hairline)", fontSize: "14px" }}>
              <span style={{ color: "var(--ink)", fontWeight: 600 }}>{p.path}</span>
              <span style={{ color: "var(--muted)" }}>{p.views.toLocaleString()} views</span>
            </div>
          ))
        )}
      </Panel>
    </div>
  );
}
