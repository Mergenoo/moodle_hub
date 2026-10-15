import { GradesView } from "@/components/hub/GradesView";
import { assignments, exams } from "@/data/seed";
import { hub } from "@/lib/data";

export const metadata = { title: "Grades & GPA · UFE Hub" };

export default async function GradesPage() {
  const { courses } = await hub.getCourses();
  return <GradesView courses={courses} assignments={assignments} exams={exams} />;
}
