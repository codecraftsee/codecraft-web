## ADDED Requirements

### Requirement: Sticky navigation header
The header SHALL be a `<header>` element that sticks to the top of the viewport on
scroll and contains the site wordmark, navigation links, and theme toggle.

#### Scenario: Header visible on scroll
- **WHEN** the user scrolls down the page
- **THEN** the header SHALL remain fixed at the top of the viewport

#### Scenario: Header contains required elements
- **WHEN** the header is rendered
- **THEN** it SHALL contain a wordmark, nav links (Home, About, Services, Contact),
  and the `ThemeToggleComponent`

---

### Requirement: Navigation links
The header SHALL contain navigation links to all four primary routes. The active route
link SHALL be visually distinguished from inactive links.

#### Scenario: Links navigate to correct routes
- **WHEN** the user clicks "About"
- **THEN** the router SHALL navigate to `/about` without a full page reload

#### Scenario: Active link is highlighted
- **WHEN** the current route is `/`
- **THEN** the "Home" link SHALL have the active visual style applied

---

### Requirement: Responsive layout
On viewports narrower than 768px the navigation links SHALL collapse and the header
SHALL remain usable with at minimum the wordmark and theme toggle visible.

#### Scenario: Nav links hidden on mobile
- **WHEN** viewport width is less than 768px
- **THEN** the navigation links SHALL not be visible in the default (uncollapsed) state

#### Scenario: Wordmark and toggle always visible
- **WHEN** rendered at any viewport width
- **THEN** the wordmark and theme toggle SHALL be visible
