## Why

The current leaf avatars use a single monochrome gradient (`--cc-surface-variant` → `--cc-outline`) making them look flat and lifeless. The tree should feel alive — each leaf should have its own vibrant color identity. Avatars also need to support real profile images when available, falling back to the colorful gradient + initials pattern.

## What Changes

- **Unique colorful gradients per member**: Each team member gets a distinct gradient color pair assigned in their data (e.g., warm amber, cool teal, deep violet, coral pink). These replace the single `leafGrad` gradient.
- **Image support with fallback**: Add an optional `image` field to `TeamMember`. When set, render an SVG `<image>` clipped to a circle instead of the gradient+initials. When absent, show the colorful gradient avatar with initials as before.
- **SVG clip paths for circular images**: Use `<clipPath>` with `<circle>` to mask member photos into circles within the SVG tree.
- **Organic color palette**: Gradient colors evoke natural leaf tones — greens, ambers, teals, corals — that feel alive on both light and dark themes.

## Capabilities

### New Capabilities
_(none)_

### Modified Capabilities
- `team-tree-visualization`: Leaf avatars gain per-member colorful gradients, optional image support with circular clip, and image-to-initials fallback behavior.

## Impact

- **Files modified**: `src/app/features/about/about.component.ts` (new gradients in `<defs>`, conditional template for image vs initials, updated `TeamMember` interface), `src/app/features/about/about.component.spec.ts` (tests for image rendering and fallback)
- **No new dependencies**: Pure SVG features (`<clipPath>`, `<image>`, multiple `<linearGradient>`)
- **Data shape change**: `TeamMember` interface gains optional `image?: string` field — non-breaking, existing members without images continue to work via fallback
