## 1. SVG Tree Structure

- [x] 1.1 Replace the current CSS tree template in `about.component.ts` with an inline SVG (`viewBox="0 0 600 350"`, `width="100%"`, `preserveAspectRatio`). Add the trunk `<path>` (class `tree__trunk`) using a cubic Bézier from (300,340) to (~300,180).
- [x] 1.2 Add four branch `<path>` elements (class `tree__branch`) curving from the fork point to leaf positions: (~80,60), (~220,40), (~380,40), (~520,60). Tune curves until they look organic.
- [x] 1.3 Define SVG `<defs>` with a `<linearGradient>` for leaf avatar fills, referencing `var(--cc-surface-variant)` and `var(--cc-outline)`.

## 2. Leaf Avatars

- [x] 2.1 At each branch endpoint, add an SVG `<a>` wrapping a `<circle>` (class `leaf`, `r="28"`) and a centered `<text>` showing member initials. Bind `[attr.href]`, `target="_blank"`, `rel="noopener noreferrer"`, and `[attr.aria-label]` (name + role).
- [x] 2.2 Use `@for` to iterate `members` array, positioning each leaf group at its hardcoded `cx`/`cy` coordinates (store positions alongside member data or as a parallel array).

## 3. Flat Card Grid

- [x] 3.1 Below the SVG, add a `.cards` grid with one `.card` per member. Each card is an `<a>` linking to LinkedIn with `.card__name` (serif) and `.card__role` (sans, muted). Set `target="_blank"` and `rel="noopener noreferrer"`.
- [x] 3.2 Style `.cards` as a 2-column CSS grid on desktop (`grid-template-columns: repeat(2, 1fr)`, `gap: 1rem`) and single column below 768px.

## 4. Cross-Highlight Signal

- [x] 4.1 Add `activeIndex = signal<number | null>(null)` to the component class. Add `activate(index: number)` and `deactivate()` methods.
- [x] 4.2 Bind `(mouseenter)`/`(focus)` → `activate(i)` and `(mouseleave)`/`(blur)` → `deactivate()` on each SVG leaf `<a>` and each card `<a>`.
- [x] 4.3 Bind `[class.active]="activeIndex() === i"` on both the SVG leaf `<a>` and the corresponding card element. Style `.active` with accent border/glow on cards and accent stroke on leaf circles.

## 5. Entrance Animations

- [x] 5.1 Add `@keyframes draw-branch` (`stroke-dashoffset` from full length to 0) and `@keyframes leaf-in` (`opacity: 0; scale(0.5)` → `opacity: 1; scale(1)`) in component styles.
- [x] 5.2 Apply `draw-branch` to `.tree__branch` and `.tree__trunk` with staggered `animation-delay` (0.15s apart). Apply `leaf-in` to leaf `<a>` groups with delays starting after branches finish.
- [x] 5.3 Add `@media (prefers-reduced-motion: reduce)` block that sets `animation: none` and resets `stroke-dashoffset` and `opacity` to final values.

## 6. Page Wrapper & Dark Theme

- [x] 6.1 Keep the existing `.page`, `.page__edges`, `.page__content` wrapper and `cc-chapter-header`. Update `.page__content` padding if needed for the new layout.
- [x] 6.2 Verify dark theme overrides work with the SVG (branch stroke color, leaf gradient, card styles all use CSS custom properties). Adjust if needed.

## 7. Style Budget & Build

- [x] 7.1 Run `ng build` and verify no style budget warning for the about component (under 4KB). If over, move SVG-specific styles to inline `style` attributes.
- [x] 7.2 Run `ng build` and confirm clean build with no errors.

## 8. Tests

- [x] 8.1 Update `about.component.spec.ts`: test that `.tree__svg` exists, trunk path exists, branch count equals member count, leaf circles render with initials, leaf `<a>` elements have correct `href`/`target`/`rel`/`aria-label`.
- [x] 8.2 Test that `.cards` grid contains one `.card` per member with `.card__name` and `.card__role` text.
- [x] 8.3 Test that `cc-chapter-header` and `.page` wrapper are present.
- [x] 8.4 Run `ng test --watch=false` and confirm all tests pass.
