# Full template diff — Blueprint vs local codebase

Companion to `CLAUDE_CODE_HOME_DIFF.md`. This doc covers **chrome (header + nav + footer), services, team, contact**. Same workflow as before:

1. Find the relevant component(s) in the local repo.
2. Compare against the canonical spec below.
3. **Produce a diff report and show it to the user before changing anything.**
4. Apply approved changes in focused commits.

I cannot see your local code — you do the diffing.

---

# PART A — Chrome (header, nav, theme toggle, scroll progress)

**Likely location:** `src/app/shared/site-header/` (TS + HTML + SCSS).

## A.1 Top row — three lanes

```
<header class="cc-chrome">
  <div class="cc-chrome__top">
    <!-- LANE 1: brand mark + EST stamp -->
    <a class="cc-mark" routerLink="/" aria-label="CodeCraft Solutions — Home">
      <span class="cc-mark__logo"><!-- inline SVG (see CLAUDE_CODE_LOCAL_SYNC.md §1) --></span>
      <span class="cc-mark__divider" aria-hidden="true"></span>
      <span class="cc-mark__sub">EST.<br><strong>13 04 2020</strong></span>
    </a>

    <!-- LANE 2: meta cells (hidden when showHud === false) -->
    <div class="cc-meta" *ngIf="showHud">
      <cc-meta-cell label="LAT" value="45.2671"></cc-meta-cell>
      <cc-meta-cell label="LON" value="19.8335"></cc-meta-cell>
      <cc-meta-cell label="STATUS">
        <span class="cc-pulse">OPERATIONAL</span>
      </cc-meta-cell>
      <cc-meta-cell label="UTC">
        <span>{{ utcClock() }}</span>  <!-- live HH:MM:SS, ticks every second -->
      </cc-meta-cell>
    </div>
  </div>
  ...
</header>
```

Canonical values:
- LAT `45.2671`, LON `19.8335` (Novi Sad)
- STATUS pulse uses `--cc-accent` for the dot + label, with a small 6px circle that fades in/out via CSS `@keyframes`
- UTC clock is `HH:MM:SS` in 24h, updated every 1s via `setInterval` in `ngOnInit` / signal `effect`. Use `Date.prototype.toISOString()` and slice `11..19`.

## A.2 Nav row

```
<nav class="cc-nav">
  <button *ngFor="let n of NAV; let i = index"
          [class.is-active]="route() === n.id"
          (click)="goTo(n.id)"
          class="cc-tab">
    <span class="cc-mono cc-tab__idx">[{{ pad2(i) }}]</span>
    <span class="cc-tab__label">{{ n.label }}</span>
    <span class="cc-tab__bar" *ngIf="route() === n.id"></span>
  </button>
  <div class="cc-nav__spacer"></div>
  <button class="cc-theme-btn" (click)="cycleTheme()" [title]="'Theme: ' + theme()">
    <span class="cc-theme-btn__icon">
      <!-- sun / moon / flame icon depending on theme -->
    </span>
    <span class="cc-mono">THEME / {{ theme().toUpperCase() }}</span>
  </button>
</nav>
```

The NAV data:

```ts
NAV = [
  { id: 'home',     label: 'Home',     numeral: 'I' },
  { id: 'services', label: 'Services', numeral: 'II' },
  { id: 'team',     label: 'Team',     numeral: 'III' },
  { id: 'contact',  label: 'Contact',  numeral: 'IV' },
];
```

- Tab `[00]`/`[01]`/`[02]`/`[03]` index prefix (NOT the roman numeral — the numeral is just available in NAV data if you want it elsewhere).
- Active tab gets an accent-colored 2px bottom bar (`cc-tab__bar`) and accent text color.
- Theme cycle order: light → dark → sable → light.

## A.3 Scroll progress bar (below nav)

