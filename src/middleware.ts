import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    // Run on admin routes (auth gate) + refresh session elsewhere, excluding static assets.
    "/((?!_next/static|_next/image|favicon.ico|logo-qualrec.png|case-studies|og-default.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
