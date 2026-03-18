## ADDED Requirements

### Requirement: Section container layout
Every home page section SHALL use an inner container with `max-width: 1120px`, centered horizontally with `margin: 0 auto`, and horizontal padding of `2rem` on mobile expanding to `4rem` on desktop (min-width: 1024px).

#### Scenario: Desktop container width
- **WHEN** the viewport is 1440px wide
- **THEN** each section's inner content area SHALL be no wider than 1120px and centred

#### Scenario: Mobile horizontal padding
- **WHEN** the viewport is below 768px
- **THEN** each section SHALL have at least `2rem` horizontal padding

---

### Requirement: Hero section layout
The hero section SHALL be vertically centred within the viewport (`min-height: 100dvh`), with content centred horizontally. It SHALL contain: a main headline, a subtitle paragraph, and two CTA buttons (primary and secondary) arranged side by side.

#### Scenario: Hero vertical centering
- **WHEN** the hero section is rendered on a desktop viewport
- **THEN** the content SHALL be vertically and horizontally centred within the viewport height

#### Scenario: Hero content elements
- **WHEN** the hero section is rendered
- **THEN** it SHALL display an `<h1>` headline, a `<p>` subtitle, and two `<a>` CTA links

---

### Requirement: Hero headline typography
The hero headline SHALL use `var(--cc-font-serif)` font family with a large display size. One keyword in the headline SHALL be visually emphasised with an underline decoration in the accent colour.

#### Scenario: Serif font on headline
- **WHEN** the hero headline is rendered
- **THEN** its `font-family` SHALL resolve to Instrument Serif

#### Scenario: Keyword underline accent
- **WHEN** the hero headline is rendered
- **THEN** one keyword SHALL be wrapped in a `<span>` with a visible underline/border-bottom using `var(--cc-accent)` colour

---

### Requirement: Hero dual CTA buttons
The hero section SHALL display two call-to-action buttons: a primary filled button ("Let's talk") linking to `/contact`, and a secondary outlined button ("Our services") linking to `/services`.

#### Scenario: Primary CTA button
- **WHEN** the hero is rendered
- **THEN** a filled button with text "Let's talk" SHALL link to `/contact`

#### Scenario: Secondary CTA button
- **WHEN** the hero is rendered
- **THEN** an outlined button with text "Our services" SHALL link to `/services`

#### Scenario: Mobile CTA layout
- **WHEN** the viewport is below 768px
- **THEN** the two CTA buttons SHALL stack vertically with the primary button on top

---

### Requirement: Services section with 4-card grid
The services section SHALL display a heading ("What we do") and four service cards in a responsive grid. Each card SHALL contain an SVG icon, a title, a description, and link to `/services`.

#### Scenario: Desktop grid layout
- **WHEN** the viewport is 1024px or wider
- **THEN** the four service cards SHALL be arranged in a 2x2 grid

#### Scenario: Tablet grid layout
- **WHEN** the viewport is between 768px and 1023px
- **THEN** the service cards SHALL be arranged in a 2-column grid

#### Scenario: Mobile grid layout
- **WHEN** the viewport is below 768px
- **THEN** the service cards SHALL stack in a single column

#### Scenario: Service card content
- **WHEN** a service card is rendered
- **THEN** it SHALL contain an inline SVG icon (not emoji), an `<h3>` title, and a `<p>` description

---

### Requirement: Service card offerings
The four service cards SHALL represent these offerings:
1. **Software Development** — end-to-end product development
2. **Technical Consulting** — architecture reviews and tech strategy
3. **AI & Automation** — intelligent solutions and workflow automation
4. **Cloud & DevOps** — infrastructure, CI/CD, and cloud architecture

#### Scenario: All four cards rendered
- **WHEN** the services section is rendered
- **THEN** exactly four service cards SHALL be displayed with the titles listed above

---

### Requirement: Service card interaction
Each service card SHALL be an anchor element (`<a>`) linking to `/services`. On hover, the card's border colour SHALL transition to the accent colour.

#### Scenario: Card hover effect
- **WHEN** a user hovers over a service card
- **THEN** the card's border colour SHALL change to `var(--cc-accent)` with a smooth transition