```
<div class="cc-progress-track">
  <div class="cc-progress-fill" [style.width.%]="scrollProgress()"></div>
  <span class="cc-mono cc-progress-label">SCROLL · {{ pad3(scrollProgress()) }}%</span>
</div>
```

- 18px tall, full-width, sits flush under the nav row.
- Fill color = `--cc-accent`.
- Label sits absolute-positioned to the right, `--cc-ink-mute`, 9px mono, 0.2em letter-spacing.
- Scroll source: the scrollable content container — not `window`. Use `IntersectionObserver` or a scroll listener on the scroll element.

## A.4 Diff report template — Chrome

Produce this Markdown and show to user:

```md
### Chrome diff
Files: <list>

- [ ] Logo block matches §A.1 (inline SVG, EST stamp `13 04 2020`)
- [ ] LAT / LON values match: 45.2671 / 19.8335
- [ ] STATUS pulse renders accent-colored
- [ ] UTC clock ticks every second
- [ ] Tab index format is `[00]` `[01]` `[02]` `[03]` (zero-padded, square brackets)
- [ ] Active tab has accent bottom bar
- [ ] Theme button reads `THEME / DARK` (uppercase) and cycles light→dark→sable
- [ ] Scroll progress bar renders, label format `SCROLL · 042%`

Divergences found:
  <list each one with local-vs-canon-vs-delta>
```

---

# PART B — Services page

**Likely location:** `src/app/features/services/`.

## B.1 Outer structure

Single plate containing a section head, then a 2-column layout: index of services on the left, detail panel on the right. Selection is local state.

```
<div class="cc-page">
  <section class="cc-plate">
    <cc-plate-corners></cc-plate-corners>
    <cc-dims top label="VIEW · 02 / SERVICES" right="MODE · DETAIL"></cc-dims>
    <cc-section-head num="§01"
                     title="SERVICE CATALOGUE"
                     [right]="'ITEM ' + (active+1) + ' / ' + services.length">
    </cc-section-head>

    <div class="cc-svc-layout">
      <!-- LEFT: clickable index list -->
      <ul class="cc-svc-index">
        <li *ngFor="let sv of services; let i = index">
          <button class="cc-svc-row" [class.is-active]="active === i" (click)="active = i">
            <span class="cc-mono cc-svc-row__num">{{ sv.num }}</span>
            <span class="cc-svc-row__title">{{ sv.title }}</span>
            <span class="cc-svc-row__arrow">{{ active === i ? '●' : '→' }}</span>
          </button>
        </li>
      </ul>

      <!-- RIGHT: detail panel for the active service -->
      <div class="cc-svc-detail">
        <div class="cc-detail-head">
          <div>
            <div class="cc-callout">
              <span class="cc-callout__dot"></span>
              <span class="cc-mono">ITEM {{ s.num }}</span>
            </div>
            <h3 class="cc-detail-title">{{ s.title }}</h3>
          </div>
          <div class="cc-detail-meta">
            <cc-meta-cell label="STATUS" value="ACTIVE"></cc-meta-cell>
            <cc-meta-cell label="DEPTH" value="L3 – L5"></cc-meta-cell>
          </div>
        </div>

        <p class="cc-detail-desc">{{ s.desc }}</p>

        <div class="cc-detail-grid">
          <cc-spec head="DELIVERABLES" [rows]="deliverableRows"></cc-spec>
          <div class="cc-spec">
            <div class="cc-mono cc-spec__head">STACK / TAGS</div>
            <div class="cc-detail-tags">
              <span *ngFor="let t of s.tags" class="cc-chip">{{ t }}</span>
              <span class="cc-chip">TypeScript</span>
              <span class="cc-chip">Node</span>
              <span class="cc-chip">Postgres</span>
              <span class="cc-chip">Docker</span>
            </div>
          </div>
        </div>

        <div class="cc-actions">
          <a class="cc-btn cc-btn--primary" routerLink="/contact">
            <span class="cc-btn__label">REQUEST_QUOTE</span>
            <!-- arrow icon -->
          </a>
        </div>
      </div>
    </div>
  </section>
</div>
```

