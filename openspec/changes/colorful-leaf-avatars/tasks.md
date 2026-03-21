## 1. Data Model

- [x] 1.1 Add `gradient: { from: string; to: string }` and `image?: string` to the `TeamMember` interface in `about.component.ts`.
- [x] 1.2 Update each member in the `members` array with a unique gradient color pair: MT → `#4CAF50`/`#81C784` (green), AP → `#FF8A65`/`#FFAB91` (coral), SJ → `#4DB6AC`/`#80CBC4` (teal), MN → `#BA68C8`/`#CE93D8` (violet). Leave `image` unset for now (placeholder fallback).

## 2. SVG Gradients & Clip Paths

- [x] 2.1 Remove the single `<linearGradient id="leafGrad">` from `<defs>`.
- [x] 2.2 Add an `@for` loop inside `<defs>` that generates one `<linearGradient>` per member with `id="leafGrad-{{i}}"` using each member's `gradient.from` and `gradient.to` as stop colors.
- [x] 2.3 Add an `@for` loop inside `<defs>` that generates one `<clipPath id="clip-{{i}}">` per member containing a `<circle>` at the member's `cx`/`cy` with `r="28"`.

## 3. Conditional Avatar Rendering

- [x] 3.1 In the leaf `<a>` template, use `@if (member.image)` to render an `<image>` element with `[attr.href]="member.image"`, positioned at `cx-28`/`cy-28`, width/height `56`, clipped by `clip-path="url(#clip-{{i}})"`.
- [x] 3.2 In the `@else` branch, render the existing `<circle>` with `fill="url(#leafGrad-{{i}})"` and initials `<text>`.

## 4. Style Adjustments

- [x] 4.1 Verify styles still apply correctly — `.leaf__circle` stroke and hover behavior should work with per-member gradient fills. Adjust if needed.
- [x] 4.2 Run `ng build` and confirm no style budget warning and clean build.

## 5. Tests

- [x] 5.1 Update `about.component.spec.ts`: test that each leaf has a unique gradient (`leafGrad-0`, `leafGrad-1`, etc.) defined in `<defs>`.
- [x] 5.2 Test that members without `image` render a `<circle>` and `<text>` (initials fallback).
- [x] 5.3 Add a test with a member that has an `image` URL and verify an `<image>` element renders with `clip-path`.
- [x] 5.4 Run `ng test --watch=false` and confirm all tests pass.
