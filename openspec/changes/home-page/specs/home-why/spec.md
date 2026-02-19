## ADDED Requirements

### Requirement: Three differentiator items
The "why us" section SHALL display exactly three short value propositions, each with
an icon, a bold title, and a one-sentence description.

#### Scenario: Three items rendered
- **WHEN** the why section is rendered
- **THEN** exactly three differentiator items SHALL be visible

#### Scenario: Each item has required elements
- **WHEN** a differentiator item is rendered
- **THEN** it SHALL contain an icon, a title, and a description

---

### Requirement: Responsive column layout
On desktop the three items SHALL sit in a three-column row. On tablet (768px–1199px)
they SHALL be two columns. On mobile they SHALL stack.

#### Scenario: Three columns on desktop
- **WHEN** viewport width is 1200px or wider
- **THEN** all three items SHALL display in a single row

#### Scenario: Stacked on mobile
- **WHEN** viewport width is less than 768px
- **THEN** the three items SHALL stack into a single column
