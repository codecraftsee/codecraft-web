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
| `--cc-glass-bg` | Semi-transparent glass panel background |
| `--cc-glass-border` | Glass panel border colour with alpha |
| `--cc-glass-blur` | Backdrop blur radius for glass panels |
| `--cc-glass-shadow` | Box shadow for glass panels |
| `--cc-backdrop-start` | Background gradient start colour |
| `--cc-backdrop-mid` | Background gradient middle colour |
| `--cc-backdrop-end` | Background gradient end colour |
| `--cc-backdrop-accent` | Background gradient accent colour |

#### Scenario: All required tokens present in light palette
- **WHEN** `:root.light-theme` styles are inspected
- **THEN** all fifteen tokens in the table above SHALL be defined with non-empty values

#### Scenario: All required tokens present in dark palette
- **WHEN** `:root.dark-theme` styles are inspected
- **THEN** all fifteen tokens in the table above SHALL be defined with non-empty values

#### Scenario: Glass background tokens use rgba values
- **WHEN** `--cc-glass-bg` is inspected in either theme
- **THEN** its value SHALL be an `rgba()` colour with alpha between 0.6 and 0.8

#### Scenario: Backdrop tokens produce distinct light and dark palettes
- **WHEN** `--cc-backdrop-start` is compared between light and dark themes
- **THEN** the values SHALL be visually distinct — light theme uses soft pastels, dark theme uses deep tones

## ADDED Requirements

### Requirement: Token documentation for glass and backdrop tokens
The `_tokens.scss` file SHALL document the new glass and backdrop token names as comments alongside the existing token documentation.

#### Scenario: Glass tokens documented
- **WHEN** `_tokens.scss` is inspected
- **THEN** it SHALL contain comments listing `--cc-glass-bg`, `--cc-glass-border`, `--cc-glass-blur`, `--cc-glass-shadow` and their roles

#### Scenario: Backdrop tokens documented
- **WHEN** `_tokens.scss` is inspected
- **THEN** it SHALL contain comments listing `--cc-backdrop-start`, `--cc-backdrop-mid`, `--cc-backdrop-end`, `--cc-backdrop-accent` and their roles
