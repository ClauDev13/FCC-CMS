import { promises as fs } from "fs";
import path from "path";
import { seedComplaints } from "@/data/mock-data";
import type { ComplaintInput, ComplaintRecord } from "@/types/complaints";
import { validateComplaintInput } from "@/lib/complaint-validation";

const dataDirectory = path.join(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "complaints.json");

async function ensureStore() {
  await fs.mkdir(dataDirectory, { recursive: true });
  try {
    await fs.access(dataFile);
  } catch {
    await fs.writeFile(dataFile, JSON.stringify(seedComplaints, null, 2));
  }
}

export async function getComplaints(): Promise<ComplaintRecord[]> {
  await ensureStore();
  const file = await fs.readFile(dataFile, "utf8");
  return JSON.parse(file) as ComplaintRecord[];
}

async function saveComplaints(complaints: ComplaintRecord[]) {
  await ensureStore();
  await fs.writeFile(dataFile, JSON.stringify(complaints, null, 2));
}

function nextIssueId(complaints: ComplaintRecord[]) {
  const year = new Date().getUTCFullYear();
  const max = complaints.reduce((highest, complaint) => {
    const match = complaint.issueId.match(/(\d+)$/);
    return match ? Math.max(highest, Number(match[1])) : highest;
  }, 0);
  return `FCC-${year}-${String(max + 1).padStart(6, "0")}`;
}

function normalizeComplaint(input: ComplaintInput, issueId: string, existing?: ComplaintRecord): ComplaintRecord {
  const now = new Date().toISOString();
  return {
    issueId,
    callCenterAgentName: input.callCenterAgentName.trim(),
    callCenterAgentCode: input.callCenterAgentCode.trim(),
    dateOfComplaint: input.dateOfComplaint,
    monthOfComplaint: input.monthOfComplaint.trim(),
    yearOfComplaint: input.yearOfComplaint.trim(),
    timeOfComplaint: input.timeOfComplaint,
    complaintCode: input.complaintCode.trim(),
    complaintChannel: input.complaintChannel,
    complaintPriority: input.complaintPriority,
    wasteAccountId: input.wasteAccountId.trim(),
    nameOfComplainant: input.nameOfComplainant.trim(),
    genderOfComplainant: input.genderOfComplainant,
    addressOfComplainant: input.addressOfComplainant.trim(),
    complaintRegion: input.complaintRegion,
    complainantMobileNo: input.complainantMobileNo.trim(),
    typeCategoryOfComplaint: input.typeCategoryOfComplaint,
    locationOfComplaintEvent: input.locationOfComplaintEvent.trim(),
    complaintDescriptionDetails: input.complaintDescriptionDetails.trim(),
    dominantSourceOfInformation: input.dominantSourceOfInformation,
    nameOfOffenderAccused: input.nameOfOffenderAccused.trim(),
    locationAddressOfOffender: input.locationAddressOfOffender.trim(),
    internalAssigneeName: input.internalAssigneeName.trim(),
    internalAssigneeDepartment: input.internalAssigneeDepartment.trim(),
    complaintAssignmentDate: input.complaintAssignmentDate,
    assignmentComments: input.assignmentComments.trim(),
    internalEscalationStatus: input.internalEscalationStatus,
    escalationDate: input.escalationDate,
    escalationNotes: input.escalationNotes.trim(),
    complaintResolutionStatus: input.complaintResolutionStatus,
    resolutionDate: input.resolutionDate,
    resolutionComments: input.resolutionComments.trim(),
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
}

export async function createComplaint(input: ComplaintInput) {
  const validation = validateComplaintInput(input);
  if (!validation.valid) {
    return { fieldErrors: validation.fieldErrors };
  }

  const complaints = await getComplaints();
  const complaint = normalizeComplaint(input, input.issueId?.trim() || nextIssueId(complaints));
  await saveComplaints([complaint, ...complaints]);
  return { data: complaint };
}

export async function updateComplaint(issueId: string, input: ComplaintInput) {
  const validation = validateComplaintInput(input);
  if (!validation.valid) {
    return { fieldErrors: validation.fieldErrors };
  }

  const complaints = await getComplaints();
  const index = complaints.findIndex((complaint) => complaint.issueId === issueId);
  if (index === -1) {
    return { error: "Complaint not found." };
  }

  const updated = normalizeComplaint(input, issueId, complaints[index]);
  complaints[index] = updated;
  await saveComplaints(complaints);
  return { data: updated };
}

export async function getComplaint(issueId: string) {
  const complaints = await getComplaints();
  return complaints.find((complaint) => complaint.issueId === issueId) ?? null;
}
