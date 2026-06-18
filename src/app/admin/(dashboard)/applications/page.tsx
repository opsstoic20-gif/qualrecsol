import { createClient } from "@/lib/supabase/server";
import { AdminHeader, Panel, Empty, PAGE_PAD } from "@/components/admin/ui";
import { setApplicationStatus, deleteApplication } from "@/app/actions/admin";
import type { Application } from "@/lib/types";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "reviewing", "contacted", "closed"];

function fmt(ts: string) {
  return new Date(ts).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export default async function ApplicationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
  const apps = (data as Application[]) || [];

  const cell = { padding: "14px 18px", fontSize: "13.5px", verticalAlign: "top" } as const;
  const selectStyle = { fontFamily: "var(--font-body)", fontSize: "13px", padding: "6px 8px", borderRadius: "8px", border: "1px solid var(--hairline)", cursor: "pointer" };

  return (
    <div style={PAGE_PAD}>
      <AdminHeader title="Applications" subtitle={`${apps.length} total`} />
      <Panel>
        {apps.length === 0 ? (
          <Empty>No applications yet.</Empty>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--hairline)", color: "var(--muted)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <th style={cell}>Candidate</th>
                <th style={cell}>Role</th>
                <th style={cell}>Date</th>
                <th style={cell}>Status</th>
                <th style={{ ...cell, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((a) => (
                <tr key={a.id} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <td style={cell}>
                    <div style={{ fontWeight: 600, color: "var(--ink)", fontSize: "14px" }}>{a.full_name}</div>
                    <div style={{ color: "var(--muted)", marginTop: "2px" }}>
                      <a href={`mailto:${a.email}`} style={{ color: "var(--brand)" }}>{a.email}</a>
                      {a.phone ? ` · ${a.phone}` : ""}
                    </div>
                    {a.linkedin_url && <div style={{ marginTop: "2px" }}><a href={a.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: "var(--brand)", fontSize: "12.5px" }}>LinkedIn ↗</a></div>}
                    {a.message && <div style={{ marginTop: "6px", color: "var(--body)", maxWidth: "360px", lineHeight: 1.5 }}>{a.message}</div>}
                  </td>
                  <td style={cell}>{a.job_title || "General"}{a.current_role ? <div style={{ color: "var(--muted)", marginTop: "2px" }}>{a.current_role}</div> : null}</td>
                  <td style={cell}>{fmt(a.created_at)}</td>
                  <td style={cell}>
                    <form action={setApplicationStatus} style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                      <input type="hidden" name="id" value={a.id} />
                      <select name="status" defaultValue={a.status} style={selectStyle}>
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <button type="submit" style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "8px", padding: "6px 10px", fontSize: "12.5px", fontWeight: 600, cursor: "pointer", color: "var(--ink)" }}>Save</button>
                    </form>
                  </td>
                  <td style={{ ...cell, textAlign: "right" }}>
                    <form action={deleteApplication}>
                      <input type="hidden" name="id" value={a.id} />
                      <button type="submit" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "8px", padding: "6px 10px", fontSize: "12.5px", fontWeight: 600, color: "#B91C1C", cursor: "pointer" }}>Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Panel>
    </div>
  );
}
