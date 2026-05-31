# Apply Blueprint template deltas to local codecraft-web

You are running inside the user's local `codecraft-web` Angular project in VS Code. This document describes the **specific changes** that were made to the Blueprint design template since the codebase was last synced. Apply them to the codebase.

You do **not** have access to the design project. All required information — exact code, copy strings, color values — is embedded in this document. Don't ask for the template files.

---

## How to work

1. Confirm working tree is clean (`git status`). If not, ask the user before continuing.
2. Create a branch: `git checkout -b sync/brand-identity-update`.
3. Work through the changes below **in order**. Commit after each numbered section using the suggested message.
4. After each commit, run `npm run build` (or `ng build`) to catch breakage early.
5. At the end, run the verification sweep at the bottom of this doc.

If a section refers to a file that doesn't exist with the path I expect, search the repo (`rg`, `find`) for the equivalent — Angular project layouts vary. Show me what you find before editing.

---

## 1. Replace placeholder logo with real SVG wordmark

**Files likely involved:** `src/app/shared/site-header/site-header.component.html` (or `.ts` template), plus a new asset.

### Step 1a. Save the SVG asset

Create `src/assets/brand/codecraft-logo.svg` with this exact content (single line, no formatting changes — the path data is precise):

```xml
<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 984.78 368.72"><g class="cc-logo__primary"><polygon points="984.77 257.64 984.77 326.83 942.88 368.72 520.19 368.72 520.19 299.53 562.08 257.64 984.77 257.64"/><path d="M594.73,407.9H718.41c11.33,0,22.91,1.5,33.94-.3,26.48-4.32,42.81,10.27,57.11,28.5a32.51,32.51,0,0,1,6.43,18.45q.79,69.18.16,138.37c-.16,18.86-27.38,47.08-46.09,47.25-55.51.51-111,.2-166.53.09-2.69,0-5.37-1.1-8.7-1.83Zm46.93,41.79V597.82H769V449.69Z" transform="translate(-74.54 -406.71)"/><path d="M912,448.33v49.78h147.33v41.74H983v-.25H911.8V598H1059v41.76c-16.58,0-32.86,0-49.12,0-31.16,0-62.33.17-93.49,0-25-.19-52-27.12-52.1-52q-.23-65,0-130c.06-18.27,24.15-49.26,41.47-49.66,50.82-1.13,101.68-.39,153.53-.39v40.63Z" transform="translate(-74.54 -406.71)"/><path d="M121.93,447.94V598.26h23.26c35.13,0,70.29.87,105.38-.38,16.61-.6,22.69,4.59,20.33,20.72-.87,6-.14,12.21-.14,19.79-6.1.53-11,1.31-15.85,1.32-42.5.1-85,.19-127.49,0-26.38-.11-52.75-26.68-52.8-53q-.14-64.14,0-128.3c.08-24.46,26.4-51,51-51.11,47.54-.22,95.07-.07,143.88-.07v40.68Z" transform="translate(-74.54 -406.71)"/><polygon points="240.17 183.98 240.17 46.36 297.05 0 421.57 0 421.57 48.53 292.44 48.53 292.44 183.98 240.17 183.98"/><polygon points="472.31 51.79 472.31 189.41 415.42 235.77 290.9 235.77 290.9 187.24 420.04 187.24 420.04 51.79 472.31 51.79"/></g><g class="cc-logo__accent"><path d="M772.43,729.18c5.17,8.51,10.14,16.7,15.12,24.92-8.86,3.31-14.63,1.4-19.1-6.06-3.38-5.63-6.74-11.27-10.32-16.78-.8-1.23-2.44-2.7-3.74-2.74-8.4-.25-16.81-.13-25.92-.13v26.45H714.79V686.21c1.59-.11,3.22-.32,4.86-.32q24.79,0,49.6,0c8.7,0,16.18,7.41,16.22,15.92a48.32,48.32,0,0,0,.06,7C787.16,719.1,780.6,724.37,772.43,729.18Zm-43.81-13.4h42.72V698.42H728.62Z" transform="translate(-74.54 -406.71)"/><path d="M856.52,731.52h-42.1v23.23c-4.32,0-8,.19-11.69-.14-.91-.09-2.34-1.91-2.35-2.94-.13-17.56-.2-35.12,0-52.67.06-5.09,8.64-13,13.87-13.06q20.93-.21,41.86,0c5.24.05,14.06,7.87,14.11,12.84.18,18.36.07,36.73.07,55.57H856.52Zm-42-12.78h41.58V698.55H814.47Z" transform="translate(-74.54 -406.71)"/><path d="M701.41,742.5V755h-5.78c-12.4,0-24.79,0-37.19,0-8.42,0-16.48-7.74-16.5-15.82q-.06-19,0-38.11c0-7.2,8.1-15.14,15.49-15.18,14.46-.06,28.91,0,43.79,0v12.06H656.45V742.5Z" transform="translate(-74.54 -406.71)"/><path d="M945.27,686v12.07H900.45v16.84h37.32v12.25H900.08c0,7.74-.32,15,.11,22.3.28,4.76-1.45,6.36-6.1,5.73-1.52-.21-3.28.38-4.59-.16s-3.2-2-3.22-3.14q-.28-26.34-.06-52.69c0-4.48,8.14-13,12.68-13.12C914.21,685.83,929.53,686,945.27,686Z" transform="translate(-74.54 -406.71)"/><path d="M994.9,754.6H981.12V698.31H953.41v-12h68.68v11.61H994.9Z" transform="translate(-74.54 -406.71)"/></g></svg>
```

