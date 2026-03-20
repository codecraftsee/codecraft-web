## Context

The current CodeCraft site has a basic opaque header + stacked sections layout. The app shell (`app.ts`) renders a `HeaderComponent` (horizontal nav bar with wordmark, links, theme toggle) above a `<router-outlet>`. The home page composes four section components (hero, services, why, CTA) with opaque backgrounds using `--cc-surface` / `--cc-surface-dim` tokens. The theming system uses CSS custom properties with a `--cc-*` prefix, split across `_tokens.scss`, `_light.scss`, and `_dark.scss`.

Only the home page route (`/`) is currently implemented. About, Services, and Contact routes are not yet built. The branch is `feature/redisgn`.

## Goals / Non-Goals

**Goals:**
- Create a visually extraordinary site that feels like opening a curated book, not clicking through a corporate website
- Full-viewport transparent/animated background that creates depth and atmosphere
- Book-style table of contents navigation where each page is a numbered chapter
- Glassmorphism design language — frosted panels, translucent surfaces, layered depth
- Maintain WCAG AA accessibility on all glass surfaces
- Pure CSS/SCSS implementation — no heavy JS animation libraries
- Works in both light and dark themes

**Non-Goals:**
- Page transition animations between chapters (future enhancement)
- Parallax scrolling effects
- 3D or WebGL background effects
- Implementing the About, Services, Contact page content (only the shell, nav, and home page are in scope)
- CMS or dynamic content management

## Decisions

### 1. Background system: CSS animated gradient mesh (not canvas/particles)

Use a multi-layer CSS approach with radial gradients, `@keyframes` animations, and `mix-blend-mode` to create a living, organic background. Several large soft gradient blobs slowly drift and morph.

**Why over canvas/particles:** Pure CSS is GPU-composited automatically, requires zero JS, plays well with SSR, and degrades gracefully. Canvas particles would need a render loop, increase bundle size, and complicate the component model. The chaseai.io reference uses a clean, atmospheric feel — not particle-heavy — so CSS gradients match the aesthetic better.

**Why over a static gradient:** Static backgrounds feel flat and lifeless. Slow-moving gradients create the depth and atmosphere we need without being distracting.

**Implementation:** A `BackgroundComponent` in `shared/` renders 3-4 absolutely-positioned `<div>` elements with large radial gradients, each animated on different keyframe timings (20-40s cycles). The component uses `will-change: transform` and `transform: translate3d()` for GPU compositing. Colors are driven by theme tokens so light/dark themes produce different palettes.

### 2. Navigation: Vertical book ToC sidebar (not overlay/modal)

Replace the horizontal header with a persistent left sidebar styled as a book's table of contents. Each route is a numbered chapter entry (e.g., "I. Home", "II. About", "III. Services", "IV. Contact"). The sidebar uses a serif font for chapter numbers and a clean sans-serif for titles, mimicking book typography.

**Why sidebar over overlay:** A persistent sidebar keeps navigation always visible, reinforces the "book" metaphor on every page, and avoids the friction of opening/closing a menu. The content area shifts right to accommodate it.

**Why not keep the horizontal header:** The book metaphor requires vertical layout — chapter listings read top-to-bottom, not left-to-right. A horizontal header would undermine the entire design concept.

**Responsive behavior:**
- **Desktop (≥1024px):** Persistent sidebar, ~280px wide, with content area alongside
- **Tablet (768-1023px):** Collapsible sidebar, toggle button in top-left corner
- **Mobile (<768px):** Hidden by default, slide-out drawer triggered by a hamburger/book icon, overlay on content

**Structure:** `BookNavigationComponent` in `shared/` replaces `HeaderComponent`. Contains the wordmark (styled as a book title), chapter list, theme toggle, and a decorative separator line. Uses Roman numerals for chapter numbers.

### 3. Glass surfaces: SCSS mixin + shared component

Provide glassmorphism as both a reusable SCSS mixin (`@mixin glass-panel`) and a structural `GlassPanelComponent` wrapper.

**The mixin** applies: `backdrop-filter: blur()`, semi-transparent background, subtle border with alpha, and a soft box-shadow. All values driven by `--cc-glass-*` tokens so theming is automatic.

