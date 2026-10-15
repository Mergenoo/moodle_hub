import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CoursePlaceholder } from "@/components/main/CoursePlaceholder";
import { hub } from "@/lib/data";

export async function generateStaticParams() {
  const { courses } = await hub.getCourses();
  return courses.map((c) => ({ code: c.href.split("/").pop()! }));
}

export default function Page({ params }: PageProps<"/course/[code]">) {
  return (
    <Suspense fallback={null}>
      <CoursePage params={params} />
    </Suspense>
  );
}

async function CoursePage({ params }: Pick<PageProps<"/course/[code]">, "params">) {
  const { code } = await params;
  const { courses } = await hub.getCourses();
  const course = courses.find((c) => c.href === `/course/${code}`);
  if (!course) notFound();
  return <CoursePlaceholder course={course} />;
}
