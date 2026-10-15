import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ComingSoon } from "@/components/main/ComingSoon";
import type { MessageKey } from "@/lib/i18n";

/** Sections that exist in the navigation but belong to later roadmap phases. */
const sections: Record<string, { titleKey: MessageKey; phase: number }> = {
  dashboard: { titleKey: "dashboard", phase: 2 },
  calendar: { titleKey: "calendar", phase: 2 },
  files: { titleKey: "privateFiles", phase: 2 },
  courses: { titleKey: "allCourses", phase: 2 },
  messages: { titleKey: "messages", phase: 4 },
  profile: { titleKey: "profile", phase: 2 },
  preferences: { titleKey: "preferences", phase: 2 },
  logout: { titleKey: "logOut", phase: 2 },
};

export function generateStaticParams() {
  return Object.keys(sections).map((s) => ({ slug: [s] }));
}

export default function Page({ params }: PageProps<"/[...slug]">) {
  return (
    <Suspense fallback={null}>
      <Section params={params} />
    </Suspense>
  );
}

async function Section({ params }: Pick<PageProps<"/[...slug]">, "params">) {
  const { slug } = await params;
  const section = slug.length === 1 ? sections[slug[0]] : undefined;
  if (!section) notFound();
  return <ComingSoon titleKey={section.titleKey} phase={section.phase} />;
}
