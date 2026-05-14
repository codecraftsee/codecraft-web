import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SERVICES, Service } from '../../shared/data/services.data';

@Component({
  selector: 'cc-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './services.component.scss',
  template: `
    <div class="bp-page">
      <section class="bp-plate" aria-label="Service catalogue">
        <span class="bp-plate__corners" aria-hidden="true"></span>
        <div class="bp-dims bp-dims--top">
          <span class="bp-mono">VIEW · 02 / SERVICES</span>
          <span class="bp-dims__line"></span>
          <span class="bp-mono">MODE · DETAIL</span>
        </div>

        <div class="bp-section__head">
          <span class="bp-mono bp-section__num">§01</span>
          <h1 class="bp-h2">SERVICE CATALOGUE</h1>
          <span class="bp-section__rule"></span>
          <span class="bp-mono bp-section__count">ITEM {{ active() + 1 }} / {{ services.length }}</span>
        </div>

        <div class="bp-svc-layout">
          <!-- INDEX LIST -->
          <ul class="bp-svc-index" aria-label="Service index" role="tablist">
            @for (s of services; track s.num; let i = $index) {
              <li role="presentation">
                <button
                  class="bp-svc-row"
                  [class.is-active]="active() === i"
                  (click)="setActive(i)"
                  role="tab"
                  [attr.aria-selected]="active() === i"
                  [attr.aria-controls]="'svc-detail'"
                  type="button"
                >
                  <span class="bp-mono bp-svc-row__num">{{ s.num }}</span>
                  <span class="bp-svc-row__title">{{ s.title }}</span>
                  <span class="bp-svc-row__arrow" aria-hidden="true">{{ active() === i ? '●' : '→' }}</span>
                </button>
              </li>
            }
          </ul>

          <!-- DETAIL PANEL -->
          <div class="bp-svc-detail" id="svc-detail" role="tabpanel">
            <div class="bp-detail-head">
              <div>
                <div class="bp-callout" aria-hidden="true">
                  <span class="bp-callout__dot"></span>
                  <span class="bp-mono">ITEM {{ current().num }}</span>
                </div>
                <h2 class="bp-detail-title">{{ current().title }}</h2>
              </div>
              <div class="bp-detail-meta">
                <div class="bp-meta-cell">
                  <span class="bp-mono bp-meta-cell__label">STATUS</span>
                  <span class="bp-meta-cell__value bp-mono">ACTIVE</span>
                </div>
                <div class="bp-meta-cell">
                  <span class="bp-mono bp-meta-cell__label">DEPTH</span>
                  <span class="bp-meta-cell__value bp-mono">L3 – L5</span>
                </div>
              </div>
            </div>

            <p class="bp-detail-desc">{{ current().desc }}</p>

            <div class="bp-detail-grid">
              <div class="bp-spec">
                <div class="bp-mono bp-spec__head">DELIVERABLES</div>
                <ul class="bp-spec__rows" aria-label="Deliverables">
                  <li class="bp-spec__row"><span class="bp-mono bp-spec__k">Audit Report</span><span class="bp-spec__leader"></span><span class="bp-spec__v">PDF</span></li>
                  <li class="bp-spec__row"><span class="bp-mono bp-spec__k">Tech Spec</span><span class="bp-spec__leader"></span><span class="bp-spec__v">Docs</span></li>
                  <li class="bp-spec__row"><span class="bp-mono bp-spec__k">Source Code</span><span class="bp-spec__leader"></span><span class="bp-spec__v">Repo</span></li>
                  <li class="bp-spec__row"><span class="bp-mono bp-spec__k">Runbook</span><span class="bp-spec__leader"></span><span class="bp-spec__v">MD</span></li>
                </ul>
              </div>
              <div class="bp-spec">
                <div class="bp-mono bp-spec__head">STACK / TAGS</div>
                <div class="bp-detail-tags">
                  @for (t of current().tags; track t) {
                    <span class="bp-chip">{{ t }}</span>
                  }
                  <span class="bp-chip">TypeScript</span>
                  <span class="bp-chip">Node</span>
                  <span class="bp-chip">Postgres</span>
                  <span class="bp-chip">Docker</span>
                </div>
              </div>
            </div>

            <div class="bp-actions">
              <button class="bp-btn bp-btn--primary" (click)="go('/contact')" type="button">
                <span class="bp-btn__label">REQUEST_QUOTE</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  `,
})
export class ServicesComponent {
  private readonly router = inject(Router);

  readonly services = SERVICES;
  readonly active = signal(0);

  current(): Service {
    return this.services[this.active()];
  }

  setActive(i: number): void {
    this.active.set(i);
  }

  go(route: string): void {
    this.router.navigate([route]);
  }
}
