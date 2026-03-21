## Context

The about page SVG tree currently uses a single `<linearGradient id="leafGrad">` for all leaf avatars, producing identical monochrome circles. The `TeamMember` interface has no `image` field. This change gives each member a unique colorful gradient and adds optional image support.

## Goals / Non-Goals

**Goals:**
- Each leaf avatar has its own vibrant gradient evoking natural leaf/plant tones
- Gradients work well on both light and dark themes (no theme-conditional colors needed — the chosen palette is vibrant enough to work on both)
- Members can optionally have an `image` URL; when present, the photo replaces the gradient+initials
- Images are clipped to circles using SVG `<clipPath>`
- Fallback is seamless — omitting `image` shows the gradient avatar with no visual glitch

**Non-Goals:**
- Runtime image upload or editing
- Lazy loading or placeholder blur-up for images (the SVG is small, images are tiny circles)
- Generating gradient colors programmatically — colors are hand-picked for aesthetics

## Decisions

### 1. Per-member gradient via `gradientId` + color pair in data

**Choice**: Add `gradient: { from: string; to: string }` to `TeamMember`. In SVG `<defs>`, generate one `<linearGradient>` per member using `@for`. Each gradient gets a unique `id` like `leafGrad-0`, `leafGrad-1`, etc. The `<circle>` references `fill="url(#leafGrad-{{i}})"`.

**Why**: Keeps colors co-located with member data for easy editing. Dynamic `@for` in `<defs>` avoids duplicating gradient markup manually. Unique IDs prevent SVG fill collisions.

**Alternative considered**: CSS `background` on `<foreignObject>` — rejected because `<circle>` fill is cleaner in SVG, and `foreignObject` has cross-browser quirks.

### 2. Color palette — natural leaf tones

**Choice**: Four gradient pairs chosen for vibrancy and organic feel:
- Member 0: `#4CAF50` → `#81C784` (forest green)
- Member 1: `#FF8A65` → `#FFAB91` (warm coral)
- Member 2: `#4DB6AC` → `#80CBC4` (teal)
- Member 3: `#BA68C8` → `#CE93D8` (violet bloom)

**Why**: These hues evoke leaves, flowers, and natural growth. They're saturated enough to pop on both light (white page) and dark (dark glass page) backgrounds. Each pair uses a lighter shade as the `to` stop to create a subtle luminance gradient.

### 3. Optional `image` field with `@if` conditional rendering

**Choice**: Add `image?: string` to `TeamMember`. In the SVG leaf template, use `@if (member.image)` to render an `<image>` clipped by a `<clipPath>` containing a `<circle>`. Otherwise render the gradient `<circle>` + `<text>` initials.

**Why**: Angular's `@if` is the simplest conditional. SVG `<clipPath>` is the standard way to clip images to shapes. No CSS needed — it's all SVG attributes.

**Clip structure per member**:
```
<clipPath id="clip-{i}"><circle cx="..." cy="..." r="28" /></clipPath>
<image href="..." clip-path="url(#clip-{i})" x="cx-28" y="cy-28" width="56" height="56" />
```

### 4. Remove the single `leafGrad` definition

**Choice**: Delete the existing `<linearGradient id="leafGrad">` from `<defs>` and replace with the `@for`-generated per-member gradients. Also add per-member `<clipPath>` definitions for image support.

**Why**: The old gradient is no longer used. Keeping it would be dead code.

## Risks / Trade-offs

- **Hard-coded color palette for 4 members** → Adding members requires picking new gradient colors. Mitigation: colors are in the data array, easy to extend.
- **SVG `<image>` CORS** → External image URLs may be blocked by CORS. Mitigation: for now all images are placeholders/same-origin. When real images are added, host them on the same domain or use a proxy.
- **Multiple gradients in `<defs>` increase SVG size** → Each gradient adds ~3 lines. With 4 members that's ~12 lines. Negligible impact on the lazy-loaded chunk.
