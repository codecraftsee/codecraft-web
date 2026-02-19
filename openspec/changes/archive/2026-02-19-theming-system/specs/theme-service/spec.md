## ADDED Requirements

### Requirement: Active theme signal
The service SHALL expose an `activeTheme` signal of type `'light' | 'dark'` as the
single source of truth for the current theme across the application.

#### Scenario: Default value when no preference stored and OS preference is light
- **WHEN** no theme is stored in `localStorage` and `prefers-color-scheme` is `light`
- **THEN** `activeTheme` signal value SHALL be `'light'`

#### Scenario: Default value when no preference stored and OS preference is dark
- **WHEN** no theme is stored in `localStorage` and `prefers-color-scheme` is `dark`
- **THEN** `activeTheme` signal value SHALL be `'dark'`

#### Scenario: Default value when no preference stored and no OS preference available
- **WHEN** no theme is stored in `localStorage` and `prefers-color-scheme` is not set
- **THEN** `activeTheme` signal value SHALL be `'light'`

---

### Requirement: Persist theme preference
The service SHALL persist the user's theme preference to `localStorage` under the key
`cc-theme` whenever the active theme changes.

#### Scenario: Preference written on toggle
- **WHEN** `toggle()` is called
- **THEN** `localStorage.getItem('cc-theme')` SHALL return the new active theme value

#### Scenario: Preference read on service initialisation
- **WHEN** the service initialises and `localStorage` contains a valid `cc-theme` value
- **THEN** `activeTheme` SHALL be set to that stored value before any effect runs

---

### Requirement: Apply theme class to document root
The service SHALL apply exactly one of `.light-theme` or `.dark-theme` to
`document.documentElement` at all times, reflecting the current `activeTheme` signal
value.

#### Scenario: Light theme class applied
- **WHEN** `activeTheme` is `'light'`
- **THEN** `document.documentElement` SHALL have class `light-theme` and SHALL NOT have
  class `dark-theme`

#### Scenario: Dark theme class applied
- **WHEN** `activeTheme` is `'dark'`
- **THEN** `document.documentElement` SHALL have class `dark-theme` and SHALL NOT have
  class `light-theme`

#### Scenario: Class updated on theme change
- **WHEN** `toggle()` is called
- **THEN** the previous theme class SHALL be removed and the new theme class SHALL be
  added to `document.documentElement` within the same microtask

---

### Requirement: Toggle method
The service SHALL expose a `toggle()` method that switches `activeTheme` between
`'light'` and `'dark'`.

#### Scenario: Toggle from light to dark
- **WHEN** `activeTheme` is `'light'` and `toggle()` is called
- **THEN** `activeTheme` SHALL become `'dark'`

#### Scenario: Toggle from dark to light
- **WHEN** `activeTheme` is `'dark'` and `toggle()` is called
- **THEN** `activeTheme` SHALL become `'light'`

---

### Requirement: Singleton scope
The service SHALL be provided in root scope (`providedIn: 'root'`) and SHALL maintain
a single instance for the lifetime of the application.

#### Scenario: Same instance across injectors
- **WHEN** `ThemeService` is injected in both a `core/` service and a `shared/` component
- **THEN** both SHALL receive the same instance with the same signal reference
