## Why

The current site uses a standard opaque header + stacked sections layout that blends in with every other agency website. To stand out and create a memorable first impression, we need a distinctive visual identity: a transparent, layered background aesthetic (inspired by chaseai.io's depth and atmosphere) paired with a book-style "table of contents" navigation where each page is presented as a chapter. This transforms the site from a generic corporate page into something that feels crafted and intentional.

## What Changes

- **BREAKING** — Replace the current `HeaderComponent` navigation bar with a new book-style table of contents (ToC) navigation component
- Add a full-viewport animated/layered transparent background system at the app shell level (subtle particles, gradients, or mesh — no grid squares)
- Redesign the app shell layout so content floats over the transparent background with glassmorphism card surfaces
- Restyle the home page sections (hero, services, why, CTA) to use glass-panel aesthetics over the transparent backdrop
- Update theme tokens to support transparency, blur, and glassmorphism (new alpha/glass tokens for both light and dark themes)
- Keep all existing routes and page structure: Home (`/`), About (`/about`), Services (`/services`), Contact (`/contact`)

## Capabilities

### New Capabilities
- `transparent-background`: Full-viewport animated background layer (gradient mesh, subtle floating shapes, or particles) rendered behind all content. Configurable per theme (light/dark). Performant — GPU-accelerated CSS or canvas, no heavy JS libraries.
- `book-navigation`: Table of contents navigation styled like a book's chapter listing. Each route is a "chapter" with a number, title, and optional subtitle. Replaces the current horizontal nav bar. Responsive — transforms to a slide-out drawer on mobile.
- `glass-surfaces`: Glassmorphism design system — backdrop-blur panels, translucent cards, frosted borders. Provides reusable CSS classes/mixins and shared Angular components for glass-styled content containers.

### Modified Capabilities
- `theme-tokens`: Add new tokens for glass/transparency effects (`--cc-glass-bg`, `--cc-glass-border`, `--cc-glass-blur`, `--cc-backdrop-*`) and update surface tokens to support alpha transparency in both light and dark themes.

## Impact

- **Shared components**: `HeaderComponent` replaced by new `BookNavigationComponent`; all pages that rely on the header will use the new nav
- **App shell** (`app.ts`, `app.html`, `app.scss`): Major restructure — background layer + glass content area + new nav integration
- **Theme system** (`_tokens.scss`, `_light.scss`, `_dark.scss`): New transparency/glass tokens added
- **Home feature** (`features/home/`): All section components restyled to use glass surfaces
- **Global styles** (`styles.scss`): Body/html background changes, new glass utility classes
- **Dependencies**: No new npm packages expected — pure CSS/SCSS approach for glassmorphism and backgrounds
- **Accessibility**: Must maintain WCAG AA contrast ratios on translucent surfaces; will need careful testing of text over dynamic backgrounds
