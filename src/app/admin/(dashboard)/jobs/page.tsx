import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { AdminHeader, Panel, Empty, Badge, PAGE_PAD } from "@/components/admin/ui";
import JobForm from "@/components/admin/JobForm";
import { deleteJob, setJobPublished } from "@/app/actions/admin";
import type { Job } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{ new?: string; edit?: string }>;
}) {
  const sp = await searchParams;
  const supabase = await createClient();

  // Editing or creating?
  if (sp.new !== undefined) {
    return (
      <div style={PAGE_PAD}>
        <AdminHeader title="New job" subtitle="Post an opening to the public careers notice board." />
        <JobForm />
      </div>
    );
  }
  if (sp.edit) {
    const { data: job } = await supabase.from("jobs").select("*").eq("id", sp.edit).single();
    return (
      <div style={PAGE_PAD}>
        <AdminHeader title="Edit job" />
        <JobForm job={job as Job} />
      </div>
    );
  }

  const { data } = await supabase.from("jobs").select("*").order("posted_at", { ascending: false });
  const jobs = (data as Job[]) || [];

  const cell = { padding: "14px 18px", fontSize: "14px", verticalAlign: "middle" } as const;

  return (
    <div style={PAGE_PAD}>
      <AdminHeader
        title="Jobs"
        subtitle="Create, edit, publish, and remove openings."
        action={
          <Link href="/admin/jobs?new" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--brand)", color: "#fff", borderRadius: "10px", padding: "11px 18px", fontSize: "14.5px", fontWeight: 600 }}>
            + New job
          </Link>
        }
      />
      <Panel>
        {jobs.length === 0 ? (
          <Empty>No jobs yet. Create your first opening.</Empty>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid var(--hairline)", color: "var(--muted)", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                <th style={cell}>Title</th>
                <th style={cell}>Type</th>
                <th style={cell}>Status</th>
                <th style={{ ...cell, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((j) => (
                <tr key={j.id} style={{ borderBottom: "1px solid var(--hairline)" }}>
                  <td style={cell}>
                    <div style={{ fontWeight: 600, color: "var(--ink)" }}>{j.title}</div>
                    <div style={{ color: "var(--muted)", fontSize: "12.5px", marginTop: "2px" }}>{j.category} · {j.location}</div>
                  </td>
                  <td style={cell}>{j.employment_type}</td>
                  <td style={cell}>
                    {j.is_published ? <Badge tone="success">Published</Badge> : <Badge tone="warn">Draft</Badge>}
                  </td>
                  <td style={{ ...cell, textAlign: "right" }}>
                    <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                      <form action={setJobPublished}>
                        <input type="hidden" name="id" value={j.id} />
                        <input type="hidden" name="next" value={(!j.is_published).toString()} />
                        <button type="submit" style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "8px", padding: "7px 12px", fontSize: "13px", fontWeight: 600, color: "var(--ink)", cursor: "pointer" }}>
                          {j.is_published ? "Unpublish" : "Publish"}
                        </button>
                      </form>
                      <Link href={`/admin/jobs?edit=${j.id}`} style={{ background: "var(--surface-2)", border: "1px solid var(--hairline)", borderRadius: "8px", padding: "7px 12px", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>Edit</Link>
                      <form action={deleteJob}>
                        <input type="hidden" name="id" value={j.id} />
                        <button type="submit" style={{ background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: "8px", padding: "7px 12px", fontSize: "13px", fontWeight: 600, color: "#B91C1C", cursor: "pointer" }}>Delete</button>
                      </form>
                    </div>
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
