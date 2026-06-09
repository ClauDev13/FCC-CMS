import {
  complaintCategories,
  complaintChannels,
  complaintPriorities,
  complaintRegions,
  complainantGenders,
  escalationStatuses,
  informationSources,
  resolutionStatuses,
  type ComplaintInput,
} from "@/types/complaints";

const requiredFields: Array<keyof ComplaintInput> = [
  "callCenterAgentName",
  "callCenterAgentCode",
  "dateOfComplaint",
  "monthOfComplaint",
  "yearOfComplaint",
  "timeOfComplaint",
  "complaintCode",
  "complaintChannel",
  "complaintPriority",
  "nameOfComplainant",
  "genderOfComplainant",
  "addressOfComplainant",
  "complaintRegion",
  "complainantMobileNo",
  "typeCategoryOfComplaint",
  "locationOfComplaintEvent",
  "complaintDescriptionDetails",
  "dominantSourceOfInformation",
  "internalAssigneeName",
  "internalAssigneeDepartment",
  "complaintAssignmentDate",
  "internalEscalationStatus",
  "complaintResolutionStatus",
];

const enumFields = {
  complaintChannel: complaintChannels,
  complaintPriority: complaintPriorities,
  genderOfComplainant: complainantGenders,
  complaintRegion: complaintRegions,
  typeCategoryOfComplaint: complaintCategories,
  dominantSourceOfInformation: informationSources,
  internalEscalationStatus: escalationStatuses,
  complaintResolutionStatus: resolutionStatuses,
} satisfies Partial<Record<keyof ComplaintInput, readonly string[]>>;

export function validateComplaintInput(input: Partial<ComplaintInput>) {
  const fieldErrors: Partial<Record<keyof ComplaintInput, string>> = {};

  for (const field of requiredFields) {
    if (!String(input[field] ?? "").trim()) {
      fieldErrors[field] = "This field is required.";
    }
  }

  for (const [field, allowedValues] of Object.entries(enumFields) as Array<[
    keyof typeof enumFields,
    readonly string[],
  ]>) {
    const value = String(input[field] ?? "");
    if (value && !allowedValues.includes(value)) {
      fieldErrors[field] = `Must be one of: ${allowedValues.join(", ")}.`;
    }
  }

  if (input.complainantMobileNo && !/^\+?[0-9\s-]{7,20}$/.test(input.complainantMobileNo)) {
    fieldErrors.complainantMobileNo = "Enter a valid mobile number.";
  }

  if (input.yearOfComplaint && !/^\d{4}$/.test(input.yearOfComplaint)) {
    fieldErrors.yearOfComplaint = "Enter a four-digit year.";
  }

  return {
    valid: Object.keys(fieldErrors).length === 0,
    fieldErrors,
  };
}
