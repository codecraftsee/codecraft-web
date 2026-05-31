# Sync codecraft-web with latest Blueprint template

You are syncing the `codecraft-web` Angular codebase to the **current** state of the Blueprint design template. The original refactor prompt lives in `CLAUDE_CODE_PROMPT.md` and brought the codebase to a baseline. Since then, the template has evolved — this prompt brings it up to parity.

Treat the template as the source of truth. Where the codebase and template diverge, the template wins (unless explicitly noted).

---

## Inputs

In the linked design project, read **all** of these:

1. `CodeCraft Solutions - Blueprint.html` — the entry HTML, mounts `<BlueprintRoot />`
2. `blueprint-app.jsx` — main app component, routes, sections, styles
3. `shared.jsx` — shared data (services list, principles, etc.)
4. `tweaks-panel.jsx` — in-design tweaks panel (skip for production unless you want a debug build)
5. `assets/codecraft-logo.svg` — the real wordmark SVG
6. `CLAUDE_CODE_PROMPT.md` — foundational refactor doc (context only — its design system summary is still accurate; specific copy strings may be stale)
7. `CLAUDE_CODE_BRAND_UPDATE.md` — most recent brand identity updates (logo, EST. stamp, Novi Sad copy)

---

## Workflow

1. **Snapshot the codebase first.** Make sure the working tree is clean (`git status`) and you're on a new branch (`git checkout -b sync/blueprint-latest`).
2. **Build a section-by-section diff plan.** For each section listed below: open the corresponding Angular file(s), open the corresponding region in `blueprint-app.jsx`, and write down what differs (copy, structure, classes, tokens). Show the plan before editing.
3. **Apply changes one section at a time.** Don't bulk-rewrite — small commits per section so the diff is reviewable. Commit message format: `sync(blueprint): <section name>`.
4. **Verify after each section.** `npm run build` must pass. Open the page in dev mode and visually compare against the template.
5. **Run the full checklist at the end.** All items must be ticked before you call this done.

---

## Sections to diff

For each section: locate it in `blueprint-app.jsx`, find the corresponding Angular component(s), and reconcile.

### A. Tokens / themes (`src/styles/themes/`)

Pull the **current** values from the `BlueprintStyles` block in `blueprint-app.jsx` (search for `:root, .bp-theme-light` and the `.bp-theme-dark`, `.bp-theme-sable` blocks). Make sure every token in your `_tokens.scss` matches. Pay attention to:

- `--bp-accent` (cyan in dark, teal in light, amber in sable)
- `--bp-ink-mute` and `--bp-ink-soft` — easy to drift
- `--bp-rule` and `--bp-rule-strong` — used everywhere

### B. Header / chrome (`src/app/shared/site-header/`)

The header has evolved significantly. Current state:

- **Logo block (left):** real CodeCraft Solutions SVG wordmark, inlined with two path groups (`primary` filled with `--bp-ink`, `accent` filled with `--bp-bg` for the reverse-out "CRAFT" text). Height 34px. See `CLAUDE_CODE_BRAND_UPDATE.md` for full details.
- **Divider** — 1×28px rule, `--bp-rule` at 0.7 opacity.
- **EST. stamp** — two-line mono: `EST.` (10px, 600, ink-soft, 0.22em tracking) over `13 04 2020` (10px, 700, ink, 0.14em tracking).
- **Meta cells (right):** LAT 44.7866, LON 20.4489, STATUS (pulsing OPERATIONAL dot), UTC (live clock). Hidden when `showHud` is off.
- **Nav row:** tabs with `[NN]` index prefix + uppercase label + accent bottom-bar when active; spacer; theme cycle button on the right.
- **Scroll progress track:** 18px tall, fill in accent, `SCROLL · NNN%` mono label.

Any `CCS / REV.04`, `BUILD 2026.04`, `BUILD 2026.05`, `DRAWING NO.` artifacts in the current header markup → **delete**.

