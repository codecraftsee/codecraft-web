# Home page sync — Blueprint template vs local codebase

Your job: open the **current** state of the home component(s) in this repo, compare against the **canonical home spec** below, and produce a diff report. Then apply only the changes the user approves.

I (the agent that wrote this doc) cannot see your codebase. You can. So you do the diffing.

---

## Step 1 — Find the home component

Search the repo:

```bash
fd -t f -e ts -e html 'home' src/app/features/home
```

You're looking for:
- The home page component (TS + HTML template)
- The home component's SCSS
- Any sub-components rendered only from home (hero, system-spec, tech-radar, etc.)

If the layout differs from `src/app/features/home/...`, adapt — but show me what you found before continuing.

---

## Step 2 — Canonical home spec (what the template currently renders)

The home page **currently consists of exactly one section**: a hero "plate". Nothing else. If your codebase has additional sections (services preview, principles grid, CTA band, capabilities index, matrix, etc.), **stop and ask** before removing them — you may have intentionally kept extra sections that the template stripped.

### 2.1 Outer structure

```
<div class="cc-page">
  <section class="cc-plate">
    <span class="cc-plate__corners" aria-hidden></span>

    <!-- Top dimension line -->
    <div class="cc-dims cc-dims--top">
      <span class="cc-mono">VIEW · 01 / OVERVIEW</span>
      <span class="cc-dims__line"></span>
      <span class="cc-mono">W·1280 · H·auto</span>
    </div>

    <!-- Hero body (2-column grid) -->
    <div class="cc-hero">
      <div class="cc-hero__main">…</div>
      <aside class="cc-hero__aside">…</aside>
    </div>

    <!-- Bottom dimension line -->
    <div class="cc-dims cc-dims--bottom">
      <span class="cc-mono">CCS · END OF OVERVIEW</span>
      <span class="cc-dims__line"></span>
      <span class="cc-mono">SHEET 01 / 01</span>
    </div>
  </section>
</div>
```

The `.cc-plate__corners` span uses `::before`/`::after` pseudo-elements (or four explicit `<i>` spans) to draw the four corner brackets. Keep whatever you already have for plate corners.

### 2.2 Hero main column (left)

```
<div class="cc-hero__main">
  <div class="cc-callout">
    <span class="cc-callout__dot"></span>
    <span class="cc-mono">NOVI SAD · ENGINEERING STUDIO</span>
  </div>

  <h1 class="cc-h1">
    We engineer<br>
    <span class="cc-h1__accent">software systems</span><br>
    <span class="cc-h1__sub">that ship and stay shipped.</span>
  </h1>

  <p class="cc-lede">
    CodeCraft Solutions is a Novi Sad-based engineering studio. We design,
    build, and maintain web and mobile software for teams who treat their
    codebase as critical infrastructure — not a sketch.
  </p>

  <div class="cc-actions">
    <a class="cc-btn cc-btn--primary" routerLink="/contact">
      <span class="cc-btn__label">INITIATE_PROJECT</span>
      <!-- arrow icon, 14px -->
    </a>
    <a class="cc-btn cc-btn--ghost" routerLink="/services">
      <span class="cc-btn__label">VIEW_CAPABILITIES</span>
    </a>
  </div>
</div>
```

Notes:
- Headline is **3 visual lines**: plain ink → accent color → soft ink (smaller weight). The middle line "software systems" is in `--cc-accent`; the third line "that ship and stay shipped." is in `--cc-ink-soft` with `font-weight: 500`.
- `cc-callout` has a tiny accent-colored dot before the label. Already exists in your shared lib probably.
- Buttons: primary = filled accent / ink-on-accent text; ghost = transparent fill, ink color, `--cc-rule-strong` border.

### 2.3 Hero aside (right column)

Two stacked panels:

#### a) "SYSTEM SPECIFICATION" spec card

```
<aside class="cc-hero__aside">
  <cc-spec [head]="'SYSTEM SPECIFICATION'" [rows]="specRows"></cc-spec>
  <cc-tech-radar *ngIf="showInstrument"></cc-tech-radar>
</aside>
```

Where `specRows` is:

```ts
specRows = [
  ['CLIENTS',      '40+'],
  ['UPTIME / SLA', '99.95%'],
  ['LOC SHIPPED',  '2.4M'],
  ['AVG_RESPONSE', '<24h'],
  ['STACK_DEPTH',  '12 lang.'],
  ['REGIONS',      'EU · NA'],
];
```

