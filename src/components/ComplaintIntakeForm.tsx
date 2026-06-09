"use client";

import { FormEvent, useMemo, useState, type ReactNode } from "react";
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
  type ComplaintRecord,
} from "@/types/complaints";

const today = new Date();
const monthName = today.toLocaleString("en", { month: "long", timeZone: "UTC" });
const dateValue = today.toISOString().slice(0, 10);
const timeValue = today.toISOString().slice(11, 16);

const emptyComplaint: ComplaintInput = {
  callCenterAgentName: "",
  callCenterAgentCode: "",
  dateOfComplaint: dateValue,
  monthOfComplaint: monthName,
  yearOfComplaint: String(today.getUTCFullYear()),
  timeOfComplaint: timeValue,
  complaintCode: "",
  complaintChannel: "Hotline",
  complaintPriority: "Medium",
  wasteAccountId: "",
  nameOfComplainant: "",
  genderOfComplainant: "Prefer not to say",
  addressOfComplainant: "",
  complaintRegion: "Central",
  complainantMobileNo: "",
  typeCategoryOfComplaint: "Waste/Sanitation",
  locationOfComplaintEvent: "",
  complaintDescriptionDetails: "",
  dominantSourceOfInformation: "Online",
  nameOfOffenderAccused: "",
  locationAddressOfOffender: "",
  internalAssigneeName: "",
  internalAssigneeDepartment: "",
  complaintAssignmentDate: dateValue,
  assignmentComments: "",
  internalEscalationStatus: "Not Escalated",
  escalationDate: "",
  escalationNotes: "",
  complaintResolutionStatus: "Open",
  resolutionDate: "",
  resolutionComments: "",
};

interface ComplaintIntakeFormProps {
  onCreated: (complaint: ComplaintRecord) => void;
}

