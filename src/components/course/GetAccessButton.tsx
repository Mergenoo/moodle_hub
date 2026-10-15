"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Icon } from "../Icon";
import type { GetAccessButtonProps } from "../props";

export function GetAccessButton({ href, courseName }: GetAccessButtonProps) {
  const { t } = useI18n();
  return (
    <Link
      href={href}
      aria-label={`${t("getAccessTo")} ${courseName}`}
      className="flex h-cta items-center justify-between rounded-button bg-brand px-5 text-button text-ink-inverse transition-colors duration-150 ease-ufe hover:bg-brand-hover"
    >
      <span>{t("getAccess")}</span>
      <Icon name="arrow-right" className="size-5" />
    </Link>
  );
}
