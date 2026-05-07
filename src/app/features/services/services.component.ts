import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

const SERVICES: Service[] = [
  { num: '01', title: 'Web Applications',    desc: 'Full-stack web platforms built for scale, reliability, and great UX — from SPAs to complex dashboards.', tags: ['Angular', 'React', 'Node', 'TypeScript'] },
  { num: '02', title: 'Mobile Development',  desc: 'Cross-platform mobile apps that feel native. React Native and Flutter — one codebase, every device.', tags: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { num: '03', title: 'Cloud & DevOps',       desc: 'CI/CD pipelines, container orchestration, and infrastructure-as-code. Your system, always running.', tags: ['AWS', 'Docker', 'K8s', 'Terraform'] },
  { num: '04', title: 'API & Backend',        desc: 'Robust REST and GraphQL APIs, microservices architecture, and data pipelines designed for growth.', tags: ['NestJS', 'Go', 'Postgres', 'Redis'] },
  { num: '05', title: 'UI/UX Design',         desc: 'Design systems, prototypes, and pixel-perfect interfaces that are as functional as they are beautiful.', tags: ['Figma', 'Design Systems', 'A11y'] },
  { num: '06', title: 'Tech Consulting',      desc: 'Architecture reviews, technology selection, and strategic guidance for teams scaling their engineering.', tags: ['Architecture', 'ADRs', 'Audits'] },
];

@Component({
  selector: 'cc-services',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  styles: `
    :host { display: block; }

    .bp-mono { font-family: var(--cc-font-mono); font-feature-settings: 'ss01','cv01'; }

    .bp-page {
      padding: 32px;
      max-width: 1280px;
      margin: 0 auto;
    }

    /* PLATE */
    .bp-plate {
      position: relative;
      background-color: var(--cc-bg);
      border: 1px solid var(--cc-rule-strong);
      padding: 32px 36px 40px;
    }
    .bp-plate__corners { pointer-events: none; }
    .bp-plate::before, .bp-plate::after,
    .bp-plate__corners::before, .bp-plate__corners::after {
      content: ''; position: absolute;
      width: 16px; height: 16px;
      border: 1.5px solid var(--cc-accent);
      pointer-events: none; z-index: 1;
    }
    .bp-plate::before  { top: -1px;    left: -1px;  border-right: 0; border-bottom: 0; }
    .bp-plate::after   { top: -1px;    right: -1px; border-left: 0;  border-bottom: 0; }
    .bp-plate__corners::before { bottom: -1px; left: -1px;  border-right: 0; border-top: 0; position: absolute; }
    .bp-plate__corners::after  { bottom: -1px; right: -1px; border-left: 0;  border-top: 0; position: absolute; }

    .bp-dims {
      display: flex; align-items: center; gap: 14px;
      font-size: 10px; color: var(--cc-ink-mute); letter-spacing: 0.18em;
    }
    .bp-dims--top  { margin-bottom: 28px; }
    .bp-dims__line { flex: 1; height: 1px; background: var(--cc-rule-strong); }

    /* SECTION HEAD */
    .bp-section__head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 20px; }
    .bp-section__num  { font-size: 11px; letter-spacing: 0.2em; color: var(--cc-accent); }
    .bp-h2 { font-family: var(--cc-font-mono); font-size: 13px; font-weight: 600; letter-spacing: 0.22em; margin: 0; color: var(--cc-ink); }
    .bp-section__rule  { flex: 1; height: 1px; background: var(--cc-rule-strong); }
    .bp-section__count { font-size: 10px; letter-spacing: 0.18em; color: var(--cc-ink-mute); }

    /* SERVICE LAYOUT */
    .bp-svc-layout {
      display: grid;
      grid-template-columns: 320px 1fr;
      border: 1px solid var(--cc-rule);
      background: var(--cc-rule);
      gap: 1px;
      margin-top: 4px;
    }
    .bp-svc-index { list-style: none; padding: 0; margin: 0; background: var(--cc-bg); display: flex; flex-direction: column; }
    .bp-svc-row {
      width: 100%; background: transparent; border: 0;
      border-bottom: 1px solid var(--cc-rule);
      padding: 18px 20px; cursor: pointer;
      font-family: var(--cc-font-display); color: var(--cc-ink);
      display: grid; grid-template-columns: 32px 1fr 16px;
      gap: 12px; align-items: center; text-align: left;
      transition: background 0.15s, color 0.15s;
    }
    .bp-svc-row:hover { background: var(--cc-panel); }
    .bp-svc-row.is-active { background: var(--cc-panel); color: var(--cc-accent); }
    .bp-svc-row__num   { font-size: 11px; color: var(--cc-ink-mute); font-family: var(--cc-font-mono); }
    .bp-svc-row.is-active .bp-svc-row__num { color: var(--cc-accent); }
    .bp-svc-row__title { font-size: 15px; font-weight: 600; letter-spacing: -0.01em; }
    .bp-svc-row__arrow { font-size: 11px; opacity: 0.7; }

    .bp-svc-detail { background: var(--cc-bg); padding: 30px 36px; }
    .bp-detail-head {
      display: grid; grid-template-columns: 1fr auto;
      gap: 24px; align-items: end;
      border-bottom: 1px solid var(--cc-rule);
      padding-bottom: 20px; margin-bottom: 20px;
    }
    .bp-callout {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 10px; letter-spacing: 0.2em; color: var(--cc-accent);
      margin-bottom: 10px; text-transform: uppercase;
    }
    .bp-callout__dot { width: 7px; height: 7px; background: var(--cc-accent); display: inline-block; }
    .bp-detail-title {
      font-family: var(--cc-font-display); font-size: 40px;
      font-weight: 600; letter-spacing: -0.025em;
      margin: 8px 0 0; color: var(--cc-ink); line-height: 1.05;
    }
    .bp-detail-meta { display: flex; gap: 24px; }
    .bp-meta-cell { display: flex; flex-direction: column; gap: 3px; }
    .bp-meta-cell__label { font-size: 9px; letter-spacing: 0.18em; color: var(--cc-ink-mute); }
    .bp-meta-cell__value { font-size: 12px; color: var(--cc-ink); letter-spacing: 0.04em; }
    .bp-detail-desc {
      font-family: var(--cc-font-display); font-size: 16px;
      line-height: 1.6; color: var(--cc-ink-soft);
      margin: 0 0 24px; max-width: 640px;
    }
    .bp-detail-grid {
      display: grid; grid-template-columns: 1fr 1fr;
      gap: 16px; margin-bottom: 24px;
    }
    .bp-detail-tags { display: flex; gap: 6px; flex-wrap: wrap; }

    .bp-spec {
      border: 1px solid var(--cc-rule); background: var(--cc-panel); padding: 18px 20px;
    }
    .bp-spec__head { font-size: 10px; letter-spacing: 0.2em; color: var(--cc-ink-mute); padding-bottom: 12px; margin-bottom: 12px; border-bottom: 1px dashed var(--cc-rule-strong); }
    .bp-spec__rows { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
    .bp-spec__row  { display: flex; align-items: baseline; gap: 8px; font-size: 12px; }
    .bp-spec__k    { color: var(--cc-ink-soft); letter-spacing: 0.06em; }
    .bp-spec__leader { flex: 1; height: 0; border-bottom: 1px dotted var(--cc-rule-strong); margin-bottom: 4px; }
    .bp-spec__v    { color: var(--cc-ink); font-weight: 600; font-family: var(--cc-font-mono); font-size: 12px; }

    .bp-chip {
      font-size: 10px; font-family: var(--cc-font-mono); letter-spacing: 0.1em;
      color: var(--cc-ink-soft); border: 1px solid var(--cc-rule-strong);
      padding: 3px 8px; background: transparent; text-transform: uppercase;
    }

    /* BUTTONS */
    .bp-actions { display: flex; gap: 12px; }
    .bp-btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 13px 18px; font-family: var(--cc-font-mono);
      font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
      border: 1px solid; cursor: pointer;
      transition: all 0.18s ease; background: transparent;
      text-decoration: none; text-transform: uppercase;
    }
    .bp-btn--primary { background: var(--cc-accent); color: var(--cc-bg); border-color: var(--cc-accent); }
    .bp-btn--primary:hover { filter: brightness(1.1); box-shadow: 0 0 0 4px var(--cc-accent-glow); transform: translateY(-1px); }

    /* RESPONSIVE */
    @media (max-width: 980px) {
      .bp-page { padding: 18px; }
      .bp-plate { padding: 22px; }
      .bp-svc-layout { grid-template-columns: 1fr; }
      .bp-detail-grid { grid-template-columns: 1fr; }
      .bp-detail-head { grid-template-columns: 1fr; }
      .bp-detail-meta { flex-wrap: wrap; gap: 18px; }
      .bp-detail-title { font-size: 28px; }
    }
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
