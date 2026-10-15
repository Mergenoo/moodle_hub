"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { Icon } from "../Icon";
import type { NavItemProps } from "../props";

export function NavItem({ item, active }: NavItemProps) {
  const { t } = useI18n();
  return (
    <li>
      <Link
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={`flex h-nav-item items-center gap-3 rounded-control px-3 text-nav transition-colors duration-150 ${
          active ? "bg-brand-soft text-brand" : "text-ink-secondary hover:bg-surface-muted"
        }`}
      >
        <Icon name={item.icon} className="size-5 shrink-0" />
        <span className="min-w-0 flex-1">{item.label}</span>
        {item.badge !== undefined && (
          <span className="rounded-button bg-surface-muted px-2 py-0.5 text-meta text-ink">{item.badge}</span>
        )}
        {item.comingInPhase && (
          <span className="rounded-pill bg-surface-muted px-2 py-0.5 text-meta font-medium text-ink-muted">
            {t("soon")}
          </span>
        )}
      </Link>
    </li>
  );
}
