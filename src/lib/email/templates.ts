// Branded transactional email templates (inline-styled HTML for broad client support).

const BRAND = "#1D4ED8";
const INK = "#0F172A";
const BODY = "#475569";
const LINE = "#E2E8F0";

function shell(title: string, rows: [string, string][], intro: string) {
  const tableRows = rows
    .filter(([, v]) => v && v.trim())
    .map(
      ([k, v]) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${LINE};font-size:13px;color:${BODY};width:160px;vertical-align:top;font-weight:600;">${k}</td>
        <td style="padding:10px 0;border-bottom:1px solid ${LINE};font-size:14px;color:${INK};vertical-align:top;">${escapeHtml(v).replace(/\n/g, "<br/>")}</td>
      </tr>`
    )
    .join("");

  return `<!doctype html><html><body style="margin:0;background:#F8FAFC;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px;">
    <div style="background:#fff;border:1px solid ${LINE};border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(120deg,#0B1F4D 0%,#1D4ED8 55%,#0E7490 120%);padding:24px 28px;">
        <div style="color:#fff;font-size:18px;font-weight:800;letter-spacing:-0.01em;">Qualrec Solutions</div>
        <div style="color:rgba(255,255,255,0.8);font-size:12px;margin-top:2px;">We Deliver Quality.</div>
      </div>
      <div style="padding:28px;">
        <h1 style="margin:0 0 6px;font-size:20px;color:${INK};">${title}</h1>
        <p style="margin:0 0 20px;font-size:14px;color:${BODY};line-height:1.6;">${intro}</p>
        <table style="width:100%;border-collapse:collapse;">${tableRows}</table>
        <p style="margin:22px 0 0;font-size:12px;color:#94A3B8;">Submitted ${new Date().toUTCString()}</p>
      </div>
    </div>
    <p style="text-align:center;font-size:11px;color:#94A3B8;margin:16px 0 0;">Sent from the Qualrec Solutions website.</p>
  </div></body></html>`;
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function contactEmail(d: {
  full_name: string;
  email: string;
  company?: string;
  phone?: string;
  service_interest?: string;
  message: string;
}) {
  return {
    subject: `New website enquiry — ${d.full_name}`,
    html: shell("New website enquiry", [
      ["Name", d.full_name],
      ["Email", d.email],
      ["Company", d.company || ""],
      ["Phone", d.phone || ""],
      ["Service of interest", d.service_interest || ""],
      ["Message", d.message],
    ], "You received a new message from the contact form."),
  };
}

export function applicationEmail(d: {
  full_name: string;
  email: string;
  phone?: string;
  linkedin_url?: string;
  current_role?: string;
  message?: string;
  job_title?: string;
}) {
  const role = d.job_title || "General application";
  return {
    subject: `New application — ${role} — ${d.full_name}`,
    html: shell("New job application", [
      ["Role", role],
      ["Name", d.full_name],
      ["Email", d.email],
      ["Phone", d.phone || ""],
      ["LinkedIn", d.linkedin_url || ""],
      ["Current role", d.current_role || ""],
      ["Message", d.message || ""],
    ], "A candidate applied through the careers page."),
  };
}
