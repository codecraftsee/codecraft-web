## Context

The home page currently has a functional scaffold with four sections (hero, services, why, CTA) but uses placeholder M3 palettes and minimal styling. The goal is to redesign the look-and-feel to match the aesthetic of chaseai.io: clean, light-mode-first, modern typography pairing, generous whitespace, and professional visual hierarchy.

The existing theme token system (`--cc-*` prefix) and SCSS partial structure (`_tokens.scss`, `_light.scss`, `_dark.scss`) are already in place with placeholder values. The four home section components exist as standalone Angular components with inline templates and styles.

## Goals / Non-Goals

**Goals:**
- Establish a concrete brand colour palette replacing the placeholder M3 palettes
- Introduce Inter + Instrument Serif font pairing for modern/sophisticated feel
- Redesign all four home sections with polished layouts, spacing, and typography
- Add new theme tokens needed for richer visual design (accent, secondary surfaces)
- Maintain full dark theme support with equivalent quality
- Maintain WCAG AA accessibility (contrast, focus, semantic HTML)
- Achieve responsive design across mobile/tablet/desktop

**Non-Goals:**
- Redesigning the header/nav (separate change)
- Adding animations or scroll-triggered effects (keep it simple for v1)
- Adding a consultation/booking form (out of scope — CTA links to /contact)
- Changing the routing or page structure
- Adding new pages or sections beyond the existing four

## Decisions

### D1: Font loading via Google Fonts CSS import

**Decision:** Load Inter and Instrument Serif via Google Fonts `<link>` tags in `index.html`.

**Why over self-hosting:** Simpler setup, CDN cache benefits, no asset pipeline changes. Google Fonts are widely cached across the web. Self-hosting can be done later if needed for privacy/performance.

**Why over `@font-face` in SCSS:** Link tags in `<head>` allow the browser to start font fetching earlier in the page load waterfall. Add `font-display: swap` via the Google Fonts API parameter.

### D2: Brand colour palette — vibrant accent on neutral base

**Decision:** Use a single vibrant accent colour (deep indigo/violet, approximately `#6C3CE1`) on a clean neutral base. The palette:

| Token | Light | Dark |
|---|---|---|
| `--cc-primary` | `#6C3CE1` (vibrant indigo) | `#B49AFF` (lighter indigo) |
| `--cc-on-primary` | `#FFFFFF` | `#1A0A3E` |
| `--cc-surface` | `#FFFFFF` | `#121218` |
| `--cc-on-surface` | `#1A1A2E` | `#E8E8F0` |
| `--cc-surface-variant` | `#F5F5FA` | `#1E1E2A` |
| `--cc-outline` | `#E0E0EA` | `#2A2A3A` |
| `--cc-accent` | `#6C3CE1` | `#B49AFF` |
| `--cc-on-accent` | `#FFFFFF` | `#1A0A3E` |
| `--cc-surface-dim` | `#FAFAFE` | `#0E0E14` |

**Why this palette:** Indigo/violet communicates innovation and technology. It's distinctive without being niche. The neutral base (near-white surfaces, dark text) matches the chaseai.io aesthetic of letting content and whitespace do the heavy lifting.

**Alternative considered:** Using the existing azure palette — rejected because it's generic and doesn't differentiate CodeCraft.

### D3: Use custom M3 palette instead of pre-built

**Decision:** Replace `mat.$azure-palette` / `mat.$violet-palette` with a custom palette definition passed to `mat.theme()` so Material components use the brand colours.

**Why:** Angular Material M3 allows custom palettes. This ensures `mat-flat-button` and other Material components automatically use the brand indigo rather than the default azure.

### D4: New tokens added to the token contract

**Decision:** Add three new semantic tokens to `_tokens.scss`:

| Token | Role |
|---|---|
| `--cc-accent` | Accent/CTA colour (may differ from primary in future) |
| `--cc-on-accent` | Text/icons on accent surfaces |
| `--cc-surface-dim` | Alternating section background (slightly different from surface) |

**Why:** The current 7-token set is too limited for the redesign. Alternating section backgrounds need `surface-dim`. A distinct accent token allows future flexibility (e.g., primary for branding, accent for CTAs).

### D5: Typography system using CSS custom properties

**Decision:** Define font family tokens as CSS custom properties:
- `--cc-font-sans: 'Inter', system-ui, sans-serif`
- `--cc-font-serif: 'Instrument Serif', Georgia, serif`

Set `--cc-font-sans` as the base `font-family` on `body`. Use `--cc-font-serif` selectively for hero headlines and section headings where a serif accent adds elegance.

**Why over Angular Material typography:** M3 typography system doesn't support dual-font stacks well. Custom properties give us control over where each font appears, while M3 type scale tokens (`--mat-sys-*`) continue to control sizing/weight.

### D6: Inline component styles (no external SCSS files)

**Decision:** Keep styles inline in each component's `styles` array, consistent with the existing codebase pattern.

**Why:** All existing components use inline styles. Consistency matters more than any marginal benefit of external files for these component-scoped styles.

### D7: Section layout approach — CSS max-width container

**Decision:** Each section uses an inner container with `max-width: 1120px` (wider than current 960px to accommodate the grid layouts), centered with `margin: 0 auto`, with horizontal padding of `2rem` (mobile) to `4rem` (desktop).

**Why 1120px:** Matches the spacious, content-focused layout seen on chaseai.io. Wider than current 960px to give the 4-column service card grid room to breathe.

### D8: Hero section — serif headline with underline accent

**Decision:** Hero uses Instrument Serif for the main headline with a keyword underlined using a CSS `border-bottom` or `text-decoration` in the accent colour. Two CTA buttons: primary (filled) and secondary (outlined). Vertically centered in viewport.

**Why underline over highlight/gradient:** Clean, matches chaseai.io's approach, easy to implement with CSS, works in both light and dark themes.

### D9: Services section — 4-card grid with SVG icons

**Decision:** Expand from 2 to 4 service cards (Software Development, Technical Consulting, AI & Automation, Cloud & DevOps). Use simple inline SVG icons instead of emoji. Responsive: 4 columns → 2 columns → 1 column.

**Why 4 cards:** Gives a richer service offering that better fills the grid and matches the chaseai.io pattern.

### D10: Why section → Process/Approach section with numbered steps

**Decision:** Rename from "Why CodeCraft" to "Our Approach" and restructure as a numbered process (01 → 02 → 03 → 04). Each step has a large number, title, and description. Layout: vertical stack with large step numbers as visual anchors.

**Why process over differentiators:** The chaseai.io approach section with numbered phases communicates methodology and builds trust. "Here's how we work" is more compelling than "here's why we're good."

## Risks / Trade-offs

- **[Google Fonts dependency]** → External dependency for font loading. Mitigation: Use `font-display: swap` and define system font fallbacks in the font stack. If needed later, fonts can be self-hosted.
- **[Dark theme quality]** → Designing primarily for light-mode could mean dark mode feels like an afterthought. Mitigation: Define dark palette values explicitly (not auto-generated) and verify contrast ratios for all token pairs.
- **[Content changes in services/approach]** → Expanding from 2 to 4 service cards and restructuring the approach section requires new copy. Mitigation: Draft reasonable placeholder copy in implementation; can be refined later.
- **[Custom M3 palette complexity]** → Custom palettes require more SCSS configuration than pre-built ones. Mitigation: Angular Material docs have clear examples; the existing `mat.theme()` call just needs updated parameters.
