"use client";

import { useMemo, useState } from "react";
import { ComplaintIntakeForm } from "@/components/ComplaintIntakeForm";
import { ComplaintsRegister } from "@/components/ComplaintsRegister";
import { LifecycleBoard } from "@/components/LifecycleBoard";
import { ReportingDashboard } from "@/components/ReportingDashboard";
import type { ComplaintRecord } from "@/types/complaints";

interface ComplaintWorkspaceProps {
  initialComplaints: ComplaintRecord[];
}

export function ComplaintWorkspace({ initialComplaints }: ComplaintWorkspaceProps) {
  const [complaints, setComplaints] = useState(initialComplaints);
  const sortedComplaints = useMemo(
    () => [...complaints].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [complaints],
  );

  return (
    <div className="grid gap-8">
      <ComplaintIntakeForm onCreated={(complaint) => setComplaints((current) => [complaint, ...current])} />
      <LifecycleBoard complaints={sortedComplaints} />
      <ComplaintsRegister complaints={sortedComplaints} />
      <ReportingDashboard complaints={sortedComplaints} />
    </div>
  );
}
