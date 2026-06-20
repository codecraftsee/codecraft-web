import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SERVICES, Service } from '../../shared/data/services.data';

@Component({
  selector: 'cc-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './services.component.scss',
  template: `
    <div class="cc-page">
      <section class="cc-plate" aria-label="Service catalogue">
        <span class="cc-plate__corners" aria-hidden="true"></span>
        <div class="cc-dims cc-dims--top">
          <span class="cc-mono">VIEW · 02 / SERVICES</span>
          <span class="cc-dims__line"></span>
          <span class="cc-mono">MODE · DETAIL</span>
        </div>

        <div class="cc-section__head">
          <span class="cc-mono cc-section__num">§01</span>
          <h1 class="cc-h2">SERVICE CATALOGUE</h1>
          <span class="cc-section__rule"></span>
          <span class="cc-mono cc-section__count">ITEM {{ active() + 1 }} / {{ services.length }}</span>
        </div>

        <div class="cc-svc-layout">
          <!-- INDEX LIST -->
          <ul class="cc-svc-index" aria-label="Service index" role="tablist">
            @for (s of services; track s.num; let i = $index) {
              <li role="presentation">
                <button
                  class="cc-svc-row"
                  [class.is-active]="active() === i"
                  (click)="setActive(i)"
                  role="tab"
                  [attr.aria-selected]="active() === i"
                  [attr.aria-controls]="'svc-detail'"
                  type="button"
                >
                  <span class="cc-mono cc-svc-row__num">{{ s.num }}</span>
                  <span class="cc-svc-row__title">{{ s.title }}</span>
                  <span class="cc-svc-row__arrow" aria-hidden="true">{{ active() === i ? '●' : '→' }}</span>
                </button>
              </li>
            }
          </ul>

          <!-- DETAIL PANEL -->
          <div class="cc-svc-detail" id="svc-detail" role="tabpanel">
            <div class="cc-detail-head">
              <div>
                <div class="cc-callout" aria-hidden="true">
                  <span class="cc-callout__dot"></span>
                  <span class="cc-mono">ITEM {{ current().num }}</span>
                </div>
                <h2 class="cc-detail-title">{{ current().title }}</h2>
              </div>
              <div class="cc-detail-meta">
                <div class="cc-meta-cell">
                  <span class="cc-mono cc-meta-cell__label">STATUS</span>
                  <span class="cc-meta-cell__value cc-mono">ACTIVE</span>
                </div>
                <div class="cc-meta-cell">
                  <span class="cc-mono cc-meta-cell__label">DEPTH</span>
                  <span class="cc-meta-cell__value cc-mono">L3 – L5</span>
                </div>
              </div>
            </div>

            <p class="cc-detail-desc">{{ current().desc }}</p>

            <div class="cc-detail-grid">
              <div class="cc-spec">
                <div class="cc-mono cc-spec__head">DELIVERABLES</div>
                <ul class="cc-spec__rows" aria-label="Deliverables">
                  <li class="cc-spec__row"><span class="cc-mono cc-spec__k">Audit Report</span><span class="cc-spec__leader"></span><span class="cc-spec__v">PDF</span></li>
                  <li class="cc-spec__row"><span class="cc-mono cc-spec__k">Tech Spec</span><span class="cc-spec__leader"></span><span class="cc-spec__v">Docs</span></li>
                  <li class="cc-spec__row"><span class="cc-mono cc-spec__k">Source Code</span><span class="cc-spec__leader"></span><span class="cc-spec__v">Repo</span></li>
                  <li class="cc-spec__row"><span class="cc-mono cc-spec__k">Runbook</span><span class="cc-spec__leader"></span><span class="cc-spec__v">MD</span></li>
                </ul>
              </div>
              <div class="cc-spec">
                <div class="cc-mono cc-spec__head">STACK / TAGS</div>
                <div class="cc-detail-tags">
                  @for (t of current().tags; track t) {
                    <span class="cc-chip">{{ t }}</span>
                  }
                  <span class="cc-chip">TypeScript</span>
                  <span class="cc-chip">Node</span>
                  <span class="cc-chip">Postgres</span>
                  <span class="cc-chip">Docker</span>
                </div>
              </div>
            </div>

            <div class="cc-actions">
              <button class="cc-btn cc-btn--primary" (click)="go('/contact')" type="button">
                <span class="cc-btn__label">REQUEST QUOTE</span>
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
