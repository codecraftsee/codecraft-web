## MODIFIED Requirements

### Requirement: Leaf avatars are positioned at branch endpoints
Each team member SHALL be represented by a circular SVG avatar positioned at the endpoint of their branch. Each member SHALL have a unique `<linearGradient>` defined in `<defs>` with a distinct color pair (e.g., forest green, coral, teal, violet). When the member has no `image` URL, the avatar SHALL be a `<circle>` filled with that member's gradient and a centered `<text>` displaying initials. When the member has an `image` URL, the avatar SHALL be an `<image>` element clipped to a circle via `<clipPath>`, replacing the gradient and initials. Each avatar SHALL be wrapped in an `<a>` element linking to the member's LinkedIn profile.

#### Scenario: Avatars render with unique colorful gradients
- **WHEN** the tree renders and a member has no `image` URL
- **THEN** a `<circle>` element (class `leaf__circle`) with `r="28"` is rendered, filled with that member's unique `<linearGradient>` (not a shared gradient), and a `<text>` element displays the member's initials

#### Scenario: Each gradient has a distinct color pair
- **WHEN** the SVG `<defs>` renders
- **THEN** there is one `<linearGradient>` per member, each with a unique `id` (e.g., `leafGrad-0`, `leafGrad-1`) and distinct `stop-color` values

#### Scenario: Avatar renders member image when available
- **WHEN** a member has an `image` URL set
- **THEN** an `<image>` element is rendered at the branch endpoint, clipped to a circle via `<clipPath>`, and no gradient circle or initials text is shown

#### Scenario: Avatar falls back to gradient when image is absent
- **WHEN** a member has no `image` field (undefined)
- **THEN** the gradient+initials avatar renders as the fallback

#### Scenario: Leaf avatars link to LinkedIn
- **WHEN** the user clicks a leaf avatar (image or gradient)
- **THEN** the member's LinkedIn profile opens in a new tab (`target="_blank"`, `rel="noopener noreferrer"`)

#### Scenario: Leaf avatars are keyboard accessible
- **WHEN** the user tabs through the SVG tree
- **THEN** each leaf avatar `<a>` element receives focus and has an `aria-label` containing the member's name and role

## ADDED Requirements

### Requirement: TeamMember interface supports optional image
The `TeamMember` interface SHALL include an optional `image?: string` field for a profile photo URL and a `gradient: { from: string; to: string }` field for the member's unique color pair.

#### Scenario: Member without image field
- **WHEN** a `TeamMember` object omits the `image` field
- **THEN** the component renders without error, showing the gradient+initials avatar

#### Scenario: Member with image field
- **WHEN** a `TeamMember` object includes an `image` URL
- **THEN** the component renders the image avatar clipped to a circle
