import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

const SERVICES = [
  { num: 'MOD_01', title: 'Web Applications', desc: 'Full-stack web platforms built for scale, reliability, and great UX — from SPAs to complex dashboards.', tags: ['Angular', 'React', 'Node'] },
  { num: 'MOD_02', title: 'Mobile Development', desc: 'Cross-platform mobile apps that feel native. React Native and Flutter — one codebase, every device.', tags: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { num: 'MOD_03', title: 'Cloud & DevOps', desc: 'CI/CD pipelines, container orchestration, and infrastructure-as-code. Your system, always running.', tags: ['AWS', 'Docker', 'K8s', 'Terraform'] },
  { num: 'MOD_04', title: 'API & Backend', desc: 'Robust REST and GraphQL APIs, microservices architecture, and data pipelines designed for growth.', tags: ['NestJS', 'Go', 'Postgres', 'Redis'] },
  { num: 'MOD_05', title: 'UI/UX Design', desc: 'Design systems, prototypes, and pixel-perfect interfaces that are as functional as they are beautiful.', tags: ['Figma', 'Design Systems', 'A11y'] },
  { num: 'MOD_06', title: 'Tech Consulting', desc: 'Architecture reviews, technology selection, and strategic guidance for teams scaling their engineering.', tags: ['Architecture', 'ADRs', 'Audits'] },
];

const PHASES: [string, string][] = [
  ['DISCOVER', 'Audit · interviews · existing systems'],
  ['DESIGN',   'Specs · UX · architecture'],
  ['BUILD',    'Engineering · CI/CD · testing'],
  ['OPTIMISE', 'Profiling · tuning · hardening'],
  ['OPERATE',  'Monitoring · iteration · on-call'],
];

const PRINCIPLES: [string, string, string][] = [
  ['01', 'BUILD FOR LOAD',     'Every system has a load it was designed for and one it actually meets. We design for the second.'],
  ['02', 'OWN THE STACK',      'No black boxes. We pick tools we can debug at 3am and explain to your CTO at 9am.'],
  ['03', 'SHIP IN INCREMENTS', 'Working software in production beats a perfect spec in a doc. Always.'],
  ['04', 'WRITE IT DOWN',      'A runbook, an ADR, a post-mortem. The system is more than the code.'],
];

@Component({
  selector: 'cc-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
              CodeCraft Solutions is a Belgrade-based engineering studio. We design,
              build, and maintain web and mobile software for teams who treat their
              codebase as critical infrastructure — not a sketch.
            </p>
            <div class="bp-actions">
              <button class="bp-btn bp-btn--primary" (click)="go('/contact')" type="button">
                <span class="bp-btn__label">INITIATE_PROJECT</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <button class="bp-btn bp-btn--ghost" (click)="go('/services')" type="button">
                <span class="bp-btn__label">VIEW_CAPABILITIES</span>
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

      <!-- CAPABILITIES MATRIX -->
      <section class="bp-section" aria-label="Capabilities">
        <div class="bp-section__head">
          <span class="bp-mono bp-section__num">§02</span>
          <h2 class="bp-h2">CAPABILITIES MATRIX</h2>
          <span class="bp-section__rule"></span>
          <span class="bp-mono bp-section__count">06 / 06 ACTIVE</span>
        </div>
        <div class="bp-matrix" role="list">
          @for (s of services; track s.num) {
            <button class="bp-cell" role="listitem" type="button" (click)="go('/services')" [attr.aria-label]="s.title">
              <div class="bp-cell__top">
                <span class="bp-mono bp-cell__num">{{ s.num }}</span>
                <span class="bp-cell__status bp-mono">
                  <span class="bp-cell__dot" aria-hidden="true"></span>
                  ACTIVE
                </span>
              </div>
              <h3 class="bp-cell__title">{{ s.title }}</h3>
              <p class="bp-cell__desc">{{ s.desc }}</p>
              <div class="bp-cell__foot">
                @for (t of s.tags; track t) {
                  <span class="bp-chip">{{ t }}</span>
                }
              </div>
              <span class="bp-cell__arrow" aria-hidden="true">↗</span>
            </button>
          }
        </div>
      </section>

      <!-- DELIVERY DIAGRAM -->
      <section class="bp-section" aria-label="Delivery process">
        <div class="bp-section__head">
          <span class="bp-mono bp-section__num">§03</span>
          <h2 class="bp-h2">DELIVERY DIAGRAM</h2>
          <span class="bp-section__rule"></span>
          <span class="bp-mono bp-section__count">5-PHASE LOOP</span>
        </div>
        <div class="bp-diagram">
          @for (phase of phases; track phase[0]; let i = $index; let last = $last) {
            <div class="bp-node">
              <div class="bp-mono bp-node__idx">PH·0{{ i + 1 }}</div>
              <div class="bp-node__label">{{ phase[0] }}</div>
              <div class="bp-node__sub">{{ phase[1] }}</div>
            </div>
            @if (!last) {
              <div class="bp-link" aria-hidden="true">
                <svg viewBox="0 0 80 24" preserveAspectRatio="none">
                  <line x1="0" y1="12" x2="68" y2="12" stroke="currentColor" stroke-width="1" stroke-dasharray="3 3"/>
                  <polygon points="68,7 78,12 68,17" fill="currentColor"/>
                </svg>
              </div>
            }
          }
        </div>
      </section>

      <!-- ENGINEERING PRINCIPLES -->
      <section class="bp-section" aria-label="Engineering principles">
        <div class="bp-section__head">
          <span class="bp-mono bp-section__num">§04</span>
          <h2 class="bp-h2">ENGINEERING PRINCIPLES</h2>
          <span class="bp-section__rule"></span>
          <span class="bp-mono bp-section__count">04 ITEMS</span>
        </div>
        <div class="bp-principles">
          @for (p of principles; track p[0]) {
            <article class="bp-principle">
              <span class="bp-mono bp-principle__num">{{ p[0] }}</span>
              <h3 class="bp-principle__title">{{ p[1] }}</h3>
              <p class="bp-principle__desc">{{ p[2] }}</p>
            </article>
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
              <span class="bp-btn__label">START_INTAKE</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a class="bp-btn bp-btn--ghost bp-btn--lg" href="mailto:hello@codecraftsolutions.rs">
              <span class="bp-btn__label">EMAIL_US</span>
            </a>
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
      display: flex; flex-direction: column; gap: 32px;
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
      content: '';
      position: absolute;
      width: 16px; height: 16px;
      border: 1.5px solid var(--cc-accent);
      pointer-events: none;
      z-index: 1;
    }
    .bp-plate::before  { top: -1px;    left: -1px;  border-right: 0; border-bottom: 0; }
    .bp-plate::after   { top: -1px;    right: -1px; border-left: 0;  border-bottom: 0; }
    .bp-plate__corners::before { bottom: -1px; left: -1px;  border-right: 0; border-top: 0; position: absolute; }
    .bp-plate__corners::after  { bottom: -1px; right: -1px; border-left: 0;  border-top: 0; position: absolute; }

    .bp-dims {
      display: flex; align-items: center; gap: 14px;
      font-size: 10px; color: var(--cc-ink-mute);
      letter-spacing: 0.18em;
    }
    .bp-dims--top  { margin-bottom: 28px; }
    .bp-dims--bottom { margin-top: 32px; }
    .bp-dims__line { flex: 1; height: 1px; background: var(--cc-rule-strong); }

    /* HERO */
    .bp-hero {
      display: grid;
      grid-template-columns: 1.45fr 1fr;
      gap: 40px;
      align-items: stretch;
    }
    .bp-callout {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 10px; letter-spacing: 0.2em; color: var(--cc-accent);
      margin-bottom: 26px; text-transform: uppercase;
    }
    .bp-callout__dot {
      width: 7px; height: 7px; background: var(--cc-accent); display: inline-block;
    }
    .bp-h1 {
      font-family: var(--cc-font-display);
      font-size: clamp(48px, 5.6vw, 84px);
      line-height: 0.96; font-weight: 700;
      letter-spacing: -0.025em;
      margin: 0 0 32px; color: var(--cc-ink);
    }
    .bp-h1__accent { color: var(--cc-accent); }
    .bp-h1__sub    { color: var(--cc-ink-soft); font-weight: 500; }
    .bp-lede {
      font-family: var(--cc-font-display);
      font-size: 17px; line-height: 1.55;
      color: var(--cc-ink-soft);
      max-width: 560px; margin: 0 0 36px;
    }
    .bp-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 0; }

    /* BUTTONS */
    .bp-btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 13px 18px;
      font-family: var(--cc-font-mono);
      font-size: 11px; font-weight: 600;
      letter-spacing: 0.18em;
      border: 1px solid; cursor: pointer;
      transition: all 0.18s ease;
      background: transparent;
      text-decoration: none; text-transform: uppercase;
    }
    .bp-btn--lg { padding: 16px 22px; font-size: 12px; }
    .bp-btn__label { display: inline-block; }
    .bp-btn--primary {
      background: var(--cc-accent); color: var(--cc-bg);
      border-color: var(--cc-accent);
    }
    .bp-btn--primary:hover {
      filter: brightness(1.1);
      box-shadow: 0 0 0 4px var(--cc-accent-glow);
      transform: translateY(-1px);
    }
    .bp-btn--ghost { color: var(--cc-ink); border-color: var(--cc-rule-strong); }
    .bp-btn--ghost:hover {
      border-color: var(--cc-accent); color: var(--cc-accent);
      background: var(--cc-accent-soft);
    }

    /* ASIDE */
    .bp-hero__aside { display: flex; flex-direction: column; gap: 16px; }
    .bp-spec {
      border: 1px solid var(--cc-rule);
      background: var(--cc-panel);
      padding: 18px 20px; position: relative;
    }
    .bp-spec__head {
      font-size: 10px; letter-spacing: 0.2em; color: var(--cc-ink-mute);
      padding-bottom: 12px; margin-bottom: 12px;
      border-bottom: 1px dashed var(--cc-rule-strong);
    }
    .bp-spec__rows { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
    .bp-spec__row  { display: flex; align-items: baseline; gap: 8px; font-size: 12px; }
    .bp-spec__k    { color: var(--cc-ink-soft); letter-spacing: 0.06em; }
    .bp-spec__leader { flex: 1; height: 0; border-bottom: 1px dotted var(--cc-rule-strong); margin-bottom: 4px; }
    .bp-spec__v    { color: var(--cc-ink); font-weight: 600; font-family: var(--cc-font-mono); font-size: 12px; }

    .bp-instrument {
      border: 1px solid var(--cc-rule); background: var(--cc-panel);
      color: var(--cc-ink-mute); flex: 1; min-height: 240px;
      display: flex; flex-direction: column;
    }
    .bp-instrument__head {
      display: flex; justify-content: space-between;
      padding: 10px 14px;
      border-bottom: 1px dashed var(--cc-rule-strong);
      font-size: 10px; letter-spacing: 0.18em; color: var(--cc-ink-mute);
    }
    .bp-instrument__legend { color: var(--cc-accent); }
    .bp-instrument__svg { width: 100%; flex: 1; padding: 8px; }

    /* SECTION */
    .bp-section { display: flex; flex-direction: column; gap: 20px; }
    .bp-section__head { display: flex; align-items: baseline; gap: 16px; }
    .bp-section__num { font-size: 11px; letter-spacing: 0.2em; color: var(--cc-accent); }
    .bp-h2 {
      font-family: var(--cc-font-mono);
      font-size: 13px; font-weight: 600;
      letter-spacing: 0.22em; margin: 0; color: var(--cc-ink);
    }
    .bp-section__rule { flex: 1; height: 1px; background: var(--cc-rule-strong); }
    .bp-section__count { font-size: 10px; letter-spacing: 0.18em; color: var(--cc-ink-mute); }

    /* MATRIX */
    .bp-matrix {
      display: grid; grid-template-columns: repeat(3, 1fr);
      gap: 0; border: 1px solid var(--cc-rule-strong);
      background: var(--cc-rule);
    }
    .bp-cell {
      position: relative; background: var(--cc-bg);
      border: 0; border-right: 1px solid var(--cc-rule);
      border-bottom: 1px solid var(--cc-rule);
      padding: 24px 24px 64px;
      text-align: left; cursor: pointer;
      font-family: var(--cc-font-display); color: var(--cc-ink);
      transition: background 0.2s; min-height: 240px;
    }
    .bp-cell:hover { background: var(--cc-panel); }
    .bp-cell:hover .bp-cell__arrow { opacity: 1; transform: translate(0,0); color: var(--cc-accent); }
    .bp-cell:nth-child(3n)        { border-right: 0; }
    .bp-cell:nth-last-child(-n+3) { border-bottom: 0; }
    .bp-cell__top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 18px; }
    .bp-cell__num { font-size: 11px; letter-spacing: 0.18em; color: var(--cc-accent); }
    .bp-cell__status { display: inline-flex; align-items: center; gap: 6px; font-size: 9px; letter-spacing: 0.18em; color: var(--cc-ink-mute); }
    .bp-cell__dot { width: 6px; height: 6px; background: var(--cc-accent); border-radius: 50%; }
    .bp-cell__title { font-size: 24px; font-weight: 600; letter-spacing: -0.012em; margin: 0 0 12px; line-height: 1.1; }
    .bp-cell__desc  { font-size: 14px; line-height: 1.55; color: var(--cc-ink-soft); margin: 0 0 14px; }
    .bp-cell__foot  { position: absolute; bottom: 18px; left: 24px; right: 24px; display: flex; gap: 6px; flex-wrap: wrap; }
    .bp-cell__arrow {
      position: absolute; top: 24px; right: 24px;
      font-size: 16px; color: var(--cc-ink-mute);
      opacity: 0; transform: translate(-4px, 4px);
      transition: opacity 0.2s, transform 0.2s, color 0.2s;
    }
    .bp-chip {
      font-size: 10px; font-family: var(--cc-font-mono); letter-spacing: 0.1em;
      color: var(--cc-ink-soft); border: 1px solid var(--cc-rule-strong);
      padding: 3px 8px; background: transparent; text-transform: uppercase;
    }

    /* DIAGRAM */
    .bp-diagram { display: flex; align-items: stretch; gap: 0; flex-wrap: wrap; }
    .bp-node {
      flex: 1; min-width: 150px;
      border: 1px solid var(--cc-rule-strong);
      background: var(--cc-panel);
      padding: 18px; display: flex; flex-direction: column; gap: 10px;
      position: relative;
    }
    .bp-node:first-child::before {
      content: ''; position: absolute; top: -1px; left: -1px;
      width: 12px; height: 12px;
      border-top: 1.5px solid var(--cc-accent); border-left: 1.5px solid var(--cc-accent);
    }
    .bp-node:last-child::after {
      content: ''; position: absolute; bottom: -1px; right: -1px;
      width: 12px; height: 12px;
      border-bottom: 1.5px solid var(--cc-accent); border-right: 1.5px solid var(--cc-accent);
    }
    .bp-node__idx   { font-size: 10px; letter-spacing: 0.2em; color: var(--cc-accent); }
    .bp-node__label { font-size: 17px; font-weight: 700; letter-spacing: 0.02em; color: var(--cc-ink); }
    .bp-node__sub   { font-size: 11px; color: var(--cc-ink-soft); line-height: 1.45; }
    .bp-link { width: 50px; display: flex; align-items: center; justify-content: center; color: var(--cc-ink-mute); }
    .bp-link svg { width: 100%; height: 24px; }

    /* PRINCIPLES */
    .bp-principles {
      display: grid; grid-template-columns: repeat(4, 1fr);
      gap: 0; border: 1px solid var(--cc-rule-strong);
    }
    .bp-principle { padding: 22px; border-right: 1px solid var(--cc-rule); background: var(--cc-bg); }
    .bp-principle:last-child { border-right: 0; }
    .bp-principle__num { font-size: 11px; letter-spacing: 0.2em; color: var(--cc-accent); display: block; margin-bottom: 12px; }
    .bp-principle__title { font-size: 17px; font-weight: 700; letter-spacing: -0.01em; margin: 0 0 10px; color: var(--cc-ink); }
    .bp-principle__desc  { font-size: 13px; line-height: 1.55; color: var(--cc-ink-soft); margin: 0; }

    /* CTA BAND */
    .bp-cta-band {
      position: relative;
      border: 1px solid var(--cc-rule-strong);
      background: var(--cc-panel); padding: 36px 40px;
    }
    .bp-cta-band::before, .bp-cta-band::after,
    .bp-cta-band .bp-plate__corners::before, .bp-cta-band .bp-plate__corners::after {
      content: '';
      position: absolute; width: 16px; height: 16px;
      border: 1.5px solid var(--cc-accent); pointer-events: none; z-index: 1;
    }
    .bp-cta-band::before  { top: -1px;    left: -1px;  border-right: 0; border-bottom: 0; }
    .bp-cta-band::after   { top: -1px;    right: -1px; border-left: 0;  border-bottom: 0; }
    .bp-cta-band .bp-plate__corners::before { bottom: -1px; left: -1px;  border-right: 0; border-top: 0; position: absolute; }
    .bp-cta-band .bp-plate__corners::after  { bottom: -1px; right: -1px; border-left: 0;  border-top: 0; position: absolute; }
    .bp-cta-band__inner {
      display: grid; grid-template-columns: 1fr auto;
      gap: 40px; align-items: end;
    }
    .bp-cta-band__title { font-family: var(--cc-font-display); font-size: 36px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.05; margin: 0 0 12px; color: var(--cc-ink); }
    .bp-cta-band__desc  { font-size: 14px; color: var(--cc-ink-soft); margin: 0; max-width: 480px; }
    .bp-cta-band__actions { display: flex; gap: 10px; flex-wrap: wrap; }

    /* RESPONSIVE */
    @media (max-width: 980px) {
      .bp-page { padding: 18px; gap: 18px; }
      .bp-plate { padding: 22px; }
      .bp-hero { grid-template-columns: 1fr; gap: 28px; }
      .bp-matrix { grid-template-columns: 1fr; }
      .bp-cell { border-right: 0; min-height: auto; padding-bottom: 56px; }
      .bp-cell:nth-last-child(-n+3) { border-bottom: 1px solid var(--cc-rule); }
      .bp-cell:last-child { border-bottom: 0; }
      .bp-diagram { flex-direction: column; }
      .bp-link { width: 100%; height: 24px; }
      .bp-link svg { transform: rotate(90deg); height: 32px; }
      .bp-principles { grid-template-columns: 1fr 1fr; }
      .bp-principle { border-right: 1px solid var(--cc-rule); border-bottom: 1px solid var(--cc-rule); }
      .bp-principle:nth-child(2n)       { border-right: 0; }
      .bp-principle:nth-last-child(-n+2){ border-bottom: 0; }
      .bp-cta-band__inner { grid-template-columns: 1fr; gap: 24px; }
    }
    @media (max-width: 600px) {
      .bp-principles { grid-template-columns: 1fr; }
      .bp-principle  { border-right: 0 !important; }
    }
  `,
})
export class HomeComponent implements OnDestroy {
  private readonly router = inject(Router);
  private rafId = 0;
  private lastTime = 0;

  readonly services = SERVICES;
  readonly phases = PHASES;
  readonly principles = PRINCIPLES;
  readonly specRows: [string, string][] = [
    ['CLIENTS',     '40+'],
    ['UPTIME / SLA','99.95%'],
    ['LOC SHIPPED', '2.4M'],
    ['AVG_RESPONSE','<24h'],
    ['STACK_DEPTH', '12 lang.'],
    ['REGIONS',     'EU · NA'],
  ];

  readonly angle = signal(0);
  readonly ticks = this.buildTicks();

  constructor() {
    const tick = (t: number) => {
      const dt = (t - (this.lastTime || t)) / 1000;
      this.lastTime = t;
      this.angle.update(a => Math.round((a + dt * 18) % 360));
      this.rafId = requestAnimationFrame(tick);
    };
    this.rafId = requestAnimationFrame(tick);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.rafId);
  }

  go(route: string): void {
    this.router.navigate([route]);
  }

  sweepX(): number {
    return 100 + Math.cos((this.angle() - 90) * Math.PI / 180) * 70;
  }

  sweepY(): number {
    return 100 + Math.sin((this.angle() - 90) * Math.PI / 180) * 70;
  }

  private buildTicks(): { x1: number; y1: number; x2: number; y2: number }[] {
    return Array.from({ length: 24 }, (_, i) => {
      const a = (i * 15 - 90) * Math.PI / 180;
      const r2 = i % 4 === 0 ? 72 : 76;
      return { x1: 100 + Math.cos(a) * 80, y1: 100 + Math.sin(a) * 80, x2: 100 + Math.cos(a) * r2, y2: 100 + Math.sin(a) * r2 };
    });
  }
}
