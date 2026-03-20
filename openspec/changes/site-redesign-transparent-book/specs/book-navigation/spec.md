## ADDED Requirements

### Requirement: Book-style table of contents navigation component
The system SHALL provide a `BookNavigationComponent` in `shared/` that replaces the existing `HeaderComponent`. The navigation SHALL be styled as a book's table of contents, with each route presented as a numbered chapter using Roman numerals.

#### Scenario: Chapter entries match routes
- **WHEN** the navigation component renders
- **THEN** it SHALL display the following chapter entries in order:
  - I. Home (`/`)
  - II. About (`/about`)
  - III. Services (`/services`)
  - IV. Contact (`/contact`)

#### Scenario: Active chapter highlighting
- **WHEN** the user is on a specific route
- **THEN** the corresponding chapter entry SHALL be visually highlighted as the active chapter

### Requirement: Navigation contains wordmark and theme toggle
The `BookNavigationComponent` SHALL display the "CodeCraft" wordmark styled as a book title at the top, and the existing `ThemeToggleComponent` at the bottom of the sidebar.

#### Scenario: Wordmark display
- **WHEN** the navigation renders on desktop
- **THEN** "CodeCraft" SHALL appear at the top of the sidebar using a serif font (`--cc-font-serif`), styled as a book title

#### Scenario: Theme toggle placement
- **WHEN** the navigation renders
- **THEN** the `ThemeToggleComponent` SHALL appear at the bottom of the sidebar navigation

### Requirement: Navigation typography follows book conventions
The navigation SHALL use serif typography for chapter numbers and decorative elements, and sans-serif for chapter titles, mimicking book typesetting.

#### Scenario: Chapter number font
- **WHEN** a chapter entry renders
- **THEN** the Roman numeral SHALL use the serif font stack (`--cc-font-serif`)

#### Scenario: Chapter title font
- **WHEN** a chapter entry renders
- **THEN** the chapter title text SHALL use the sans-serif font stack (`--cc-font-sans`)

### Requirement: Responsive desktop sidebar
On desktop viewports (≥1024px), the navigation SHALL render as a persistent left sidebar approximately 280px wide, with the main content area beside it.

#### Scenario: Desktop persistent sidebar
- **WHEN** the viewport width is ≥1024px
- **THEN** the sidebar SHALL be persistently visible and the content area SHALL be offset to accommodate it

#### Scenario: Sidebar width
- **WHEN** the sidebar renders on desktop
- **THEN** it SHALL occupy approximately 280px of horizontal space

### Requirement: Responsive tablet behaviour
On tablet viewports (768px–1023px), the navigation SHALL be collapsible with a toggle button.

#### Scenario: Tablet collapsed state
- **WHEN** the viewport width is between 768px and 1023px
- **THEN** the sidebar SHALL be collapsed by default with a toggle button visible in the top-left corner

#### Scenario: Tablet expanded state
- **WHEN** the user activates the toggle button on a tablet viewport
- **THEN** the sidebar SHALL expand to show the full chapter listing

### Requirement: Responsive mobile drawer
On mobile viewports (<768px), the navigation SHALL be a slide-out drawer from the left edge, triggered by a menu button.

#### Scenario: Mobile hidden state
- **WHEN** the viewport width is <768px
- **THEN** the sidebar SHALL be hidden and a hamburger/menu button SHALL be visible

#### Scenario: Mobile drawer open
- **WHEN** the user taps the menu button on mobile
- **THEN** the sidebar SHALL slide in from the left edge as an overlay drawer

#### Scenario: Mobile drawer close on navigation
- **WHEN** the user taps a chapter link in the mobile drawer
- **THEN** the drawer SHALL close and the app SHALL navigate to the selected route

### Requirement: Navigation accessibility
The navigation SHALL meet WCAG AA accessibility standards.

#### Scenario: Landmark role
- **WHEN** the navigation component renders
- **THEN** it SHALL use a `<nav>` element with `aria-label="Main navigation"`

#### Scenario: Keyboard navigation
- **WHEN** a user navigates using keyboard Tab/Enter
- **THEN** all chapter links and the toggle button SHALL be focusable and activatable via keyboard

#### Scenario: Mobile drawer focus trap
- **WHEN** the mobile drawer is open
- **THEN** focus SHALL be trapped within the drawer until it is closed
