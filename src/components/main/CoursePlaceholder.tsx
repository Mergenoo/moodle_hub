"use client";

import Link from "next/link";
import { CardHeaderImage } from "@/components/course/CardHeaderImage";
import { GradePill } from "@/components/course/GradePill";
import { courseFullName } from "@/lib/course";
import { useI18n } from "@/lib/i18n";
import type { CourseSummary } from "@/types/hub";
import { MainContent } from "./MainContent";

export function CoursePlaceholder({ course }: { course: CourseSummary }) {
  const { t } = useI18n();
  return (
    <MainContent>
      <div className="mt-8 overflow-hidden rounded-card border border-line bg-surface shadow-card">
        <CardHeaderImage header={course.header} seed={course.moodleCourseId} />
        <div className="flex flex-col gap-4 p-6">
          <p className="text-meta font-semibold uppercase tracking-wide text-ink-muted">{t("courseTitle")}</p>
          <h1 className="text-2xl font-extrabold text-ink">{courseFullName(course)}</h1>
          {course.grade && <GradePill grade={course.grade} />}
          <p className="text-nav-sm text-ink-secondary">{t("coursePlaceholder")}</p>
          <Link href="/" className="text-nav-sm font-semibold text-brand hover:underline">
            ← {t("backToCourses")}
          </Link>
        </div>
      </div>
    </MainContent>
  );
}
