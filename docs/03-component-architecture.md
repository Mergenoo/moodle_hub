# 3. Component architecture

All prop interfaces live in [`src/components/props.ts`](../src/components/props.ts); DTOs in [`src/types/hub.ts`](../src/types/hub.ts); seed data in [`src/data/seed.ts`](../src/data/seed.ts). **Built in Phase 1** = ✅; the rest are typed contracts for later phases.

```
AppShell ✅                       src/components/shell/AppShell.tsx
├── TopBar ✅                     shell/TopBar.tsx  (logo, language, theme, bell, chat, user menu)
│   └── NotificationDropdown ✅   shell/NotificationDropdown.tsx
├── Sidebar ✅                    shell/Sidebar.tsx
│   ├── NavItem ✅                shell/NavItem.tsx
│   ├── CourseList ✅             shell/CourseList.tsx  (search + "only in progress" switch)
│   └── FooterLinks ✅            shell/FooterLinks.tsx
└── MainContent ✅                main/MainContent.tsx
    ├── PageHeader ✅             main/PageHeader.tsx
    ├── NewsBanner                (Phase 4)
    ├── CourseGrid ✅             course/CourseGrid.tsx
    │   └── CourseCard ✅         course/CourseCard.tsx
    │       ├── CardHeaderImage ✅   inline SVG patterns
    │       ├── GradePill ✅
    │       ├── ProgressBar ✅ | GetAccessButton ✅
    │       └── InstructorAvatars ✅
    ├── GPASimulator              (Phase 2)
    ├── WeeklyTimetable           (Phase 3)
    └── DegreeAuditFlowchart      (Phase 3)
```

## Which footer a card shows

`CourseCard` derives it from `accessStatus` (assumptions §5):

| `accessStatus` | Footer |
|---|---|
| `NOT_STARTED` | "Get access →" button |
| `IN_PROGRESS`, `COMPLETED` with a percentage | progress bar |
| `ACTIVE_UNTRACKED`, `PENDING`, `SUSPENDED` | none |

## Seed data: the six courses

| Code | Title (verbatim) | Year / term | Header | Footer |
|---|---|---|---|---|
| ECN221 | БИЗНЕСИЙН СТАТИСТИК | 2026-2027 Намар | teal waves | Get access + 3 avatars |
| MAT112 | ХЭРЭГЛЭЭНИЙ МАТЕМАТИК II | 2025-2026 Хавар | purple low-poly | Get access + 1 default avatar |
| APL121 | АЛГОРИТМ, ПРОГРАМЧЛАЛЫН ХЭЛ | 2026-2027 Намар | gray hexagons | 26 % progress |
| DBM121 | ӨГӨГДЛИЙН САНГИЙН ҮНДЭС | 2026-2027 Намар | green circles | none |
| ISA332 | БИЗНЕСИЙН ШИНЖИЛГЭЭ | 2026-2027 Намар | blue circles | none |
| ISA331 | СИСТЕМИЙН ШИНЖИЛГЭЭ БА ЗОХИОМЖ | 2026-2027 Намар | pink diamonds | none |

The sidebar additionally lists "CE BADGE-BDG101 хөтөлбөр" (`showInGrid: false`). Grades are marked `demo: true`.

## Keyboard and screen-reader behaviour

| Component | Behaviour |
|---|---|
| Skip link | First tab stop; jumps to `<main id="main">`. |
| Sidebar | `<aside>` with two `<nav>` landmarks. ≥1024 px it is part of the page. Below that it is a modal dialog (`role="dialog" aria-modal`): focus moves in on open, **Esc** or backdrop click closes it, and focus returns to the toggle button. |
| Search + switch | Search input has a visually hidden label. "Only courses in progress" is a real `role="switch"` button with `aria-checked`, operable with Space/Enter. |
| Notification dropdown | Disclosure pattern: bell has `aria-expanded` + `aria-controls`; on open, focus moves to the panel heading; **Esc** or outside click closes and returns focus to the bell; unread count is in the bell's accessible name, not only the visual badge. |
| User menu | Same disclosure behaviour; items are plain links, reachable by Tab. |
| Course card | The title link is the main target; the CTA has an `aria-label` including the course name ("Get access to ECN221 / …") so a links list is unambiguous. Decorative headers are `aria-hidden`. |
| Progress bar | `role="progressbar"` with `aria-valuenow/min/max` and `aria-valuetext` "26% complete". |
| Grade pill | Text, not colour, carries the value; sr-only "Current grade:" prefix. |
| Language / theme | Buttons with state in the accessible name or `aria-pressed`; `<html lang>` follows the locale. |
| Motion | `prefers-reduced-motion` disables transitions. |

Planned for later phases:

- **GPA drawer** (`role="dialog"`, focus trap, Esc closes, what-if inputs are labelled number fields with a live-region result).
- **Weekly timetable** (a real `<table>` with row/column headers; sessions are buttons; arrow keys move between cells; roving tabindex).
- **Degree-audit flowchart** (rendered as a nested list ordered by prerequisite depth for screen readers, with the SVG diagram as a visual layer; nodes focusable, Enter opens details, arrow keys follow edges; status is text, not only colour).
