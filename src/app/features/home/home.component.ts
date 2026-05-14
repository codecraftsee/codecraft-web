import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { SERVICES } from '../../shared/data/services.data';

@Component({
  selector: 'cc-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.scss',
  template: `
    <div class="bp-page">

      <!-- HERO PLATE -->
      <section class="bp-plate" aria-label="Hero">
        <span class="bp-plate__corners" aria-hidden="true"></span>
        <div class="bp-dims bp-dims--top">
          <span class="bp-mono">VIEW · 01 / OVERVIEW</span>
          <span class="bp-dims__line"></span>
          <span class="bp-mono">W·1280 · H·auto</span>
        </div>

        <div class="bp-hero">
          <div class="bp-hero__main">
            <div class="bp-callout" aria-hidden="true">
              <span class="bp-callout__dot"></span>
              <span class="bp-mono">FIG.01 · PRIMARY OUTPUT</span>
            </div>
            <h1 class="bp-h1">
              We engineer<br>
              <span class="bp-h1__accent">software systems</span><br>
              <span class="bp-h1__sub">that ship and stay shipped.</span>
            </h1>
            <p class="bp-lede">
              CodeCraft Solutions is a Novi Sad based engineering studio. We design,
              build, and maintain web and mobile software for teams who treat their
              codebase as critical infrastructure — not a sketch.
            </p>
            <div class="bp-actions">
              <button class="bp-btn bp-btn--primary" (click)="go('/contact')" type="button">
                <span class="bp-btn__label">INITIATE PROJECT</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button class="bp-btn bp-btn--ghost" (click)="go('/services')" type="button">
                <span class="bp-btn__label">VIEW CAPABILITIES</span>
              </button>
            </div>
          </div>

          <aside class="bp-hero__aside">
            <div class="bp-spec">
              <div class="bp-mono bp-spec__head">SYSTEM SPECIFICATION</div>
              <ul class="bp-spec__rows" aria-label="System stats">
                @for (row of specRows; track row[0]) {
                  <li class="bp-spec__row">
                    <span class="bp-mono bp-spec__k">{{ row[0] }}</span>
                    <span class="bp-spec__leader"></span>
                    <span class="bp-spec__v">{{ row[1] }}</span>
                  </li>
                }
              </ul>
            </div>
            <div class="bp-instrument" aria-hidden="true">
              <div class="bp-instrument__head">
                <span class="bp-mono">FIG.A · RANGE OF MOTION</span>
                <span class="bp-mono bp-instrument__legend">θ · {{ angle() }}°</span>
              </div>
              <svg class="bp-instrument__svg" viewBox="0 0 200 200">
                <defs>
                  <pattern id="bp-ig" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.4" opacity="0.35"/>
                  </pattern>
                </defs>
                <rect width="200" height="200" fill="url(#bp-ig)"/>
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" stroke-width="0.6"/>
                <circle cx="100" cy="100" r="55" fill="none" stroke="currentColor" stroke-width="0.6" stroke-dasharray="3 3"/>
                <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" stroke-width="0.6"/>
                <line x1="20" y1="100" x2="180" y2="100" stroke="currentColor" stroke-width="0.6"/>
                <line x1="100" y1="20" x2="100" y2="180" stroke="currentColor" stroke-width="0.6"/>
                @for (tick of ticks; track $index) {
                  <line
                    [attr.x1]="tick.x1" [attr.y1]="tick.y1"
                    [attr.x2]="tick.x2" [attr.y2]="tick.y2"
                    stroke="currentColor" stroke-width="0.7"
                  />
                }
                <line x1="100" y1="100" [attr.x2]="sweepX()" [attr.y2]="sweepY()" stroke="var(--cc-accent)" stroke-width="1.6"/>
                <circle [attr.cx]="sweepX()" [attr.cy]="sweepY()" r="3" fill="var(--cc-accent)"/>
                <circle cx="100" cy="100" r="2.5" fill="var(--cc-accent)"/>
              </svg>
            </div>
          </aside>
        </div>

        <div class="bp-dims bp-dims--bottom">
          <span class="bp-mono">NEXT · §02 / CAPABILITIES</span>
          <span class="bp-dims__line"></span>
          <span class="bp-mono">SHEET 01 / 04</span>
        </div>
      </section>

      <!-- CAPABILITIES DIAGRAM -->
      <section class="bp-section" aria-label="Capabilities">
        <div class="bp-section__head">
          <span class="bp-mono bp-section__num">§02</span>
          <h2 class="bp-h2">CAPABILITIES MATRIX</h2>
          <span class="bp-section__rule"></span>
          <span class="bp-mono bp-section__count">06 SERVICES</span>
        </div>
        <div class="bp-svc-diagram" role="list">
          @for (s of services; track s.num) {
            <button class="bp-svc-node" role="listitem" type="button" (click)="go('/services')" [attr.aria-label]="s.title">
              <div class="bp-mono bp-svc-node__num">{{ s.num }}</div>
              <div class="bp-svc-node__title">{{ s.title }}</div>
              <p class="bp-svc-node__desc">{{ s.desc }}</p>
              <span class="bp-svc-node__arrow" aria-hidden="true">→</span>
            </button>
          }
        </div>
      </section>

<!-- CTA BAND -->
      <section class="bp-cta-band" aria-label="Call to action">
        <span class="bp-plate__corners" aria-hidden="true"></span>
        <div class="bp-cta-band__inner">
          <div>
            <div class="bp-callout" aria-hidden="true">
              <span class="bp-callout__dot"></span>
              <span class="bp-mono">REQUEST · INTAKE</span>
            </div>
            <h2 class="bp-cta-band__title">Got a system to build?</h2>
            <p class="bp-cta-band__desc">Send a brief. We'll come back within 24h with a scope, a price, and a plan.</p>
          </div>
          <div class="bp-cta-band__actions">
            <button class="bp-btn bp-btn--primary bp-btn--lg" (click)="go('/contact')" type="button">
              <span class="bp-btn__label">START INTAKE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a class="bp-btn bp-btn--ghost bp-btn--lg" href="mailto:hello@codecraftsolutions.rs">
              <span class="bp-btn__label">EMAIL US</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent implements OnDestroy {
  readonly #router = inject(Router);
  #rafId = 0;
  #lastTime = 0;

  readonly services = SERVICES;
  readonly specRows: [string, string][] = [
    ['CLIENTS',     '10+'],
    ['UPTIME / SLA','99.95%'],
    // ['LOC SHIPPED', '2.4M'],
    ['AVG RESPONSE','<24h'],
    ['STACK DEPTH', '12 lang.'],
    ['REGIONS',     'EU · NA'],
  ];

  readonly angle = signal(0);
  readonly ticks = this.#buildTicks();

  constructor() {
    const tick = (t: number) => {
      const dt = (t - (this.#lastTime || t)) / 1000;
      this.#lastTime = t;
      this.angle.update(a => Math.round((a + dt * 18) % 360));
      this.#rafId = requestAnimationFrame(tick);
    };
    this.#rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.#rafId);
  }

  go(route: string): void {
    this.#router.navigate([route]);
  }

  sweepX(): number {
    return 100 + Math.cos((this.angle() - 90) * Math.PI / 180) * 70;
  }

  sweepY(): number {
    return 100 + Math.sin((this.angle() - 90) * Math.PI / 180) * 70;
  }

  #buildTicks(): { x1: number; y1: number; x2: number; y2: number }[] {
    return Array.from({ length: 24 }, (_, i) => {
      const a = (i * 15 - 90) * Math.PI / 180;
      const r2 = i % 4 === 0 ? 72 : 76;
      return { x1: 100 + Math.cos(a) * 80, y1: 100 + Math.sin(a) * 80, x2: 100 + Math.cos(a) * r2, y2: 100 + Math.sin(a) * r2 };
    });
  }
}
