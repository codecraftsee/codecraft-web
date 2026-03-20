## 1. Theme Tokens — Glass & Backdrop

- [x] 1.1 Add glass token documentation comments to `_tokens.scss` (`--cc-glass-bg`, `--cc-glass-border`, `--cc-glass-blur`, `--cc-glass-shadow`)
- [x] 1.2 Add backdrop token documentation comments to `_tokens.scss` (`--cc-backdrop-start`, `--cc-backdrop-mid`, `--cc-backdrop-end`, `--cc-backdrop-accent`)
- [x] 1.3 Define glass and backdrop token values in `_light.scss` under `:root.light-theme`
- [x] 1.4 Define glass and backdrop token values in `_dark.scss` under `:root.dark-theme`
- [x] 1.5 Update theme token unit tests to verify all 15 tokens are present in both themes

## 2. Glass Surfaces — Mixin & Component

- [x] 2.1 Create `_glass.scss` SCSS mixin file in `src/styles/` with `@mixin glass-panel` applying backdrop-filter, background, border, and box-shadow from `--cc-glass-*` tokens
- [x] 2.2 Add `@supports` fallback in the mixin for browsers without `backdrop-filter` support (alpha ≥ 0.85)
- [x] 2.3 Create `GlassPanelComponent` in `shared/glass-panel/` — standalone, OnPush, content projection via `<ng-content>`
- [x] 2.4 Add `elevation` signal input (`'low' | 'medium' | 'high'`) to `GlassPanelComponent` with medium as default
- [x] 2.5 Apply border-radius (16px) and elevation-specific blur/shadow styles
- [x] 2.6 Write unit tests for `GlassPanelComponent` (renders content, applies elevation classes, default elevation)

## 3. Transparent Background

- [x] 3.1 Create `BackgroundComponent` in `shared/background/` — standalone, OnPush, renders 3-4 animated gradient blob `<div>` elements
- [x] 3.2 Style gradient blobs with `position: fixed; inset: 0; z-index: 0`, radial gradients using `--cc-backdrop-*` tokens
- [x] 3.3 Add `@keyframes` animations for each blob with `transform: translate3d()` / `scale()`, cycle durations 20-40s, `will-change: transform`
- [x] 3.4 Add `@media (prefers-reduced-motion: reduce)` rule to pause all background animations
- [x] 3.5 Write unit tests for `BackgroundComponent` (renders, respects reduced motion)

## 4. Book Navigation

- [x] 4.1 Create `BookNavigationComponent` in `shared/book-navigation/` — standalone, OnPush, replaces `HeaderComponent`
- [x] 4.2 Implement chapter list with Roman numerals (I–IV), `routerLink` for each route, `routerLinkActive` for active chapter highlighting
- [x] 4.3 Add wordmark at top using serif font (`--cc-font-serif`), theme toggle at bottom
- [x] 4.4 Style desktop layout: persistent left sidebar ~280px, serif chapter numbers, sans-serif titles, decorative separator lines
- [x] 4.5 Implement tablet responsive behaviour (768-1023px): collapsible sidebar with toggle button
- [x] 4.6 Implement mobile responsive behaviour (<768px): slide-out drawer from left, hamburger trigger, close on navigation
- [x] 4.7 Add mobile drawer focus trap and keyboard accessibility (Tab/Enter navigation, `aria-label` on `<nav>`)
- [x] 4.8 Write unit tests for `BookNavigationComponent` (chapter entries render, active state, responsive states, accessibility attributes)

## 5. App Shell Restructure

- [x] 5.1 Update `app.ts` to import `BackgroundComponent` and `BookNavigationComponent` instead of `HeaderComponent`
- [x] 5.2 Update `app.html` to render `<cc-background />` + `<cc-book-navigation />` + `<router-outlet />` in the new layout structure
- [x] 5.3 Add `app.scss` layout styles: fixed background layer, sidebar + scrollable content area using CSS grid or flexbox
- [x] 5.4 Ensure content area scrolls independently while background remains fixed
- [x] 5.5 Update `app.spec.ts` to reflect new component imports

## 6. Home Page Glass Restyling

- [x] 6.1 Wrap home page sections (hero, services, why, CTA) in `<cc-glass-panel>` components or apply `glass-panel` mixin
- [x] 6.2 Adjust section spacing and padding to work within glass panels over the transparent background
- [x] 6.3 Verify text contrast on glass surfaces meets WCAG AA (4.5:1 normal text, 3:1 large text)
- [x] 6.4 Update home page section unit tests for new glass panel wrappers

## 7. Cleanup & Verification

- [x] 7.1 Remove old `HeaderComponent` from `shared/header/` (or mark deprecated if other branches reference it)
- [x] 7.2 Run full test suite and fix any failures
- [x] 7.3 Verify light and dark themes both produce correct visual results
- [x] 7.4 Run AXE accessibility audit on home page and verify no violations
