## 1. Font Loading & Typography Tokens

- [x] 1.1 Add Google Fonts `<link>` tags for Inter (weights 400–700) and Instrument Serif (400) with `display=swap` to `index.html`
- [x] 1.2 Add `--cc-font-sans` and `--cc-font-serif` token comments to `_tokens.scss`
- [x] 1.3 Define `--cc-font-sans` and `--cc-font-serif` values in `_light.scss` and `_dark.scss`
- [x] 1.4 Set `body { font-family: var(--cc-font-sans) }` in `styles.scss`

## 2. Brand Colour Palette & Theme Tokens

- [x] 2.1 Add `--cc-accent`, `--cc-on-accent`, `--cc-surface-dim` token comments to `_tokens.scss`
- [x] 2.2 Replace `mat.$azure-palette` in `_light.scss` with custom brand indigo palette and set all 10 token values per spec
- [x] 2.3 Replace `mat.$violet-palette` in `_dark.scss` with custom brand palette and set all 10 token values per spec
- [x] 2.4 Verify WCAG AA contrast ratios for all text/background token pairs in both themes

## 3. Hero Section Redesign

- [x] 3.1 Update hero headline to use `var(--cc-font-serif)` with accent-underlined keyword `<span>`
- [x] 3.2 Add secondary outlined CTA button ("Our services" → `/services`) alongside existing primary CTA
- [x] 3.3 Style both CTAs with 12px border-radius, 48px min-height, side-by-side layout (stacking on mobile)
- [x] 3.4 Update hero section background to `var(--cc-surface)` and adjust spacing per spec
- [x] 3.5 Update hero section unit tests for new template structure

## 4. Services Section Redesign

- [x] 4.1 Expand service cards from 2 to 4 (add AI & Automation, Cloud & DevOps)
- [x] 4.2 Replace emoji icons with inline SVG icons for all four cards
- [x] 4.3 Update grid to 2x2 on desktop, 2-col on tablet, 1-col on mobile
- [x] 4.4 Apply `var(--cc-surface-dim)` background, accent hover border, and updated spacing
- [x] 4.5 Update container max-width to 1120px
- [x] 4.6 Update services section unit tests for new template structure

## 5. Approach Section Redesign (formerly Why Section)

- [x] 5.1 Rename component heading from "Why CodeCraft" to "Our Approach"
- [x] 5.2 Replace differentiator items with 4 numbered process steps (01 Discovery, 02 Strategy, 03 Build, 04 Launch & Scale)
- [x] 5.3 Style step numbers in `var(--cc-font-serif)` at 3rem+ in accent colour
- [x] 5.4 Implement horizontal number/text layout on desktop, vertical stack on mobile
- [x] 5.5 Set section background to `var(--cc-surface)` and update spacing
- [x] 5.6 Update why-section unit tests for new template structure

## 6. CTA Section Redesign

- [x] 6.1 Update CTA button to use 12px border-radius and updated padding per spec
- [x] 6.2 Ensure background uses `var(--cc-primary)` with `var(--cc-on-primary)` text
- [x] 6.3 Update CTA section unit tests for any template changes

## 7. Integration & Verification

- [ ] 7.1 Run full test suite and fix any failures
- [ ] 7.2 Visually verify light theme across all sections at mobile, tablet, and desktop breakpoints
- [ ] 7.3 Visually verify dark theme across all sections at mobile, tablet, and desktop breakpoints
- [ ] 7.4 Run accessibility audit (AXE) on the home page and fix any violations
