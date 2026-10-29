import { RenderMode, ServerRoute } from '@angular/ssr';

/**
 * Every public page is prerendered to static HTML at build time so crawlers and
 * link-preview bots can read the content without running JavaScript. Unknown URLs
 * fall back to the client-rendered shell (served as 404.html on GitHub Pages).
 */
export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'services', renderMode: RenderMode.Prerender },
  { path: 'team', renderMode: RenderMode.Prerender },
  { path: 'contact', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client },
];
