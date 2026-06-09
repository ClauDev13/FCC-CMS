import Link from "next/link";
import { AccessControl } from "@/components/AccessControl";
import { ComplaintWorkspace } from "@/components/ComplaintWorkspace";
import { MetricCard } from "@/components/MetricCard";
import { getComplaints } from "@/lib/complaint-store";

export const dynamic = "force-dynamic";

function Icon({ label }: { label: string }) {
  return <span className="text-lg font-black" aria-hidden="true">{label}</span>;
}

const navItems = [
  { label: "Logging", href: "#logging" },
  { label: "Workflow", href: "#workflow" },
  { label: "Register", href: "#cases" },
  { label: "Analytics", href: "#analytics" },
  { label: "Access", href: "#access" },
];

export default async function Home() {
  const complaints = await getComplaints();
  const openComplaints = complaints.filter((complaint) => !["Resolved", "Closed"].includes(complaint.complaintResolutionStatus)).length;
  const escalations = complaints.filter((complaint) => complaint.internalEscalationStatus === "Escalated").length;
  const resolved = complaints.filter((complaint) => ["Resolved", "Closed"].includes(complaint.complaintResolutionStatus)).length;
  const completionRate = complaints.length ? Math.round((resolved / complaints.length) * 100) : 0;

  return (
    <main className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <div className="grid size-12 place-items-center rounded-2xl bg-blue-700 text-lg font-black text-white">FCC</div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">City hotline</p>
              <h1 className="text-xl font-black text-slate-950">Complaints Management System</h1>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 text-sm font-semibold text-slate-600">
            {navItems.map((item) => (
              <a className="rounded-full px-3 py-2 transition hover:bg-blue-50 hover:text-blue-700" href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#1d4ed8,transparent_35%),radial-gradient(circle_at_bottom_right,#059669,transparent_30%)] opacity-80" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div>
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-blue-100">
              Frontend · Backend API · Register schema · Reporting
            </span>
            <h2 className="mt-8 max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
              End-to-end municipal call center complaints platform.
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Log every required register field, route cases to internal assignees, track escalations and resolutions,
              and report by category, region, department, source, priority, and status.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="rounded-2xl bg-white px-5 py-3 font-bold text-slate-950 transition hover:bg-blue-50" href="#logging">
                Start complaint intake
              </a>
              <Link className="rounded-2xl border border-white/20 px-5 py-3 font-bold text-white transition hover:bg-white/10" href="/api/complaints" prefetch={false}>
                View backend API
              </Link>
            </div>
          </div>
          <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="rounded-[1.5rem] bg-white p-5 text-slate-950">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <p className="text-sm font-bold text-slate-500">Latest issue</p>
                  <p className="text-xl font-black">{complaints[0]?.issueId ?? "No complaints yet"}</p>
                </div>
                <span className="rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">
                  {complaints[0]?.complaintPriority ?? "Pending"}
                </span>
              </div>
              <div className="mt-5 space-y-4">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Category</p>
                  <p className="mt-1 font-bold">{complaints[0]?.typeCategoryOfComplaint ?? "Awaiting intake"}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-bold text-slate-500">Current assignment</p>
                  <p className="mt-1 text-sm text-slate-700">
                    {complaints[0]
                      ? `${complaints[0].internalAssigneeName} · ${complaints[0].internalAssigneeDepartment}`
                      : "No internal assignment yet."}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-blue-50 p-4 text-blue-800">
                    <p className="text-xs font-bold uppercase">Status</p>
                    <p className="mt-1 text-lg font-black">{complaints[0]?.complaintResolutionStatus ?? "Open"}</p>
                  </div>
                  <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-800">
                    <p className="text-xs font-bold uppercase">Region</p>
                    <p className="mt-1 text-lg font-black">{complaints[0]?.complaintRegion ?? "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard label="Total complaints" value={String(complaints.length)} change="Loaded from backend store" icon={<Icon label="📋" />} />
          <MetricCard label="Open complaints" value={String(openComplaints)} change="Requires action or closure" icon={<Icon label="⏱" />} />
          <MetricCard label="Escalations" value={String(escalations)} change="Leadership visibility" icon={<Icon label="🔔" />} />
          <MetricCard label="Completion rate" value={`${completionRate}%`} change="Resolved or closed cases" icon={<Icon label="✓" />} />
        </section>

        <ComplaintWorkspace initialComplaints={complaints} />
        <AccessControl />

        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">
              <Icon label="▦" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-700">Implemented backend</span>
              <h2 className="mt-2 text-2xl font-bold text-slate-950">API-ready production foundation</h2>
              <p className="mt-2 leading-7 text-slate-600">
                The application now includes route handlers for listing, creating, reading, and updating complaints. The
                file-backed store can be replaced with PostgreSQL/Prisma when deploying to a production environment.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
