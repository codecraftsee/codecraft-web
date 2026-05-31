# FIG.A redesign — "Stack & Selected Work" cards (replaces the radar)

**Goal:** Replace the FIG.A instrument in the home hero aside. The old version is a
static polygon **radar** (stack coverage). The new version is an interactive
**tech ⇄ client** panel:

- A row of **technology filter tabs** (Angular, React, TypeScript, Java·Spring, DevOps).
- A vertical list of **client cards** (real selected work).
- **Bidirectional selection:**
  - Click a **tech tab** → the client cards that used it highlight; the rest dim. Tabs auto-cycle.
  - Click a **client card** → it pins (accent border + `◉ PINNED`), the rest dim, auto-cycle pauses, and the technologies that client used **light up in the tab strip** (pulsing accent dot).
  - Click the pinned card again, or any tab, to release.

I (the agent that wrote this) cannot see your repo — you can. Diff against what's
described and adapt names if your structure differs, but the visual + behavior spec is exact.

---

## Step 1 — Where it lives today

The current FIG.A is inlined in:

```
src/app/features/home/home.component.ts     ← the `.cc-instrument` <aside> block + `RadarAxis` / `#buildRadar()`
src/app/features/home/home.component.scss    ← `.cc-instrument*` rules (~line 122+)
```

You'll **extract it into its own standalone component** `cc-tech-radar` (matches the
placeholder already referenced in `CLAUDE_CODE_HOME_DIFF.md`: `<cc-tech-radar>`), then
delete the old radar code from `home.component.ts`.

---

## Step 2 — Create the component

**`src/app/features/home/tech-radar/tech-radar.component.ts`**

```ts
import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  computed,
  effect,
  signal,
} from '@angular/core';

interface CcTech {
  id: string;
  name: string;
  accent: string;
}

interface CcClient {
  id: string;
  client: string;
  role: string;
  stack: string;
  period: string;
  techs: string[]; // CcTech ids
}

@Component({
  selector: 'cc-tech-radar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tech-radar.component.scss',
  // accent drives the whole panel; set as a CSS var on the host
  host: { '[style.--cc-accent]': 'accent()' },
  template: `
    <div class="cc-instrument cc-instrument--cards">
      <div class="cc-instrument__head">
        <span class="cc-mono">FIG.A · STACK &amp; SELECTED WORK</span>
        <span class="cc-mono cc-instrument__legend">{{ legend() }}</span>
      </div>

      <!-- Tech filter tabs -->
      <div class="cc-techsel" role="tablist" aria-label="Filter by technology">
        @for (t of techs; track t.id; let i = $index) {
          <button
            type="button"
            role="tab"
            [attr.aria-selected]="isTabActive(i) || isTabMatch(t)"
            class="cc-techsel__tab"
            [class.is-active]="isTabActive(i)"
            [class.is-match]="isTabMatch(t)"
            [style.--tab-accent]="t.accent"
            (click)="pickTech(i)"
          >
            <span class="cc-techsel__dot"></span>
            <span class="cc-mono cc-techsel__name">{{ t.name }}</span>
          </button>
        }
      </div>

      <!-- Client cards -->
      <div class="cc-cards" aria-label="Selected work">
        @for (c of clients; track c.id; let i = $index) {
          <article
            class="cc-card"
            [class.is-matched]="isCardHighlighted(c, i)"
            [class.is-dim]="!isCardHighlighted(c, i)"
            [class.is-pinned]="clientMode() && i === selClient()"
            [attr.aria-current]="isCardHighlighted(c, i)"
            role="button"
            tabindex="0"
            (click)="pickClient(i)"
            (keydown.enter)="pickClient(i); $event.preventDefault()"
            (keydown.space)="pickClient(i); $event.preventDefault()"
          >
            <span class="cc-card__rail" aria-hidden="true"></span>
            <div class="cc-card__body">
              <div class="cc-card__top">
                <span class="cc-mono cc-card__idx">{{ pad(i + 1) }}</span>
                <h4 class="cc-card__client">{{ c.client }}</h4>
                @if (!clientMode() && isCardHighlighted(c, i)) {
                  <span class="cc-mono cc-card__match">● {{ tech().name }}</span>
                }
                @if (clientMode() && i === selClient()) {
                  <span class="cc-mono cc-card__match">◉ PINNED</span>
                }
              </div>
              <p class="cc-card__role">{{ c.role }}</p>
              <div class="cc-card__foot">
                <span class="cc-mono cc-card__stack" [title]="c.stack">{{ c.stack }}</span>
                <span class="cc-mono cc-card__period">{{ c.period }}</span>
              </div>
            </div>
          </article>
        }
      </div>

      <div class="cc-instrument__foot">
        <span class="cc-mono">
          {{ clientMode() ? '◉ CLIENT PINNED · CLICK TO RELEASE'
                          : (paused() ? '⏸ HOVER · MANUAL' : '▶ AUTO-CYCLE') }}
        </span>
        <span class="cc-mono">{{ footCounter() }}</span>
      </div>
    </div>
  `,
})
export class TechRadarComponent {
  // ── DATA — edit freely to add/replace clients & technologies ──────────────
  readonly techs: CcTech[] = [
    { id: 'angular', name: 'ANGULAR',      accent: '#5BD0E8' },
    { id: 'react',   name: 'REACT',        accent: '#7AE3A4' },
    { id: 'ts',      name: 'TYPESCRIPT',   accent: '#C58BE8' },
    { id: 'java',    name: 'JAVA · SPRING', accent: '#F2B36E' },
    { id: 'devops',  name: 'DEVOPS',       accent: '#E8C45B' },
  ];

