# 4. Design tokens

The tokens are a Tailwind config extension: [`tailwind.config.ts`](../tailwind.config.ts). Colour values are CSS variables defined in [`src/app/globals.css`](../src/app/globals.css) for light and dark themes, so components use one set of class names (`bg-brand`, `text-ink-muted`, `rounded-card` …).

**Provenance.** *Sampled* values were read pixel-by-pixel from the production screenshot (`docs/reference/my-courses-2026-10-15.png`, a 2× retina capture, so CSS px = screenshot px ÷ 2). *Estimate* means inferred. *Refined* means changed from production to pass WCAG 2.1 AA.

## Colour

| Token | Light | Dark | Source | Used for |
|---|---|---|---|---|
| `brand` | `#012DB3` | `#2747D1` | sampled | "Get access" button, notification badge, active nav text, focus ring |
| `brand-hover` | `#00238C` | `#3A5BE6` | estimate | button hover/pressed |
| `brand-soft` | `#E6EAF7` | `#232A45` | sampled | active nav row, sidebar-toggle tile |
| `brand-ring` | `#CCD5F0` | `#3B4A7A` | sampled | halo around notification badge, focus shadow |
| `surface` | `#FFFFFF` | `#16181D` | sampled | main area, panels, cards |
| `surface-sunken` | `#EDEDED` | `#0F1115` | sampled | sidebar background, search field |
| `surface-muted` | `#F5F5F5` | `#22252C` | sampled | term badge chip, count badge |
| `surface-raised` | `#EEEEEE` | `#22252C` | sampled | language button |
| `surface-warm` | `#FEF1D6` | `#3A3320` | sampled | dark-mode toggle tile |
| `ink` | `#212121` | `#ECECEC` | sampled | headings, card titles |
| `ink-secondary` | `#434343` | `#C9C9C9` | sampled | nav labels, body text |
| `ink-chip` | `#525151` | `#BDBDBD` | sampled | term badge text |
| `ink-muted` | `#707070` | `#A3A3A3` | sampled | footer links, metadata |
| `ink-placeholder` | `#5E5E5E` | `#9A9A9A` | **refined** (prod `#C8C8C8`) | search placeholder |
| `line` | `#E1E1E1` | `#2C3038` | sampled | card border, top-bar rule, dividers |
| `progress-from` → `progress-to` | `#4477C3` → `#5DB173` | same | sampled | progress fill gradient |
| `progress-track` | `#D4DEF8` | `#2A3350` | sampled | progress track |
| `grade-{a,b,c,f}-{bg,fg}` | see table below | | new | grade pill bands |

## Contrast (WCAG 2.1 AA)

Text needs 4.5:1 (3:1 for ≥ 24 px or ≥ 18.66 px bold). Non-text UI parts and focus indicators need 3:1. Computed with the WCAG relative-luminance formula.

| Pair | Colours | Ratio | Needs | Pass |
|---|---|---|---|---|
| Heading/title text | `#212121` on `#FFFFFF` | 16.10:1 | ≥4.5 | ✅ |
| Nav text | `#434343` on `#FFFFFF` | 9.89:1 | ≥4.5 | ✅ |
| Active nav text | `#012DB3` on `#E6EAF7` | 8.62:1 | ≥4.5 | ✅ |
| Footer link text | `#707070` on `#FFFFFF` | 4.95:1 | ≥4.5 | ✅ |
| Chip text | `#525151` on `#F5F5F5` | 7.26:1 | ≥4.5 | ✅ |
| Button text | `#FFFFFF` on `#012DB3` | 10.36:1 | ≥4.5 | ✅ |
| Button hover | `#FFFFFF` on `#00238C` | 12.97:1 | ≥4.5 | ✅ |
| Notif badge text | `#FFFFFF` on `#012DB3` | 10.36:1 | ≥4.5 | ✅ |
| Sidebar count badge | `#212121` on `#F5F5F5` | 14.77:1 | ≥4.5 | ✅ |
| Search placeholder (prod) | `#C8C8C8` on `#EDEDED` | 1.43:1 | ≥4.5 | ❌ |
| Search placeholder (refined) | `#5E5E5E` on `#EDEDED` | 5.54:1 | ≥4.5 | ✅ |
| Toggle label | `#434343` on `#FFFFFF` | 9.89:1 | ≥4.5 | ✅ |
| Sidebar text on gray bg | `#434343` on `#EDEDED` | 8.45:1 | ≥4.5 | ✅ |
| Progress fill vs track (non-text) | `#4477C3` on `#D4DEF8` | 3.34:1 | ≥3.0 | ✅ |
| Progress track vs white (non-text) | `#D4DEF8` on `#FFFFFF` | 1.35:1 | ≥3.0 | ❌ |
| Progress track refined vs white | `#8FA6E0` on `#FFFFFF` | 2.41:1 | ≥3.0 | ❌ |
| Focus ring vs white | `#012DB3` on `#FFFFFF` | 10.36:1 | ≥3.0 | ✅ |
| Card border vs white (decorative) | `#E1E1E1` on `#FFFFFF` | 1.31:1 | ≥1.0 | ✅ |
| Grade A | `#14532D` on `#DCFCE7` | 8.30:1 | ≥4.5 | ✅ |
| Grade B | `#012DB3` on `#E6EAF7` | 8.62:1 | ≥4.5 | ✅ |
| Grade C | `#713F12` on `#FEF3C7` | 7.79:1 | ≥4.5 | ✅ |
| Grade D/F | `#991B1B` on `#FEE2E2` | 6.80:1 | ≥4.5 | ✅ |
| Moon icon on tile | `#434343` on `#FEF1D6` | 8.84:1 | ≥3.0 | ✅ |
| Dark: text | `#ECECEC` on `#16181D` | 15.03:1 | ≥4.5 | ✅ |
| Dark: muted | `#A3A3A3` on `#16181D` | 7.04:1 | ≥4.5 | ✅ |
| Dark: primary on surface | `#8EA4FF` on `#1E2128` | 6.83:1 | ≥4.5 | ✅ |
| Dark: button | `#FFFFFF` on `#2747D1` | 7.22:1 | ≥4.5 | ✅ |

