import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService, Theme } from '../../core/theme.service';

const NAV = [
  { id: '/',         label: 'HOME',     idx: '00' },
  { id: '/services', label: 'SERVICES', idx: '01' },
  { id: '/team',     label: 'TEAM',     idx: '02' },
  { id: '/contact',  label: 'CONTACT',  idx: '03' },
];

@Component({
  selector: 'cc-site-header',
  imports: [RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {},
  template: `
    <header class="bp-chrome">
      <!-- TOP ROW -->
      <div class="bp-chrome__top">
        <a class="bp-mark" routerLink="/" aria-label="CodeCraft Solutions home">
          <svg class="bp-mark__logo" aria-hidden="true" viewBox="0 0 984.78 368.72" xmlns="http://www.w3.org/2000/svg">
            <!-- main shapes: ink color (matches body text) -->
            <g fill="var(--cc-ink)">
              <polygon points="984.77 257.64 984.77 326.83 942.88 368.72 520.19 368.72 520.19 299.53 562.08 257.64 984.77 257.64"/>
              <path d="M594.73,407.9H718.41c11.33,0,22.91,1.5,33.94-.3,26.48-4.32,42.81,10.27,57.11,28.5a32.51,32.51,0,0,1,6.43,18.45q.79,69.18.16,138.37c-.16,18.86-27.38,47.08-46.09,47.25-55.51.51-111,.2-166.53.09-2.69,0-5.37-1.1-8.7-1.83Zm46.93,41.79V597.82H769V449.69Z" transform="translate(-74.54 -406.71)"/>
              <path d="M912,448.33v49.78h147.33v41.74H983v-.25H911.8V598H1059v41.76c-16.58,0-32.86,0-49.12,0-31.16,0-62.33.17-93.49,0-25-.19-52-27.12-52.1-52q-.23-65,0-130c.06-18.27,24.15-49.26,41.47-49.66,50.82-1.13,101.68-.39,153.53-.39v40.63Z" transform="translate(-74.54 -406.71)"/>
              <path d="M121.93,447.94V598.26h23.26c35.13,0,70.29.87,105.38-.38,16.61-.6,22.69,4.59,20.33,20.72-.87,6-.14,12.21-.14,19.79-6.1.53-11,1.31-15.85,1.32-42.5.1-85,.19-127.49,0-26.38-.11-52.75-26.68-52.8-53q-.14-64.14,0-128.3c.08-24.46,26.4-51,51-51.11,47.54-.22,95.07-.07,143.88-.07v40.68Z" transform="translate(-74.54 -406.71)"/>
              <polygon points="240.17 183.98 240.17 46.36 297.05 0 421.57 0 421.57 48.53 292.44 48.53 292.44 183.98 240.17 183.98"/>
              <polygon points="472.31 51.79 472.31 189.41 415.42 235.77 290.9 235.77 290.9 187.24 420.04 187.24 420.04 51.79 472.31 51.79"/>
            </g>
            <!-- knockout text on banner: bg color so it reads as a cutout -->
            <g fill="var(--cc-bg)">
              <path d="M772.43,729.18c5.17,8.51,10.14,16.7,15.12,24.92-8.86,3.31-14.63,1.4-19.1-6.06-3.38-5.63-6.74-11.27-10.32-16.78-.8-1.23-2.44-2.7-3.74-2.74-8.4-.25-16.81-.13-25.92-.13v26.45H714.79V686.21c1.59-.11,3.22-.32,4.86-.32q24.79,0,49.6,0c8.7,0,16.18,7.41,16.22,15.92a48.32,48.32,0,0,0,.06,7C787.16,719.1,780.6,724.37,772.43,729.18Zm-43.81-13.4h42.72V698.42H728.62Z" transform="translate(-74.54 -406.71)"/>
              <path d="M856.52,731.52h-42.1v23.23c-4.32,0-8,.19-11.69-.14-.91-.09-2.34-1.91-2.35-2.94-.13-17.56-.2-35.12,0-52.67.06-5.09,8.64-13,13.87-13.06q20.93-.21,41.86,0c5.24.05,14.06,7.87,14.11,12.84.18,18.36.07,36.73.07,55.57H856.52Zm-42-12.78h41.58V698.55H814.47Z" transform="translate(-74.54 -406.71)"/>
              <path d="M701.41,742.5V755h-5.78c-12.4,0-24.79,0-37.19,0-8.42,0-16.48-7.74-16.5-15.82q-.06-19,0-38.11c0-7.2,8.1-15.14,15.49-15.18,14.46-.06,28.91,0,43.79,0v12.06H656.45V742.5Z" transform="translate(-74.54 -406.71)"/>
              <path d="M945.27,686v12.07H900.45v16.84h37.32v12.25H900.08c0,7.74-.32,15,.11,22.3.28,4.76-1.45,6.36-6.1,5.73-1.52-.21-3.28.38-4.59-.16s-3.2-2-3.22-3.14q-.28-26.34-.06-52.69c0-4.48,8.14-13,12.68-13.12C914.21,685.83,929.53,686,945.27,686Z" transform="translate(-74.54 -406.71)"/>
              <path d="M994.9,754.6H981.12V698.31H953.41v-12h68.68v11.61H994.9Z" transform="translate(-74.54 -406.71)"/>
            </g>
          </svg>
          <span class="bp-mark__sub bp-mono">CCS / REV.04 · BUILD 2026.05</span>
        </a>

        <div class="bp-meta" aria-label="System status">
          <div class="bp-meta-cell">
            <span class="bp-mono bp-meta-cell__label">LAT</span>
            <span class="bp-meta-cell__value bp-mono">44.7866</span>
          </div>
          <div class="bp-meta-cell">
            <span class="bp-mono bp-meta-cell__label">LON</span>
            <span class="bp-meta-cell__value bp-mono">20.4489</span>
          </div>
          <div class="bp-meta-cell">
            <span class="bp-mono bp-meta-cell__label">STATUS</span>
            <span class="bp-meta-cell__value">
              <span class="bp-pulse bp-mono" aria-label="Operational">OPERATIONAL</span>
            </span>
          </div>
          <div class="bp-meta-cell">
            <span class="bp-mono bp-meta-cell__label">UTC</span>
            <span class="bp-meta-cell__value bp-mono" aria-live="polite" aria-atomic="true">{{ utcTime() }}</span>
          </div>
        </div>
      </div>

      <!-- NAV ROW -->
      <nav class="bp-nav" aria-label="Main navigation">
        @for (n of navItems; track n.id) {
          <a
            class="bp-tab"
            [class.is-active]="activeRoute() === n.id"
            [routerLink]="n.id"
            [routerLinkActive]="'is-active'"
            [routerLinkActiveOptions]="{ exact: n.id === '/' }"
          >
            <span class="bp-tab__idx bp-mono">[{{ n.idx }}]</span>
            <span class="bp-tab__label">{{ n.label }}</span>
            @if (activeRoute() === n.id) {
              <span class="bp-tab__bar" aria-hidden="true"></span>
            }
          </a>
        }
        <div class="bp-nav__spacer"></div>
        <button
          class="bp-theme-btn"
          (click)="cycleTheme()"
          [title]="'Current theme: ' + theme() + ' — click to cycle'"
          type="button"
        >
          <span class="bp-theme-btn__icon" aria-hidden="true">
            @if (theme() === 'light') {
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            }
            @if (theme() === 'dark') {
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
            @if (theme() === 'sable') {
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c0 6-6 8-6 14a6 6 0 0 0 12 0c0-6-6-8-6-14z"/></svg>
            }
          </span>
          <span class="bp-mono">THEME / {{ theme().toUpperCase() }}</span>
        </button>
      </nav>

      <!-- SCROLL PROGRESS -->
      <div class="bp-progress-track" role="progressbar" [attr.aria-valuenow]="scrollPct()" aria-valuemin="0" aria-valuemax="100">
        <div class="bp-progress-fill" [style.width.%]="scrollPct()"></div>
        <span class="bp-mono bp-progress-label" aria-hidden="true">
          SCROLL · {{ padded(scrollPct()) }}%
        </span>
      </div>
    </header>
  `,
  styles: `
    :host { display: block; position: relative; z-index: 100; }

    .bp-mono {
      font-family: var(--cc-font-mono);
      font-feature-settings: 'ss01', 'cv01';
    }

    .bp-chrome {
      background: var(--cc-bg);
      border-bottom: 1px solid var(--cc-rule-strong);
    }

    /* TOP ROW */
    .bp-chrome__top {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
      padding: 16px 28px;
      gap: 24px;
    }

    .bp-mark {
      display: flex; align-items: center; gap: 12px;
      background: none; border: 0; cursor: pointer;
      color: var(--cc-ink); font-family: var(--cc-font-display);
      padding: 0; text-decoration: none;
    }
    .bp-mark__logo {
      height: 28px;
      width: auto;
      flex-shrink: 0;
    }
    .bp-mark__sub {
      font-size: 10px; color: var(--cc-ink-mute);
      letter-spacing: 0.14em;
    }

    .bp-meta {
      justify-self: end;
      display: flex; gap: 28px;
    }
    .bp-meta-cell { display: flex; flex-direction: column; gap: 3px; min-width: 70px; }
    .bp-meta-cell__label {
      font-size: 9px; letter-spacing: 0.18em; color: var(--cc-ink-mute);
    }
    .bp-meta-cell__value {
      font-size: 12px; color: var(--cc-ink);
      letter-spacing: 0.04em;
    }

    .bp-pulse {
      display: inline-flex; align-items: center; gap: 6px;
      color: var(--cc-accent);
    }
    .bp-pulse::before {
      content: '';
      width: 6px; height: 6px; border-radius: 50%;
      background: var(--cc-accent);
      box-shadow: 0 0 0 0 var(--cc-accent-glow);
      animation: bp-pulse 1.6s infinite;
      flex-shrink: 0;
    }
    @keyframes bp-pulse {
      0%   { box-shadow: 0 0 0 0 var(--cc-accent-glow); }
      70%  { box-shadow: 0 0 0 6px transparent; }
      100% { box-shadow: 0 0 0 0 transparent; }
    }

    /* NAV ROW */
    .bp-nav {
      display: flex; align-items: stretch;
      border-top: 1px solid var(--cc-rule);
      background: var(--cc-bg2);
    }

    .bp-tab {
      position: relative;
      background: transparent; border: 0;
      border-right: 1px solid var(--cc-rule);
      padding: 12px 22px; cursor: pointer;
      font-family: var(--cc-font-display);
      display: flex; align-items: baseline; gap: 8px;
      color: var(--cc-ink-soft);
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.16em; text-transform: uppercase;
      transition: color 0.18s, background 0.18s;
      text-decoration: none;
    }
    .bp-tab:hover { color: var(--cc-ink); background: var(--cc-panel); }
    .bp-tab.is-active { color: var(--cc-accent); background: var(--cc-panel); }
    .bp-tab__idx { font-size: 9px; color: var(--cc-ink-mute); letter-spacing: 0.1em; }
    .bp-tab.is-active .bp-tab__idx { color: var(--cc-accent); }
    .bp-tab__bar {
      position: absolute; left: 0; right: 0; bottom: -1px;
      height: 2px; background: var(--cc-accent);
    }

    .bp-nav__spacer { flex: 1; border-right: 1px solid var(--cc-rule); }

    .bp-theme-btn {
      background: transparent; border: 0;
      border-left: 1px solid var(--cc-rule);
      padding: 12px 18px; cursor: pointer;
      font-family: var(--cc-font-display);
      display: flex; align-items: center; gap: 8px;
      color: var(--cc-ink-soft);
      font-size: 10px; letter-spacing: 0.16em;
    }
    .bp-theme-btn:hover { color: var(--cc-accent); }
    .bp-theme-btn__icon { color: var(--cc-accent); display: inline-flex; }

    /* SCROLL PROGRESS */
    .bp-progress-track {
      position: relative; height: 18px;
      background: var(--cc-bg);
      border-top: 1px solid var(--cc-rule);
    }
    .bp-progress-fill {
      position: absolute; inset-block: 0; left: 0;
      background: linear-gradient(to right, transparent, var(--cc-accent-soft) 50%, var(--cc-accent));
      transition: width 0.1s;
    }
    .bp-progress-label {
      position: absolute; right: 14px;
      top: 50%; transform: translateY(-50%);
      font-size: 9px; color: var(--cc-ink-mute);
      letter-spacing: 0.2em;
    }

    /* RESPONSIVE */
    @media (max-width: 980px) {
      .bp-chrome__top { grid-template-columns: 1fr; padding: 14px 18px; gap: 14px; }
      .bp-meta { justify-self: start; gap: 18px; flex-wrap: wrap; }
      .bp-nav { overflow-x: auto; }
      .bp-tab { padding: 10px 14px; flex-shrink: 0; }
    }
    @media (max-width: 600px) {
      .bp-meta { display: none; }
    }
  `,
})
export class SiteHeaderComponent implements OnDestroy {
  private readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);
  private readonly clockInterval: ReturnType<typeof setInterval>;

  readonly navItems = NAV;
  readonly theme = this.themeService.activeTheme;
  readonly utcTime = signal(this.formatUTC());
  readonly scrollPct = signal(0);
  readonly activeRoute = signal('/');

  constructor() {
    this.clockInterval = setInterval(() => {
      this.utcTime.set(this.formatUTC());
    }, 1000);

    afterNextRender(() => {
      const scrollEl = document.getElementById('bp-scroll');
      if (scrollEl) {
        scrollEl.addEventListener('scroll', () => this.onScrollElement(scrollEl), { passive: true });
      }
    });

    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(e => {
        const url = (e as NavigationEnd).urlAfterRedirects;
        const match = NAV.slice().reverse().find(n => url.startsWith(n.id));
        this.activeRoute.set(match?.id ?? '/');
      });

    // Set initial active route
    const url = this.router.url;
    const match = NAV.slice().reverse().find(n => url.startsWith(n.id));
    this.activeRoute.set(match?.id ?? '/');
  }

  ngOnDestroy(): void {
    clearInterval(this.clockInterval);
  }

  private onScrollElement(el: HTMLElement): void {
    const { scrollTop, scrollHeight, clientHeight } = el;
    const max = scrollHeight - clientHeight;
    this.scrollPct.set(max > 0 ? Math.round((scrollTop / max) * 100) : 0);
  }

  cycleTheme(): void {
    this.themeService.cycleTheme();
  }

  padded(n: number): string {
    return String(n).padStart(3, '0');
  }

  private formatUTC(): string {
    const now = new Date();
    const pad = (x: number) => String(x).padStart(2, '0');
    return `${pad(now.getUTCHours())}:${pad(now.getUTCMinutes())}:${pad(now.getUTCSeconds())}`;
  }
}
