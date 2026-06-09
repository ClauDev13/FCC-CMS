const roles = [
  { role: "Call Center Agent", permissions: "Log complaints, update caller notes, view assigned cases" },
  { role: "Supervisor", permissions: "Assign cases, approve closure, manage escalations" },
  { role: "Department Officer", permissions: "Record interventions, upload evidence, request closure" },
  { role: "Escalation Manager", permissions: "Override priority, coordinate cross-department action" },
  { role: "System Administrator", permissions: "Manage users, roles, notifications, reports, audit exports" },
];

export function AccessControl() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]" id="access">
      <div className="rounded-3xl bg-blue-700 p-6 text-white shadow-xl shadow-blue-700/20">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-100">RBAC & notifications</span>
        <h2 className="mt-3 text-3xl font-bold">Secure municipal operations by role</h2>
        <p className="mt-4 leading-7 text-blue-50">
          The boilerplate separates account management, role-based access control, SLA notifications, and audit-ready
          complaint lifecycle events so the application can grow into production workflows.
        </p>
        <div className="mt-6 grid gap-3 text-sm font-semibold">
          <div className="rounded-2xl bg-white/10 p-4">Email/SMS alerts for assignments, escalations, and closure.</div>
          <div className="rounded-2xl bg-white/10 p-4">Immutable event history for every case status transition.</div>
          <div className="rounded-2xl bg-white/10 p-4">Department-scoped dashboards and exportable reports.</div>
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/70">
        <h3 className="text-xl font-bold text-slate-950">Role matrix</h3>
        <div className="mt-5 grid gap-3">
          {roles.map((item) => (
            <article key={item.role} className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="font-bold text-slate-950">{item.role}</p>
              <p className="mt-1 text-sm text-slate-600">{item.permissions}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
