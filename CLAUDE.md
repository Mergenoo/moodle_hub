# UFE Unified Moodle Hub (prototype)

Student portal prototype for the University of Finance and Economics, Mongolia. It recreates the production Moodle "My courses" page and extends it. **Prototype**: seed data only, no real Moodle/registry/SSO connection.

## Read first
- `docs/00-assumptions.md` for decisions and open questions
- `docs/reference/my-courses-2026-10-15.png`, the visual source of truth
- `AGENTS.md` and `node_modules/next/dist/docs/`: this is Next.js 16, not the version you remember

## Commands
- `npm run dev` / `npm run build` / `npm run lint`
- `npx tsc --noEmit`, `npx prisma validate`

## Rules
- Mongolian course titles, term badges and department names are data: copy verbatim, never translate or transliterate. UI chrome strings go in `src/lib/i18n.tsx` (EN + MN).
- Colours/spacing come from tokens (`tailwind.config.ts`, `src/app/globals.css`); don't hardcode hex in components. WCAG AA contrast is required; update `docs/04-design-tokens.md` when tokens change.
- Components take props typed in `src/components/props.ts`. Data comes only through `HubDataSource` (`src/lib/data.ts`); no function takes a user id from the client.
- Accessibility: semantic HTML, visible focus, keyboard-operable menus (Esc closes, focus returns).
- SSO is out of scope; keep the `AuthProvider` seam only.
- Ask before pushing, merging or opening a PR.

## Layout
`src/app` routes, `src/components/{shell,main,course}`, `src/data/seed.ts`, `prisma/schema.prisma`, `docs/`.
