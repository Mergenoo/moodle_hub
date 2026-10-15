import type { CourseSummary } from "@/types/hub";

/**
 * Moodle full name as shown on cards and in the sidebar:
 * "ECN221 / БИЗНЕСИЙН СТАТИСТИК 2026-2027 Намар".
 */
export function courseFullName(c: CourseSummary): string {
  return c.fullNameOverride ?? `${c.code} / ${c.titleMn} ${c.academicYear} ${c.semesterWordMn}`;
}

/** "In progress" for the sidebar toggle: enrolled and not finished. */
export function isInProgress(c: CourseSummary): boolean {
  return c.accessStatus === "IN_PROGRESS" || c.accessStatus === "NOT_STARTED" || c.accessStatus === "ACTIVE_UNTRACKED";
}
