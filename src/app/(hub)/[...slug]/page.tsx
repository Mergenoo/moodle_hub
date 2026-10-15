import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/main/ComingSoon";
import type { MessageKey } from "@/lib/i18n";

/** Sections that exist in the navigation but belong to later roadmap phases. */
const sections: Record<string, { titleKey: MessageKey; phase: number }> = {
  dashboard: { titleKey: "dashboard", phase: 2 },
  calendar: { titleKey: "calendar", phase: 2 },
  files: { titleKey: "privateFiles", phase: 2 },
  grades: { titleKey: "grades", phase: 2 },
  planner: { titleKey: "planner", phase: 3 },
  news: { titleKey: "news", phase: 4 },
  services: { titleKey: "services", phase: 4 },
  courses: { titleKey: "allCourses", phase: 2 },
  messages: { titleKey: "messages", phase: 4 },
  profile: { titleKey: "profile", phase: 2 },
  preferences: { titleKey: "preferences", phase: 2 },
  logout: { titleKey: "logOut", phase: 2 },
};

export function generateStaticParams() {
  return Object.keys(sections).map((s) => ({ slug: [s] }));
}

export default async function Section({ params }: PageProps<"/[...slug]">) {
  const { slug } = await params;
  const section = slug.length === 1 ? sections[slug[0]] : undefined;
  if (!section) notFound();
  return <ComingSoon titleKey={section.titleKey} phase={section.phase} />;
}