## B.2 Data

`services` is the same shared array used elsewhere. Canonical content:

```ts
SERVICES = [
  { num: '01', title: 'Web Applications',         desc: 'Dynamic, high-performing web apps tailored to complex problems and engaged users.',                                     tags: ['SPA', 'Real-time', 'Cloud-native'] },
  { num: '02', title: 'AngularJS Migration',      desc: 'Modernise legacy AngularJS to Angular — preserve business logic, unlock performance and long-term support.',             tags: ['Legacy', 'TypeScript', 'Incremental'] },
  { num: '03', title: 'Performance Engineering',  desc: 'Discover, audit and fix bottlenecks across your stack — load times, UI lag, slow APIs, hot queries.',                    tags: ['Profiling', 'Core Web Vitals', 'DB Tuning'] },
  { num: '04', title: 'On-Demand Engineering',    desc: 'Embedded support that squashes critical bugs, unblocks sprints and helps you hit deadlines.',                            tags: ['Urgent', 'Sprint Help', 'Augmentation'] },
  { num: '05', title: 'Mobile Development',       desc: 'Native iOS and Android apps — built for performance, reliability and a seamless experience.',                            tags: ['Swift', 'Kotlin', 'Native'] },
  { num: '06', title: 'Websites',                 desc: 'Responsive, visually engaging sites that communicate your brand and convert visitors into customers.',                   tags: ['Responsive', 'SEO', 'CMS'] },
];

deliverableRows = [
  ['Audit Report', 'PDF'],
  ['Tech Spec',    'Docs'],
  ['Source Code',  'Repo'],
  ['Runbook',      'MD'],
];
```

## B.3 Diff report template — Services

```md
### Services diff
Files: <list>

- [ ] Section head reads "SERVICE CATALOGUE" with §01 and `ITEM N / 6` counter
- [ ] Top dim label: `VIEW · 02 / SERVICES` / `MODE · DETAIL`
- [ ] Each service row: num · title · arrow/dot (● when active, → otherwise)
- [ ] Detail header has ITEM callout, title, STATUS=ACTIVE, DEPTH=L3 – L5 meta cells
- [ ] DELIVERABLES spec has 4 rows: Audit Report·PDF / Tech Spec·Docs / Source Code·Repo / Runbook·MD
- [ ] STACK / TAGS chips include: service.tags + TypeScript + Node + Postgres + Docker
- [ ] CTA button label: `REQUEST_QUOTE` → routes to /contact
- [ ] SERVICES array matches §B.2 exactly (titles, descriptions, tags)

Divergences:
  <...>
```

---

# PART C — Team page

**Likely location:** `src/app/features/team/`.

## C.1 Structure

A roster of "ID cards", one per team member.

```
<div class="cc-page">
  <section class="cc-plate">
    <cc-plate-corners></cc-plate-corners>
    <cc-dims top label="VIEW · 03 / PERSONNEL" [right]="team.length + ' OPERATORS'"></cc-dims>
    <cc-section-head num="§01" title="PERSONNEL ROSTER" right="CLEARED"></cc-section-head>

    <div class="cc-roster">
      <article *ngFor="let m of team; let i = index" class="cc-id">
        <header class="cc-id__head">
          <span class="cc-mono cc-id__num">ID·{{ pad3(i+1) }}</span>
          <span class="cc-mono cc-id__cls">L{{ i+3 }} CLEARANCE</span>
        </header>

        <div class="cc-id__body">
          <div class="cc-id__photo">
            <img [src]="m.img" [alt]="m.name">
            <span class="cc-id__crosshair" aria-hidden>
              <!-- inline SVG: 80x80 dashed-border square with 4 cross marks (see template) -->
            </span>
          </div>
          <div class="cc-id__meta">
            <h3 class="cc-id__name">{{ m.name }}</h3>
            <p class="cc-mono cc-id__role">{{ m.role }}</p>
            <p class="cc-id__quote">"{{ m.quote }}"</p>
            <div class="cc-id__tags">
              <span *ngFor="let t of m.tags" class="cc-chip">{{ t }}</span>
            </div>
          </div>
        </div>

        <footer class="cc-id__foot cc-mono">
          <span>SIG · {{ initials(m.name) }}</span>
          <span>FILE · {{ slug(m.name) }}.id</span>
        </footer>
      </article>
    </div>
  </section>
</div>
```

