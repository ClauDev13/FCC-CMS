export const complaintCategories = [
  "Waste/Sanitation",
  "Property Tax",
  "Business License",
  "Markets",
  "Other Issues",
] as const;

export const complaintChannels = ["Hotline", "Walk-in", "Email", "WhatsApp", "Web Portal", "Field Officer"] as const;
export const complaintPriorities = ["Low", "Medium", "High", "Critical"] as const;
export const complainantGenders = ["Female", "Male", "Other", "Prefer not to say"] as const;
export const complaintRegions = ["East", "West", "Central"] as const;
export const informationSources = ["Radio", "TV", "Online", "Community Meeting", "Word of Mouth", "Other"] as const;
export const escalationStatuses = ["Not Escalated", "Pending Escalation", "Escalated", "De-escalated"] as const;
export const resolutionStatuses = ["Open", "Assigned", "In Progress", "Escalated", "Resolved", "Closed"] as const;

export type ComplaintCategory = (typeof complaintCategories)[number];
export type ComplaintChannel = (typeof complaintChannels)[number];
export type ComplaintPriority = (typeof complaintPriorities)[number];
export type ComplainantGender = (typeof complainantGenders)[number];
export type ComplaintRegion = (typeof complaintRegions)[number];
export type InformationSource = (typeof informationSources)[number];
export type EscalationStatus = (typeof escalationStatuses)[number];
export type ResolutionStatus = (typeof resolutionStatuses)[number];

export type Role =
  | "Call Center Agent"
  | "Supervisor"
  | "Department Officer"
  | "Escalation Manager"
  | "System Administrator";

export interface ComplaintRecord {
  issueId: string;
  callCenterAgentName: string;
  callCenterAgentCode: string;
  dateOfComplaint: string;
  monthOfComplaint: string;
  yearOfComplaint: string;
  timeOfComplaint: string;
  complaintCode: string;
  complaintChannel: ComplaintChannel;
  complaintPriority: ComplaintPriority;
  wasteAccountId: string;
  nameOfComplainant: string;
  genderOfComplainant: ComplainantGender;
  addressOfComplainant: string;
  complaintRegion: ComplaintRegion;
  complainantMobileNo: string;
  typeCategoryOfComplaint: ComplaintCategory;
  locationOfComplaintEvent: string;
  complaintDescriptionDetails: string;
  dominantSourceOfInformation: InformationSource;
  nameOfOffenderAccused: string;
  locationAddressOfOffender: string;
  internalAssigneeName: string;
  internalAssigneeDepartment: string;
  complaintAssignmentDate: string;
  assignmentComments: string;
  internalEscalationStatus: EscalationStatus;
  escalationDate: string;
  escalationNotes: string;
  complaintResolutionStatus: ResolutionStatus;
  resolutionDate: string;
  resolutionComments: string;
  createdAt: string;
  updatedAt: string;
}

export type ComplaintInput = Omit<ComplaintRecord, "issueId" | "createdAt" | "updatedAt"> & {
  issueId?: string;
};

export interface WorkflowStage {
  name: string;
  description: string;
  owner: Role;
  metric: string;
}

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  fieldErrors?: Partial<Record<keyof ComplaintInput, string>>;
}
