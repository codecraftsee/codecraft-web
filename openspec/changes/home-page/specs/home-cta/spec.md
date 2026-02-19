## ADDED Requirements

### Requirement: Bottom CTA section
The page SHALL end with a full-width CTA section containing a headline and a
"Get in touch" button that navigates to `/contact`.

#### Scenario: CTA section rendered at page bottom
- **WHEN** the home page is rendered
- **THEN** the CTA section SHALL be the last section before the footer or page end

#### Scenario: CTA button navigates to contact
- **WHEN** the user clicks "Get in touch"
- **THEN** the router SHALL navigate to `/contact`

---

### Requirement: Visually distinct background
The CTA section SHALL use a background colour that contrasts with the sections above
it to create a clear visual break and draw attention.

#### Scenario: CTA background differs from body
- **WHEN** the CTA section is rendered
- **THEN** its background colour SHALL differ from `--cc-surface` (e.g. uses
  `--cc-primary` or `--cc-surface-variant`)
