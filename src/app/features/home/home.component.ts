import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SERVICES } from '../../shared/data/services.data';

interface RadarAxis {
  label: string;
  sub: string;
  score: number;
  ex: number; ey: number;
  vx: number; vy: number;
  lx: number; ly: number;
  anchor: 'start' | 'middle' | 'end';
}

@Component({
  selector: 'cc-home',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './home.component.scss',
  template: `
    <div class="cc-page">

      <!-- HERO PLATE -->
      <section class="cc-plate" aria-label="Hero">
        <span class="cc-plate__corners" aria-hidden="true"></span>
        <div class="cc-dims cc-dims--top">
          <span class="cc-mono">VIEW · 01 / OVERVIEW</span>
          <span class="cc-dims__line"></span>
          <span class="cc-mono">W·1280 · H·auto</span>
        </div>

        <div class="cc-hero">
          <div class="cc-hero__main">
            <div class="cc-callout" aria-hidden="true">
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
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </a>
              <a class="cc-btn cc-btn--ghost" routerLink="/services">
                <span class="cc-btn__label">VIEW_CAPABILITIES</span>
              </a>
            </div>
          </div>

          <aside class="cc-hero__aside">
            <div class="cc-spec">
              <div class="cc-mono cc-spec__head">SYSTEM SPECIFICATION</div>
              <ul class="cc-spec__rows" aria-label="System stats">
                @for (row of specRows; track row[0]) {
                  <li class="cc-spec__row">
                    <span class="cc-mono cc-spec__k">{{ row[0] }}</span>
                    <span class="cc-spec__leader"></span>
                    <span class="cc-spec__v">{{ row[1] }}</span>
                  </li>
                }
              </ul>
            </div>
            <div class="cc-instrument" aria-hidden="true">
              <div class="cc-instrument__head">
                <span class="cc-mono">FIG.A · STACK COVERAGE</span>
                <span class="cc-mono cc-instrument__legend">05 DOMAINS</span>
              </div>
              <svg class="cc-instrument__svg" viewBox="0 0 290 220">
                @for (ring of radar.rings; track $index) {
                  <polygon [attr.points]="ring" fill="none" stroke="currentColor" stroke-width="0.6" opacity="0.3"/>
                }
                @for (axis of radar.axes; track axis.label) {
                  <line
                    [attr.x1]="radar.cx" [attr.y1]="radar.cy"
                    [attr.x2]="axis.ex" [attr.y2]="axis.ey"
                    stroke="currentColor" stroke-width="0.6" opacity="0.3"
                  />
                }
                <polygon
                  [attr.points]="radar.polygon"
                  fill="var(--cc-accent)" fill-opacity="0.13"
                  stroke="var(--cc-accent)" stroke-width="1.5"
                />
                @for (axis of radar.axes; track axis.label) {
                  <circle [attr.cx]="axis.vx" [attr.cy]="axis.vy" r="2.2" fill="var(--cc-accent)"/>
                  <text
                    [attr.x]="axis.lx" [attr.y]="axis.ly"
                    [attr.text-anchor]="axis.anchor"
                    font-family="var(--cc-font-mono)" font-size="9"
                    fill="var(--cc-ink)" letter-spacing="0.12em"
                  >{{ axis.label }}</text>
                  <text
                    [attr.x]="axis.lx" [attr.y]="axis.ly + 9"
                    [attr.text-anchor]="axis.anchor"
                    font-family="var(--cc-font-mono)" font-size="7.5"
                    fill="var(--cc-ink-soft)" letter-spacing="0.08em"
                  >{{ axis.sub }}</text>
                }
              </svg>
            </div>
          </aside>
        </div>

        <div class="cc-dims cc-dims--bottom">
          <span class="cc-mono">NEXT · §02 / CAPABILITIES</span>
          <span class="cc-dims__line"></span>
          <span class="cc-mono">SHEET 01 / 04</span>
        </div>
      </section>

      <!-- CAPABILITIES DIAGRAM -->
      <section class="cc-section" aria-label="Capabilities">
        <div class="cc-section__head">
          <span class="cc-mono cc-section__num">§02</span>
          <h2 class="cc-h2">CAPABILITIES MATRIX</h2>
          <span class="cc-section__rule"></span>
          <span class="cc-mono cc-section__count">06 SERVICES</span>
        </div>
        <div class="cc-svc-diagram" role="list">
          @for (s of services; track s.num) {
            <button class="cc-svc-node" role="listitem" type="button" (click)="go('/services')" [attr.aria-label]="s.title">
              <div class="cc-mono cc-svc-node__num">{{ s.num }}</div>
              <div class="cc-svc-node__title">{{ s.title }}</div>
              <p class="cc-svc-node__desc">{{ s.desc }}</p>
              <span class="cc-svc-node__arrow" aria-hidden="true">→</span>
            </button>
          }
        </div>
      </section>

<!-- CTA BAND -->
      <section class="cc-cta-band" aria-label="Call to action">
        <span class="cc-plate__corners" aria-hidden="true"></span>
        <div class="cc-cta-band__inner">
          <div>
            <div class="cc-callout" aria-hidden="true">
              <span class="cc-callout__dot"></span>
              <span class="cc-mono">REQUEST · INTAKE</span>
            </div>
            <h2 class="cc-cta-band__title">Got a system to build?</h2>
            <p class="cc-cta-band__desc">Send a brief. We'll come back within 24h with a scope, a price, and a plan.</p>
          </div>
          <div class="cc-cta-band__actions">
            <button class="cc-btn cc-btn--primary cc-btn--lg" (click)="go('/contact')" type="button">
              <span class="cc-btn__label">START INTAKE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a class="cc-btn cc-btn--ghost cc-btn--lg" href="mailto:hello@codecraftsolutions.rs">
              <span class="cc-btn__label">EMAIL US</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {
  readonly #router = inject(Router);

  readonly services = SERVICES;
  readonly specRows: [string, string][] = [
    ['CLIENTS',      '10+'],
    ['UPTIME / SLA', '99.95%'],
    ['LOC SHIPPED',  '2.4M'],
    ['AVG_RESPONSE', '<24h'],
    ['STACK_DEPTH',  '12 lang.'],
    ['REGIONS',      'EU · NA'],
  ];

  readonly radar = this.#buildRadar();

  go(route: string): void {
    this.#router.navigate([route]);
  }

  #buildRadar(): { cx: number; cy: number; axes: RadarAxis[]; polygon: string; rings: string[] } {
    const cx = 145, cy = 108, R = 52;
    const source: { label: string; sub: string; score: number }[] = [
      { label: 'FRONTEND', sub: 'React · Next · Angular', score: 0.92 },
      { label: 'BACKEND',  sub: 'Java · Node · Go',       score: 0.88 },
      { label: 'DATABASE', sub: 'Postgres · Kafka',       score: 0.80 },
      { label: 'INFRA',    sub: 'AWS · K8s · Docker',     score: 0.78 },
      { label: 'MOBILE',   sub: 'Swift · Kotlin',         score: 0.85 },
    ];
    const angleFor = (i: number) => (-90 + i * 72) * Math.PI / 180;
    const axes: RadarAxis[] = source.map((a, i) => {
      const rad = angleFor(i);
      const cos = Math.cos(rad), sin = Math.sin(rad);
      const anchor: 'start' | 'middle' | 'end' =
        Math.abs(cos) < 0.2 ? 'middle' : cos < 0 ? 'end' : 'start';
      return {
        ...a,
        ex: cx + cos * R,
        ey: cy + sin * R,
        vx: cx + cos * R * a.score,
        vy: cy + sin * R * a.score,
        lx: cx + cos * R * 1.45,
        ly: cy + sin * R * 1.45,
        anchor,
      };
    });
    const polygon = axes.map(a => `${a.vx.toFixed(1)},${a.vy.toFixed(1)}`).join(' ');
    const rings = [0.25, 0.5, 0.75, 1.0].map(s =>
      Array.from({ length: 5 }, (_, i) => {
        const rad = angleFor(i);
        return `${(cx + Math.cos(rad) * R * s).toFixed(1)},${(cy + Math.sin(rad) * R * s).toFixed(1)}`;
      }).join(' '),
    );
    return { cx, cy, axes, polygon, rings };
  }
}
