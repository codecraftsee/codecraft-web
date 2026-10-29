## 1. Prerendering setup

- [x] 1.1 Bump Angular packages 22.1 → 22.2 so `@angular/ssr` resolves
- [x] 1.2 `ng add @angular/ssr`; switch `angular.json` to `outputMode: "static"`; remove Express `server.ts` and deps
- [x] 1.3 `app.routes.server.ts`: prerender `''`, `services`, `team`, `contact`; client-render `**`
- [x] 1.4 `app.config.ts`: `provideClientHydration(withEventReplay())`

## 2. Hydration-safe browser code

- [x] 2.1 `ThemeService`: default initial theme, restore stored theme in `afterNextRender`, no storage/DOM access on the server
- [x] 2.2 `SiteHeaderComponent`: clock placeholder, start interval in `afterNextRender`, clear via `DestroyRef`
- [x] 2.3 `TechRadarComponent`: auto-cycle only in the browser

## 3. SEO metadata

- [x] 3.1 `core/seo.service.ts`: title, description, og/twitter tags, canonical; `canonicalUrl()` helper
- [x] 3.2 `core/seo-title.strategy.ts` registered as `TitleStrategy`
- [x] 3.3 Route `data.seo` (title + description) for all four routes
- [x] 3.4 `index.html`: default description, og:image, Organization JSON-LD

## 4. Static files

- [x] 4.1 `public/robots.txt`, `public/sitemap.xml`
- [x] 4.2 `scripts/og-image.svg` → `public/og-image.png` (1200×630)

## 5. Deploy

- [x] 5.1 `scripts/verify-prerender.mjs` content + tag check, run in `deploy.yml`
- [x] 5.2 `404.html` from `index.csr.html`

## 6. Tests and verification

- [x] 6.1 `seo.service.spec.ts`, `tech-radar.component.spec.ts`; theme + header specs for hydration behaviour
- [x] 6.2 `ng test` and `ng build` pass; `verify-prerender` passes
- [x] 6.3 Headless Chrome: all routes hydrate with 0 skipped components and no warnings, with stored dark/light/sable themes
- [ ] 6.4 After deploy: LinkedIn Post Inspector shows title, description and image; Google Rich Results Test validates JSON-LD
