## Why

The site was rendered entirely in the browser. Any client that doesn't run JavaScript — Google's first crawl pass, LinkedIn/Slack link previews, directories like Clutch, AI assistants — received an empty `<app-root>` and the title "CodeCraft Solutions", with no services, team, or project content. For a B2B studio whose leads come from search and shared links, this is the most valuable thing to fix.

## What Changes

- Prerender every public route (`/`, `/services`, `/team`, `/contact`) to static HTML at build time using `@angular/ssr` with `outputMode: "static"`; the browser then hydrates the page (`provideClientHydration(withEventReplay())`). Still hosted on GitHub Pages — no server.
- Make browser-only code safe to run during prerendering: `ThemeService` (localStorage/document), the site-header UTC clock, and the tech-radar auto-cycle timer.
- Add per-route `<title>`, meta description, canonical URL, Open Graph and Twitter card tags via a `SeoService` + `SeoTitleStrategy` driven by route `data.seo`.
- Add Organization JSON-LD, `robots.txt`, `sitemap.xml` and a 1200×630 share image (`og-image.png`).
- Deploy: fail the build if a prerendered page is missing its content or SEO tags (`scripts/verify-prerender.mjs`); serve the client-rendered shell (`index.csr.html`) as `404.html`.
- Bump Angular 22.1 → 22.2 (required to install `@angular/ssr` alongside the existing packages).

## Capabilities

### New Capabilities

- `prerendering`: Static HTML generation for public routes and hydration-safe browser code
- `seo-metadata`: Per-route title, description, canonical and social-preview tags, structured data, sitemap and robots

### Modified Capabilities

- `theme-service`: stored theme is now applied after the first render (initial value is the default on server and client) so hydration matches

## Impact

- **Delta specs:** `prerendering`, `seo-metadata` (new); `theme-service` (modified)
- **New files:** `src/main.server.ts`, `src/app/app.config.server.ts`, `src/app/app.routes.server.ts`, `src/app/core/seo.service.ts`, `src/app/core/seo-title.strategy.ts`, `public/robots.txt`, `public/sitemap.xml`, `public/og-image.png`, `scripts/og-image.svg`, `scripts/verify-prerender.mjs`, specs for SEO and tech-radar
- **Modified files:** `angular.json`, `package.json`, `src/app/app.config.ts`, `src/app/app.routes.ts`, `src/index.html`, `core/theme.service.ts`, `shared/site-header`, `features/home/tech-radar`, `.github/workflows/deploy.yml`
- **Dependencies:** `@angular/ssr`, `@angular/platform-server` (build-time only use)
- **Behaviour:** the header theme icon and themed avatars switch to the stored theme one frame after load (page colours are already correct via the inline script in `index.html`); the header clock shows `--:--:--` until the page loads
