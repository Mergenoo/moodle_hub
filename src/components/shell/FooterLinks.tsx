import Link from "next/link";
import { Icon } from "../Icon";
import type { FooterLinksProps } from "../props";

export function FooterLinks({ links }: FooterLinksProps) {
  return (
    <ul className="border-t border-line">
      {links.map((l, i) => (
        <li key={l.id} className={i > 0 ? "border-t border-line" : undefined}>
          <Link
            href={l.href}
            className="flex h-12 items-center justify-between px-6 text-meta text-ink-muted hover:bg-surface-muted hover:text-ink"
          >
            <span className="text-[0.875rem]">{l.label}</span>
            <Icon name={l.icon} className="size-4" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
