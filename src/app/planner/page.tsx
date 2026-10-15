import { PlannerView } from "@/components/hub/PlannerView";
import { degreeAudit, prerequisites, timetable } from "@/data/seed";

export const metadata = { title: "Subject Planner · UFE Hub" };

export default function PlannerPage() {
  return <PlannerView timetable={timetable} nodes={degreeAudit} edges={prerequisites} />;
}
