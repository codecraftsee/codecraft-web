## Why

The current "Code Crafters" team page (`/about`) uses a rigid parent-child tree structure with CSS-drawn trunk, branches, and stems. It feels like an org chart rather than a living tree. The page needs to become a visually engaging, organic SVG tree where team members appear as leaves — interactive, animated, and distinctive — not a hierarchical layout.

## What Changes

- **Replace CSS tree with interactive SVG tree**: Remove the trunk/branch/stem CSS structure. Draw an organic tree using SVG `<path>` curves — a natural trunk that splits into flowing branches, each ending at a leaf position.
- **Leaf avatars on the tree**: Each team member is a circular gradient avatar positioned directly on the SVG tree at a branch endpoint. Clicking a leaf reveals/highlights the member's detail card below.
- **Member detail cards as a flat grid**: Below the SVG tree, display a simple grid of member cards (name, role, LinkedIn link). Cards are not nested in the tree — they sit in a clean flat layout.
- **Animated connection lines**: On hover/focus of a leaf avatar, the SVG branch path leading to it animates (stroke highlight, glow). On hover of a card, the corresponding leaf on the tree highlights.
- **Responsive layout**: On desktop, the SVG tree renders horizontally with leaves spread across branches. On mobile, the tree simplifies or collapses and cards stack vertically.
- **Smooth entrance animations**: Tree paths draw in on page load using `stroke-dashoffset` animation. Leaf avatars fade/scale in with staggered delays.

## Capabilities

### New Capabilities
- `team-tree-visualization`: Interactive SVG tree component with organic branch paths, animated leaf avatars, hover-linked detail cards, entrance animations, and responsive behavior.

### Modified Capabilities
_(none — no existing specs are affected)_

## Impact

- **Files modified**: `src/app/features/about/about.component.ts` (full rewrite of template and styles), `src/app/features/about/about.component.spec.ts` (updated selectors/assertions)
- **No new dependencies**: Pure SVG + CSS animations, no third-party libraries
- **Style budget**: Component styles must stay under 4KB warning / 8KB error (Angular budget). SVG markup lives in the template, not styles.
- **Accessibility**: SVG tree must have proper `role`, `aria-label`, and focusable leaf links. Detail cards retain LinkedIn link accessibility from the current implementation.
