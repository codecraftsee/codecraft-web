## Why

The CodeCraft Solutions website currently lacks a dedicated services page. Visitors arriving from the home page services overview have no destination to learn about specific offerings in detail. The `/services` route is defined in the project plan and navigation sidebar but not yet implemented. Adding this page completes a core section of the site and supports the business goal of generating inbound leads by clearly communicating what CodeCraft builds.

## What Changes

- Add a new `/services` feature page with a vertical timeline layout presenting each service offering as a numbered card
- Initial services: Marketplaces, Web Applications, Websites (extensible — more will be added later)
- Each service card displays a number (01, 02, 03...), title, and description
- Timeline design inspired by chaseai.io's #approach section: vertical connector line with stacked cards, fade-in animations
- Register the `/services` route in `app.routes.ts` with lazy loading
- Dark theme support, responsive layout, reduced motion support, WCAG AA accessibility

## Capabilities

### New Capabilities

- `services-timeline`: Vertical timeline component rendering service offerings as numbered cards with connecting line, animations, and responsive layout

### Modified Capabilities

_(none — no existing spec-level requirements change)_

## Impact

- **New files:** `src/app/features/services/services.component.ts`, `src/app/features/services/services.component.spec.ts`
- **Modified files:** `src/app/app.routes.ts` (add `/services` route)
- **Dependencies:** `ChapterHeaderComponent` (shared), Angular Router
- **No breaking changes** — additive feature only
