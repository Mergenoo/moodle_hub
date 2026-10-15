import { MyCourses } from "@/components/main/MyCourses";
import { hub } from "@/lib/data";

export default async function MyCoursesPage() {
  const { courses } = await hub.getCourses();
  return <MyCourses courses={courses.filter((c) => c.showInGrid)} />;
}