function Field({ label, children, required = false }: { label: string; children: ReactNode; required?: boolean }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-slate-700">
      <span>
        {label} {required ? <span className="text-rose-600">*</span> : null}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";

export function ComplaintIntakeForm({ onCreated }: ComplaintIntakeFormProps) {
  const [form, setForm] = useState<ComplaintInput>(emptyComplaint);
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [message, setMessage] = useState("");

  const generatedCode = useMemo(() => {
    const prefix = form.typeCategoryOfComplaint.split(/[\s/]/)[0].slice(0, 3).toUpperCase();
    const priority = form.complaintPriority.slice(0, 3).toUpperCase();
    return `${prefix}-${priority}-${form.dateOfComplaint.replaceAll("-", "")}`;
  }, [form.dateOfComplaint, form.complaintPriority, form.typeCategoryOfComplaint]);

  function updateField<K extends keyof ComplaintInput>(field: K, value: ComplaintInput[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submitComplaint(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("saving");
    setMessage("");

    const response = await fetch("/api/complaints", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, complaintCode: form.complaintCode || generatedCode }),
    });

    const payload = await response.json();
    if (!response.ok) {
      setStatus("error");
      setMessage(payload.error ?? "Unable to save complaint. Check required fields and try again.");
      return;
    }

    setStatus("saved");
    setMessage(`Complaint ${payload.data.issueId} logged and routed successfully.`);
    setForm({ ...emptyComplaint, complaintCode: "" });
    onCreated(payload.data as ComplaintRecord);
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70" id="logging">
      <div className="flex flex-col gap-2 border-b border-slate-100 pb-5">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-700">Complaints Register Intake Logging Form</span>
        <h2 className="text-2xl font-bold text-slate-950">Record a new public complaint</h2>
        <p className="text-sm leading-6 text-slate-500">
          Captures the complete minimum complaint register schema from caller intake through assignment, escalation,
          resolution, and closure fields.
        </p>
      </div>

      <form className="mt-6 grid gap-5" onSubmit={submitComplaint}>
        <div className="grid gap-5 lg:grid-cols-3">
          <Field label="Call Center Agent Name" required>
            <input className={inputClass} value={form.callCenterAgentName} onChange={(event) => updateField("callCenterAgentName", event.target.value)} />
          </Field>
          <Field label="Call Center Agent Code" required>
            <input className={inputClass} value={form.callCenterAgentCode} onChange={(event) => updateField("callCenterAgentCode", event.target.value)} placeholder="CCA-001" />
          </Field>
          <Field label="Complaint Code" required>
            <input className={inputClass} value={form.complaintCode} onChange={(event) => updateField("complaintCode", event.target.value)} placeholder={generatedCode} />
          </Field>
          <Field label="Date of Complaint" required>
            <input className={inputClass} type="date" value={form.dateOfComplaint} onChange={(event) => updateField("dateOfComplaint", event.target.value)} />
          </Field>
          <Field label="Month of Complaint" required>
            <input className={inputClass} value={form.monthOfComplaint} onChange={(event) => updateField("monthOfComplaint", event.target.value)} />
          </Field>
          <Field label="Year of Complaint" required>
            <input className={inputClass} value={form.yearOfComplaint} onChange={(event) => updateField("yearOfComplaint", event.target.value)} />
          </Field>
          <Field label="Time of Complaint" required>
            <input className={inputClass} type="time" value={form.timeOfComplaint} onChange={(event) => updateField("timeOfComplaint", event.target.value)} />
          </Field>
          <Field label="Complaint Channel" required>
            <select className={inputClass} value={form.complaintChannel} onChange={(event) => updateField("complaintChannel", event.target.value as ComplaintInput["complaintChannel"])}>
              {complaintChannels.map((channel) => <option key={channel}>{channel}</option>)}
            </select>
          </Field>
          <Field label="Complaint Priority" required>
            <select className={inputClass} value={form.complaintPriority} onChange={(event) => updateField("complaintPriority", event.target.value as ComplaintInput["complaintPriority"])}>
              {complaintPriorities.map((priority) => <option key={priority}>{priority}</option>)}
            </select>
          </Field>
        </div>

        <div className="rounded-3xl bg-slate-50 p-5">
          <h3 className="font-bold text-slate-950">Complainant and complaint details</h3>
          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            <Field label="Waste Account ID">
              <input className={inputClass} value={form.wasteAccountId} onChange={(event) => updateField("wasteAccountId", event.target.value)} />
            </Field>
            <Field label="Name of Complainant" required>
              <input className={inputClass} value={form.nameOfComplainant} onChange={(event) => updateField("nameOfComplainant", event.target.value)} />
            </Field>
            <Field label="Gender of Complainant" required>
              <select className={inputClass} value={form.genderOfComplainant} onChange={(event) => updateField("genderOfComplainant", event.target.value as ComplaintInput["genderOfComplainant"])}>
                {complainantGenders.map((gender) => <option key={gender}>{gender}</option>)}
              </select>
            </Field>
            <Field label="Address of Complainant" required>
              <input className={inputClass} value={form.addressOfComplainant} onChange={(event) => updateField("addressOfComplainant", event.target.value)} />
            </Field>
            <Field label="Complaint Region" required>
              <select className={inputClass} value={form.complaintRegion} onChange={(event) => updateField("complaintRegion", event.target.value as ComplaintInput["complaintRegion"])}>
                {complaintRegions.map((region) => <option key={region}>{region}</option>)}
              </select>
            </Field>
            <Field label="Complainant Mobile No." required>
              <input className={inputClass} value={form.complainantMobileNo} onChange={(event) => updateField("complainantMobileNo", event.target.value)} placeholder="+232 ..." />
            </Field>
            <Field label="Type/Category of Complaint" required>
              <select className={inputClass} value={form.typeCategoryOfComplaint} onChange={(event) => updateField("typeCategoryOfComplaint", event.target.value as ComplaintInput["typeCategoryOfComplaint"])}>
                {complaintCategories.map((category) => <option key={category}>{category}</option>)}
              </select>
            </Field>
            <Field label="Location of Complaint/Event" required>
              <input className={inputClass} value={form.locationOfComplaintEvent} onChange={(event) => updateField("locationOfComplaintEvent", event.target.value)} />
            </Field>
            <Field label="Dominant Source of Information" required>
              <select className={inputClass} value={form.dominantSourceOfInformation} onChange={(event) => updateField("dominantSourceOfInformation", event.target.value as ComplaintInput["dominantSourceOfInformation"])}>
                {informationSources.map((source) => <option key={source}>{source}</option>)}
              </select>
            </Field>
            <div className="lg:col-span-3">
              <Field label="Complaint Description Details" required>
                <textarea className={`${inputClass} min-h-28`} value={form.complaintDescriptionDetails} onChange={(event) => updateField("complaintDescriptionDetails", event.target.value)} />
              </Field>
            </div>
            <Field label="Name of Offender/Accused">
              <input className={inputClass} value={form.nameOfOffenderAccused} onChange={(event) => updateField("nameOfOffenderAccused", event.target.value)} />
            </Field>
            <Field label="Location/Address of Offender">
              <input className={inputClass} value={form.locationAddressOfOffender} onChange={(event) => updateField("locationAddressOfOffender", event.target.value)} />
            </Field>
          </div>
        </div>

        <div className="rounded-3xl bg-blue-50 p-5">
          <h3 className="font-bold text-slate-950">Assignment, escalation, and resolution</h3>
          <div className="mt-4 grid gap-5 lg:grid-cols-3">
            <Field label="Internal Assignee Name" required>
              <input className={inputClass} value={form.internalAssigneeName} onChange={(event) => updateField("internalAssigneeName", event.target.value)} />
            </Field>
            <Field label="Internal Assignee Department" required>
              <input className={inputClass} value={form.internalAssigneeDepartment} onChange={(event) => updateField("internalAssigneeDepartment", event.target.value)} />
            </Field>
            <Field label="Complaint Assignment Date" required>
              <input className={inputClass} type="date" value={form.complaintAssignmentDate} onChange={(event) => updateField("complaintAssignmentDate", event.target.value)} />
            </Field>
            <div className="lg:col-span-3">
              <Field label="Assignment Comments">
                <textarea className={`${inputClass} min-h-24`} value={form.assignmentComments} onChange={(event) => updateField("assignmentComments", event.target.value)} />
              </Field>
            </div>
            <Field label="Internal Escalation Status" required>
              <select className={inputClass} value={form.internalEscalationStatus} onChange={(event) => updateField("internalEscalationStatus", event.target.value as ComplaintInput["internalEscalationStatus"])}>
                {escalationStatuses.map((statusOption) => <option key={statusOption}>{statusOption}</option>)}
              </select>
            </Field>
            <Field label="Escalation Date">
              <input className={inputClass} type="date" value={form.escalationDate} onChange={(event) => updateField("escalationDate", event.target.value)} />
            </Field>
            <Field label="Complaint Resolution Status" required>
              <select className={inputClass} value={form.complaintResolutionStatus} onChange={(event) => updateField("complaintResolutionStatus", event.target.value as ComplaintInput["complaintResolutionStatus"])}>
                {resolutionStatuses.map((statusOption) => <option key={statusOption}>{statusOption}</option>)}
              </select>
            </Field>
            <div className="lg:col-span-3">
              <Field label="Escalation Notes">
                <textarea className={`${inputClass} min-h-24`} value={form.escalationNotes} onChange={(event) => updateField("escalationNotes", event.target.value)} />
              </Field>
            </div>
            <Field label="Resolution Date">
              <input className={inputClass} type="date" value={form.resolutionDate} onChange={(event) => updateField("resolutionDate", event.target.value)} />
            </Field>
            <div className="lg:col-span-2">
              <Field label="Resolution Comments">
                <textarea className={`${inputClass} min-h-24`} value={form.resolutionComments} onChange={(event) => updateField("resolutionComments", event.target.value)} />
              </Field>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 lg:flex-row lg:items-center lg:justify-between">
          <p>{message || "Issue ID is generated automatically when the complaint is saved."}</p>
          <button className="rounded-2xl bg-blue-700 px-5 py-3 font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-slate-400" disabled={status === "saving"} type="submit">
            {status === "saving" ? "Saving complaint..." : "Create complaint record"}
          </button>
        </div>
      </form>
    </section>
  );
}
