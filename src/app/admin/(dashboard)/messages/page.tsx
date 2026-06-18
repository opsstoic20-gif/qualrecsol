import { createClient } from "@/lib/supabase/server";
import { AdminHeader, Panel, Empty, Badge, PAGE_PAD } from "@/components/admin/ui";
import { setMessageRead, deleteMessage } from "@/app/actions/admin";
import type { ContactSubmission } from "@/lib/types";

export const dynamic = "force-dynamic";

function fmt(ts: string) {
  return new Date(ts).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
  const msgs = (data as ContactSubmission[]) || [];

  return (
    <div style={PAGE_PAD}>
      <AdminHeader title="Messages" subtitle={`${msgs.length} total`} />
      {msgs.length === 0 ? (
        <Panel><Empty>No messages yet.</Empty></Panel>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {msgs.map((m) => (
            <Panel key={m.id} style={{ padding: "20px 24px", borderLeft: m.is_read ? "1px solid var(--hairline)" : "3px solid var(--brand)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", alignItems: "baseline" }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: "16px", color: "var(--ink)" }}>{m.full_name}</span>
                  {m.company && <span style={{ color: "var(--muted)", fontSize: "14px" }}> · {m.company}</span>}
                  {!m.is_read && <span style={{ marginLeft: "10px" }}><Badge tone="brand">New</Badge></span>}
                </div>
                <span style={{ color: "var(--muted)", fontSize: "13px" }}>{fmt(m.created_at)}</span>
              </div>
              <div style={{ marginTop: "6px", fontSize: "13.5px", color: "var(--muted)" }}>
                <a href={`mailto:${m.email}`} style={{ color: "var(--brand)" }}>{m.email}</a>
                {m.phone ? ` · ${m.phone}` : ""}
                {m.service_interest ? ` · Interested in: ${m.service_interest}` : ""}
              </div>
              <p style={{ marginTop: "12px", fontSize: "15px", lineHeight: 1.6, color: "var(--body)", whiteSpace: "pre-wrap" }}>{m.message}</p>
              <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
                <a href={`mailto:${m.email}`} style={{ background: "var(--brand)", color: "#fff", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: 600 }}>Reply</a>
                <form action={setMessageRead}>
                  <input type="hidden" name="id" value={m.id} />
                  <input type="hidden" name="next" value={(!m.is_read).toString()} />
                  <button type="submit" style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: 600, color: "var(--ink)", cursor: "pointer" }}>
                    {m.is_read ? "Mark unread" : "Mark read"}
                  </button>
                </form>
                <form action={deleteMessage}>
                  <input type="hidden" name="id" value={m.id} />
                  <button type="submit" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "8px", padding: "7px 14px", fontSize: "13px", fontWeight: 600, color: "#B91C1C", cursor: "pointer" }}>Delete</button>
                </form>
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