Note that `class="cls-1"` from the original SVG has been replaced with two semantic groups (`cc-logo__primary` and `cc-logo__accent`) so the two parts can be styled independently. **Do not** use `<img src="...">` — you need direct CSS access to the inner groups.

### Step 1b. Inline the SVG in the header

In the site-header template, replace whatever placeholder logo currently sits at the start of the header (typically a small icon SVG or a text wordmark like `CODECRAFT_SOLUTIONS`).

The new structure:

```html
<a class="cc-mark" routerLink="/" aria-label="CodeCraft Solutions — Home">
  <span class="cc-mark__logo">
    <!-- Inline the full SVG content from step 1a here (without the outer file wrapper) -->
    <svg viewBox="0 0 984.78 368.72" role="img" aria-label="CodeCraft Solutions">
      <g class="cc-logo__primary">…</g>
      <g class="cc-logo__accent">…</g>
    </svg>
  </span>
  <span class="cc-mark__divider" aria-hidden="true"></span>
  <span class="cc-mark__sub">
    EST.<br>
    <strong>13 04 2020</strong>
  </span>
</a>
```

### Step 1c. Styles

In the header SCSS (or wherever logo styles live):

```scss
.cc-mark {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  text-decoration: none;
  color: var(--cc-ink); // or --bp-ink — match your token name
}

.cc-mark__logo {
  display: inline-flex;
  align-items: center;
  height: 34px;

  svg {
    height: 100%;
    width: auto;
    display: block;
    overflow: visible; // so the chamfered bar corners don't clip
  }
}

.cc-logo__primary { fill: var(--cc-ink); }
.cc-logo__accent  { fill: var(--cc-bg); }
// ^ CRITICAL: --cc-bg, NOT --cc-ink-mute and NOT --cc-accent.
// The "CRAFT" text is a reverse-out / knockout of the bar — it must use the page bg color
// to punch through cleanly. Verify in all three themes.

.cc-mark__divider {
  width: 1px;
  height: 28px;
  background: var(--cc-rule);
  opacity: 0.7;
}

.cc-mark__sub {
  font-family: var(--cc-font-mono); // JetBrains Mono
  font-size: 10px;
  font-weight: 600;
  color: var(--cc-ink-soft);
  letter-spacing: 0.22em;
  line-height: 1.4;
  text-align: left;

  strong {
    color: var(--cc-ink);
    font-weight: 700;
    letter-spacing: 0.14em;
  }
}
```

**Commit:** `sync(brand): replace placeholder logo with CodeCraft SVG wordmark`

---

## 2. Replace hero eyebrow tag

The hero eyebrow callout in the home component currently reads `FIG.01 · PRIMARY OUTPUT` or `FIG.01 — ENGINEERING STUDIO`. Replace it with:

```
NOVI SAD · ENGINEERING STUDIO
```

Keep the existing `cc-callout` styling (small leading dot, uppercase mono).

