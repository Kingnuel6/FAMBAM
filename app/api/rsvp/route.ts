import { NextResponse } from "next/server";

type RsvpPayload = {
  name?: string;
  attending?: string;
  guests?: string;
  message?: string;
};

export async function POST(request: Request) {
  const body: RsvpPayload = await request.json().catch(() => ({}));

  if (!body.name || !body.attending) {
    return NextResponse.json(
      { ok: false, error: "Name and attendance response are required." },
      { status: 400 }
    );
  }

  console.log("[FamBam2026 RSVP]", {
    name: body.name,
    attending: body.attending,
    guests: body.guests ?? "1",
    message: body.message ?? "",
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
