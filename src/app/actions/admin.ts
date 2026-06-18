"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (!isAdmin) throw new Error("Forbidden");
  return supabase;
}

function revalidateAdmin() {
  revalidatePath("/admin");
  revalidatePath("/admin/jobs");
  revalidatePath("/careers");
}

/* -------------------------------- Jobs CRUD -------------------------------- */
export async function saveJob(formData: FormData) {
  const supabase = await requireAdmin();
  const id = (formData.get("id") as string) || "";
  const requirements = ((formData.get("requirements") as string) || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  const row = {
    title: (formData.get("title") as string)?.trim(),
    category: (formData.get("category") as string)?.trim(),
    employment_type: (formData.get("employment_type") as string) || "Contract-to-Hire",
    location: ((formData.get("location") as string) || "Remote").trim(),
    work_mode: ((formData.get("work_mode") as string) || "").trim() || null,
    salary_range: ((formData.get("salary_range") as string) || "").trim() || null,
    summary: ((formData.get("summary") as string) || "").trim() || null,
    description: ((formData.get("description") as string) || "").trim() || null,
    requirements,
    is_published: formData.get("is_published") === "on",
  };

  if (id) {
    const { error } = await supabase.from("jobs").update(row).eq("id", id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("jobs").insert(row);
    if (error) throw error;
  }
  revalidateAdmin();
  redirect("/admin/jobs");
}

export async function deleteJob(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("jobs").delete().eq("id", id);
  if (error) throw error;
  revalidateAdmin();
}

export async function setJobPublished(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  const next = formData.get("next") === "true";
  const { error } = await supabase.from("jobs").update({ is_published: next }).eq("id", id);
  if (error) throw error;
  revalidateAdmin();
}

/* ------------------------------- Applications ------------------------------ */
export async function setApplicationStatus(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  const status = formData.get("status") as string;
  const { error } = await supabase.from("applications").update({ status }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

export async function deleteApplication(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("applications").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/applications");
  revalidatePath("/admin");
}

/* --------------------------------- Messages -------------------------------- */
export async function setMessageRead(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  const next = formData.get("next") === "true";
  const { error } = await supabase.from("contact_submissions").update({ is_read: next }).eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}

export async function deleteMessage(formData: FormData) {
  const supabase = await requireAdmin();
  const id = formData.get("id") as string;
  const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/admin/messages");
  revalidatePath("/admin");
}
