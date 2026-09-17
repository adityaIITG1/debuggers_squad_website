import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function proxy(request: NextRequest) {
  // These endpoints authenticate with their own server secrets, not a user session.
  if (request.nextUrl.pathname === "/api/cron/supabase-keepalive" || request.nextUrl.pathname === "/api/cron/seo-agent") {
    return NextResponse.next();
  }
  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
