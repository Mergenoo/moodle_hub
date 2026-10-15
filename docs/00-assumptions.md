# 0. Assumptions, ambiguities and tensions

Source of truth for visuals: the production screenshot of `online.ufe.edu.mn` → My courses, 15 Oct 2026 (`docs/reference/my-courses-2026-10-15.png`). Colours below marked *sampled* were read pixel-by-pixel from that screenshot; anything marked *estimate* was inferred.

Each item says what I am assuming by default so work can continue. Items marked **❓** need a decision from you.

## A. Scope

1. **SSO is out of scope for this prototype.** Your edits removed it from requirement A and from Phase 1, but the project is still described as a "single sign-on student portal" and deliverable 1 still says the architecture should "cover SSO".
   *Default:* no identity-provider integration is built. The architecture keeps one **auth seam** (an `AuthProvider` interface in the gateway) and shows where OIDC/SAML would plug in later without touching the UI. The prototype signs in a demo student automatically.
2. **"Cut external logins by 90%" has no baseline.** *Default definition:* the number of interactive logins a student performs on systems other than the hub (Moodle, the student registry, e-mail-based helpdesk, etc.) to complete five core workflows (open a course, check a grade, check a deadline, check the exam timetable, raise a support request), measured per active student per week over a two-week baseline window before launch, compared with the same weeks after launch. Without a shared identity provider this target is only reachable if the hub holds the one session and talks to back-ends server-to-server with service credentials. This depends on item 1.
3. **"Exact recreation" vs. "live grade pills".** The current page has no grade pill, so Phase 1 cannot be pixel-identical and also add one. *Default:* the pill sits on the same row as the term badge, so the card height, grid and spacing stay identical to production; when no grade is released the pill is not rendered at all.
4. **This is a prototype.** Phase 1 runs entirely on sample data behind a `HubDataSource` interface and does not need to behave exactly like Moodle. A real Moodle/registry adapter is listed in the roadmap but not built, because it needs credentials and network access to UFE systems.

## B. Data mapping

5. **"Get access" → enrolment state.** Moodle has no "Get access" concept; this is the UFE theme's call-to-action. *Default mapping* from Moodle data:

   | UI state | Condition (Moodle) | `Enrollment.accessStatus` |
   |---|---|---|
   | "Get access →" button | user is enrolled (`user_enrolments.status = 0`) **and** has never opened the course (`user_lastaccess` row missing) | `NOT_STARTED` |
   | Progress bar "N% complete" | user has opened the course **and** completion tracking is on (`course.enablecompletion = 1`) | `IN_PROGRESS` / `COMPLETED` |
   | Neither (DBM121, ISA332, ISA331) | user has opened the course, completion tracking is off | `ACTIVE_UNTRACKED` |
   | Card hidden / greyed | enrolment suspended or outside enrolment dates | `SUSPENDED` / `PENDING` |

   Confirm this with whoever maintains the UFE Moodle theme; the bottom three cards are cut off in the screenshot, so their footers are inferred from your table ("—").
6. **Sidebar count is 8, the grid has 6 cards.** The sidebar list also contains **"CE BADGE-BDG101 хөтөлбөр"**, which is not a card. *Default:* the badge shows the total enrolment count reported by Moodle (8), the sidebar lists every enrolment we know (6 courses + CE BADGE-BDG101 хөтөлбөр = 7), and the grid shows only academic courses. I have not invented the 8th entry; it needs a real export.
7. **MAT112 semester vs. badge.** MAT112 is "2025-2026 Хавар" (Spring) but its badge in production reads "Намрын улирал" (Autumn term). *Default:* reproduce production faithfully (the badge is its own data field, `termBadge`), and flag it as a probable data error in Moodle.
8. **Grades.** Live pills come from the Moodle gradebook (provisional, per course). Official cumulative/term GPA comes from the registry. These can disagree; the UI labels Moodle values as "current" and registry values as "official".
9. **❓ Letter scale.** *Default (estimate, confirm with the Academic Registry):* A 95–100 (4.0), A- 90–94 (3.7), B+ 87–89 (3.3), B 83–86 (3.0), B- 80–82 (2.7), C+ 77–79 (2.3), C 73–76 (2.0), C- 70–72 (1.7), D+ 67–69 (1.3), D 60–66 (1.0), F < 60 (0). Note that the brief's own example, "88% / A-", does not fit this scale (88 % is B+ here), so UFE's real scale is probably different. The scale lives in one function (`src/lib/grades.ts`) so it is a one-line change.
10. **Seed grades are demo values.** The screenshot has no grades, so the percentages on the seed cards are illustrative and are marked `demo: true` in the seed file.
11. The hub's own PostgreSQL (Prisma) stores a **student-scoped projection** of Moodle/registry data plus hub-native data (tickets, lost & found, office hours). Moodle and the registry remain the sources of truth.

