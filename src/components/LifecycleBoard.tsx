import { workflowStages } from "@/data/mock-data";
import type { ComplaintRecord } from "@/types/complaints";

interface LifecycleBoardProps {
  complaints: ComplaintRecord[];
}

export function LifecycleBoard({ complaints }: LifecycleBoardProps) {
  const escalated = complaints.filter((complaint) => complaint.internalEscalationStatus === "Escalated").length;
  const closed = complaints.filter((complaint) => complaint.complaintResolutionStatus === "Closed").length;

  return (
    <section className="rounded-3xl border border-slate-200 bg-slate-950 p-6 text-white" id="workflow">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.45fr] lg:items-start">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-300">Lifecycle tracking</span>
          <h2 className="mt-3 text-2xl font-bold">Six-stage municipal complaints workflow</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
            Every complaint keeps the same register identity from intake through assignment, interventions, escalation,
            resolution, closure, analytics, and audit reporting.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-2xl bg-white/10 p-4">
            <p className="text-2xl font-black">{complaints.length}</p>
            <p className="text-xs text-slate-300">Total</p>
          </div>
          <div className="rounded-2xl bg-rose-500/20 p-4">
            <p className="text-2xl font-black">{escalated}</p>
            <p className="text-xs text-slate-300">Escalated</p>
          </div>
          <div className="rounded-2xl bg-emerald-500/20 p-4">
            <p className="text-2xl font-black">{closed}</p>
            <p className="text-xs text-slate-300">Closed</p>
          </div>
        </div>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {workflowStages.map((stage, index) => (
          <article key={stage.name} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-2xl bg-blue-400 font-black text-slate-950">{index + 1}</span>
              <h3 className="font-bold">{stage.name}</h3>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">{stage.description}</p>
            <div className="mt-5 rounded-2xl bg-slate-900 p-4 text-sm">
              <p className="font-semibold text-blue-200">Owner: {stage.owner}</p>
              <p className="mt-1 text-slate-400">{stage.metric}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