The `cc-spec` component renders a bordered card with a small mono header, then dotted-leader rows: `KEY ........ value`. You should already have this component — verify the data matches.

#### b) Tech radar instrument

A small radar / spider chart with 5 axes. Header reads `FIG.A · STACK COVERAGE` on the left, `05 DOMAINS` on the right. Axes:

```ts
axes = [
  { label: 'FRONTEND', sub: 'React · Next · Angular',  score: 0.92 },
  { label: 'BACKEND',  sub: 'Java · Node · Go',         score: 0.88 },
  { label: 'DATABASE', sub: 'Postgres · Kafka',         score: 0.80 },
  { label: 'INFRA',    sub: 'AWS · K8s · Docker',       score: 0.78 },
  { label: 'MOBILE',   sub: 'Swift · Kotlin',           score: 0.85 },
];
```

Geometry: 5-sided pentagon. SVG viewBox `0 0 290 220`. Center `(145, 108)`, radius `52`. Rings drawn at scale factors `0.25, 0.5, 0.75, 1.0`. Polygon for the data shape is `fill="var(--cc-accent)" fill-opacity="0.13" stroke="var(--cc-accent)" stroke-width="1.5"`. Axis lines and rings use `currentColor` at 0.3 opacity. Labels sit at `1.45×R` from center, anchored left/right/center based on horizontal position relative to center. Sub-labels below each label at 7.5px in `--cc-ink-soft`.

Controlled by a tweak/signal `showInstrument` (default `true`).

### 2.4 Tokens used in this page

- `--cc-bg`, `--cc-bg2`, `--cc-panel`
- `--cc-ink`, `--cc-ink-soft`, `--cc-ink-mute`
- `--cc-accent`
- `--cc-rule`, `--cc-rule-strong`
- `--cc-font-mono`, `--cc-font-display`

If your tokens are still prefixed `--bp-*` from earlier work, that's fine — just be consistent.

---

## Step 3 — Produce a diff report

Walk through the current home component(s) and produce a Markdown report with these sections. **Show this to the user before changing anything.**

```md
### Home page diff

**Files inspected:** `<list of files>`

**Sections in local that are NOT in the canonical template:**
- <section name>: <what it contains, brief>
- ...
(ask user: keep, remove, or move?)

**Sections in canonical template that are NOT in local:**
- <section name>
(ask user: should I add?)

**Sections present in both, but differ:**

1. Hero callout
   - local:  `<exact text/markup>`
   - canon:  `NOVI SAD · ENGINEERING STUDIO`
   - delta:  <what to change>

2. Hero headline
   - local:  `<...>`
   - canon:  3 lines, middle in accent, third in soft ink
   - delta:  <...>

3. Hero lede
   - local:  `<...>`
   - canon:  "CodeCraft Solutions is a Novi Sad-based engineering studio..."
   - delta:  <...>

4. SYSTEM SPECIFICATION rows
   - local:  <rows>
   - canon:  CLIENTS / UPTIME / LOC SHIPPED / AVG_RESPONSE / STACK_DEPTH / REGIONS
   - delta:  <...>

5. Tech radar axes
   - local:  <axes>
   - canon:  FRONTEND / BACKEND / DATABASE / INFRA / MOBILE
   - delta:  <...>

6. Dimension lines (top & bottom)
   - local:  <...>
   - canon:  top: "VIEW · 01 / OVERVIEW" / "W·1280 · H·auto"
            bottom: "CCS · END OF OVERVIEW" / "SHEET 01 / 01"
   - delta:  <...>
```

---

## Step 4 — Wait for user direction

Do **not** apply changes until the user reviews the diff report and tells you which deltas to apply. Some of the divergences may be intentional improvements they made locally — you don't know which.

When they approve a set of changes, apply each with a focused commit:

- `sync(home): hero callout`
- `sync(home): headline + lede`
- `sync(home): system specification rows`
- `sync(home): tech radar axes`
- `sync(home): dimension line labels`
- etc.

---

## Step 5 — Verify

After applying:

```bash
npm run build
npm start  # smoke test
```

Then run the global verification sweep from `CLAUDE_CODE_LOCAL_SYNC.md` if you ran that first:

```bash
rg -in 'belgrade|rev\.04|build 2026|fig\.01|drawing no'
```

Open the home page in all three themes and visually confirm:
- Hero plate corner brackets render
- Headline middle line is accent-colored
- Spec card dotted leaders align
- Tech radar polygon visible with accent fill
- Top and bottom dimension labels read correctly