Notes on the two failures:

- **Search placeholder.** Production's `#C8C8C8` on `#EDEDED` is 1.43:1. Refined to `#5E5E5E` (5.54:1). This is the only visible change to production colours.
- **Progress track on white** is 1.35:1, but WCAG 1.4.11 does not apply because the value is also given as text ("26% complete") and the bar is `role="progressbar"` with `aria-valuenow`. The fill against the track is 3.34:1. Track kept as production; `#8FA6E0` was tried and still only reaches 2.41:1, so a darker track would change the look without fixing anything required.
- Card borders (1.31:1) are decorative; cards are identified by their content and title link, not the border.

## Typography

Font: **Manrope** (estimate; confirm from the theme CSS), loaded with `next/font` using the `latin`, `cyrillic` and `cyrillic-ext` subsets so Mongolian Ө ө Ү ү render in the same face.

| Token | Size / line-height | Weight | Used for |
|---|---|---|---|
| `text-display` | 44 / 50.6 px, −0.01em | 800 | "My courses" page title |
| `text-card-title` | 16 / 24 px | 700 | card title (code / title / year term) |
| `text-nav` | 15 / 20 px | 600 | sidebar nav labels |
| `text-nav-sm` | 13 / 18 px | 500 | sidebar course list |
| `text-chip` | 13 / 16 px | 500 | term badge |
| `text-button` | 15 / 20 px | 600 | "Get access" |
| `text-meta` | 12 / 16 px | 500 | progress label, footer links, timestamps |

## Spacing and layout

| Token | Value | Measured from |
|---|---|---|
| `h-topbar` | 56 px | top bar height |
| `w-sidebar` | 288 px | sidebar incl. 28 px gutter (`p-gutter`) |
| `h-card-header` | 220 px | card header image |
| `h-nav-item` | 44 px | nav row |
| `size-control` | 40 px | top-bar icon buttons |
| `h-cta` | 48 px | "Get access" button |
| `max-w-grid` | 1012 px | 3 × 324 px cards + 2 × 20 px gaps |
| grid gap | 20 px (`gap-5`) | between cards |
| card padding | 20 px (`p-5`) | card body |
| panel gap | 16 px (`gap-4`) | between sidebar panels |

Breakpoints: `tablet` 768 px (2-column grid), `laptop` 1024 px (sidebar becomes fixed), `desktop` 1280 px (3-column grid).

## Radii and shadows

| Token | Value | Used for |
|---|---|---|
| `rounded-card` | 6 px | cards, sidebar panels |
| `rounded-control` | 6 px | nav rows, icon tiles |
| `rounded-button` | 4 px | CTA button, chips |
| `rounded-pill` | 9999 px | grade pill, badges, progress bar |
| `shadow-card` | `0 1px 2px rgb(0 0 0 / .04)` | resting card (with 1 px `line` border) |
| `shadow-card-hover` | `0 6px 16px -4px rgb(1 45 179 / .14)` | hovered card (new, subtle) |
| `shadow-dropdown` | `0 12px 32px -8px rgb(0 0 0 / .18)` | notification menu |
| `shadow-focus` | `0 0 0 3px brand-ring` | plus a 2 px `brand` outline on `:focus-visible` |

## Grade pill bands

| Band | Letters | Colours | Ratio |
|---|---|---|---|
| A | A, A- | `#14532D` on `#DCFCE7` | 8.30:1 |
| B | B+, B, B- | `#012DB3` on `#E6EAF7` | 8.62:1 |
| C | C+, C, C- | `#713F12` on `#FEF3C7` | 7.79:1 |
| D/F | D+, D, F | `#991B1B` on `#FEE2E2` | 6.80:1 |

Colour is never the only signal: the pill always shows the percentage and letter as text.
