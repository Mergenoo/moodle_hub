/**
 * UFE Hub design tokens as a Tailwind config extension.
 *
 * Colours are CSS variables (defined in src/app/globals.css) so light and dark
 * themes share one set of utility names. Hex values below are the light theme;
 * "sampled" = read from the 15 Oct 2026 production screenshot, "estimate" =
 * inferred, "refined" = changed from production to pass WCAG AA.
 * Contrast ratios: docs/04-design-tokens.md.
 *
 * Loaded by Tailwind v4 via `@config` in globals.css.
 */
import type { Config } from "tailwindcss";

const v = (name: string) => `var(--ufe-${name})`;

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: v("brand"), //            #012DB3 sampled — buttons, badge, active nav text
          hover: v("brand-hover"), //        #00238C estimate
          soft: v("brand-soft"), //          #E6EAF7 sampled — active nav, sidebar toggle tile
          ring: v("brand-ring"), //          #CCD5F0 sampled — ring around notification badge
        },
        surface: {
          DEFAULT: v("surface"), //          #FFFFFF sampled — main area, panels, cards
          sunken: v("surface-sunken"), //    #EDEDED sampled — sidebar background, search field
          muted: v("surface-muted"), //      #F5F5F5 sampled — chips, count badge
          raised: v("surface-raised"), //    #EEEEEE sampled — language button
          warm: v("surface-warm"), //        #FEF1D6 sampled — dark-mode toggle tile
        },
        ink: {
          DEFAULT: v("ink"), //              #212121 sampled — headings, card titles
          secondary: v("ink-secondary"), //  #434343 sampled — nav labels, body
          chip: v("ink-chip"), //            #525151 sampled — term badge text
          muted: v("ink-muted"), //          #707070 sampled — footer links
          placeholder: v("ink-placeholder"), // #5E5E5E refined (prod #C8C8C8 fails AA)
          inverse: v("ink-inverse"), //      #FFFFFF
        },
        line: {
          DEFAULT: v("line"), //             #E1E1E1 sampled — card border, top-bar rule
        },
        progress: {
          from: v("progress-from"), //       #4477C3 sampled
          to: v("progress-to"), //           #5DB173 sampled
          track: v("progress-track"), //     #D4DEF8 sampled
        },
        grade: {
          "a-bg": v("grade-a-bg"), //        #DCFCE7
          "a-fg": v("grade-a-fg"), //        #14532D
          "b-bg": v("grade-b-bg"), //        #E6EAF7
          "b-fg": v("grade-b-fg"), //        #012DB3
          "c-bg": v("grade-c-bg"), //        #FEF3C7
          "c-fg": v("grade-c-fg"), //        #713F12
          "f-bg": v("grade-f-bg"), //        #FEE2E2
          "f-fg": v("grade-f-fg"), //        #991B1B
        },
      },
      fontFamily: {
        // Estimate: production font looks like Manrope (assumptions §14).
        sans: ["var(--font-manrope)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        // [size, { lineHeight, fontWeight, letterSpacing }] — CSS px, estimated
        // from the 2× screenshot.
        display: ["2.75rem", { lineHeight: "1.15", fontWeight: "800", letterSpacing: "-0.01em" }], // "My courses" 44px
        "card-title": ["1rem", { lineHeight: "1.5rem", fontWeight: "700" }], // 16px
        nav: ["0.9375rem", { lineHeight: "1.25rem", fontWeight: "600" }], // 15px
        "nav-sm": ["0.8125rem", { lineHeight: "1.125rem", fontWeight: "500" }], // 13px sidebar course list
        chip: ["0.8125rem", { lineHeight: "1rem", fontWeight: "500" }], // 13px term badge
        meta: ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }], // 12px
        button: ["0.9375rem", { lineHeight: "1.25rem", fontWeight: "600" }], // 15px
      },
      spacing: {
        // Layout constants, sampled from the screenshot (CSS px = screenshot px ÷ 2).
        topbar: "3.5rem", //   56px top bar height
        sidebar: "18rem", //   288px sidebar width incl. 28px gutter
        "card-header": "13.75rem", // 220px card header image
        "nav-item": "2.75rem", // 44px nav row
        control: "2.5rem", //  40px icon buttons
        cta: "3rem", //        48px "Get access" button
        gutter: "1.75rem", //  28px sidebar outer padding
      },
      maxWidth: {
        grid: "63.25rem", // 1012px = 3 × 324px cards + 2 × 20px gaps
      },
      borderRadius: {
        card: "0.375rem", //  6px cards, sidebar panels
        control: "0.375rem", // 6px nav items, icon tiles
        button: "0.25rem", // 4px CTA button, chips
        pill: "9999px", //   grade pill, badges, progress bar
      },
      boxShadow: {
        card: "0 1px 2px 0 rgb(0 0 0 / 0.04)",
        "card-hover": "0 6px 16px -4px rgb(1 45 179 / 0.14)",
        panel: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
        dropdown: "0 12px 32px -8px rgb(0 0 0 / 0.18)",
        focus: "0 0 0 3px var(--ufe-brand-ring)",
      },
      screens: {
        // 3-col grid at ≥1280, 2-col at ≥768, fixed sidebar at ≥1024 (assumptions §17).
        tablet: "768px",
        laptop: "1024px",
        desktop: "1280px",
      },
      transitionTimingFunction: {
        ufe: "cubic-bezier(0.2, 0, 0, 1)",
      },
    },
  },
};

export default config;
