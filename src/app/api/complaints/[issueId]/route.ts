import { NextResponse } from "next/server";
import { getComplaint, updateComplaint } from "@/lib/complaint-store";
import type { ComplaintInput } from "@/types/complaints";

interface RouteContext {
  params: Promise<{ issueId: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  const { issueId } = await context.params;
  const complaint = await getComplaint(decodeURIComponent(issueId));

  if (!complaint) {
    return NextResponse.json({ error: "Complaint not found." }, { status: 404 });
  }

  return NextResponse.json({ data: complaint });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { issueId } = await context.params;
  const payload = (await request.json()) as ComplaintInput;
  const result = await updateComplaint(decodeURIComponent(issueId), payload);

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 404 });
  }

  if (result.fieldErrors) {
    return NextResponse.json({ error: "Validation failed.", fieldErrors: result.fieldErrors }, { status: 422 });
  }

  return NextResponse.json({ data: result.data });
}
