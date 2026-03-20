## ADDED Requirements

### Requirement: Glass panel SCSS mixin
The system SHALL provide a reusable SCSS mixin `@mixin glass-panel` that applies glassmorphism styling using `--cc-glass-*` theme tokens. The mixin SHALL apply: `backdrop-filter: blur()`, semi-transparent background, subtle border with alpha, and a soft box-shadow.

#### Scenario: Mixin applies backdrop blur
- **WHEN** `@include glass-panel` is applied to an element
- **THEN** the element SHALL have `backdrop-filter: blur(var(--cc-glass-blur))` applied

#### Scenario: Mixin applies translucent background
- **WHEN** `@include glass-panel` is applied to an element
- **THEN** the element SHALL have `background: var(--cc-glass-bg)` producing a semi-transparent surface

#### Scenario: Mixin applies glass border
- **WHEN** `@include glass-panel` is applied to an element
- **THEN** the element SHALL have a `border` using `var(--cc-glass-border)` colour

#### Scenario: Mixin applies shadow
- **WHEN** `@include glass-panel` is applied to an element
- **THEN** the element SHALL have `box-shadow: var(--cc-glass-shadow)` applied

### Requirement: Glass panel Angular component
The system SHALL provide a `GlassPanelComponent` in `shared/` that wraps projected content (`<ng-content>`) in a glassmorphism-styled container using the glass-panel mixin.

#### Scenario: Content projection
- **WHEN** content is placed inside `<cc-glass-panel>Content</cc-glass-panel>`
- **THEN** the content SHALL be rendered inside a glass-styled container

#### Scenario: Default elevation
- **WHEN** `<cc-glass-panel>` renders without an elevation input
- **THEN** it SHALL use medium elevation (standard blur and shadow)

### Requirement: Glass panel elevation levels
The `GlassPanelComponent` SHALL accept an `elevation` input with three levels controlling blur intensity and shadow depth.

#### Scenario: Low elevation
- **WHEN** `elevation` is set to `"low"`
- **THEN** the panel SHALL use reduced blur (8px) and a lighter shadow

#### Scenario: Medium elevation (default)
- **WHEN** `elevation` is set to `"medium"` or not specified
- **THEN** the panel SHALL use standard blur from `--cc-glass-blur` and standard shadow from `--cc-glass-shadow`

#### Scenario: High elevation
- **WHEN** `elevation` is set to `"high"`
- **THEN** the panel SHALL use increased blur (24px) and a more pronounced shadow

### Requirement: Glass surfaces maintain accessible contrast
All glass surface components and mixins SHALL ensure that text rendered on glass panels maintains WCAG AA contrast ratios (4.5:1 for normal text, 3:1 for large text) regardless of the background behind the panel.

#### Scenario: Minimum background opacity
- **WHEN** a glass panel renders over the animated background
- **THEN** the panel background alpha SHALL be at least 0.6 to ensure sufficient contrast for text content

#### Scenario: AXE audit pass
- **WHEN** glass panels are tested with AXE accessibility tooling
- **THEN** no contrast violations SHALL be reported for text within glass panels

### Requirement: Glass panel border radius
The `GlassPanelComponent` SHALL apply a consistent border-radius for a soft, modern appearance.

#### Scenario: Default border radius
- **WHEN** a glass panel renders
- **THEN** it SHALL have `border-radius: 16px` applied

### Requirement: Backdrop-filter fallback
Glass panels SHALL degrade gracefully on browsers that do not support `backdrop-filter`.

#### Scenario: No backdrop-filter support
- **WHEN** the browser does not support `backdrop-filter`
- **THEN** the glass panel SHALL fall back to a more opaque background colour (alpha ≥ 0.85) without blur, remaining usable and readable
