## Context

The site is pre-component — nothing is built yet. Theming must be established first so
every component is authored against stable design tokens from day one. Retrofitting a
theme system after components exist means touching every file; doing it now costs one
focused change.

Stack constraints: Angular 20+, standalone components, signals, Angular Material scoped
to form fields / buttons / dialogs only. No designer — tokens will be hand-authored and
refined as the visual design evolves.

## Goals / Non-Goals

**Goals:**
- Establish a `light-theme` / `dark-theme` CSS class toggle on `<html>`
- Provide a `ThemeService` (singleton, `core/`) as the single source of truth for active theme
- Persist user preference in `localStorage`; fall back to `prefers-color-scheme` when absent
- Define an M3-compatible CSS custom property token layer consumed by both Material and bespoke components
- Ship a `ThemeToggleComponent` (standalone, `shared/`) ready to drop into the nav

**Non-Goals:**
- More than two themes (no high-contrast, no custom palette picker)
- Server-side rendering / SSR theme hydration
- Dynamic palette generation (e.g. Material You seed-colour API)
- Any backend persistence of theme preference

## Decisions

### 1. Class-on-`<html>` over `prefers-color-scheme`-only media query

**Chosen:** Apply `.light-theme` / `.dark-theme` to `document.documentElement` via a
signal effect in `ThemeService`.

**Why:** Media-query-only approach gives users no override. Class-on-root lets us respect
the OS default on first visit while still allowing the user to toggle. Both Material M3
and bespoke SCSS can key off a single class without duplication.

**Alternative considered:** `data-theme` attribute on `<html>` — equally valid but class
is more idiomatic with Angular Material's existing theming helpers.

---

### 2. Angular Material M3 — `mat.theme()` mixin, not hand-rolled M3 tokens

**Chosen:** Use `@angular/material`'s `mat.theme()` SCSS mixin to emit M3 system tokens
for the Material subset (form fields, buttons, dialogs). Bespoke components reference
`--mat-sys-*` tokens directly in their own SCSS.

**Why:** Keeps Material components correctly themed with zero manual token maintenance.
Bespoke components piggyback on the same token layer rather than duplicating a parallel
system — one source of truth for colour.

**Alternative considered:** Hand-define all `--cc-*` tokens independently of Material and
wire Material separately. Rejected: double maintenance whenever palette changes.

---

### 3. `ThemeService` uses `signal` + `effect` (no RxJS)

**Chosen:** `activeTheme = signal<'light' | 'dark'>('light')`. A single `effect()` reads
the signal and calls `document.documentElement.classList.toggle(...)`. `localStorage`
read happens once at service construction (initial value).

**Why:** Consistent with project-wide signal-first state management. No Observable needed
— theme is synchronous, not a stream.

**Alternative considered:** `BehaviorSubject` + `tap` side effect. Rejected: adds RxJS
complexity for a scalar value with one subscriber.

---

### 4. Token file structure — three SCSS partials

```
src/styles/
  themes/
    _tokens.scss      ← shared semantic aliases (e.g. --cc-surface, --cc-on-surface)
    _light.scss       ← :root.light-theme { mat.theme(...) + token overrides }
    _dark.scss        ← :root.dark-theme  { mat.theme(...) + token overrides }
styles.scss           ← @use all three, sets default class
```

**Why:** Separating tokens from palette assignments makes it trivial to swap palettes
later without touching semantic references in components. `_tokens.scss` is the stable
contract; palettes are an implementation detail.

---

### 5. `ThemeToggleComponent` in `shared/` — dumb, signal-reading

**Chosen:** The toggle is a presentational component that calls
`themeService.toggle()` on click. It holds no state of its own. Uses a Material
`mat-icon-button` with a sun/moon icon.

**Why:** Placement in `shared/` respects Sheriff boundaries (features can import shared,
shared cannot import features). The toggle must be embeddable in any feature's nav or
header without circular deps.

## Risks / Trade-offs

- **FOUC (Flash of Unstyled Content)** — Reading `localStorage` inside `ThemeService`
  constructor happens after Angular bootstraps, which is after first paint. A brief flash
  of the default (light) theme may be visible before dark preference is applied.
  → Mitigation: Add a tiny inline `<script>` in `index.html` before the Angular bundle
  that reads `localStorage` and sets the class on `<html>` synchronously. This is the
  standard pattern and does not require a framework.

- **Token churn** — Palette values are TBD. Token names defined now may be renamed as
  visual design evolves.
  → Mitigation: Tokens are referenced only via SCSS partials and `--cc-*` custom
  properties, not hard-coded in component files. A palette change touches `_light.scss`
  and `_dark.scss` only.

- **Material version coupling** — `mat.theme()` mixin API may change across Material
  major versions.
  → Mitigation: Material is pinned to a specific Angular version; upgrades are handled
  as part of Angular version bumps, not independently.

## Open Questions

- Final palette values (primary, accent, surface, error) — to be decided during visual
  design phase. Token *names* are stable; *values* are placeholders until then.
- Whether to use a Material icon font or an SVG sprite for the toggle icon. Leaning SVG
  to avoid an extra font request, but not blocking on this.
