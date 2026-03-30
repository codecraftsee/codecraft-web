import { ChangeDetectionStrategy, Component } from '@angular/core';

interface ServiceOffering {
  number: string;
  title: string;
  description: string;
  tags: string[];
}

@Component({
  selector: 'cc-services',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <section class="hero">
        <h1 class="hero__title">Our Services</h1>
        <p class="hero__subtitle">What we build, and how we deliver value.</p>
      </section>

      <div class="timeline" role="list" aria-label="Service offerings">
        @for (service of services; track service.number; let i = $index) {
          <div class="timeline__item" [style.--card-index]="i">
            <div class="timeline__dot"></div>
            <article class="card" role="listitem">
              <div class="card__number">{{ service.number }}</div>
              <h3 class="card__title">{{ service.title }}</h3>
              <p class="card__desc">{{ service.description }}</p>
              <div class="card__tags">
                @for (tag of service.tags; track tag) {
                  <span class="card__tag">{{ tag }}</span>
                }
              </div>
            </article>
          </div>
        }
      </div>
    </div>
  `,
  styles: `
    :host {
      display: block;
      background: transparent;
      color: #F1F5F9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      min-height: 100dvh;
      overflow-x: hidden;
    }

    .container { max-width: 1100px; margin: 0 auto; padding: 0 2rem; }

    /* Hero */
    .hero { padding: 6rem 0 2rem; text-align: center; }
    .hero__title {
      display: inline-block;
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 1rem;
      padding: 0.05em 0;
      line-height: 1.2;
      background: linear-gradient(135deg, #10B981, #059669, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero__subtitle {
      font-size: 18px;
      color: #cbd5e1;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.7;
    }

    /* Timeline — centered line */
    .timeline {
      position: relative;
      margin: 4rem 0;
    }
    .timeline::before {
      content: '';
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      bottom: 0;
      width: 2px;
      background: linear-gradient(180deg, #10B981, #059669);
      opacity: 0.2;
    }

    /* Timeline item — alternating wrapper */
    .timeline__item {
      display: flex;
      align-items: flex-start;
      position: relative;
      margin-bottom: 2rem;
      width: 50%;
      box-sizing: border-box;
      opacity: 0;
      transform: translateY(20px);
      animation: card-in 0.5s ease-out forwards;
      animation-delay: calc(var(--card-index) * 0.15s);
    }
    .timeline__item:last-child { margin-bottom: 0; }

    /* Odd items (1st, 3rd) — left side */
    .timeline__item:nth-child(odd) {
      margin-left: 0;
      padding-right: 40px;
      justify-content: flex-end;
    }

    /* Even items (2nd) — right side */
    .timeline__item:nth-child(even) {
      margin-left: 50%;
      padding-left: 40px;
      justify-content: flex-start;
    }

    /* Dot on the center line — positioned via timeline, not card */
    .timeline__dot {
      position: absolute;
      top: 2.75rem;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10B981, #059669);
      box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
      z-index: 2;
    }
    .timeline__item:nth-child(odd) .timeline__dot {
      right: -7px;
    }
    .timeline__item:nth-child(even) .timeline__dot {
      left: -7px;
    }

    /* Card */
    .card {
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05));
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 12px;
      padding: 2.5rem;
      cursor: pointer;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      width: 100%;
    }

    /* Shine sweep */
    .card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
      transition: left 0.6s;
    }
    .card:hover::before { left: 100%; }

    /* Hover — odd shifts left, even shifts right */
    .card:hover {
      border-color: rgba(16, 185, 129, 0.3);
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
      box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1);
    }
    .timeline__item:nth-child(odd) .card:hover {
      transform: translateX(-8px);
    }
    .timeline__item:nth-child(even) .card:hover {
      transform: translateX(8px);
    }

    .card__number {
      display: inline-block;
      font-size: 56px;
      font-weight: 800;
      line-height: 1.2;
      padding: 0.05em 0;
      background: linear-gradient(135deg, #10B981, #059669);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.3;
      margin-bottom: 1rem;
    }
    .card__title {
      font-size: 28px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 0.8rem;
      color: #fff;
    }
    .card__desc {
      font-size: 14px;
      color: #cbd5e1;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }
    .card__tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
    .card__tag {
      font-size: 12px;
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      border: 1px solid rgba(16, 185, 129, 0.15);
      color: #94a3b8;
      background: rgba(16, 185, 129, 0.05);
    }

    /* Light Theme Overrides */
    :host-context(.light-theme) {
      color: #1a1a2e;
    }
    :host-context(.light-theme) .timeline::before {
      background: linear-gradient(180deg, #0099cc, #0066cc);
      opacity: 0.15;
    }
    :host-context(.light-theme) .timeline__dot {
      background: linear-gradient(135deg, #0099cc, #0066cc);
      box-shadow: 0 0 12px rgba(0, 119, 204, 0.3);
    }
    :host-context(.light-theme) .hero__title {
      background: linear-gradient(135deg, #0099cc, #0066cc, #cc00cc);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .hero__subtitle {
      color: #94a3b8;
    }
    :host-context(.light-theme) .card {
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
      border-color: rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .card:hover {
      border-color: rgba(0, 119, 204, 0.3);
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03));
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .card::before {
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
    }
    :host-context(.light-theme) .card__title {
      color: #1a1a2e;
    }
    :host-context(.light-theme) .card__desc {
      color: #94a3b8;
    }
    :host-context(.light-theme) .card__tag {
      border-color: rgba(0, 0, 0, 0.1);
      color: #94a3b8;
      background: rgba(0, 0, 0, 0.03);
    }

    :host-context(.sable-theme) {
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .timeline::before {
      background: linear-gradient(180deg, #F59E0B, #D97706);
      opacity: 0.2;
    }
    :host-context(.sable-theme) .timeline__dot {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.4);
    }
    :host-context(.sable-theme) .hero__title {
      background: linear-gradient(135deg, #F59E0B, #D97706, #EA580C);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.sable-theme) .hero__subtitle {
      color: #D4B896;
    }
    :host-context(.sable-theme) .card {
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.05), rgba(217, 119, 6, 0.03));
      border-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .card:hover {
      border-color: rgba(245, 158, 11, 0.35);
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(217, 119, 6, 0.05));
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    :host-context(.sable-theme) .card::before {
      background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.06), transparent);
    }
    :host-context(.sable-theme) .card__title {
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .card__desc {
      color: #D4B896;
    }
    :host-context(.sable-theme) .card__tag {
      border-color: rgba(217, 119, 6, 0.15);
      color: #D4B896;
      background: rgba(217, 119, 6, 0.06);
    }

    /* Animations */
    @keyframes card-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    @media (prefers-reduced-motion: reduce) {
      .timeline__item { animation: none; opacity: 1; transform: none; }
      .card:hover { transform: none !important; }
      .card::before { transition: none; }
    }

    /* Responsive — single column */
    @media (max-width: 768px) {
      .timeline::before { left: 18px; transform: none; }
      .timeline__item,
      .timeline__item:nth-child(odd),
      .timeline__item:nth-child(even) {
        width: 100%;
        margin-left: 0;
        padding-left: 48px;
        padding-right: 0;
        justify-content: flex-start;
      }
      .timeline__dot,
      .timeline__item:nth-child(odd) .timeline__dot,
      .timeline__item:nth-child(even) .timeline__dot {
        left: 12px;
        right: auto;
      }
      .timeline__item:nth-child(odd) .card:hover,
      .timeline__item:nth-child(even) .card:hover {
        transform: translateX(8px);
      }
      .hero__title { font-size: 32px; }
      .hero__subtitle { font-size: 16px; }
      .card__title { font-size: 22px; }
      .card__number { font-size: 40px; }
    }
  `,
})
export class ServicesComponent {
  readonly services: ServiceOffering[] = [
    {
      number: '01',
      title: 'Web Applications',
      description: 'Creating dynamic, high-performing web applications tailored to solve complex problems and engage users effectively.',
      tags: ['SPA', 'Real-time', 'Enterprise', 'Cloud-native'],
    },
    {
      number: '02',
      title: 'AngularJS Migration',
      description: 'Modernising legacy AngularJS applications by migrating them to Angular — preserving business logic while unlocking performance, maintainability, and long-term support.',
      tags: ['AngularJS → Angular', 'Legacy Modernisation', 'TypeScript', 'Incremental Migration'],
    },
    {
      number: '03',
      title: 'Performance Engineering',
      description: 'We discover, audit, and fix performance bottlenecks across your stack — from slow load times and laggy UIs to inefficient APIs and database queries. We find what is hurting you before we fix it.',
      tags: ['Profiling', 'Core Web Vitals', 'Bundle Optimisation', 'DB Tuning', 'Caching'],
    },
    {
      number: '04',
      title: 'On-Demand Engineering',
      description: 'Need someone to jump in fast? We embed into your team or work solo to squash critical bugs, unblock sprints, and help you hit your deadline — without disrupting your workflow.',
      tags: ['Urgent Support', 'Bug Fixing', 'Sprint Help', 'Staff Augmentation'],
    },
    {
      number: '05',
      title: 'Mobile Development',
      description: 'Building high-quality native mobile applications for iOS and Android — crafted for performance, reliability, and a seamless user experience on every device.',
      tags: ['iOS Native', 'Android Native', 'Swift', 'Kotlin'],
    },
    {
      number: '06',
      title: 'Websites',
      description: 'Building responsive, visually engaging websites that communicate your brand and convert visitors into customers.',
      tags: ['Responsive', 'SEO', 'CMS', 'Performance'],
    },
  ];
}
