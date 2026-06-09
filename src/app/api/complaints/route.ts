import { NextResponse } from "next/server";
import { createComplaint, getComplaints } from "@/lib/complaint-store";
import type { ComplaintInput } from "@/types/complaints";

export async function GET() {
  const complaints = await getComplaints();
  return NextResponse.json({ data: complaints });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as ComplaintInput;
  const result = await createComplaint(payload);

  if (result.fieldErrors) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: result.fieldErrors }, { status: 422 });
  }

  return NextResponse.json({ data: result.data }, { status: 201 });
}
