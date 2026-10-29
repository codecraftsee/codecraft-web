## Context

The app is an Angular 22 zoneless SPA with four lazy routes, deployed to GitHub Pages (`www.codecraftsolutions.rs`) on push to `master`. All page copy is inline (templates, `shared/data/services.data.ts`, `TeamComponent.members`); nothing is fetched on page load, so a build-time render captures the full content.

## Goals / Non-Goals

**Goals:**
- Every public route returns its real content and SEO tags in the raw HTML
- No hydration mismatches; theme, clock, tech radar and contact form behave as before
- Keep GitHub Pages hosting and the existing deploy flow
- Guard against regressions in CI

**Non-Goals:**
- Runtime server-side rendering (no per-request rendering, no Node host)
- Rendering all service descriptions on `/services` (only the active one is in the DOM — unchanged UX)
- Social profile links (`sameAs`) in JSON-LD — can be added later in `src/index.html`

## Decisions

### 1. Static output, not a server
`outputMode: "static"` prerenders at build time and emits `<route>/index.html`. Content is identical for every visitor and only changes on deploy, so a server adds cost without benefit. The schematic's Express `server.ts` and `express` deps were removed.

### 2. Server routes
`RenderMode.Prerender` for `''`, `services`, `team`, `contact`; `RenderMode.Client` for `**` so unknown URLs get the CSR shell (`index.csr.html`), which deploy copies to `404.html`.

### 3. Theme hydration
`ThemeService.activeTheme` starts as `'dark'` on both server and client so the header's theme-dependent `@if` branches and avatar `src` match the prerendered HTML. In the browser, `afterNextRender` restores the stored theme, or — when nothing is stored — the theme the inline `index.html` script already applied from `prefers-color-scheme`, so first-time visitors don't flip from light to dark. A `restored` flag stops the effect from writing the default over the stored preference before then, and a theme picked before restore (e.g. a click replayed by event replay) is kept. Storage access is wrapped in `try/catch` for browsers that block it. On the server the service never touches `localStorage` or `document`. The inline script still sets the `<html>` class before first paint, so there is no colour flash.

**Alternative considered:** reading the stored theme synchronously on the client — rejected: guaranteed `NG0500`-family hydration mismatches for light/sable users.

### 4. Timers
The header clock renders `--:--:--` and starts in `afterNextRender` (cleared via `DestroyRef`). The tech-radar auto-cycle effect returns early unless `isPlatformBrowser`. Timers during prerender would keep the app from becoming stable and render non-deterministic text.

### 5. SEO via TitleStrategy
`SeoTitleStrategy` (core) replaces Angular's default `TitleStrategy`; after each navigation — including each prerendered route — it reads the deepest route's `data.seo` and calls `SeoService.apply()`, which sets title, description, `og:*`, `twitter:*` and a single `<link rel="canonical">`. Route data lives in `app.routes.ts`, keeping `core/` free of feature imports (Sheriff).

### 6. Canonical URLs end with `/`
GitHub Pages serves `services/index.html` at `/services/` and 301-redirects `/services`. Canonical, `og:url` and the sitemap use the slash form so they point at the final 200 URL.

### 7. Share image
`scripts/og-image.svg` (1200×630, blueprint style, logo paths copied from the header) is rendered once to `public/og-image.png` with `npx @resvg/resvg-js-cli`; the PNG is committed so builds don't need a rasteriser.

### 8. Regression guard
`scripts/verify-prerender.mjs` runs in the deploy job after the build and fails if any page lacks its key copy, description, `og:title`, `og:image` or correct canonical.

## Risks / Trade-offs

- Content changes require a rebuild — already the case (every push to `master` deploys).
- Initial JS grows ~10 kB (hydration + event replay).
- Light/sable users see the header icon/avatars switch one frame after load (page colours are already correct).