Helpers:
- `pad3(n)` → `001`, `002`, `003`...
- `initials(name)` → first letter of each word, joined: `Miodrag Pavkovic` → `MP`
- `slug(name)` → lowercase, spaces → `_`: `miodrag_pavkovic`

The `.cc-id__crosshair` SVG:

```html
<svg viewBox="0 0 80 80">
  <rect x="2" y="2" width="76" height="76" fill="none" stroke="currentColor" stroke-width="0.6" stroke-dasharray="3 3"/>
  <line x1="40" y1="0"  x2="40" y2="14" stroke="currentColor" stroke-width="0.8"/>
  <line x1="40" y1="66" x2="40" y2="80" stroke="currentColor" stroke-width="0.8"/>
  <line x1="0"  y1="40" x2="14" y2="40" stroke="currentColor" stroke-width="0.8"/>
  <line x1="66" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="0.8"/>
</svg>
```

## C.2 Data

```ts
TEAM = [
  { name: 'Miodrag Pavkovic',  role: 'CEO & Full-Stack Engineer', quote: 'Ship fast. Think long-term.',           img: 'assets/mio.jpg',      tags: ['Angular', 'Java', 'Spring', 'AWS'] },
  { name: 'Dejan Blanarik',    role: 'CTO & Software Engineer',   quote: 'Clean code is the best documentation.', img: 'assets/dejan.jpg',    tags: ['React', 'Next.js', 'Node', 'GraphQL'] },
  { name: 'Miroslav Pavkovic', role: 'Backend Engineer',          quote: 'Boring code is the best code.',          img: 'assets/miroslav.jpg', tags: ['Go', 'Postgres', 'Kafka', 'K8s'] },
  { name: 'Marija Stojanovic', role: 'Mobile Engineer',           quote: 'Pixels matter. Touch targets matter more.', img: 'assets/marija.jpg', tags: ['Swift', 'Kotlin', 'Flutter'] },
];
```

⚠️ Names/roles/quotes/images are **placeholder content** I wrote for the design. Confirm with the user whether each member is real before pushing to production. If the local codebase has different (and correct) values for these, **keep the local values** — don't overwrite real bios with my placeholders.

## C.3 Diff report template — Team

```md
### Team diff
Files: <list>

- [ ] Top dim label: `VIEW · 03 / PERSONNEL` / `<N> OPERATORS`
- [ ] Section head: §01 PERSONNEL ROSTER · CLEARED
- [ ] Each card: ID·001 header, L3+ CLEARANCE tag, photo with crosshair overlay
- [ ] Card body: name, mono role, quote in quotation marks, tag chips
- [ ] Card footer: SIG · <initials> · FILE · <slug>.id
- [ ] Crosshair SVG renders as dashed square + 4 inward tick marks
- [ ] Team data matches local (real bios) — DO NOT overwrite with my placeholders
- [ ] Image paths exist (assets/mio.jpg, etc.) or local equivalents

Divergences:
  <...>
```

---

# PART D — Contact page

**Likely location:** `src/app/features/contact/`.

## D.1 Structure

3-step intake form inside a narrow plate. After successful submission, the whole plate swaps to a success screen.

### Idle state

