import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
// Until qualrecsol.com is verified in Resend, onboarding@resend.dev works for testing.
const from = process.env.EMAIL_FROM || "Qualrec Solutions <onboarding@resend.dev>";

type SendArgs = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

/**
 * Swappable transactional email sender.
 * No-ops (and logs) when RESEND_API_KEY is absent so forms still succeed
 * (submissions are always persisted to Supabase regardless).
 */
export async function sendEmail({ to, subject, html, replyTo }: SendArgs) {
  if (!apiKey) {
    console.warn(`[email] RESEND_API_KEY not set — skipped sending: "${subject}"`);
    return { skipped: true as const };
  }
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
      ...(replyTo ? { replyTo } : {}),
    });
    if (error) {
      console.error("[email] send error:", error);
      return { error };
    }
    return { data };
  } catch (e) {
    console.error("[email] threw:", e);
    return { error: e };
  }
}