#### Scenario: Card is a link
- **WHEN** a service card is clicked
- **THEN** the user SHALL be navigated to `/services`

---

### Requirement: Approach section with numbered steps
The approach section SHALL display a heading ("Our Approach") and four numbered process steps. Each step SHALL show a large step number (01–04), a title, and a description.

#### Scenario: Step numbers displayed
- **WHEN** the approach section is rendered
- **THEN** four steps SHALL be displayed with visible numbers "01", "02", "03", "04"

#### Scenario: Step content structure
- **WHEN** a process step is rendered
- **THEN** it SHALL contain a number element, an `<h3>` title, and a `<p>` description

---

### Requirement: Approach section step content
The four process steps SHALL be:
1. **01 — Discovery** — understanding business goals, constraints, and users
2. **02 — Strategy** — defining architecture, tech stack, and delivery roadmap
3. **03 — Build** — iterative development with tight feedback loops
4. **04 — Launch & Scale** — deployment, monitoring, and continuous improvement

#### Scenario: All four steps rendered
- **WHEN** the approach section is rendered
- **THEN** the four steps SHALL appear in order with the titles and descriptions above

---

### Requirement: Approach section step number styling
The step numbers SHALL be rendered in `var(--cc-font-serif)` at a large decorative size (at least 3rem) in the accent colour, creating a visual anchor for each step.

#### Scenario: Step number visual treatment
- **WHEN** a step number is rendered
- **THEN** it SHALL use the serif font, be at least 3rem in size, and use `var(--cc-accent)` colour

---

### Requirement: Approach section layout
On desktop (1024px+), each step SHALL display the number on the left and the title/description on the right in a horizontal arrangement. On mobile (below 768px), steps SHALL stack vertically.

#### Scenario: Desktop step layout
- **WHEN** the viewport is 1024px or wider
- **THEN** each step SHALL display the number and text side by side

#### Scenario: Mobile step layout
- **WHEN** the viewport is below 768px
- **THEN** each step SHALL stack the number above the text

---

### Requirement: CTA section design
The CTA section SHALL display a bold headline and a single primary CTA button linking to `/contact`. The section SHALL use `var(--cc-primary)` as its background colour with `var(--cc-on-primary)` for text.

#### Scenario: CTA section rendering
- **WHEN** the CTA section is rendered
- **THEN** it SHALL display an `<h2>` heading and a filled CTA button on a primary-coloured background

#### Scenario: CTA button navigation
- **WHEN** the CTA button is clicked
- **THEN** the user SHALL be navigated to `/contact`

---

### Requirement: Alternating section backgrounds
Home page sections SHALL alternate between `var(--cc-surface)` and `var(--cc-surface-dim)` backgrounds to create visual rhythm: hero (surface), services (surface-dim), approach (surface), CTA (primary).

#### Scenario: Section background alternation
- **WHEN** the home page is rendered
- **THEN** the hero section SHALL use `--cc-surface`, services SHALL use `--cc-surface-dim`, approach SHALL use `--cc-surface`, and CTA SHALL use `--cc-primary`

---

### Requirement: Section vertical spacing
Each content section (services, approach) SHALL have vertical padding of `6rem` on desktop and `4rem` on mobile (below 768px). The CTA section SHALL have `6rem` vertical padding on all viewports.

#### Scenario: Desktop section padding
- **WHEN** the viewport is 1024px or wider
- **THEN** content sections SHALL have `6rem` top and bottom padding

#### Scenario: Mobile section padding
- **WHEN** the viewport is below 768px
- **THEN** content sections SHALL have `4rem` top and bottom padding

---

### Requirement: Accessibility — semantic HTML
All sections SHALL use semantic HTML: `<section>` elements with appropriate headings (`<h1>` for hero, `<h2>` for section headings, `<h3>` for card/step titles). SVG icons SHALL have `aria-hidden="true"`.

#### Scenario: Heading hierarchy
- **WHEN** the home page DOM is inspected
- **THEN** there SHALL be exactly one `<h1>`, and subsequent section headings SHALL be `<h2>`, with sub-items as `<h3>`

#### Scenario: Decorative SVG icons
- **WHEN** an SVG icon in the services section is inspected
- **THEN** it SHALL have `aria-hidden="true"`