```
<div class="cc-page">
  <section class="cc-plate cc-plate--narrow">
    <cc-plate-corners></cc-plate-corners>
    <cc-dims top label="VIEW · 04 / INTAKE" right="FORM · CC-04"></cc-dims>
    <cc-section-head num="§01"
                     title="PROJECT INTAKE FORM"
                     [right]="'STEP ' + step + ' / 3'"></cc-section-head>

    <div class="cc-stepper">
      <div *ngFor="let s of [1,2,3]; let i = index"
           class="cc-step"
           [class.is-active]="step === s"
           [class.is-done]="step > s">
        <span class="cc-mono cc-step__num">0{{ s }}</span>
        <span class="cc-step__label">{{ ['SCOPE','CONSTRAINTS','IDENTIFY'][i] }}</span>
      </div>
    </div>

    <div class="cc-form-frame">
      <!-- Step 1 -->
      <ng-container *ngIf="step === 1">
        <cc-field label="01 / PROJECT_DESCRIPTION" required [error]="errors.projectDescription">
          <textarea rows="6"
                    [(ngModel)]="data.projectDescription"
                    placeholder="Describe the system, the problem, the desired outcome..."></textarea>
        </cc-field>
        <div class="cc-actions">
          <button class="cc-btn cc-btn--primary" (click)="next()">
            <span class="cc-btn__label">CONTINUE</span> <!-- arrow -->
          </button>
        </div>
      </ng-container>

      <!-- Step 2 -->
      <ng-container *ngIf="step === 2">
        <cc-field label="02 / TIMELINE" required [error]="errors.timeline">
          <select [(ngModel)]="data.timeline">
            <option value="">— SELECT —</option>
            <option value="asap">ASAP</option>
            <option value="1-3">1–3 months</option>
            <option value="3-6">3–6 months</option>
            <option value="exploring">Exploring</option>
          </select>
        </cc-field>
        <cc-field label="03 / BUDGET" required [error]="errors.budget">
          <select [(ngModel)]="data.budget">
            <option value="">— SELECT —</option>
            <option value="lt5">&lt; €5K</option>
            <option value="5-15">€5K – €15K</option>
            <option value="15-50">€15K – €50K</option>
            <option value="50+">€50K+</option>
          </select>
        </cc-field>
        <div class="cc-actions cc-actions--split">
          <button class="cc-btn cc-btn--ghost" (click)="prev()">
            <!-- arrowL --> <span class="cc-btn__label">BACK</span>
          </button>
          <button class="cc-btn cc-btn--primary" (click)="next()">
            <span class="cc-btn__label">CONTINUE</span> <!-- arrow -->
          </button>
        </div>
      </ng-container>

      <!-- Step 3 -->
      <ng-container *ngIf="step === 3">
        <cc-field label="04 / FULL_NAME" required [error]="errors.name">
          <input [(ngModel)]="data.name" placeholder="Last, First">
        </cc-field>
        <cc-field label="05 / EMAIL" required [error]="errors.email">
          <input [(ngModel)]="data.email" placeholder="user@domain.tld">
        </cc-field>
        <cc-field label="06 / COMPANY" optional>
          <input [(ngModel)]="data.company" placeholder="Optional">
        </cc-field>
        <div class="cc-actions cc-actions--split">
          <button class="cc-btn cc-btn--ghost" (click)="prev()">
            <!-- arrowL --> <span class="cc-btn__label">BACK</span>
          </button>
          <button class="cc-btn cc-btn--primary" (click)="submit()">
            <span class="cc-btn__label">TRANSMIT</span> <!-- arrow -->
          </button>
        </div>
      </ng-container>
    </div>
  </section>
</div>
```

### Success state

```
<div class="cc-page">
  <section class="cc-plate cc-plate--narrow">
    <cc-plate-corners></cc-plate-corners>
    <div class="cc-success">
      <div class="cc-success__stamp">
        <!-- check icon, 32px -->
      </div>
      <div class="cc-callout">
        <span class="cc-callout__dot"></span>
        <span class="cc-mono">REQUEST RECEIVED · ID·{{ randomId }}</span>
      </div>
      <h1 class="cc-h1">Transmission acknowledged.</h1>
      <p class="cc-lede">Engineering team notified. Expect a response in &lt; 24h UTC.</p>
      <button class="cc-btn cc-btn--ghost" (click)="reset()">
        <span class="cc-btn__label">SUBMIT_ANOTHER</span>
      </button>
    </div>
  </section>
</div>
```

