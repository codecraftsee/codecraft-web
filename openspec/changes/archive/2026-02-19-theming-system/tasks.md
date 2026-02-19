## 1. Install Angular Material

- [x] 1.1 Run `ng add @angular/material` and select a base M3 theme (will be overridden)
- [x] 1.2 Confirm `@angular/material` and `@angular/cdk` appear in `package.json`
- [x] 1.3 Verify `angular.json` styles array includes the Material prebuilt or is left for SCSS setup

## 2. SCSS Token Layer

- [x] 2.1 Create `src/styles/themes/` directory
- [x] 2.2 Create `src/styles/themes/_tokens.scss` — declare all `--cc-*` custom property names with no values (semantic aliases only)
- [x] 2.3 Create `src/styles/themes/_light.scss` — define `:root.light-theme` block with `mat.theme()` call and all `--cc-*` token values for the light palette
- [x] 2.4 Create `src/styles/themes/_dark.scss` — define `:root.dark-theme` block with `mat.theme()` call and all `--cc-*` token values for the dark palette
- [x] 2.5 Update `src/styles.scss` to `@use` all three partials in order and add `light-theme` class to `html` as default

## 3. FOUC Prevention

- [x] 3.1 Add inline `<script>` to `src/index.html` (before Angular bundle) that reads `localStorage.getItem('cc-theme')` and applies the correct class to `document.documentElement` synchronously

## 4. ThemeService

- [x] 4.1 Create `src/app/core/theme.service.ts` with `providedIn: 'root'`
- [x] 4.2 Implement `activeTheme` as `signal<'light' | 'dark'>` — initial value read from `localStorage` (`cc-theme` key), falling back to `prefers-color-scheme`, then `'light'`
- [x] 4.3 Add `effect()` that toggles `.light-theme` / `.dark-theme` on `document.documentElement` whenever `activeTheme` changes
- [x] 4.4 Implement `toggle()` method that flips `activeTheme` and writes new value to `localStorage`
- [x] 4.5 Write unit test for `ThemeService` covering: initial value from localStorage, initial value from `prefers-color-scheme`, toggle logic, and localStorage write

## 5. ThemeToggleComponent

- [x] 5.1 Create `src/app/shared/theme-toggle/theme-toggle.component.ts` as a standalone component with `ChangeDetectionStrategy.OnPush`
- [x] 5.2 Inject `ThemeService` via `inject()` and expose `activeTheme` signal to template
- [x] 5.3 Render a `<button mat-icon-button>` with a sun SVG (dark mode active) or moon SVG (light mode active) using `@if` on the signal value
- [x] 5.4 Bind `aria-label` dynamically: `'Switch to dark mode'` when light, `'Switch to light mode'` when dark
- [x] 5.5 Bind `(click)` to `themeService.toggle()`
- [x] 5.6 Write unit test covering: correct icon rendered per theme, aria-label value per theme, toggle called on click

## 6. Verification

- [ ] 6.1 Manually test light → dark → light toggle in browser; confirm class switches on `<html>`
- [ ] 6.2 Manually test that preference survives page reload (localStorage persistence)
- [ ] 6.3 Manually test OS dark preference is respected on first visit (no stored key)
- [ ] 6.4 Run `ng lint` — confirm no Sheriff boundary violations
- [x] 6.5 Run `ng test` — confirm all new unit tests pass
