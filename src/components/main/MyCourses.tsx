"use client";

import { CourseGrid } from "@/components/course/CourseGrid";
import { useI18n } from "@/lib/i18n";
import type { CourseSummary } from "@/types/hub";
import { MainContent } from "./MainContent";
import { PageHeader } from "./PageHeader";

export function MyCourses({ courses }: { courses: CourseSummary[] }) {
  const { t } = useI18n();
  return (
    <MainContent>
      <PageHeader title={t("myCoursesTitle")} />
      <CourseGrid courses={courses} />
    </MainContent>
  );
}
