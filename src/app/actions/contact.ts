"use server";

import { headers } from "next/headers";
import { contactSchema } from "@/lib/validators";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { contactEmail } from "@/lib/email/templates";
import type { FormState } from "@/lib/types";
import { rateLimit } from "@/lib/rate-limit";

export async function submitContact(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = contactSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(flat)) if (v && v[0]) fieldErrors[k] = v[0];
    return { ok: false, fieldErrors, error: "Please fix the highlighted fields." };
  }

  const d = parsed.data;

  // Honeypot — a bot filled the hidden field. Silently succeed without storing.
  if (d.company_url && d.company_url.length > 0) return { ok: true };

  // Lightweight per-IP rate limit.
  const hdrs = await headers();
  const ip = (hdrs.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (!rateLimit(`contact:${ip}`, 5, 60_000)) {
    return { ok: false, error: "Too many messages. Please try again in a minute." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("contact_submissions").insert({
      full_name: d.full_name,
      email: d.email,
      company: d.company || null,
      phone: d.phone || null,
      service_interest: d.service_interest || null,
      message: d.message,
    });
    if (error) {
      console.error("[contact] insert error:", error);
      return { ok: false, error: "Something went wrong. Please email info@qualrecsol.com." };
    }

    const { subject, html } = contactEmail(d);
    await sendEmail({
      to: process.env.NOTIFY_EMAIL_TO || "info@qualrecsol.com",
      subject,
      html,
      replyTo: d.email,
    });

    return { ok: true };
  } catch (e) {
    console.error("[contact] threw:", e);
    return { ok: false, error: "Something went wrong. Please email info@qualrecsol.com." };
  }
}
