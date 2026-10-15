# 5. Phased roadmap

SSO is out of scope for now (see assumptions §1); the auth seam is the only identity work. Each phase lists scope, dependencies, risks and acceptance criteria.

## Phase 1: My Courses recreation + live grade pills (prototype built)

**Scope.** App shell, top bar, sidebar (current items in order, plus the four hub entries as "Soon"), My courses grid with the six courses, grade pills, EN/MN chrome, dark mode, notification dropdown, placeholder pages. Runs on seed data behind `HubDataSource`.

**Dependencies.** Production screenshot (done); confirmation of the font, grade scale and "Get access" mapping (assumptions §5, §9, §14).

**Risks.** Header art is approximated (MAT112's uploaded banner especially). Grades in the seed are made up. Moodle 8-vs-7 enrolment count is unexplained.

**Acceptance criteria.**
- Side by side with production at 1440 px, layout, order, wording, colours and the six cards match, except for the added grade pills and hub entries.
- Mongolian titles are byte-identical to the brief.
- Grid is 3 / 2 / 1 columns at ≥1280 / ≥768 / <768 px; sidebar becomes an off-canvas dialog below 1024 px.
- Keyboard-only: every control reachable, visible focus, Esc closes menus.
- axe finds no serious or critical issues; contrast per `04-design-tokens.md`.
- `next build` passes; Lighthouse mobile FCP < 1.2 s on the static build.

### Phase 1b: real data (not built, needs UFE credentials)

Moodle adapter (`core_enrol_*`, `gradereport_overview_get_course_grades`), grade-pill refresh by event, Redis + projection DB, `local_ufehub` plugin. *Depends on:* a Moodle WS token and a read replica. *Risk:* Moodle rate limits at peak. *Accept:* a real student sees their own 8 courses; grades update within 60 s of posting.

## Phase 2: Dashboard, GPA simulator, exam timetable

**Scope.** Command-center dashboard (next deadlines, next exam countdown, unread, recent grades); Grades & GPA page; slide-out GPA simulator (cumulative, term, what-if on pending assignments using weights); exam timetable with countdown badges and rooms; Calendar & Deadlines.

**Dependencies.** Registry views for official GPA, credits and exams; grade scale confirmed; `Assignment` weights from Moodle (needs the replica query for category aggregation).

**Risks.** What-if maths wrong for categories with drop-lowest or extra credit (mitigate: show "estimate", cover aggregation methods with unit tests). Moodle and registry GPAs disagree. Time zones (store UTC, show Asia/Ulaanbaatar).

**Acceptance criteria.** Simulator reproduces Moodle's course total for 20 sampled real courses within 0.1 pt; countdown correct across a DST-less time zone and after midnight; drawer passes keyboard/focus-trap checks; p75 INP < 200 ms.

## Phase 3: Subject planner + degree audit

**Scope.** Interactive weekly timetable (lectures, labs, rooms, instructors); degree-audit flowchart with prerequisite chains (APL121 → DBM121 → ISA331 / ISA332) and credit progress.

**Dependencies.** Registry timetable and programme requirements; `CoursePrerequisite` data loaded and cycle-checked.

**Risks.** Programme rules (electives, OR-groups, minimum grades) are more complex than a graph; section clashes; flowchart accessibility.

**Acceptance criteria.** Audit matches the Academic Registry's own audit for 10 sample students; prerequisite cycles rejected on import; flowchart has a full text alternative and keyboard navigation; timetable usable at 375 px.

## Phase 4: News, helpdesk, Lost & Found, office hours

**Scope.** Collapsible news banner and feed with Department / Academic Registry / Student Events channels; bell merges course alerts and notices; helpdesk tickets (IT, Tuition, Academic Registry) with live status via SSE; Lost & Found with photo upload and claim verification; office-hour booking.

**Dependencies.** Staff-side tools or an integration with the existing helpdesk; file storage with malware scanning; SMTP/SSE infrastructure; DPO sign-off on retention.

**Risks.** Photo uploads (abuse, personal data in images); claim fraud; tickets containing sensitive tuition data; staff adoption.

**Acceptance criteria.** Ticket status changes appear within 5 s without reload; uploads limited by type/size and scanned; a claim cannot be approved without staff verification and an audit entry; double-booking a slot is impossible under concurrent requests; every write lands in `AuditLog`.

## Cross-phase

- **SSO** can slot in any time behind `AuthProvider` (OIDC preferred; SAML if the IdP requires it).
- **Measuring "−90 % external logins"** needs the baseline defined in assumptions §2, captured before Phase 1b launches.
