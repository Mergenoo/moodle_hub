import type { IconName } from "./props";

/** Stroke icons drawn to match Moodle 4's line icon style. Decorative by default. */
const paths: Record<IconName, React.ReactNode> = {
  home: (
    <>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V20h5v-6h4v6h5V9.5" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
      <path d="M3.5 9h17M9 9v11.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4M8 14h2" />
    </>
  ),
  files: (
    <>
      <path d="M3.5 13.5 6 5h12l2.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 19z" />
      <path d="M3.5 13.5h5l1 2h5l1-2h5" />
    </>
  ),
  courses: (
    <>
      <rect x="8" y="4.5" width="12.5" height="15" rx="1.5" />
      <path d="M8 6.5H5.5A1.5 1.5 0 0 0 4 8v10a1.5 1.5 0 0 0 1.5 1.5H8" />
      <path d="M11.5 4.5v15" />
    </>
  ),
  grades: (
    <>
      <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
    </>
  ),
  planner: (
    <>
      <rect x="3.5" y="4.5" width="17" height="16" rx="2" />
      <path d="M3.5 9.5h17M9 9.5v11M15 9.5v11M3.5 15h17" />
    </>
  ),
  news: (
    <>
      <path d="M4 5.5h12v14H6a2 2 0 0 1-2-2z" />
      <path d="M16 9h4v8.5a2 2 0 0 1-2 2h-2M7 9h6M7 12.5h6M7 16h4" />
    </>
  ),
  services: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="14" width="4" height="6" rx="1.5" />
      <rect x="17" y="14" width="4" height="6" rx="1.5" />
    </>
  ),
  course: (
    <>
      <rect x="4" y="4.5" width="16" height="15" rx="1.5" />
      <path d="M4 15.5h16" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5.5M12 7.5v.5" />
    </>
  ),
  "arrow-right": <path d="M4.5 12h15M13.5 6l6 6-6 6" />,
  bell: (
    <>
      <path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z" />
      <path d="M10 20.5a2 2 0 0 0 4 0" />
    </>
  ),
  chat: (
    <>
      <path d="M14 8.5h4.5A2 2 0 0 1 20.5 10.5v5a2 2 0 0 1-2 2H18v2.5l-3-2.5h-3" />
      <path d="M3.5 5.5a2 2 0 0 1 2-2H12a2 2 0 0 1 2 2V11a2 2 0 0 1-2 2H8.5L5.5 15.5V13a2 2 0 0 1-2-2z" />
    </>
  ),
  moon: <path d="M19.5 14.5A8 8 0 0 1 9.5 4.5a8 8 0 1 0 10 10z" />,
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
    </>
  ),
  flag: (
    <>
      <path d="M5 21V4" />
      <path d="M5 4.5h11l-2 4 2 4H5" />
    </>
  ),
  sidebar: (
    <>
      <rect x="3.5" y="5" width="17" height="14" rx="2" />
      <path d="M9 5v14M5.5 10l1.5 2-1.5 2" />
    </>
  ),
  "chevron-down": <path d="m6 9.5 6 6 6-6" />,
  trend: <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
};

export function Icon({
  name,
  className = "size-5",
  label,
}: {
  name: IconName;
  className?: string;
  /** Give a label only when the icon is the sole content of a control. */
  label?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
    >
      {paths[name]}
    </svg>
  );
}
