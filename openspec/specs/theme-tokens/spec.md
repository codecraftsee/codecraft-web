### Requirement: SCSS partial structure
The token layer SHALL be implemented as three SCSS partials imported by `styles.scss`:
- `src/styles/themes/_tokens.scss` — semantic alias definitions (variable names only,
  no values)
- `src/styles/themes/_light.scss` — light palette: emits `mat.theme()` and sets token
  values under `:root.light-theme`
- `src/styles/themes/_dark.scss` — dark palette: emits `mat.theme()` and sets token
  values under `:root.dark-theme`

#### Scenario: Partial import order in styles.scss
- **WHEN** `styles.scss` is compiled
- **THEN** `_tokens.scss` SHALL be imported before `_light.scss` and `_dark.scss`

#### Scenario: No token values in _tokens.scss
- **WHEN** `_tokens.scss` is inspected
- **THEN** it SHALL contain only CSS custom property declarations with no hard-coded
  colour values (values are set in `_light.scss` and `_dark.scss`)

---

### Requirement: Semantic token naming
All site-specific CSS custom properties SHALL use the `--cc-` prefix (CodeCraft) to
avoid collision with Material's `--mat-sys-*` namespace.

#### Scenario: Token name format
- **WHEN** a bespoke component references a site token
- **THEN** the property name SHALL match the pattern `--cc-<role>` (e.g. `--cc-surface`,
  `--cc-on-surface`, `--cc-primary`, `--cc-on-primary`)

---

### Requirement: Minimum required token set
The following semantic tokens SHALL be defined in both light and dark palettes:

| Token | Role |
|---|---|
| `--cc-primary` | Primary brand colour |
| `--cc-on-primary` | Text/icons on primary |
| `--cc-surface` | Page / card background |
| `--cc-on-surface` | Primary text on surface |
| `--cc-surface-variant` | Subtle background (inputs, chips) |
| `--cc-outline` | Borders and dividers |
| `--cc-error` | Error states |

#### Scenario: All required tokens present in light palette
- **WHEN** `:root.light-theme` styles are inspected
- **THEN** all seven tokens in the table above SHALL be defined with non-empty values

#### Scenario: All required tokens present in dark palette
- **WHEN** `:root.dark-theme` styles are inspected
- **THEN** all seven tokens in the table above SHALL be defined with non-empty values

---

### Requirement: Angular Material M3 integration
Each palette partial SHALL invoke `mat.theme()` so that Angular Material components
receive correctly scoped M3 system tokens for the active theme.

#### Scenario: Material button colour in light theme
- **WHEN** `:root.light-theme` is active
- **THEN** `mat-filled-button` background SHALL use the light primary colour token

#### Scenario: Material button colour in dark theme
- **WHEN** `:root.dark-theme` is active
- **THEN** `mat-filled-button` background SHALL use the dark primary colour token

---

### Requirement: Default theme class on html element
`styles.scss` SHALL add `light-theme` to `<html>` as the CSS default so the page is
styled before JavaScript executes (prevents FOUC for light-preference users).

#### Scenario: Light theme rendered without JavaScript
- **WHEN** JavaScript is disabled or has not yet executed
- **THEN** the page SHALL render with light-theme styles applied
