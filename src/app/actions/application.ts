"use server";

import { headers } from "next/headers";
import { applicationSchema } from "@/lib/validators";
import { createClient } from "@/lib/supabase/server";
import { sendEmail } from "@/lib/email/send";
import { applicationEmail } from "@/lib/email/templates";
import type { FormState } from "@/lib/types";
import { rateLimit } from "@/lib/rate-limit";

export async function submitApplication(
  _prev: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(formData) as Record<string, string>;
  const parsed = applicationSchema.safeParse(raw);

  if (!parsed.success) {
    const flat = parsed.error.flatten().fieldErrors;
    const fieldErrors: Record<string, string> = {};
    for (const [k, v] of Object.entries(flat)) if (v && v[0]) fieldErrors[k] = v[0];
    return { ok: false, fieldErrors, error: "Please fix the highlighted fields." };
  }

  const d = parsed.data;

  // Honeypot.
  if (d.company_url && d.company_url.length > 0) return { ok: true };

  const hdrs = await headers();
  const ip = (hdrs.get("x-forwarded-for") || "unknown").split(",")[0].trim();
  if (!rateLimit(`apply:${ip}`, 5, 60_000)) {
    return { ok: false, error: "Too many applications. Please try again in a minute." };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from("applications").insert({
      job_id: d.job_id || null,
      job_title: d.job_title || null,
      full_name: d.full_name,
      email: d.email,
      phone: d.phone || null,
      linkedin_url: d.linkedin_url || null,
      current_role: d.current_role || null,
      message: d.message || null,
    });
    if (error) {
      console.error("[application] insert error:", error);
      return { ok: false, error: "Something went wrong. Please email career@qualrecsol.com." };
    }

    const { subject, html } = applicationEmail(d);
    await sendEmail({
      to: process.env.CAREERS_EMAIL_TO || "career@qualrecsol.com",
      subject,
      html,
      replyTo: d.email,
    });

    return { ok: true };
  } catch (e) {
    console.error("[application] threw:", e);
    return { ok: false, error: "Something went wrong. Please email career@qualrecsol.com." };
  }
}
