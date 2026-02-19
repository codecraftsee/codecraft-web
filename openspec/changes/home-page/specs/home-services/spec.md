## ADDED Requirements

### Requirement: Two-card services overview
The services section SHALL display exactly two cards — one for Software Development
and one for Technical Consulting — each with an icon, title, description, and a link
to `/services`.

#### Scenario: Two cards rendered
- **WHEN** the services section is rendered
- **THEN** exactly two service cards SHALL be visible

#### Scenario: Each card links to services page
- **WHEN** the user clicks either service card
- **THEN** the router SHALL navigate to `/services`

---

### Requirement: Responsive card grid
On desktop the two cards SHALL sit side by side. On mobile they SHALL stack vertically.

#### Scenario: Side-by-side on desktop
- **WHEN** viewport width is 768px or wider
- **THEN** the two service cards SHALL be displayed in a two-column grid

#### Scenario: Stacked on mobile
- **WHEN** viewport width is less than 768px
- **THEN** the two service cards SHALL stack into a single column
