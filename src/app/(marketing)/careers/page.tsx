import type { Metadata } from "next";
import CareersView from "@/components/views/CareersView";
import { createClient } from "@/lib/supabase/server";
import type { Job } from "@/lib/types";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join Qualrec Solutions. Explore open roles or send us your profile — we place talent across India and the United States.",
};

// Always reflect the latest published jobs.
export const dynamic = "force-dynamic";

export default async function Page() {
  let jobs: Job[] = [];
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_published", true)
      .order("posted_at", { ascending: false });
    jobs = (data as Job[]) || [];
  } catch {
    // Degrade gracefully to the written empty state if Supabase is unreachable.
    jobs = [];
  }
  return <CareersView jobs={jobs} />;
}
