import { NextResponse } from "next/server";
import { rsvpSchema } from "@/lib/rsvpSchema";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = rsvpSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid submission." },
      { status: 400 }
    );
  }

  // No durable backend is wired up yet — this logs server-side so
  // submissions are visible in deployment logs until real persistence
  // (e.g. Supabase) is added.
  console.log("[FamBam2026 RSVP]", {
    ...parsed.data,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
