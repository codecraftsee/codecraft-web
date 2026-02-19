## Why

The home page is the first thing every prospective client sees. Before building any other
feature pages, we need a high-impact `/` route that immediately communicates what CodeCraft
does, earns credibility, and drives visitors to make contact.

## What Changes

- Create the `home` feature module at `src/app/features/home/`
- Implement a lazy-loaded `HomeComponent` registered on the `/` route
- Build four sections: hero, services overview, differentiators, and a CTA strip
- Wire `ThemeToggleComponent` into a top nav/header component in `shared/`
- All sections use `--cc-*` design tokens and are fully responsive

## Capabilities

### New Capabilities

- `home-hero`: Full-viewport hero section — bold headline, subheadline, and primary CTA
  button linking to `/contact`
- `home-services`: Two-card services overview (Development / Consulting) with icon,
  title, and brief description; each card links to `/services`
- `home-why`: Three-column differentiators strip — short, punchy value propositions that
  set CodeCraft apart from generic agencies
- `home-cta`: Full-width bottom CTA section — secondary conversion point with a
  headline and "Get in touch" button
- `site-header`: Shared sticky header with logo placeholder, nav links
  (Home, About, Services, Contact), and `ThemeToggleComponent`

### Modified Capabilities

_(none)_

## Impact

- **New files:** `src/app/features/home/home.component.ts` + template + styles,
  `src/app/shared/header/header.component.ts`
- **Modified files:** `src/app/app.routes.ts` (add `/` lazy route),
  `src/app/app.html` (add `<cc-header>`, `<router-outlet>`)
- **No new dependencies** — uses Angular router, Angular Material buttons, existing
  `--cc-*` tokens and `ThemeToggleComponent`
- **No API changes** — fully static, no backend calls
- **Sheriff boundaries:** `home` feature in `features/`, header in `shared/` — no violations
