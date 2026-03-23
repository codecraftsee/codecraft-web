## ADDED Requirements

### Requirement: Services page renders at /services route
The application SHALL register a `/services` route that lazy-loads `ServicesComponent`. The route MUST use `loadComponent()` for code splitting.

#### Scenario: Navigation to /services
- **WHEN** a user navigates to `/services`
- **THEN** the services page renders with a chapter header and timeline of service offerings

### Requirement: Page layout follows book-page pattern
The services page SHALL use the established page wrapper structure (`.page`, `.page__edges`, `.page__content`) with `ChapterHeaderComponent` at the top.

#### Scenario: Page structure renders
- **WHEN** the services page loads
- **THEN** the page displays inside the book-page wrapper with a chapter header containing a back link to home

### Requirement: Services displayed as vertical timeline with numbered cards
The component SHALL render a vertical timeline with a connecting line and one card per service offering. Each card MUST display a formatted number (e.g., "01"), a title, a description, and a list of tags.

#### Scenario: All service cards render
- **WHEN** the services page loads
- **THEN** the timeline displays cards for all services in order (Marketplaces, Web Applications, Websites)

#### Scenario: Card content is complete
- **WHEN** a service card renders
- **THEN** it displays the service number, title, description text, and at least one tag

### Requirement: Timeline has visual connecting line and dot indicators
The timeline SHALL display a vertical line connecting all cards. Each card MUST have a dot indicator positioned on the timeline line.

#### Scenario: Timeline line is visible
- **WHEN** the services page loads
- **THEN** a vertical line runs the height of the timeline section connecting the service cards

### Requirement: Cards animate in with staggered delay
Each timeline card SHALL fade in with an upward slide animation. Cards MUST have staggered animation delays based on their position in the list.

#### Scenario: Cards appear sequentially
- **WHEN** the services page loads
- **THEN** each card animates in after the previous one with a staggered delay

#### Scenario: Reduced motion is respected
- **WHEN** the user has `prefers-reduced-motion: reduce` enabled
- **THEN** all cards appear immediately without animation

### Requirement: Service data is extensible
The service data MUST be defined as an array of typed objects. Adding a new service SHALL require only adding a new entry to the array — no template or style changes.

#### Scenario: Adding a new service
- **WHEN** a developer adds a new `ServiceOffering` object to the `services` array
- **THEN** the timeline renders an additional card with no other code changes required

### Requirement: Dark theme support
The component SHALL adapt to dark theme using CSS custom properties (`--cc-*` tokens). The timeline line, card backgrounds, text colors, and tag styles MUST respond to theme changes.

#### Scenario: Dark theme rendering
- **WHEN** the dark theme is active (`.dark-theme` class on ancestor)
- **THEN** the timeline, cards, and text use dark-theme-appropriate colors via CSS custom properties

### Requirement: Responsive layout
The component SHALL be responsive. On mobile viewports (<768px), the timeline decorative elements (line and dots) MUST be hidden, and cards SHALL stack as full-width elements.

#### Scenario: Mobile layout
- **WHEN** the viewport width is below 768px
- **THEN** the timeline line and dots are hidden, cards fill the available width

### Requirement: Accessibility compliance
The page MUST use semantic HTML. The timeline section SHALL have an `aria-label`. Service cards SHALL use appropriate heading hierarchy. All text MUST meet WCAG AA color contrast requirements.

#### Scenario: Screen reader navigation
- **WHEN** a screen reader user navigates the services page
- **THEN** the timeline section is announced with its label and each service is navigable as a distinct item