  readonly clients: CcClient[] = [
    {
      id: 'scfc',
      client: 'South Carolina Family Court',
      role: 'Case Management Platform',
      stack: 'Angular 19 · AngularJS · RxJS · TypeScript · DevExtreme',
      period: 'Oct 2024 – Feb 2026',
      techs: ['angular', 'ts'],
    },
    {
      id: 'kterio',
      client: 'Kterio',
      role: 'Building Management System',
      stack: 'Angular 16 · SCSS · TypeScript · Git',
      period: 'Jan 2022 – Oct 2024',
      techs: ['angular', 'ts'],
    },
    {
      id: 'amore',
      client: 'A-More Yachts',
      role: 'Charter & Fleet Platform',
      stack: 'Spring Boot · Angular 18 · TypeScript · SCSS',
      period: 'Nov 2023 – Jun 2024',
      techs: ['angular', 'ts', 'java'],
    },
    {
      id: 'goinstore',
      client: 'Go Instore',
      role: 'Live Video Commerce',
      stack: 'React 17 · Angular 10 · CometChat · SCSS · MySQL',
      period: 'May 2020 – 2021',
      techs: ['react', 'angular'],
    },
    {
      id: 'oakrand',
      client: 'Oakland & Randstad',
      role: 'Backend & Platform Engineering',
      stack: 'Java 11–24 · Spring 5/6 · Kubernetes · Redis · RabbitMQ',
      period: 'Jun 2024 – Present',
      techs: ['java', 'devops'],
    },
  ];

  private static readonly CYCLE_MS = 4200;

  // ── STATE ────────────────────────────────────────────────────────────────
  readonly active = signal(0);                 // active tech index
  readonly selClient = signal<number | null>(null);
  readonly paused = signal(false);

  // ── DERIVED ──────────────────────────────────────────────────────────────
  readonly clientMode = computed(() => this.selClient() !== null);
  readonly tech = computed(() => this.techs[this.active()]);

  readonly accent = computed(() => {
    const sc = this.selClient();
    if (sc !== null) {
      const c = this.clients[sc];
      return this.techs.find(t => t.id === c.techs[0])?.accent ?? this.tech().accent;
    }
    return this.tech().accent;
  });

  readonly legend = computed(() => {
    const sc = this.selClient();
    if (sc !== null) {
      const c = this.clients[sc];
      return `${c.client.toUpperCase().slice(0, 16)} · ${this.pad(c.techs.length)} TECH`;
    }
    const t = this.tech();
    const n = this.clients.filter(c => c.techs.includes(t.id)).length;
    return `${t.name} · ${this.pad(n)} / ${this.pad(this.clients.length)}`;
  });

  readonly footCounter = computed(() => {
    const sc = this.selClient();
    return sc !== null
      ? `${this.pad(sc + 1)} / ${this.pad(this.clients.length)}`
      : `${this.pad(this.active() + 1)} / ${this.pad(this.techs.length)}`;
  });

  constructor() {
    // Auto-cycle tech tabs; pause on hover or while a client is pinned.
    // The signal write happens in the async interval callback (outside the
    // reactive context), so allowSignalWrites is not required.
    effect((onCleanup) => {
      if (this.paused() || this.selClient() !== null) return;
      const id = setInterval(
        () => this.active.update(a => (a + 1) % this.techs.length),
        TechRadarComponent.CYCLE_MS,
      );
      onCleanup(() => clearInterval(id));
    });
  }

