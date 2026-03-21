## Context

The `/about` page currently renders a CSS-based org-chart tree: a vertical trunk, horizontal branch bar, vertical stems, then member cards. It works but looks mechanical and hierarchical. The redesign replaces it with an organic SVG tree illustration where team members are leaves on curved branches, with a flat card grid underneath.

Everything stays inside `about.component.ts` — no new files, no new dependencies. The constraint is the Angular component style budget (4KB warning / 8KB error), so SVG lives in the template and styles stay compact.

## Goals / Non-Goals

**Goals:**
- Render an organic tree shape using hand-crafted SVG `<path>` curves (trunk splits into branches, branches end at leaf positions)
- Position team member avatars (circular, gradient-filled, showing initials) at each branch endpoint as SVG `<circle>` + `<text>` wrapped in `<a>` links
- Display a flat grid of member detail cards below the tree (name, role, LinkedIn)
- Cross-highlight: hovering a leaf avatar highlights the corresponding card and vice versa, using a signal-based `activeIndex`
- Animate tree paths drawing in on load (`stroke-dashoffset` CSS animation) and leaf avatars scaling in with staggered delays
- Stay under the 4KB style budget, meet WCAG AA accessibility

**Non-Goals:**
- Dynamically computing SVG path positions from data (paths are hand-crafted for the current 4-member layout)
- Canvas or WebGL rendering
- Drag-and-drop or zoom/pan interactions
- Fetching team data from an API — data stays hardcoded as placeholder

## Decisions

### 1. Inline SVG in template, not a separate `.svg` asset

**Choice**: Embed the SVG directly in the component template.

**Why**: Inline SVG can reference CSS custom properties (`var(--cc-accent)`), respond to Angular event bindings (`(mouseenter)`, `(focus)`), and be styled with component CSS. An external SVG asset would lose all of this. The SVG markup (~40 lines for 4 branches + 4 leaf circles) is small enough to inline.

**Alternative considered**: External SVG loaded via `NgOptimizedImage` — rejected because it can't be interactive or themed.

### 2. Signal-based hover linking (`activeIndex`)

**Choice**: A `signal<number | null>` tracks which member is currently hovered/focused. Both the SVG leaf and the card grid read it. Setting `activeIndex` from either location highlights both.

**Why**: Signals are the project's state management pattern. A single signal avoids coupling the SVG and card sections — each independently reacts to the value. No RxJS needed for this simple case.

**Alternative considered**: CSS-only `:has()` selectors — rejected because they can't cross between the SVG and the card grid (separate DOM subtrees).

### 3. SVG tree layout: hand-crafted paths for 4 members

**Choice**: Define the tree as 5 SVG `<path>` elements: one trunk and four branches using cubic Bézier curves. Leaf positions are hardcoded `cx`/`cy` coordinates matching branch endpoints.

**Why**: With only 4 members, generating paths algorithmically adds complexity without benefit. Hand-crafted curves look more organic than computed ones. If the team grows significantly, this can be revisited.

**Layout** (viewBox `0 0 600 350`):
- Trunk: vertical curve from bottom-center (300, 340) rising to a fork point (~300, 180)
- Branch 1 (far left): curves from fork to (~80, 60)
- Branch 2 (mid-left): curves from fork to (~220, 40)
- Branch 3 (mid-right): curves from fork to (~380, 40)
- Branch 4 (far right): curves from fork to (~520, 60)

Each branch endpoint is where a leaf avatar circle (r=28) is centered.

### 4. CSS animations for draw-in and scale-in

**Choice**: Use `@keyframes` CSS animations, not JavaScript animation.

- Branch paths: `stroke-dasharray` + `stroke-dashoffset` animation (1s ease-out, staggered by 0.15s per branch)
- Leaf circles: `opacity` + `transform: scale()` animation (0.4s ease-out, starts after branches finish)

**Why**: CSS animations are GPU-accelerated, don't require Angular zone interaction, and keep the component simple. `stroke-dashoffset` is the standard technique for SVG path drawing.

### 5. Flat card grid below tree (not inside SVG)

**Choice**: Member detail cards are standard HTML `<a>` elements in a CSS grid below the SVG, not SVG `<foreignObject>`.

**Why**: HTML cards are easier to style responsively, support proper text reflow, and are more accessible than SVG foreignObject (which has browser inconsistencies). The SVG tree is purely illustrative + interactive avatars; the cards are the primary information display.

**Card layout**: 2×2 grid on desktop (gap 1rem), single column on mobile. Each card: name (serif), role (sans-serif, muted), entire card is a LinkedIn link.

### 6. Style budget strategy

**Choice**: Keep component styles under 4KB by:
- Using single-line CSS declarations for simple rules (as already done)
- Putting `@keyframes` in styles (they compress well)
- Keeping SVG styling minimal — most SVG presentation attributes are inline (`stroke`, `fill`, `r`)
- Avoiding duplicated dark-theme rules where `var()` fallbacks suffice

If styles approach the limit, SVG-specific styles can move to inline `style` attributes on SVG elements since those don't count toward the component style budget.

## Risks / Trade-offs

- **Fixed layout for 4 members** → If the team grows beyond 6, the hand-crafted SVG paths need to be redrawn. Mitigation: document the viewBox coordinate system so future changes are straightforward.
- **Staggered animations on every page visit** → Could feel slow on repeat visits. Mitigation: keep total animation duration under 2s. Consider `prefers-reduced-motion` media query to disable animations.
- **SVG inline in template increases bundle size** → The SVG adds ~1-2KB to the lazy chunk. Mitigation: this chunk only loads on `/about`, so it doesn't affect initial load.
- **Cross-highlight requires signal reactivity in template** → Multiple `[class.active]` bindings checking `activeIndex()`. Mitigation: with only 4 members, this is negligible performance impact. OnPush change detection limits checks.
