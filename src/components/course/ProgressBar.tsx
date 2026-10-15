"use client";

import { useI18n } from "@/lib/i18n";
import { Icon } from "../Icon";
import type { ProgressBarProps } from "../props";

export function ProgressBar({ value, label }: ProgressBarProps) {
  const { t } = useI18n();
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="flex items-center gap-3 border-t border-line px-5 py-4">
      <Icon name="trend" className="size-5 shrink-0 text-ink" />
      <div className="min-w-0 flex-1">
        <p className="text-meta text-ink" aria-hidden="true">
          <span className="font-bold">{v}%</span> {t("complete")}
        </p>
        <div
          role="progressbar"
          aria-label={label}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={v}
          aria-valuetext={`${v}% ${t("complete")}`}
          className="mt-1.5 h-1.5 overflow-hidden rounded-pill bg-progress-track"
        >
          <div
            className="h-full rounded-pill bg-gradient-to-r from-progress-from to-progress-to"
            style={{ width: `${v}%` }}
          />
        </div>
      </div>
    </div>
  );
}
