## Context

The site has two implemented feature pages (home, team) and needs a `/services` page. The home page already has a services overview section with 4 cards linking to `/services`. The navigation sidebar lists "Services" as chapter III. The page should follow the established page-wrapper pattern (`.page` / `.page__edges` / `.page__content` with `ChapterHeaderComponent`) and use existing design tokens.

The user wants a vertical timeline layout inspired by chaseai.io's #approach section — numbered cards stacked vertically with a connecting line, similar to a process/methodology walkthrough. Starting with 3 services, more will be added over time.

## Goals / Non-Goals

**Goals:**
- Render services as a vertical timeline with numbered cards and a connecting line
- Extensible data model — adding a new service means adding one object to an array
- Match existing page aesthetics: book/page metaphor, design tokens, dark theme, responsive
- WCAG AA accessible, reduced motion support
- Fade-in animation on cards with staggered delay

**Non-Goals:**
- No sub-pages per service (single page with all services)
- No CTA or contact form on this page (that's the contact page's job)
- No pricing or detailed feature lists — descriptions stay concise
- No horizontal/alternating layout — cards stack vertically, left-aligned

## Decisions

### 1. Single component, no sub-components

The page is a straightforward list of cards along a timeline. A single `ServicesComponent` with inline data is sufficient — no need for child components or a service layer. This matches the team page pattern.

**Alternative considered:** Separate `TimelineCardComponent` — rejected because there's no reuse case yet and it adds indirection for 3 items.

### 2. Data model

```typescript
interface ServiceOffering {
  number: string;    // '01', '02', '03' — formatted display number
  title: string;
  description: string;
  tags: string[];    // e.g. ['E-commerce', 'Multi-vendor', 'Payments']
}
```

Data lives as a `readonly` array in the component class. Tags add visual interest and scannability to each card. The `number` field is a formatted string rather than derived from index so numbering stays explicit if items are reordered.

### 3. Timeline visual structure

```
  |
  |  ┌──────────────────────┐
  ●──│  01                  │
  |  │  Marketplaces        │
  |  │  Description text... │
  |  │  [tag] [tag] [tag]   │
  |  └──────────────────────┘
  |
  ●──┌──────────────────────┐
  |  │  02                  │
  ...
```

- **Vertical line:** CSS `::before` pseudo-element on the timeline container — a thin line (`2px`, `var(--cc-outline)`) running the full height
- **Dots:** CSS `::before` on each card — a small filled circle (`12px`) positioned on the line
- **Cards:** Standard bordered cards with rounded corners, using page background and outline tokens
- **Connection:** Horizontal connector from dot to card via `::after` pseudo-element

### 4. Animation approach

Cards fade in with upward slide, staggered by index:

```css
.timeline__card {
  opacity: 0;
  transform: translateY(20px);
  animation: card-in 0.5s ease-out forwards;
  animation-delay: calc(var(--card-index) * 0.15s);
}
```

Reduced motion: `animation: none; opacity: 1; transform: none;`

### 5. Responsive behavior

- **Desktop (≥768px):** Timeline line on the left, cards extend right with comfortable padding
- **Mobile (<768px):** Timeline line hidden, cards stack as full-width cards with visible numbers — simpler layout without the decorative timeline elements

## Risks / Trade-offs

- **[Few items initially]** → 3 cards may look sparse. Mitigated by generous spacing and the page heading/subtitle filling visual space. More services will be added.
- **[Fixed number strings]** → If items are reordered, numbers must be manually updated. Acceptable since the list is small and curated. Could derive from index later if needed.
