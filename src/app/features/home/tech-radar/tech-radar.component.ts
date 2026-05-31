import {
  ChangeDetectionStrategy,
  Component,
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
  techs: string[];
}

@Component({
  selector: 'cc-tech-radar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './tech-radar.component.scss',
  host: {
    '[style.--cc-accent]': 'accent()',
    '(mouseenter)': 'paused.set(true)',
    '(mouseleave)': 'paused.set(false)',
  },
  template: `
    <div class="cc-instrument cc-instrument--cards">
      <div class="cc-instrument__head">
        <span class="cc-mono">FIG.A · STACK &amp; SELECTED WORK</span>
        <span class="cc-mono cc-instrument__legend">{{ legend() }}</span>
      </div>

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
        <span class="cc-mono">{{ footStatus() }}</span>
        <span class="cc-mono">{{ footCounter() }}</span>
      </div>
    </div>
  `,
})
export class TechRadarComponent {
  readonly techs: CcTech[] = [
    { id: 'angular', name: 'ANGULAR',       accent: '#5BD0E8' },
    { id: 'react',   name: 'REACT',         accent: '#7AE3A4' },
    { id: 'ts',      name: 'TYPESCRIPT',    accent: '#C58BE8' },
    { id: 'java',    name: 'JAVA · SPRING', accent: '#F2B36E' },
    { id: 'devops',  name: 'DEVOPS',        accent: '#E8C45B' },
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

  readonly active = signal(0);
  readonly selClient = signal<number | null>(null);
  readonly paused = signal(false);

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

  readonly footStatus = computed(() => {
    if (this.clientMode()) return '◉ CLIENT PINNED · CLICK TO RELEASE';
    return this.paused() ? '⏸ HOVER · MANUAL' : '▶ AUTO-CYCLE';
  });

  readonly footCounter = computed(() => {
    const sc = this.selClient();
    return sc !== null
      ? `${this.pad(sc + 1)} / ${this.pad(this.clients.length)}`
      : `${this.pad(this.active() + 1)} / ${this.pad(this.techs.length)}`;
  });

  constructor() {
    effect((onCleanup) => {
      if (this.paused() || this.selClient() !== null) return;
      const id = setInterval(
        () => this.active.update(a => (a + 1) % this.techs.length),
        TechRadarComponent.CYCLE_MS,
      );
      onCleanup(() => clearInterval(id));
    });
  }

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
