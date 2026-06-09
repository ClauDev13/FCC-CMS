import type { ReactNode } from "react";

interface MetricCardProps {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
}

export function MetricCard({ label, value, change, icon }: MetricCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{value}</p>
        </div>
        <div className="rounded-2xl bg-blue-50 p-3 text-blue-700">{icon}</div>
      </div>
      <p className="mt-4 text-sm font-semibold text-emerald-700">{change}</p>
    </article>
  );
}
