import type { ComplaintRecord } from "@/types/complaints";

interface ReportingDashboardProps {
  complaints: ComplaintRecord[];
}

function countBy<T extends string>(items: ComplaintRecord[], selector: (complaint: ComplaintRecord) => T) {
  return items.reduce<Record<T, number>>((totals, complaint) => {
    const key = selector(complaint);
    totals[key] = (totals[key] ?? 0) + 1;
    return totals;
  }, {} as Record<T, number>);
}

function Distribution({ title, data }: { title: string; data: Record<string, number> }) {
  const max = Math.max(1, ...Object.values(data));
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
      <h3 className="text-lg font-bold text-slate-950">{title}</h3>
      <div className="mt-5 grid gap-4">
        {Object.entries(data).map(([label, value]) => (
          <div key={label}>
            <div className="mb-2 flex items-center justify-between text-sm font-semibold text-slate-700">
              <span>{label}</span>
              <span>{value}</span>
            </div>
            <div className="h-3 rounded-full bg-slate-100">
              <div className="h-3 rounded-full bg-blue-700" style={{ width: `${(value / max) * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </article>
  );
}

export function ReportingDashboard({ complaints }: ReportingDashboardProps) {
  const byCategory = countBy(complaints, (complaint) => complaint.typeCategoryOfComplaint);
  const byRegion = countBy(complaints, (complaint) => complaint.complaintRegion);
  const byDepartment = countBy(complaints, (complaint) => complaint.internalAssigneeDepartment || "Unassigned");
  const bySource = countBy(complaints, (complaint) => complaint.dominantSourceOfInformation);

  return (
    <section className="grid gap-6" id="analytics">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-700">Analytics, insights & reporting</span>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">Operational dashboard</h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Summarizes complaint category load, geographic region demand, department workload, and dominant public
          information sources for management review.
        </p>
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Distribution title="Complaints by category" data={byCategory} />
        <Distribution title="Complaints by region" data={byRegion} />
        <Distribution title="Assigned department workload" data={byDepartment} />
        <Distribution title="Dominant source of information" data={bySource} />
      </div>
    </section>
  );
}
