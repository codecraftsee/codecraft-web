## ADDED Requirements

### Requirement: Standalone component structure
`ThemeToggleComponent` SHALL be a standalone Angular component located at
`src/app/shared/theme-toggle/theme-toggle.component.ts` with
`ChangeDetectionStrategy.OnPush`.

#### Scenario: Component is importable from shared
- **WHEN** a feature component imports `ThemeToggleComponent`
- **THEN** no Sheriff boundary violation SHALL occur (shared → feature import is not
  performed; feature → shared is permitted)

---

### Requirement: Toggle behaviour
The component SHALL call `ThemeService.toggle()` when the user activates the button
(click or keyboard Enter/Space). It SHALL hold no theme state of its own.

#### Scenario: Click triggers toggle
- **WHEN** the user clicks the toggle button
- **THEN** `ThemeService.toggle()` SHALL be called exactly once

#### Scenario: Keyboard activation triggers toggle
- **WHEN** the button has focus and the user presses Enter or Space
- **THEN** `ThemeService.toggle()` SHALL be called exactly once

---

### Requirement: Icon reflects current theme
The button icon SHALL communicate the theme that will be applied on next activation
(i.e. show the moon icon when light is active — clicking switches to dark — and the
sun icon when dark is active).

#### Scenario: Moon icon shown in light mode
- **WHEN** `ThemeService.activeTheme` is `'light'`
- **THEN** the toggle SHALL display a moon icon

#### Scenario: Sun icon shown in dark mode
- **WHEN** `ThemeService.activeTheme` is `'dark'`
- **THEN** the toggle SHALL display a sun icon

---

### Requirement: Accessibility
The toggle SHALL be a native `<button>` element (or a Material `matIconButton`) with
a descriptive `aria-label` that reflects the action about to be taken.

#### Scenario: aria-label in light mode
- **WHEN** `ThemeService.activeTheme` is `'light'`
- **THEN** the button `aria-label` SHALL be `'Switch to dark mode'`

#### Scenario: aria-label in dark mode
- **WHEN** `ThemeService.activeTheme` is `'dark'`
- **THEN** the button `aria-label` SHALL be `'Switch to light mode'`

#### Scenario: Keyboard focusable
- **WHEN** the user tabs through the page
- **THEN** the toggle button SHALL receive focus and display a visible focus ring
