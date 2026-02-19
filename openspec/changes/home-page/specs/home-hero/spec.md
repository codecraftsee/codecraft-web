## ADDED Requirements

### Requirement: Full-viewport hero section
The hero SHALL occupy at least the full viewport height and contain a bold headline,
a subheadline, and a primary CTA button.

#### Scenario: Hero fills viewport
- **WHEN** the home page is loaded
- **THEN** the hero section SHALL have a minimum height of `100dvh`

#### Scenario: Hero contains required elements
- **WHEN** the hero is rendered
- **THEN** it SHALL contain an `<h1>` headline, a subheadline paragraph, and a CTA
  button linking to `/contact`

---

### Requirement: Primary CTA button
The hero SHALL contain a single prominent CTA button that navigates to `/contact`.

#### Scenario: CTA navigates to contact
- **WHEN** the user clicks the hero CTA button
- **THEN** the router SHALL navigate to `/contact`

#### Scenario: CTA is keyboard accessible
- **WHEN** the CTA button has focus and the user presses Enter
- **THEN** the router SHALL navigate to `/contact`

---

### Requirement: Responsive hero layout
The hero layout SHALL adapt between a centred single-column layout on mobile and a
split or centred layout on desktop.

#### Scenario: Single column on mobile
- **WHEN** viewport width is less than 768px
- **THEN** all hero content SHALL be stacked vertically and centred
