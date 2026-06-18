import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

// Hit daily by Vercel Cron (see vercel.json). A real DB read resets Supabase's
// 7-day free-tier pause timer. Vercel injects `Authorization: Bearer ${CRON_SECRET}`
// automatically when CRON_SECRET is configured.
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
    }
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase.from("jobs").select("id").limit(1);
    if (error) throw error;
    return NextResponse.json({ ok: true, at: new Date().toISOString() });
  } catch (e) {
    console.error("[keep-alive] error:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
