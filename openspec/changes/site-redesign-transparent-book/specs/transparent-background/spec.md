## ADDED Requirements

### Requirement: Background component renders animated gradient mesh
The system SHALL provide a `BackgroundComponent` in `shared/` that renders a full-viewport animated gradient background behind all page content. The component SHALL use CSS radial gradients with `@keyframes` animations — no JavaScript animation loops or third-party libraries.

#### Scenario: Background visible on page load
- **WHEN** any page loads
- **THEN** the background SHALL be visible as a full-viewport layer behind all content, with at least 3 animated gradient blobs in motion

#### Scenario: Background uses position fixed
- **WHEN** the user scrolls the page
- **THEN** the background SHALL remain fixed in place (`position: fixed; inset: 0`) while content scrolls over it

### Requirement: Background respects theme
The `BackgroundComponent` gradient colours SHALL be driven by `--cc-backdrop-*` theme tokens so that light and dark themes produce visually distinct palettes.

#### Scenario: Light theme background palette
- **WHEN** the active theme is `light-theme`
- **THEN** the background gradients SHALL use `--cc-backdrop-start`, `--cc-backdrop-mid`, `--cc-backdrop-end`, and `--cc-backdrop-accent` values from the light palette

#### Scenario: Dark theme background palette
- **WHEN** the active theme is `dark-theme`
- **THEN** the background gradients SHALL use `--cc-backdrop-*` values from the dark palette, producing a darker atmospheric effect

### Requirement: Background animations are GPU-composited
All background animations SHALL use only compositable CSS properties (`transform`, `opacity`) to ensure GPU acceleration and avoid layout/paint thrashing.

#### Scenario: Animation properties
- **WHEN** the background gradient elements are animated
- **THEN** the animations SHALL use `transform: translate3d()` and/or `scale()` — never `top`, `left`, `width`, or `height`

#### Scenario: Will-change hints
- **WHEN** the background component renders
- **THEN** each animated gradient element SHALL have `will-change: transform` applied

### Requirement: Background respects reduced motion preference
The background SHALL honour the user's `prefers-reduced-motion` system setting.

#### Scenario: Reduced motion enabled
- **WHEN** the user has `prefers-reduced-motion: reduce` set in their OS
- **THEN** all background gradient animations SHALL be paused or removed, displaying a static gradient instead

#### Scenario: Reduced motion not set
- **WHEN** the user has no reduced motion preference
- **THEN** background animations SHALL play normally with slow drift cycles (20-40 seconds per cycle)

### Requirement: Background z-index layering
The background SHALL sit at the lowest z-index layer so all other UI elements render above it.

#### Scenario: Z-index stacking
- **WHEN** the background component is rendered alongside navigation and content
- **THEN** the background SHALL have `z-index: 0` and all other content SHALL render above it
