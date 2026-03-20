## ADDED Requirements

### Requirement: SVG tree renders with organic branch paths
The component SHALL render an inline SVG element containing a trunk path and one branch path per team member, drawn using cubic Bézier curves. The SVG SHALL use a fixed `viewBox` of `0 0 600 350` and scale responsively via `width: 100%` with `preserveAspectRatio`.

#### Scenario: Tree SVG is present on page load
- **WHEN** the user navigates to `/about`
- **THEN** an `<svg>` element with class `tree__svg` is rendered containing path elements for the trunk and branches

#### Scenario: Branch count matches team size
- **WHEN** the component has N team members in its data
- **THEN** the SVG contains exactly N branch `<path>` elements (class `tree__branch`) plus one trunk `<path>` (class `tree__trunk`)

### Requirement: Leaf avatars are positioned at branch endpoints
Each team member SHALL be represented by a circular SVG avatar (`<circle>` with gradient fill) positioned at the endpoint of their branch. The avatar SHALL display the member's initials as centered `<text>`. Each avatar SHALL be wrapped in an `<a>` element linking to the member's LinkedIn profile.

#### Scenario: Avatars render with initials
- **WHEN** the tree renders
- **THEN** each branch endpoint has a `<circle>` element (class `leaf`) with `r="28"` and a `<text>` element showing the member's initials

#### Scenario: Leaf avatars link to LinkedIn
- **WHEN** the user clicks a leaf avatar
- **THEN** the member's LinkedIn profile opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)

#### Scenario: Leaf avatars are keyboard accessible
- **WHEN** the user tabs through the SVG tree
- **THEN** each leaf avatar `<a>` element receives focus and has an `aria-label` containing the member's name and role

### Requirement: Flat member card grid below tree
The component SHALL render a grid of member detail cards below the SVG tree. Each card SHALL display the member's name, role, and link to their LinkedIn profile. Cards SHALL NOT be nested inside the SVG.

#### Scenario: Cards render for all members
- **WHEN** the page loads
- **THEN** a `.cards` grid contains one `.card` element per team member, each showing the member's name (`.card__name`) and role (`.card__role`)

#### Scenario: Card links to LinkedIn
- **WHEN** the user clicks a member card
- **THEN** the member's LinkedIn profile opens in a new tab

#### Scenario: Cards use 2-column grid on desktop
- **WHEN** the viewport width is 768px or wider
- **THEN** the cards grid displays in a 2-column layout

#### Scenario: Cards stack on mobile
- **WHEN** the viewport width is below 768px
- **THEN** the cards grid displays in a single-column layout

### Requirement: Cross-highlight between leaf avatars and cards
The component SHALL maintain a signal `activeIndex` (`signal<number | null>`). Hovering or focusing a leaf avatar sets `activeIndex` to that member's index; hovering a card does the same. Both the leaf avatar and the card for the active index SHALL receive an `.active` class.

#### Scenario: Hovering a leaf highlights the card
- **WHEN** the user hovers over leaf avatar at index 2
- **THEN** `activeIndex` is set to 2 and both the leaf `<a>` at index 2 and the card at index 2 have class `active`

#### Scenario: Hovering a card highlights the leaf
- **WHEN** the user hovers over the card at index 0
- **THEN** `activeIndex` is set to 0 and both the leaf `<a>` at index 0 and the card at index 0 have class `active`

#### Scenario: Mouse leave clears highlight
- **WHEN** the user moves the mouse away from all leaves and cards
- **THEN** `activeIndex` is set to `null` and no elements have class `active`

### Requirement: Entrance animations on page load
Branch paths SHALL animate drawing in using `stroke-dashoffset` CSS animation. Leaf avatars SHALL animate in with opacity and scale after branches finish. The component SHALL respect `prefers-reduced-motion` by disabling animations.

#### Scenario: Branches draw in sequentially
- **WHEN** the page loads
- **THEN** each branch path animates from fully hidden (`stroke-dashoffset` equal to path length) to fully visible, with staggered `animation-delay` (0.15s apart)

#### Scenario: Leaves appear after branches
- **WHEN** branch animations complete
- **THEN** leaf avatars animate from `opacity: 0; scale(0.5)` to `opacity: 1; scale(1)` with staggered delays

#### Scenario: Reduced motion preference disables animations
- **WHEN** the user has `prefers-reduced-motion: reduce` set
- **THEN** all elements render immediately without animation

### Requirement: Component styles stay within budget
The component's compiled CSS SHALL remain under 4KB (warning threshold) and MUST remain under 8KB (error threshold) as defined in `angular.json` budgets.

#### Scenario: Build passes without style budget warning
- **WHEN** `ng build` runs in production mode
- **THEN** no budget warning is emitted for the about component's styles

### Requirement: Book page wrapper and chapter header
The component SHALL reuse the book-page wrapper pattern (`.page`, `.page__edges`, `.page__content`) and include the `cc-chapter-header` component for "back to Contents" navigation. Dark theme overrides SHALL apply via `:host-context(.dark-theme)`.

#### Scenario: Page wrapper renders
- **WHEN** the about page loads
- **THEN** the content is wrapped in `.page` with `.page__edges` and `.page__content` elements

#### Scenario: Chapter header is present
- **WHEN** the about page loads
- **THEN** a `cc-chapter-header` element is rendered at the top of the page content
