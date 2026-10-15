/**
 * Props for every component in the hub tree (docs/03-component-architecture.md).
 *
 * AppShell
 * ├── TopBar
 * ├── Sidebar
 * │   ├── NavItem
 * │   ├── CourseList
 * │   └── FooterLinks
 * ├── MainContent
 * │   ├── PageHeader
 * │   ├── NewsBanner
 * │   ├── CourseGrid
 * │   │   └── CourseCard
 * │   │       ├── CardHeaderImage
 * │   │       ├── GradePill
 * │   │       ├── ProgressBar | GetAccessButton
 * │   │       └── InstructorAvatars
 * │   ├── GPASimulator
 * │   ├── WeeklyTimetable
 * │   └── DegreeAuditFlowchart
 * └── NotificationDropdown
 *
 * Phase 1 implements the shell, sidebar, top bar, grid and card. The rest are
 * typed here so later phases build against a fixed contract.
 */
import type { ReactNode } from "react";
import type {
  Announcement,
  AnnouncementChannel,
  AssignmentItem,
  CourseGrade,
  CourseHeader,
  CourseSummary,
  DegreeAuditNode,
  ExamEntry,
  HubNotification,
  Locale,
  Person,
  PrerequisiteEdge,
  Student,
  TimetableEntry,
} from "@/types/hub";

// ───────────── Shell ─────────────

export interface AppShellProps {
  student: Student;
  courses: CourseSummary[];
  /** Total enrolments reported by Moodle (may exceed `courses.length`). */
  totalEnrolments: number;
  notifications: HubNotification[];
  /** Path of the active nav item, e.g. "/my". */
  activePath: string;
  children: ReactNode;
}

export interface TopBarProps {
  student: Student;
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
  sidebarOpen: boolean | null;
  onToggleSidebar: () => void;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  notifications: HubNotification[];
  onMarkAllRead: () => void;
  /** Unread chat conversations; 0 hides the dot. */
  unreadMessages: number;
}

export interface NotificationDropdownProps {
  notifications: HubNotification[];
  onMarkAllRead: () => void;
  /** Called when the menu closes so focus returns to the bell. */
  onClose: () => void;
  open: boolean;
  /** id of the button that controls the menu (aria-controls / labelledby). */
  triggerId: string;
}

// ───────────── Sidebar ─────────────

export interface NavItemData {
  id: string;
  label: string;
  href: string;
  icon: IconName;
  /** Numeric badge, e.g. My Courses = 8. */
  badge?: number;
  /** Roadmap phase for not-yet-built items; renders a small "Soon" tag. */
  comingInPhase?: 2 | 3 | 4;
}

export interface NavItemProps {
  item: NavItemData;
  active: boolean;
}

export interface SidebarProps {
  primaryNav: NavItemData[];
  hubNav: NavItemData[];
  courses: CourseSummary[];
  totalEnrolments: number;
  activePath: string;
  /**
   * null = viewport default (shown from 1024 px, hidden below). Below 1024 px
   * an open sidebar is an off-canvas modal dialog.
   */
  open: boolean | null;
  onClose: () => void;
}

export interface CourseListProps {
  courses: CourseSummary[];
  query: string;
  onQueryChange: (query: string) => void;
  inProgressOnly: boolean;
  onInProgressOnlyChange: (value: boolean) => void;
}

export interface FooterLinksProps {
  links: { id: string; label: string; href: string; icon: "info" | "arrow-right" }[];
}

// ───────────── Main content ─────────────

export interface MainContentProps {
  children: ReactNode;
}

export interface PageHeaderProps {
  title: string;
  /** Optional right-aligned actions (e.g. "GPA simulator" button). */
  actions?: ReactNode;
}

export interface NewsBannerProps {
  announcements: Announcement[];
  channels: AnnouncementChannel[];
  activeChannel: AnnouncementChannel | "ALL";
  onChannelChange: (channel: AnnouncementChannel | "ALL") => void;
  collapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
}

export interface CourseGridProps {
  courses: CourseSummary[];
  /** Shown when the filter leaves no courses. */
  emptyMessage?: string;
}

export interface CourseCardProps {
  course: CourseSummary;
  /** Above-the-fold cards render eagerly; others may lazy-render headers. */
  priority?: boolean;
}

export interface CardHeaderImageProps {
  header: CourseHeader;
  /** Seed for deterministic pattern variation (Moodle uses the course id). */
  seed: number;
}

export interface GradePillProps {
  grade: CourseGrade;
}

export interface ProgressBarProps {
  /** 0–100. */
  value: number;
  /** Accessible label, e.g. "АЛГОРИТМ, ПРОГРАМЧЛАЛЫН ХЭЛ progress". */
  label: string;
}

export interface GetAccessButtonProps {
  href: string;
  /** Course name for the accessible label ("Get access to ECN221 …"). */
  courseName: string;
}

export interface InstructorAvatarsProps {
  instructors: Person[];
  /** Avatars beyond this collapse into "+N". */
  max?: number;
}

// ───────────── Later phases ─────────────

export interface GPASimulatorProps {
  open: boolean;
  onClose: () => void;
  cumulativeGpa: number;
  termGpa: number;
  creditsEarned: number;
  courses: Pick<CourseSummary, "id" | "code" | "titleMn" | "credits" | "grade">[];
  assignments: AssignmentItem[];
  /** Percentage → letter/points scale (assumptions §9). */
  scale: { min: number; letter: string; points: number }[];
}

export interface ExamTimetableProps {
  exams: ExamEntry[];
  /** Injected for testability; defaults to Date.now(). */
  now?: number;
}

export interface WeeklyTimetableProps {
  entries: TimetableEntry[];
  /** Visible hours, default 8–20. */
  dayStartHour?: number;
  dayEndHour?: number;
  onSelectEntry?: (entry: TimetableEntry) => void;
}

export interface DegreeAuditFlowchartProps {
  nodes: DegreeAuditNode[];
  edges: PrerequisiteEdge[];
  creditsEarned: number;
  creditsRequired: number;
  onSelectNode?: (code: string) => void;
}

// ───────────── Shared ─────────────

export type IconName =
  | "home"
  | "dashboard"
  | "calendar"
  | "files"
  | "courses"
  | "grades"
  | "planner"
  | "news"
  | "services"
  | "course"
  | "search"
  | "info"
  | "arrow-right"
  | "bell"
  | "chat"
  | "moon"
  | "sun"
  | "flag"
  | "sidebar"
  | "chevron-down"
  | "trend"
  | "close";
