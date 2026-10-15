"use client";

import { useI18n } from "@/lib/i18n";
import type { CourseGridProps } from "../props";
import { CourseCard } from "./CourseCard";

export function CourseGrid({ courses, emptyMessage }: CourseGridProps) {
  const { t } = useI18n();
  if (courses.length === 0) {
    return <p className="py-16 text-center text-ink-muted">{emptyMessage ?? t("noCourses")}</p>;
  }
  return (
    <ul className="grid grid-cols-1 gap-5 tablet:grid-cols-2 desktop:grid-cols-3">
      {courses.map((c, i) => (
        <li key={c.id} className="flex">
          <div className="flex w-full flex-col [&>article]:flex-1">
            <CourseCard course={c} priority={i < 3} />
          </div>
        </li>
      ))}
    </ul>
  );
}
