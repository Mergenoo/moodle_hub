"use client";

import Link from "next/link";
import { useI18n, type MessageKey } from "@/lib/i18n";
import { MainContent } from "./MainContent";
import { PageHeader } from "./PageHeader";

export function ComingSoon({ titleKey, phase }: { titleKey: MessageKey; phase: number }) {
  const { t } = useI18n();
  return (
    <MainContent>
      <PageHeader title={t(titleKey)} />
      <div className="mx-auto max-w-lg rounded-card border border-line bg-surface p-6 text-center shadow-card">
        <p className="text-meta font-semibold uppercase tracking-wide text-ink-muted">
          {t("comingTitle")} {phase}
        </p>
        <p className="mt-2 text-nav-sm text-ink-secondary">{t("comingBody")}</p>
        <Link href="/" className="mt-5 inline-block text-nav-sm font-semibold text-brand hover:underline">
          ← {t("backToCourses")}
        </Link>
      </div>
    </MainContent>
  );
}
