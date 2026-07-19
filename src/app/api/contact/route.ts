import { NextResponse } from "next/server";
import { developmentContactService, type ContactFormPayload } from "@/lib/contact/contact-service";
import { validateContactPayload } from "@/lib/validation/contact";

export async function POST(request: Request) {
  const payload = (await request.json()) as ContactFormPayload;
  const validation = validateContactPayload(payload);

  if (!validation.valid) {
    return NextResponse.json({ ok: false, errors: validation.errors }, { status: 400 });
  }

  const result = await developmentContactService.submit(payload);
  return NextResponse.json(result, { status: result.ok ? 200 : 501 });
}