Search the home component (`src/app/features/home/`) for `FIG.01` and replace.

**Commit:** `sync(brand): update hero eyebrow to NOVI SAD · ENGINEERING STUDIO`

---

## 3. Belgrade → Novi Sad (global)

Do a case-aware find-and-replace across the entire repo:

- `Belgrade` → `Novi Sad`
- `BELGRADE` → `NOVI SAD`
- `belgrade` → `novi sad` (mostly comments — review case-by-case)

Touchpoints:

- Header eyebrow / hero callout (covered in §2)
- Hero lede paragraph: `...is a Novi Sad-based engineering studio...`
- Footer location line: `NOVI SAD · RS · REMOTE`
- Contact page address
- Meta tags / og:description in `index.html`
- Any tests asserting on the string
- Map default center (if any) — Novi Sad coords are `[45.2671, 19.8335]`, zoom 13. (Belgrade was `[44.8125, 20.4612]`.) Update header LAT/LON meta cells too: **LAT 45.2671** / **LON 19.8335**.

**Run:**
```bash
rg -in 'belgrade'
```
After replacing, this must return nothing.

**Commit:** `sync(copy): Belgrade → Novi Sad across the app`

---

## 4. Delete decorative spec-sheet labels

These were placeholder/flavor strings that don't carry real meaning. Find any occurrences and remove the surrounding markup:

- `CCS / REV.04` — was sub-stamp under the old wordmark
- `BUILD 2026.04`, `BUILD 2026.05` — fake build labels
- `FIG.01 · PRIMARY OUTPUT`, `FIG.01 — ENGINEERING STUDIO`, `FIG.01 — PRIMARY OUTPUT` — fake figure labels
- `DRAWING NO. CCS-2026-04` — fake drawing-number stamp in footer

```bash
rg -i 'rev\.04|build 2026|fig\.01|drawing no'
```

Should return nothing after cleanup.

**Commit:** `chore: remove placeholder spec-sheet labels`

---

## 5. Founding date stamp — consistency check

The official founding date is **13 04 2020** (13 April 2020). Make sure this is the only date used anywhere "EST." or "founded" or "since" appears:

```bash
rg -i 'est\.|founded|since 20'
```

Check each hit. Replace any `2018`, `2023`, or other years with `2020`. The canonical format for the date is space-separated: `13 04 2020`. No dots, no slashes, no dashes.

**Commit:** `fix: correct founding year to 2020 everywhere`

---

## 6. Footer location

The footer should show three mono lines:

```
© 2026 CODECRAFT_SOLUTIONS · ALL RIGHTS RESERVED
HELLO@CODECRAFTSOLUTIONS.RS
NOVI SAD · RS · REMOTE
```

Verify this matches what your footer component renders. Drop any `DRAWING NO.` stamp.

**Commit:** `sync(brand): footer location and labels`

---

## Verification sweep

Run all of these. Each must return zero hits:

```bash
rg -in 'belgrade'
rg -i  'rev\.04'
rg -i  'build 2026'
rg -i  'fig\.01'
rg -i  'drawing no'
rg -i  'est\. *20(18|19|21|22|23|24|25|26)'  # any founding year that isn't 2020
```

Then:

```bash
npm run build
npm test  # if tests exist
```

Manual smoke test in dev mode:

1. `npm start` and open the home page.
2. Cycle through all three themes (light, dark, sable) via the theme toggle.
3. For each theme verify:
   - Logo's "CRAFT" letterforms knock out cleanly to the page background — no dark muddy fill behind them.
   - EST. stamp is readable: `EST.` softer, `13 04 2020` bolder.
   - Hero eyebrow reads `NOVI SAD · ENGINEERING STUDIO`.
   - Footer shows `NOVI SAD · RS · REMOTE`.
4. Open the contact page — address should mention Novi Sad.

If anything is off in light theme specifically, double-check `.cc-logo__accent` is filled with `var(--cc-bg)` (the background token) and not `var(--cc-ink-mute)` — the mute color was a wrong earlier guess and renders muddy on the light surface.

---

## When done

Push the branch and open a PR titled **"Sync brand identity from Blueprint template"**. PR description should list the six commits and link the verification screenshots (one per theme).