> ⚠️ The older `CLAUDE_CODE_PROMPT.md` describes the header with a dot-grid SVG glyph and a `CODECRAFT_SOLUTIONS` mono name + `REV.04 · BUILD 2026.05` sub. **Ignore that.** The new structure is logo SVG → divider → EST. stamp.

### C. Home page (`src/app/features/home/`)

Walk through every block of `BPHome()` in `blueprint-app.jsx` and reconcile.

Notable copy changes:

- Hero eyebrow callout: `NOVI SAD · ENGINEERING STUDIO` (previously `FIG.01 · PRIMARY OUTPUT` or `FIG.01 — ENGINEERING STUDIO`).
- Hero lede: starts with `CodeCraft Solutions is a Novi Sad-based engineering studio.`
- All `Belgrade` / `BELGRADE` → `Novi Sad` / `NOVI SAD`.

### D. Services page (`src/app/features/services/`)

Mirror `BPServices()`. The services list itself lives in `shared.jsx` (`SERVICES` array, 6 items). Make sure your service data model matches (`num`, `title`, `desc`, `tags`).

### E. Team page (`src/app/features/team/`)

Mirror `BPTeam()`. Read the latest layout and bios.

### F. Contact page (`src/app/features/contact/`)

Mirror `BPContact()`. Update contact details (address line should reflect Novi Sad). Email stays `hello@codecraftsolutions.rs`.

### G. Footer (`src/app/shared/site-footer/`)

Mirror `BPFooter()`. Current three lines:

- `© 2026 CODECRAFT_SOLUTIONS · ALL RIGHTS RESERVED`
- `HELLO@CODECRAFTSOLUTIONS.RS`
- `NOVI SAD · RS · REMOTE`

Remove any old `DRAWING NO. CCS-2026-04` text.

### H. Shared primitives (`src/app/shared/`)

Walk through each: `cc-plate`, `cc-section-head`, `cc-meta-cell`, `cc-callout`, `cc-spec`, `cc-chip`, `cc-btn`. Compare against their template counterparts (search for `.bp-plate`, `.bp-section`, `.bp-meta-cell`, `.bp-callout`, `.bp-spec`, `.bp-chip`, `.bp-btn` in `blueprint-app.jsx`). Pay attention to spacing, border colors, hover/active states, and the corner-bracket pseudo-elements on `cc-plate`.

### I. Map default center (if used)

If `lf-shared.jsx` or any equivalent in your codebase sets a default map center to Belgrade (`[44.8125, 20.4612]`), change it to Novi Sad: `[45.2671, 19.8335]`, zoom 13.

---

## Full sanity sweep (run at the end)

```bash
# Should return nothing:
rg -i belgrade
rg -i 'rev\.04'
rg -i 'build 2026'
rg -i 'fig\.01'
rg -i 'drawing no'
rg -i 'est\. 2018'
rg -i 'est\. 2023'
```

If any of those return hits, fix them.

---

## Final checklist

- [ ] All three themes (light, dark, sable) render correctly — logo, header, hero, services, team, contact, footer.
- [ ] Logo's "CRAFT" text knocks out cleanly in every theme (uses `--bp-bg`, not a tinted color).
- [ ] EST. stamp legible in every theme; date is `13 04 2020` (space-separated, no dots).
- [ ] Hero eyebrow reads `NOVI SAD · ENGINEERING STUDIO`.
- [ ] No occurrences of: `Belgrade`, `REV.04`, `BUILD 2026`, `FIG.01`, `DRAWING NO.`, founding years other than `2020`.
- [ ] Tokens in `_tokens.scss` / `_light.scss` / `_dark.scss` / `_sable.scss` match `BlueprintStyles` in `blueprint-app.jsx` exactly.
- [ ] All shared primitives (`cc-plate`, `cc-section-head`, etc.) match their template counterparts.
- [ ] `npm run build` passes with no new warnings.
- [ ] Side-by-side visual comparison against the template HTML — no obvious regressions.
- [ ] Branch pushed; PR opened with the section-by-section commits visible.
