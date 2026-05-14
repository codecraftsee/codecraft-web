# Brand identity update — Blueprint mock → codecraft-web

Apply these changes to the `codecraft-web` Angular app. They're updates to the brand identity layer of the Blueprint design (logo, founding date stamp, location). Reference mock: `CodeCraft Solutions - Blueprint.html` at the project root of the linked design project; canonical implementation lives in `blueprint-app.jsx`.

---

## 1. Logo

Replace any placeholder logo glyph (e.g. the small dot-grid SVG or any text wordmark currently rendered in the header) with the real CodeCraft Solutions SVG wordmark.

**Source file:** `assets/codecraft-logo.svg` (in the design project; copy into `src/assets/brand/codecraft-logo.svg` or your asset folder).

**Inline it** rather than using `<img>` — it has two path groups that need separate theme colors.

### SVG structure

The SVG `viewBox` is `0 0 984.78 368.72`. It contains two groups:

- **Primary group** — the "CODE" wordmark and the chunky bar that "CRAFT" sits inside.
- **Accent group** — the "CRAFT" letters that are knocked out of the bar.

Wrap each group with a class so they can be styled independently:

```html
<svg viewBox="0 0 984.78 368.72" role="img" aria-label="CodeCraft Solutions">
  <g class="cc-logo__primary">
    <!-- 5 polygons + 3 paths, no .cls-1 -->
  </g>
  <g class="cc-logo__accent">
    <!-- 5 .cls-1 paths -->
  </g>
</svg>
```

(Take the exact path data from `assets/codecraft-logo.svg`. Drop the `class="cls-1"` attributes and the empty `<defs>`. Keep all `transform="translate(-74.54 -406.71)"` attributes — they're load-bearing.)

### Colors — critical

The "CRAFT" portion is a **reverse-out / knockout** of the bar, not a tinted overlay. It must use the background color of whatever surface the logo sits on, so it punches through to that color:

```scss
.cc-logo__primary { fill: var(--bp-ink); }
.cc-logo__accent  { fill: var(--bp-bg); }  // NOT ink-mute, NOT accent
```

Previously this was tried with `--bp-ink-mute` and looked muddy in light theme — `--bp-bg` is the only correct choice. Verify against all three themes (light, dark, sable).

### Sizing

In the header it sits at `height: 34px`, width auto. Use `display: block` on the SVG, and `overflow: visible` so the bar's chamfered corners don't clip.

---

## 2. Foundation stamp (next to the logo)

To the right of the logo, after a vertical divider rule, render a small two-line founding-date stamp:

```
EST.
13 04 2020
```

- `EST.` — mono, 10px, 600 weight, `--bp-ink-soft`, letter-spacing `0.22em`
- `13 04 2020` — mono, 10px, 700 weight, `--bp-ink`, letter-spacing `0.14em`
- Divider — `1px × 28px`, `background: var(--bp-rule)`, `opacity: 0.7`
- The whole stamp sits inline-flex with the logo, `gap: 14px` between logo / divider / stamp.

The date is space-separated (no dots, no slashes): `13 04 2020`.

---

## 3. Hero eyebrow callout

The eyebrow tag above the hero h1 currently reads (in the older draft) `FIG.01 · PRIMARY OUTPUT` or `FIG.01 — ENGINEERING STUDIO`. Replace with:

```
NOVI SAD · ENGINEERING STUDIO
```

Same `bp-callout` styling — small leading dot, mono uppercase, ink-mute color.

---

## 4. Copy / location fixes (Belgrade → Novi Sad)

Global find-and-replace across the app. Match-case both directions:

- `Belgrade` → `Novi Sad`
- `BELGRADE` → `NOVI SAD`

Touchpoints to verify:

- Header eyebrow / hero kicker
- Hero lede paragraph (`...is a Novi Sad-based engineering studio...`)
- Footer location line (`NOVI SAD · RS · REMOTE` or equivalent)
- Contact page address block
- Any meta/og description tags
- Map default center (if any) — Novi Sad is `45.2671, 19.8335` (was Belgrade `44.8125, 20.4612`)
- "EST." line elsewhere — confirm `2020` is correct everywhere; some legacy strings may say 2018 or 2023.

---

## 5. Removed elements

These decorative labels were removed and should not be re-introduced:

- `CCS / REV.04` (revision stamp under the old wordmark)
- `BUILD 2026.04` (build label)
- `FIG.01 · PRIMARY OUTPUT` (hero eyebrow placeholder)
- `DRAWING NO. CCS-2026-04` (footer)

If you find any of these in the current code, delete them.

---

## Verification checklist

- [ ] Logo renders in all three themes (light, dark, sable) with "CRAFT" knocked out cleanly — no visible fill behind it.
- [ ] Logo SVG has `overflow: visible` so chamfered corners aren't clipped.
- [ ] EST. stamp is legible in all three themes — date in full ink, label in soft.
- [ ] No occurrences of `Belgrade` / `BELGRADE` remain (`rg -i belgrade` returns nothing).
- [ ] Founding date appears consistently as `13 04 2020` (mono, space-separated).
- [ ] Eyebrow tag near hero reads `NOVI SAD · ENGINEERING STUDIO`.
- [ ] Old decorative labels (REV.04, BUILD, FIG.01, DRAWING NO.) are gone.
