import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { TechRadarComponent } from './tech-radar/tech-radar.component';

@Component({
  selector: 'cc-home',
  imports: [RouterLink, TechRadarComponent],
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
            <cc-tech-radar></cc-tech-radar>
          </aside>
        </div>

        <div class="cc-dims cc-dims--bottom">
          <span class="cc-mono">CCS · END OF OVERVIEW</span>
          <span class="cc-dims__line"></span>
          <span class="cc-mono">SHEET 01 / 01</span>
        </div>
      </section>
    </div>
  `,
})
export class HomeComponent {
  readonly specRows: [string, string][] = [
    ['CLIENTS',      '10+'],
    ['UPTIME / SLA', '99.95%'],
    ['LOC SHIPPED',  '2.4M'],
    ['AVG_RESPONSE', '<24h'],
    ['STACK_DEPTH',  '12 lang.'],
    ['REGIONS',      'EU · NA'],
  ];
}
