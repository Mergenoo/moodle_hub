"use client";

import { useI18n } from "@/lib/i18n";
import type { InstructorAvatarsProps } from "../props";

const tints = ["#1F3A5F", "#7A4B3A", "#2E4F7A", "#5B3E6B"];

/** Overlapping avatars. Teachers without a photo get Moodle's grey silhouette. */
export function InstructorAvatars({ instructors, max = 3 }: InstructorAvatarsProps) {
  const { t } = useI18n();
  if (instructors.length === 0) return null;
  const shown = instructors.slice(0, max);
  const extra = instructors.length - shown.length;
  return (
    <ul className="flex items-center -space-x-2" aria-label={t("instructors")}>
      {shown.map((p, i) => (
        <li key={p.id} title={p.name}>
          {p.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.avatarUrl} alt={p.name} className="size-11 rounded-full border-2 border-surface object-cover" />
          ) : p.initials ? (
            <span
              className="flex size-11 items-center justify-center rounded-full border-2 border-surface text-meta font-bold text-white"
              style={{ background: tints[i % tints.length] }}
            >
              <span aria-hidden="true">{p.initials}</span>
              <span className="sr-only">{p.name}</span>
            </span>
          ) : (
            <span className="flex size-11 items-center justify-center overflow-hidden rounded-full border-2 border-surface bg-[#F0F0F0]">
              <svg viewBox="0 0 44 44" className="size-11" role="img" aria-label={p.name}>
                <circle cx="22" cy="17" r="8" fill="#C9C9C9" />
                <path d="M7 40c2-9 8-13 15-13s13 4 15 13" fill="#C9C9C9" />
              </svg>
            </span>
          )}
        </li>
      ))}
      {extra > 0 && (
        <li className="flex size-11 items-center justify-center rounded-full border-2 border-surface bg-surface-muted text-meta text-ink-secondary">
          +{extra}
        </li>
      )}
    </ul>
  );
}
