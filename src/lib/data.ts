import "server-only";
import * as seed from "@/data/seed";
import type { CourseSummary, HubNotification, Student } from "@/types/hub";

/**
 * The gateway contract the UI depends on. The prototype reads seed data; a
 * Moodle/registry implementation replaces SeedDataSource without UI changes
 * (docs/01-architecture.md §1.2). The student is always the session user —
 * no method accepts a user id from the client.
 */
export interface HubDataSource {
  getStudent(): Promise<Student>;
  getCourses(): Promise<{ courses: CourseSummary[]; totalEnrolments: number }>;
  getNotifications(): Promise<HubNotification[]>;
}

class SeedDataSource implements HubDataSource {
  async getStudent() {
    return seed.student;
  }
  async getCourses() {
    return { courses: seed.courses, totalEnrolments: seed.totalEnrolments };
  }
  async getNotifications() {
    return seed.notifications;
  }
}

export const hub: HubDataSource = new SeedDataSource();