## C. Visual design

12. **Header images.** Moodle generates a geometric pattern for courses without an uploaded image (teal waves, grey hexagons, green/blue circles, pink diamonds). MAT112 has an uploaded image (purple low-poly with "СУУРЬ ШИНЖЛЭХ УХААНЫ ТЭНХИМ"). *Default:* the hub renders lightweight inline SVG patterns that match the six headers; in production it uses the Moodle course image URL when one exists and falls back to the generated pattern. The MAT112 header is an SVG approximation, not the original artwork.
13. **"Pink circles"** in the brief is actually a pink diamond/argyle pattern in the screenshot. I follow the screenshot.
14. **Font (estimate).** The production font is a geometric sans that looks like Manrope. I use Manrope with the `cyrillic` and `cyrillic-ext` subsets (Mongolian needs Ө ө Ү ү, U+04E8/U+04AE). Confirm the real font name from the theme CSS.
15. **Things in the screenshot that the brief did not list**, all kept: a sidebar-collapse button left of the logo, a flag icon next to "EN", and a dark-mode toggle (moon on a pale amber tile) next to the bell. The notification badge shows **3**.
16. **Accessibility refinements** (the "refine" half of "preserve and refine"): production's search placeholder (#C8C8C8 on #EDEDED, ≈1.4:1) and toggle label fail AA. These are darkened in the tokens; everything else is kept as sampled. See `04-design-tokens.md`.
17. Breakpoints: sidebar fixed from 1024 px up, off-canvas drawer below; grid is 3 columns ≥ 1280 px, 2 columns ≥ 768 px, 1 column below.

## D. Language

18. UI chrome is bilingual (EN default, matching the screenshot; MN via the language toggle). Course titles, term badges and department names are always shown exactly in Mongolian, never transliterated. The English title is stored (`Course.titleEn`) but not shown in Phase 1.

## E. Tech

19. Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4 with a JS config (`tailwind.config.ts`) loaded via `@config`, so the token deliverable is a real Tailwind config extension. Prisma 7.
20. The gateway is a REST BFF implemented as Next.js route handlers in Phase 1, extractable to its own service later. GraphQL is not used (REST caches better at the CDN layer for peak weeks).

## F. Sample content added after the first review

21. **The 133-credit Computer Science plan is a sample**, not UFE's official programme (`src/data/curriculum.ts`; run `node src/data/curriculum.ts` to re-check the total). The six production courses and the APL121 → DBM121 → ISA331 / ISA332 chain are kept; everything else is invented. Mongolian titles I wrote for invented courses are drafts for the Registry to confirm. The brief puts APL121 and DBM121 in the same term even though one is a prerequisite of the other, so the plan treats an in-progress prerequisite as acceptable.
22. The student is shown at the start of semester 5 (Autumn 2026-2027) with 67 of 133 credits earned. CSC301 appears in the timetable and plan but not as a card, since the grid is fixed at the six production courses.
23. Weekly course content (topics, deadlines, scores) is generated sample data. Grade pills now come from the graded items on each course page, so the pill, course page and GPA simulator agree. ISA332 has no released grades.
24. Lost & Found pictures are illustrations standing in for uploaded photos.
