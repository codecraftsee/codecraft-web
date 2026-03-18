## MODIFIED Requirements

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
| `--cc-accent` | Accent/CTA colour |
| `--cc-on-accent` | Text/icons on accent surfaces |
| `--cc-surface-dim` | Alternating section background |

#### Scenario: All required tokens present in light palette
- **WHEN** `:root.light-theme` styles are inspected
- **THEN** all ten tokens in the table above SHALL be defined with non-empty values

#### Scenario: All required tokens present in dark palette
- **WHEN** `:root.dark-theme` styles are inspected
- **THEN** all ten tokens in the table above SHALL be defined with non-empty values

---

### Requirement: Semantic token naming
All site-specific CSS custom properties SHALL use the `--cc-` prefix (CodeCraft) to
avoid collision with Material's `--mat-sys-*` namespace.

#### Scenario: Token name format
- **WHEN** a bespoke component references a site token
- **THEN** the property name SHALL match the pattern `--cc-<role>` (e.g. `--cc-surface`,
  `--cc-on-surface`, `--cc-primary`, `--cc-on-primary`, `--cc-accent`)

---

## ADDED Requirements

### Requirement: Font family tokens in token contract
The token contract in `_tokens.scss` SHALL document the font family tokens `--cc-font-sans` and `--cc-font-serif` alongside the colour tokens.

#### Scenario: Font tokens documented in contract
- **WHEN** `_tokens.scss` is inspected
- **THEN** it SHALL list `--cc-font-sans` and `--cc-font-serif` in its token contract comments

---

### Requirement: Font family token definitions
Both `_light.scss` and `_dark.scss` SHALL define the font family tokens with identical values (fonts do not change between themes):
- `--cc-font-sans: 'Inter', system-ui, sans-serif`
- `--cc-font-serif: 'Instrument Serif', Georgia, serif`

#### Scenario: Font tokens in light theme
- **WHEN** `:root.light-theme` styles are inspected
- **THEN** `--cc-font-sans` and `--cc-font-serif` SHALL be defined with the specified font stacks

#### Scenario: Font tokens in dark theme
- **WHEN** `:root.dark-theme` styles are inspected
- **THEN** `--cc-font-sans` and `--cc-font-serif` SHALL be defined with the same font stacks as light theme