**The component** (`<cc-glass-panel>`) wraps projected content in a styled container with the glass mixin applied, plus optional `elevation` input (low/medium/high) controlling blur intensity and shadow depth.

**Why both:** The mixin allows any component to become glassy without adding DOM. The component provides a convenient wrapper for content sections that need consistent glass styling. Different use cases benefit from different approaches.

### 4. App shell layout: Fixed background + scrollable glass content

```
┌──────────────────────────────────────────┐
│ [Background Layer - fixed, full viewport] │
│ ┌──────────┬───────────────────────────┐ │
│ │          │                           │ │
│ │  Book    │   Glass content area      │ │
│ │  Nav     │   (scrollable)            │ │
│ │  Sidebar │                           │ │
│ │          │   ┌─────────────────┐     │ │
│ │  I.Home  │   │ Glass Panel     │     │ │
│ │  II.About│   │ (page content)  │     │ │
│ │  III.Svc │   │                 │     │ │
│ │  IV.Talk │   └─────────────────┘     │ │
│ │          │                           │ │
│ └──────────┴───────────────────────────┘ │
└──────────────────────────────────────────┘
```

The background component is `position: fixed; inset: 0; z-index: 0`. The sidebar and content area sit on top at `z-index: 1`. The content area scrolls independently. This ensures the animated background is always visible through glass panels regardless of scroll position.

### 5. Theme token extensions

Add new glass-specific tokens to the existing `--cc-*` system:

| Token | Light | Dark |
|---|---|---|
| `--cc-glass-bg` | `rgba(255,255,255,0.6)` | `rgba(18,18,24,0.6)` |
| `--cc-glass-border` | `rgba(255,255,255,0.3)` | `rgba(255,255,255,0.08)` |
| `--cc-glass-blur` | `16px` | `20px` |
| `--cc-glass-shadow` | `0 8px 32px rgba(0,0,0,0.08)` | `0 8px 32px rgba(0,0,0,0.3)` |
| `--cc-backdrop-start` | `#e8e0ff` | `#1a0a3e` |
| `--cc-backdrop-mid` | `#f0e6ff` | `#0e0e2a` |
| `--cc-backdrop-end` | `#dce8ff` | `#0a1628` |
| `--cc-backdrop-accent` | `#c4b5fd` | `#7c3aed` |

Existing surface tokens remain unchanged for backward compatibility with components not yet migrated to glass.

## Risks / Trade-offs

**[Backdrop-filter browser support]** → `backdrop-filter` is supported in all modern browsers (Chrome, Firefox 103+, Safari, Edge). No polyfill needed. For the <1% on older Firefox, the glass panels fall back to a slightly more opaque `background-color` without blur — still usable, just not as striking.

**[Accessibility on glass surfaces]** → Translucent panels over animated backgrounds could fail contrast checks. Mitigation: glass panels use a sufficiently opaque background (0.6-0.7 alpha minimum) to guarantee 4.5:1 contrast ratio for body text and 3:1 for large text against any background state. AXE audit required after implementation.

**[Performance of CSS animations]** → Multiple animated gradient layers could cause jank on low-end devices. Mitigation: use only `transform` and `opacity` for animations (composited properties), add `will-change` hints, and use `prefers-reduced-motion` media query to disable animations for users who prefer reduced motion.

**[Sidebar takes horizontal space]** → A 280px sidebar reduces content width on smaller desktops. Mitigation: sidebar collapses to an icon-only rail or drawer below 1024px. Content area uses fluid width with `max-width` constraints for readability.

**[Breaking change to HeaderComponent]** → Any code importing or referencing `HeaderComponent` will break. Mitigation: the only consumer is `app.ts`; we replace the import directly. No external dependencies on the header.

## Open Questions

- Should the book navigation include decorative elements (e.g., a thin ornamental line, page number at the bottom, serif "CodeCraft" wordmark styled like a book spine)? Leaning yes for atmosphere.
- For mobile drawer: slide from left (book metaphor — opening a cover) or bottom sheet? Leaning left-slide.