  @HostListener('mouseenter') onEnter() { this.paused.set(true); }
  @HostListener('mouseleave') onLeave() { this.paused.set(false); }

  // ── HELPERS ──────────────────────────────────────────────────────────────
  isTabActive(i: number): boolean {
    return !this.clientMode() && i === this.active();
  }
  isTabMatch(t: CcTech): boolean {
    const sc = this.selClient();
    return sc !== null && this.clients[sc].techs.includes(t.id);
  }
  isCardHighlighted(c: CcClient, i: number): boolean {
    return this.clientMode() ? i === this.selClient() : c.techs.includes(this.tech().id);
  }

  pickTech(i: number): void {
    this.active.set(i);
    this.selClient.set(null);
  }
  pickClient(i: number): void {
    this.selClient.update(prev => (prev === i ? null : i));
  }

  pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
```

> **Angular version note:** this uses `effect`, `signal`, `computed` (Angular 16+/17+,
> which your repo already uses). If your `effect` doesn't support the `onCleanup`
> argument, replace the auto-cycle with a plain `setInterval` started in
> `ngOnInit` + cleared in `ngOnDestroy`, gated on `paused()`/`selClient()`.

---

## Step 3 — SCSS

**`src/app/features/home/tech-radar/tech-radar.component.scss`**

Reuse your existing `.cc-instrument`, `.cc-instrument__head`, `.cc-instrument__legend`,
`.cc-instrument__foot` rules (move them here from `home.component.scss`, or `@use` the
shared sheet). Then add:

```scss
:host { display: block; }

/* container — your existing .cc-instrument shell stays the same */
.cc-instrument--cards { min-height: 240px; }

/* ── Tech filter tabs ─────────────────────────────────── */
.cc-techsel {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 12px 14px;
  border-bottom: 1px solid var(--cc-rule);
}
.cc-techsel__tab {
  appearance: none;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: transparent;
  border: 1px solid var(--cc-rule-strong);
  color: var(--cc-ink-mute);
  padding: 5px 9px;
  cursor: pointer;
  border-radius: 2px;
  transition: border-color 220ms ease, color 220ms ease, background 220ms ease;
}
.cc-techsel__dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--cc-rule-strong);
  transition: background 220ms ease, box-shadow 220ms ease;
}
.cc-techsel__name { font-size: 9px; letter-spacing: 0.14em; }

.cc-techsel__tab:hover {
  border-color: var(--tab-accent);
  color: var(--cc-ink);
}
.cc-techsel__tab:hover .cc-techsel__dot { background: var(--tab-accent); }

.cc-techsel__tab.is-active {
  border-color: var(--tab-accent);
  color: var(--tab-accent);
  background: color-mix(in oklab, var(--tab-accent) 10%, transparent);
}
.cc-techsel__tab.is-active .cc-techsel__dot {
  background: var(--tab-accent);
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--tab-accent) 25%, transparent);
}

/* lit when a pinned client uses this tech */
.cc-techsel__tab.is-match {
  border-color: var(--tab-accent);
  color: var(--tab-accent);
  background: color-mix(in oklab, var(--tab-accent) 14%, transparent);
}
.cc-techsel__tab.is-match .cc-techsel__dot {
  background: var(--tab-accent);
  animation: cc-dot-ping 1.8s ease-in-out infinite;
}
@keyframes cc-dot-ping {
  0%, 100% { box-shadow: 0 0 0 2px color-mix(in oklab, var(--tab-accent) 30%, transparent); }
  50%      { box-shadow: 0 0 0 4px color-mix(in oklab, var(--tab-accent) 18%, transparent); }
}

/* ── Client cards ─────────────────────────────────────── */
.cc-cards {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px 14px;
}
.cc-card {
  position: relative;
  display: flex;
  border: 1px solid var(--cc-rule);
  background: color-mix(in oklab, var(--cc-ink) 2%, transparent);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 320ms ease, background 320ms ease,
              opacity 320ms ease, transform 320ms cubic-bezier(0.22, 1, 0.36, 1);
}
.cc-card:hover { transform: translateX(2px); }
.cc-card:focus-visible { outline: 1px solid var(--cc-accent); outline-offset: 1px; }

