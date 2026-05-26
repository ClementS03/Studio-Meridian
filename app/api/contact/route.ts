import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await req.json();
  // Email delivery not wired up — form submission acknowledged silently.
  return NextResponse.json({ ok: true });
}
