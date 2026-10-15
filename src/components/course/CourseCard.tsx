"use client";

import Link from "next/link";
import { courseFullName } from "@/lib/course";
import { useI18n } from "@/lib/i18n";
import type { CourseCardProps } from "../props";
import { CardHeaderImage } from "./CardHeaderImage";
import { GetAccessButton } from "./GetAccessButton";
import { GradePill } from "./GradePill";
import { InstructorAvatars } from "./InstructorAvatars";
import { ProgressBar } from "./ProgressBar";

/**
 * Production card anatomy: header image → title → term badge (+ grade pill,
 * new) → instructors → footer (Get access button | progress bar | nothing).
 * The title link is the card's single tab stop besides the CTA.
 */
export function CourseCard({ course }: CourseCardProps) {
  const { t } = useI18n();
  const name = courseFullName(course);
  const showProgress =
    (course.accessStatus === "IN_PROGRESS" || course.accessStatus === "COMPLETED") && course.progressPercent !== null;
  const showAccess = course.accessStatus === "NOT_STARTED";

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-surface shadow-card transition-shadow duration-200 ease-ufe hover:shadow-card-hover">
      <CardHeaderImage header={course.header} seed={course.moodleCourseId} />
      <div className="flex flex-1 flex-col gap-5 p-5">
        <h2 className="text-card-title text-ink">
          <Link href={course.href} className="hover:underline focus-visible:underline">
            {name}
          </Link>
        </h2>
        {(course.termBadgeMn || course.grade) && (
          <div className="flex flex-wrap items-center gap-2">
            {course.termBadgeMn && (
              <span className="inline-flex h-7 items-center rounded-button bg-surface-muted px-2.5 text-chip text-ink-chip">
                {course.termBadgeMn}
              </span>
            )}
            {course.grade && <GradePill grade={course.grade} />}
          </div>
        )}
        <InstructorAvatars instructors={course.instructors} />
        {showAccess && (
          <div className="mt-auto">
            <GetAccessButton href={course.href} courseName={name} />
          </div>
        )}
      </div>
      {showProgress && <ProgressBar value={course.progressPercent!} label={`${course.titleMn} ${t("progressOf")}`} />}
    </article>
  );
}
