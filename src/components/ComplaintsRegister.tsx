import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComplaintRecord } from "@/types/complaints";

const priorityStyles: Record<ComplaintRecord["complaintPriority"], string> = {
  Low: "bg-slate-100 text-slate-700",
  Medium: "bg-sky-100 text-sky-700",
  High: "bg-amber-100 text-amber-800",
  Critical: "bg-rose-100 text-rose-700",
};

interface ComplaintsRegisterProps {
  complaints: ComplaintRecord[];
}

export function ComplaintsRegister({ complaints }: ComplaintsRegisterProps) {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70" id="cases">
      <div className="flex flex-col gap-3 border-b border-slate-100 pb-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-700">Backend-backed register</span>
          <h2 className="mt-2 text-2xl font-bold text-slate-950">Complaints register and assignment queue</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
            Records shown here are served by the `/api/complaints` backend and include all required intake, assignment,
            escalation, and resolution fields.
          </p>
        </div>
        <Link className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-blue-300 hover:text-blue-700" href="/api/complaints" prefetch={false}>
          Open JSON API
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-[1100px] divide-y divide-slate-100 text-left text-sm">
          <thead className="text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="py-3 pr-4">Issue</th>
              <th className="px-4 py-3">Complainant</th>
              <th className="px-4 py-3">Category / Region</th>
              <th className="px-4 py-3">Assignment</th>
              <th className="px-4 py-3">Escalation</th>
              <th className="px-4 py-3">Resolution</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {complaints.map((complaint) => (
              <tr key={complaint.issueId} className="align-top">
                <td className="py-4 pr-4">
                  <p className="font-bold text-slate-950">{complaint.issueId}</p>
                  <p className="mt-1 text-xs text-slate-500">{complaint.complaintCode}</p>
                  <span className={cn("mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold", priorityStyles[complaint.complaintPriority])}>
                    {complaint.complaintPriority}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{complaint.nameOfComplainant}</p>
                  <p className="text-slate-500">{complaint.complainantMobileNo}</p>
                  <p className="max-w-xs text-slate-500">{complaint.addressOfComplainant}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{complaint.typeCategoryOfComplaint}</p>
                  <p className="text-slate-500">{complaint.complaintRegion} · {complaint.complaintChannel}</p>
                  <p className="max-w-xs text-slate-500">{complaint.locationOfComplaintEvent}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{complaint.internalAssigneeName}</p>
                  <p className="text-slate-500">{complaint.internalAssigneeDepartment}</p>
                  <p className="text-xs text-slate-400">{complaint.complaintAssignmentDate}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{complaint.internalEscalationStatus}</p>
                  <p className="text-xs text-slate-500">{complaint.escalationDate || "No escalation date"}</p>
                  <p className="max-w-xs text-slate-500">{complaint.escalationNotes || "No escalation notes"}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-semibold text-slate-900">{complaint.complaintResolutionStatus}</p>
                  <p className="text-xs text-slate-500">{complaint.resolutionDate || "Open"}</p>
                  <p className="max-w-xs text-slate-500">{complaint.resolutionComments || complaint.complaintDescriptionDetails}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