`randomId` is a 4-digit random number generated once at submission: `Math.floor(Math.random()*9000+1000)`.

## D.2 Field component (`cc-field`)

```
<label class="cc-field">
  <span class="cc-mono cc-field__label">
    {{ label }}<span *ngIf="required" class="cc-field__req"> *</span>
    <span *ngIf="optional" class="cc-field__opt"> (OPT)</span>
  </span>
  <ng-content></ng-content>
  <span *ngIf="error" class="cc-mono cc-field__err">! {{ error }}</span>
</label>
```

## D.3 Validation rules

- Step 1: `projectDescription` required, non-empty after trim → error `Tell us about your project.`
- Step 2: `timeline` required → `Select a timeline.`; `budget` required → `Select a budget range.`
- Step 3: `name` required → `Enter your name.`; `email` required → `Enter your email.`; if present, must match `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` → `Enter a valid email.`

## D.4 Diff report template — Contact

```md
### Contact diff
Files: <list>

- [ ] Plate variant: `cc-plate--narrow` (single column, ~720px max)
- [ ] Top dim label: `VIEW · 04 / INTAKE` / `FORM · CC-04`
- [ ] Section head: §01 PROJECT INTAKE FORM · STEP N / 3
- [ ] Stepper: 3 steps labeled SCOPE / CONSTRAINTS / IDENTIFY with state classes (is-active, is-done)
- [ ] Step 1: PROJECT_DESCRIPTION textarea rows=6
- [ ] Step 2: TIMELINE (4 opts) + BUDGET (4 opts) selects
- [ ] Step 3: FULL_NAME / EMAIL / COMPANY (optional) inputs
- [ ] Field labels use `NN /` numbered prefix and `*` / `(OPT)` markers
- [ ] Errors prefixed with `!` in mono, accent or err color
- [ ] Buttons: CONTINUE / BACK / TRANSMIT all uppercase mono with snake_case
- [ ] Validation matches §D.3 exactly
- [ ] Success state shows check stamp, REQUEST RECEIVED callout, ID·NNNN, "Transmission acknowledged.", SUBMIT_ANOTHER button
- [ ] After success, `reset()` clears all fields and returns to step 1

Divergences:
  <...>
```

---

# PART E — Footer

**Likely location:** `src/app/shared/site-footer/`.

```
<footer class="cc-foot">
  <div class="cc-foot__inner">
    <span class="cc-mono">© 2026 CODECRAFT_SOLUTIONS · ALL RIGHTS RESERVED</span>
    <span class="cc-mono">HELLO@CODECRAFTSOLUTIONS.RS</span>
    <span class="cc-mono">NOVI SAD · RS · REMOTE</span>
  </div>
</footer>
```

Three flex-spaced mono lines. No icons. No `DRAWING NO.` stamp. No multi-column with headings. If the local footer is more elaborate, ask the user whether to simplify or keep their richer version.

---

# Final workflow

For each PART above:

1. Read the canonical spec.
2. Open the local files.
3. Produce the diff report (only the relevant section).
4. Show to user.
5. Apply approved deltas with focused commits, e.g.:
   - `sync(chrome): nav tab index format`
   - `sync(services): deliverables spec rows`
   - `sync(team): personnel roster crosshair overlay`
   - `sync(contact): step labels and field numbering`
   - `sync(footer): three-line layout`

After all five parts are reconciled, run:

```bash
rg -in 'belgrade|rev\.04|build 2026|fig\.01|drawing no'
npm run build
npm start  # smoke each route in all three themes
```
