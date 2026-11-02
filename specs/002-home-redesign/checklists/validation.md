# Validation Log: Rediseño y ampliación del Inicio

**Date**: 2026-11-02 · **Build**: `npm run build` (JS 89.01 KB gzip, +7.08 KB vs. 001; CSS 6.03 KB gzip)

## Quality gates

- [x] `npm run lint` — 0 problems
- [x] `npm run format:check` — all files formatted
- [x] `npm run typecheck` — 0 errors
- [x] `npm run test` — 15 files, 66 tests passed (Slider 9, SupportImage 2, IndicatorCard 2, HomePage 4, getImage 2, data + existing suites unchanged)
- [x] `npm run build` — OK; JS delta < 10 KB

## Quickstart scenarios (dev server, Chrome)

| # | Scenario | Result |
| --- | --- | --- |
| 1 | `/` without photos | ✅ 5 slides on placeholder, h1 + short objective in cream on overlay |
| 2 | Autoplay 6 s and loop | ✅ (unit test with fake timers + observed in browser) |
| 3 | Hover / focus pause | ✅ focus on "Diapositiva siguiente" kept the slide for 6.6 s; `aria-live` → `polite` |
| 4 | Explicit pause persists | ✅ (unit test) |
| 5 | Keyboard ← → and dots | ✅ ArrowRight moved the slide; focus ring ochre `rgb(201,162,75)` |
| 6 | Reduced motion | ✅ unit test (no autoplay, "Reproducir" shown); CSS tokens set durations to 0 — manual emulation pending |
| 7 | Touch swipe | ✅ unit test (horizontal changes, vertical ignored) — real device pending |
| 8 | Screen reader announcement | ⏳ pending human check with NVDA/VoiceOver (`aria-live` toggling verified in DOM) |
| 9 | 3 sections with support image placeholder + caption | ✅ crema → verde claro → crema |
| 10 | Content complete | ✅ por qué, quién, 4 ideas, 4 pilares, insignia, 6 objetivos, 8 indicadores, 5 recursos, 2 CTA |
| 11 | 320 / 375 / 768 / 1024 / 1396 px | ✅ no horizontal scroll on `/`, `/problematicas`, `/actividades`; slider controls 44 px |
| 12 | Problemáticas / Actividades | ✅ same content; new navbar, footer, cards; modal opens, traps focus, closes with Escape |
| 13 | Real photo, no layout shift | ⏳ pending (no photos yet); frames reserve ratio and `width`/`height` are declared |
| 14 | Wrong file name | ✅ placeholder + DEV warning (covered by `getImage` tests) |

## Contrast (measured/calculated)

- Slider text: max right edge at 43.6 % of the viewport (1396 px), inside the zone where the desktop
  overlay is ≥ 0.8 → cream ≥ 6.68:1 even over a white photo; mobile/tablet overlay uniform ≥ 0.78.
- Section surfaces: ink 12.60, forest 6.77, earth 5.15 on mint; ochre-ink 5.53 on cream; ink on
  ochre-soft 11.15.

## Audits (T048)

- ⏳ Lighthouse (mobile) and axe on `npm run preview`: **pending** — not run in this session (would
  require downloading the Lighthouse/axe tooling). Run in Chrome DevTools → Lighthouse and the axe
  DevTools extension; targets: accessibility ≥ 95, performance ≥ 90, CLS < 0.1, LCP < 2.5 s, 0
  critical/serious axe issues.
