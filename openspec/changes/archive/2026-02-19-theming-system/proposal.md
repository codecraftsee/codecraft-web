## Why

The site has no theming infrastructure. Before building any UI components, we need a
light/dark toggle system so that every component is authored against design tokens from
the start — retrofitting theming later is significantly more expensive.

## What Changes

- Introduce a `ThemeService` that owns the active theme as a signal and persists the
  user's preference to `localStorage`
- Add Angular Material as a dependency, scoped to form fields, buttons, and dialogs only
- Define an M3-compatible CSS custom property layer (design tokens) for both light and
  dark palettes — consumed by Material and all bespoke components
- Apply the active theme class (`light-theme` / `dark-theme`) to `<html>` via a signal
  effect in `ThemeService`
- Respect the OS `prefers-color-scheme` as the default when no stored preference exists
- Expose a toggle control component (icon button) for placement in the site nav

## Capabilities

### New Capabilities

- `theme-service`: Singleton Angular service that manages active theme state (signal),
  persists preference, and applies the CSS class to the document root
- `theme-tokens`: CSS custom property definitions for light and dark palettes, including
  M3 system tokens and any bespoke site tokens
- `theme-toggle`: Standalone UI component (icon button) that reads and updates the theme
  signal — designed for placement in the top nav

### Modified Capabilities

_(none — no existing specs)_

## Impact

- **New dependency:** `@angular/material` (used only for form fields, buttons, dialogs)
- **New files:** `src/app/core/theme.service.ts`, `src/styles/themes/light.scss`,
  `src/styles/themes/dark.scss`, `src/styles/themes/_tokens.scss`,
  `src/app/shared/theme-toggle/theme-toggle.component.ts`
- **Modified files:** `src/styles.scss` (import theme setup), `angular.json` (Material
  setup if needed)
- **No API changes** — theming is entirely client-side
- **No Sheriff boundary violations** — `ThemeService` lives in `core/`, toggle component
  lives in `shared/`