.cc-card__rail {
  width: 3px; flex: 0 0 3px;
  background: var(--cc-rule-strong);
  transition: background 320ms ease, box-shadow 320ms ease;
}
.cc-card__body {
  flex: 1 1 auto; min-width: 0;
  padding: 9px 12px 10px;
  display: flex; flex-direction: column; gap: 4px;
}
.cc-card__top { display: flex; align-items: baseline; gap: 8px; }
.cc-card__idx { font-size: 9px; letter-spacing: 0.12em; color: var(--cc-ink-mute); flex: 0 0 auto; }
.cc-card__client {
  margin: 0; flex: 1 1 auto; min-width: 0;
  font-family: var(--cc-font-display);
  font-size: 14px; font-weight: 700; line-height: 1.15;
  letter-spacing: -0.01em; color: var(--cc-ink);
}
.cc-card__match {
  flex: 0 0 auto; font-size: 8px; letter-spacing: 0.14em;
  color: var(--cc-accent); white-space: nowrap;
  animation: cc-card-tag-in 360ms ease;
}
@keyframes cc-card-tag-in {
  from { opacity: 0; transform: translateX(4px); }
  to   { opacity: 1; transform: translateX(0); }
}
.cc-card__role { margin: 0; font-size: 11px; color: var(--cc-ink-soft); line-height: 1.3; }
.cc-card__foot { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 1px; }
.cc-card__stack {
  font-size: 8.5px; letter-spacing: 0.05em; color: var(--cc-ink-mute);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;
}
.cc-card__period { font-size: 8.5px; letter-spacing: 0.08em; color: var(--cc-ink-mute); white-space: nowrap; flex: 0 0 auto; }

/* matched / dimmed / pinned states */
.cc-card.is-matched {
  border-color: color-mix(in oklab, var(--cc-accent) 55%, var(--cc-rule));
  background:
    linear-gradient(90deg, color-mix(in oklab, var(--cc-accent) 9%, transparent) 0%, transparent 55%),
    color-mix(in oklab, var(--cc-ink) 2%, transparent);
}
.cc-card.is-matched .cc-card__rail {
  background: var(--cc-accent);
  box-shadow: 0 0 10px 0 color-mix(in oklab, var(--cc-accent) 60%, transparent);
}
.cc-card.is-dim { opacity: 0.42; }
.cc-card.is-dim:hover { opacity: 0.7; }

.cc-card.is-pinned {
  border-color: var(--cc-accent);
  box-shadow:
    0 0 0 1px color-mix(in oklab, var(--cc-accent) 40%, transparent),
    0 6px 22px -10px color-mix(in oklab, var(--cc-accent) 60%, transparent);
}

@media (prefers-reduced-motion: reduce) {
  .cc-techsel__tab.is-match .cc-techsel__dot { animation: none; }
  .cc-card { transition: none; }
}
```

`.cc-mono` is your existing mono-label utility — keep using it. If it's global you don't
need to redeclare it; if it's component-scoped, copy the rule across.

---

## Step 4 — Wire it into the hero aside

In `home.component.ts`:

1. **Import** the new component and add it to `imports`:
   ```ts
   import { TechRadarComponent } from './tech-radar/tech-radar.component';
   // ...
   imports: [RouterLink, TechRadarComponent],
   ```
2. **Replace** the entire old `<div class="cc-instrument" aria-hidden="true"> … </div>`
   block (the `<svg class="cc-instrument__svg">` radar) with:
   ```html
   <cc-tech-radar></cc-tech-radar>
   ```
   Drop the `aria-hidden` — this panel is now interactive.
3. **Delete** the now-unused `RadarAxis` interface, the `radar` field, and the
   `#buildRadar()` method from `HomeComponent`. Keep `specRows`.
4. **Move** the old `.cc-instrument*` SCSS out of `home.component.scss` into the new
   component's SCSS (or delete the radar-only `.cc-instrument__svg` rule). Leave
   `.cc-spec*` and `.cc-hero__aside` where they are.

---

## Step 5 — Verify

- `ng build` / `ng serve` clean — no template or TS errors.
- FIG.A shows 5 tabs + 5 client cards; tabs auto-cycle and highlight matching cards.
- Clicking a card pins it, dims the rest, lights its techs in the strip, shows `◉ PINNED`.
- Clicking the pinned card or any tab releases it.
- Test in all three themes (`dark`, `sable`, `light`) — everything is token-driven so it
  should adapt; the per-tech tab/dot colors are intentionally fixed brand hues.
- Keyboard: cards are focusable (Tab) and toggle on Enter/Space.

That's the whole change. The data in `techs` / `clients` is the single source of truth —
add real projects there as you win them.
