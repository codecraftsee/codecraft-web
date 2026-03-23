## 1. Component Scaffold and Routing

- [x] 1.1 Create `src/app/features/services/services.component.ts` with standalone component, `ChangeDetectionStrategy.OnPush`, importing `ChapterHeaderComponent`
- [x] 1.2 Add `/services` lazy-loaded route to `src/app/app.routes.ts` using `loadComponent()`

## 2. Data Model and Service Data

- [x] 2.1 Define `ServiceOffering` interface with `number`, `title`, `description`, and `tags` fields
- [x] 2.2 Add readonly services array with 3 entries: Marketplaces (`01`), Web Applications (`02`), Websites (`03`) — each with description and tags

## 3. Template — Page Layout and Timeline

- [x] 3.1 Add page wrapper structure (`.page`, `.page__edges`, `.page__content`) with `<cc-chapter-header />`
- [x] 3.2 Add page heading ("Our Services") and subtitle
- [x] 3.3 Render timeline section with `aria-label="Service offerings"` containing a `@for` loop over services
- [x] 3.4 Each timeline card renders: formatted number, title (`<h3>`), description paragraph, and tags list

## 4. Styles — Timeline and Cards

- [x] 4.1 Style page wrapper matching existing book-page pattern (`.page`, dark theme, responsive)
- [x] 4.2 Style timeline container with vertical line via `::before` pseudo-element using `var(--cc-outline)`
- [x] 4.3 Style timeline cards with dot indicator (`::before`) and horizontal connector (`::after`)
- [x] 4.4 Style card content: number, title, description, and tags using `--cc-*` design tokens
- [x] 4.5 Add card-in animation with staggered delay via `--card-index` CSS variable
- [x] 4.6 Add `@media (prefers-reduced-motion:reduce)` to disable animations
- [x] 4.7 Add dark theme styles via `:host-context(.dark-theme)`
- [x] 4.8 Add responsive styles: hide timeline line/dots on mobile (<768px), full-width cards

## 5. Tests

- [x] 5.1 Create `src/app/features/services/services.component.spec.ts` with Vitest + Angular TestBed
- [x] 5.2 Test: component creates successfully
- [x] 5.3 Test: renders page wrapper with chapter header
- [x] 5.4 Test: renders 3 timeline cards
- [x] 5.5 Test: each card displays number, title, description, and tags
- [x] 5.6 Test: timeline section has aria-label

## 6. Verification

- [x] 6.1 Run `ng test --watch=false` — all tests pass
- [x] 6.2 Run `ng build` — production build succeeds
