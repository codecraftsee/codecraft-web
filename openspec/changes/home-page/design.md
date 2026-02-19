## Context

The Angular 21 app is scaffolded with routing and theming. The app shell (`app.html`,
`app.routes.ts`) is still the Angular default — no feature pages or navigation exist yet.
This change builds the home page and the shared site header as the first visible UI.

## Goals / Non-Goals

**Goals:**
- Lazy-load `HomeComponent` on the `/` route
- Build a shared `HeaderComponent` in `shared/` with nav links and theme toggle
- Implement four home page sections using `--cc-*` design tokens
- Fully responsive layout (mobile-first, breakpoints at 768px and 1200px)
- Accessible: semantic HTML, ARIA where needed, keyboard navigable

**Non-Goals:**
- Animations or scroll-triggered effects (can be added later)
- Real content/copy — placeholder text used until brand copy is written
- Real logo — a text wordmark placeholder until brand assets exist
- Any backend calls or dynamic data

## Decisions

### 1. `HomeComponent` as a single component with section sub-components

**Chosen:** One `home.component.ts` that composes four section components:
`HeroSectionComponent`, `ServicesSectionComponent`, `WhySectionComponent`,
`CtaSectionComponent` — all in `features/home/components/`.

**Why:** Each section has its own layout, styles and potential future interactivity.
Separate components keep files small, enable independent testing, and make it easy
to reorder or remove sections later.

**Alternative considered:** Single monolithic component with all HTML in one template.
Rejected: template would be unwieldy and untestable at section granularity.

---

### 2. `HeaderComponent` in `shared/` — not in `features/home/`

**Chosen:** `src/app/shared/header/header.component.ts` — used by `app.html` directly,
not owned by any feature.

**Why:** The header appears on every page. Placing it in `shared/` respects Sheriff
boundaries and avoids duplicating it per feature. Features import from `shared/`;
`shared/` does not import from features.

---

### 3. CSS Grid for section layouts, Flexbox for within-section alignment

**Chosen:** Section outer containers use `display: grid` with named template areas.
Cards and inline groups use `display: flex`.

**Why:** Grid gives declarative two-dimensional control for responsive breakpoints
(single column → multi-column). Flex handles one-dimensional alignment within those
cells. No third-party layout library needed.

---

### 4. Placeholder copy with `[placeholder]` markers

**Chosen:** All copy is written as realistic-sounding placeholder text (not "Lorem
ipsum"), following the bold/innovative tone from `project.md`. Placeholder values
that will change are marked inline as `<!-- REPLACE: ... -->`.

**Why:** Realistic copy makes the layout easier to evaluate visually. Explicit markers
make it easy to find and replace when real copy arrives.

---

### 5. Router links not `<a href>` for internal navigation

**Chosen:** All internal CTAs use `[routerLink]` directive.

**Why:** Prevents full page reloads, keeps Angular router in control of navigation,
and enables preloading strategies later.

## Risks / Trade-offs

- **Placeholder content looks unpolished** — acceptable until brand/copy phase.
  → Mitigation: Use realistic structure and tone so the layout reads naturally.

- **`--cc-*` token values are placeholder colours** — theming is in place but the
  palette will change when brand colours are finalised.
  → Mitigation: All colour references go through tokens, so a palette swap touches
  only `_light.scss` and `_dark.scss`.

- **No real logo asset** — `src/assets/` is empty.
  → Mitigation: Text wordmark "CodeCraft" used as fallback until SVG logo is provided.

## Open Questions

- Final nav links — are "Home, About, Services, Contact" the right four? Assumed yes
  based on `project.md` routes table.
- Mobile nav — hamburger menu or full-screen overlay? Deferred; for now the nav
  collapses to a scrollable horizontal strip on small screens.
