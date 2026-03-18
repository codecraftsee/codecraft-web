## ADDED Requirements

### Requirement: Font loading
The application SHALL load Inter (variable, weights 400–700) and Instrument Serif (regular 400) via Google Fonts `<link>` tags in `index.html`, with `display=swap` to prevent invisible text during load.

#### Scenario: Google Fonts link tags present
- **WHEN** `index.html` is inspected
- **THEN** it SHALL contain `<link>` tags loading Inter (weights 400–700) and Instrument Serif (weight 400) from Google Fonts with `display=swap`

#### Scenario: Font-display swap
- **WHEN** fonts are loading
- **THEN** the browser SHALL display text using system fallback fonts and swap to the custom fonts once loaded

---

### Requirement: Font family tokens
The application SHALL define two font-family CSS custom properties on `:root`:
- `--cc-font-sans: 'Inter', system-ui, sans-serif`
- `--cc-font-serif: 'Instrument Serif', Georgia, serif`

#### Scenario: Font tokens defined
- **WHEN** the computed styles of `:root` are inspected
- **THEN** `--cc-font-sans` and `--cc-font-serif` SHALL be defined with the specified font stacks

#### Scenario: Base body font
- **WHEN** the `body` element is rendered
- **THEN** its `font-family` SHALL be set to `var(--cc-font-sans)`

---

### Requirement: Brand colour palette — light theme
The light theme SHALL use the following colour values for semantic tokens:

| Token | Value |
|---|---|
| `--cc-primary` | `#6C3CE1` |
| `--cc-on-primary` | `#FFFFFF` |
| `--cc-surface` | `#FFFFFF` |
| `--cc-on-surface` | `#1A1A2E` |
| `--cc-surface-variant` | `#F5F5FA` |
| `--cc-outline` | `#E0E0EA` |
| `--cc-accent` | `#6C3CE1` |
| `--cc-on-accent` | `#FFFFFF` |
| `--cc-surface-dim` | `#FAFAFE` |

#### Scenario: Light theme brand colours applied
- **WHEN** `:root.light-theme` is active
- **THEN** all tokens in the table above SHALL be set to their specified values

---

### Requirement: Brand colour palette — dark theme
The dark theme SHALL use the following colour values for semantic tokens:

| Token | Value |
|---|---|
| `--cc-primary` | `#B49AFF` |
| `--cc-on-primary` | `#1A0A3E` |
| `--cc-surface` | `#121218` |
| `--cc-on-surface` | `#E8E8F0` |
| `--cc-surface-variant` | `#1E1E2A` |
| `--cc-outline` | `#2A2A3A` |
| `--cc-accent` | `#B49AFF` |
| `--cc-on-accent` | `#1A0A3E` |
| `--cc-surface-dim` | `#0E0E14` |

#### Scenario: Dark theme brand colours applied
- **WHEN** `:root.dark-theme` is active
- **THEN** all tokens in the table above SHALL be set to their specified values

---

### Requirement: Custom M3 palette integration
The `mat.theme()` call in both `_light.scss` and `_dark.scss` SHALL use a custom palette based on the brand indigo colour instead of the pre-built `mat.$azure-palette` / `mat.$violet-palette`.

#### Scenario: Material button uses brand colour in light theme
- **WHEN** `:root.light-theme` is active
- **THEN** `mat-flat-button` background colour SHALL visually match the brand primary (`#6C3CE1`)

#### Scenario: Material button uses brand colour in dark theme
- **WHEN** `:root.dark-theme` is active
- **THEN** `mat-flat-button` background colour SHALL visually match the dark primary (`#B49AFF`)

---

### Requirement: Button styling
All primary action buttons on the home page SHALL have `border-radius: 0.75rem` (12px), minimum height of 48px, and horizontal padding of at least `1.5rem`.

#### Scenario: Primary button appearance
- **WHEN** a primary CTA button is rendered
- **THEN** it SHALL have rounded corners (12px radius), accent background colour, and on-accent text colour

#### Scenario: Secondary/outlined button appearance
- **WHEN** a secondary CTA button is rendered
- **THEN** it SHALL have rounded corners (12px radius), transparent background, accent-coloured border, and accent-coloured text

---

### Requirement: Colour contrast accessibility
All text/background token combinations SHALL meet WCAG AA minimum contrast ratios: 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold).

#### Scenario: Light theme contrast — primary text on surface
- **WHEN** `--cc-on-surface` text is rendered on `--cc-surface` background in light theme
- **THEN** the contrast ratio SHALL be at least 4.5:1

#### Scenario: Dark theme contrast — primary text on surface
- **WHEN** `--cc-on-surface` text is rendered on `--cc-surface` background in dark theme
- **THEN** the contrast ratio SHALL be at least 4.5:1

#### Scenario: Accent button contrast
- **WHEN** `--cc-on-accent` text is rendered on `--cc-accent` background
- **THEN** the contrast ratio SHALL be at least 4.5:1 in both themes
