## ADDED Requirements

### Requirement: Public routes are prerendered to static HTML
The build SHALL prerender `/`, `/services`, `/team` and `/contact` to static HTML files containing the page's visible content, so clients that don't run JavaScript can read it.

#### Scenario: Services content without JavaScript
- **WHEN** a client fetches `/services/` without executing scripts
- **THEN** the HTML contains the service catalogue heading and every service title

#### Scenario: Team content without JavaScript
- **WHEN** a client fetches `/team/` without executing scripts
- **THEN** the HTML contains every team member's name and role

#### Scenario: Home content without JavaScript
- **WHEN** a client fetches `/` without executing scripts
- **THEN** the HTML contains the hero copy and the selected-work client names

### Requirement: Unknown URLs fall back to the client-rendered app
Routes not listed for prerendering SHALL be client-rendered, and the deployment SHALL serve the client-rendered shell as `404.html`.

#### Scenario: Unknown path
- **WHEN** a visitor opens a URL that is not prerendered
- **THEN** GitHub Pages serves `404.html` and the Angular app boots in the browser

### Requirement: Prerendered pages hydrate without mismatches
Prerendered pages SHALL hydrate in the browser with no hydration mismatch warnings, regardless of the visitor's stored theme.

#### Scenario: Stored sable theme
- **WHEN** a visitor with `cc-theme = sable` in localStorage opens any page
- **THEN** the page hydrates without warnings and the header, page colours and themed avatars reflect the sable theme after load

### Requirement: Browser-only code does not run during prerendering
Code that uses `localStorage`, `document` or timers SHALL run only in the browser, so prerendering completes and output is deterministic.

#### Scenario: Header clock
- **WHEN** the header is prerendered
- **THEN** the UTC clock renders `--:--:--` and starts ticking only after the page loads in the browser

#### Scenario: Tech radar
- **WHEN** the home page is prerendered
- **THEN** no auto-cycle timer is started

### Requirement: Deploy fails if prerendered content is missing
The deploy workflow SHALL verify each prerendered page contains its key content and SEO tags and SHALL fail otherwise.

#### Scenario: Regression
- **WHEN** a change causes `/team/` to be generated without team member names
- **THEN** `scripts/verify-prerender.mjs` exits non-zero and the deploy does not publish
