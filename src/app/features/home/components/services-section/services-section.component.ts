import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cc-services-section',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="services">
      <div class="services__inner">
        <h2 class="services__heading">What we do</h2>
        <div class="services__grid">
          <a class="service-card" [routerLink]="['/services']">
            <svg class="service-card__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" />
              <path d="M8 21h8M12 17v4" />
              <path d="M7 8l3 3-3 3M12 14h4" />
            </svg>
            <h3 class="service-card__title">Software Development</h3>
            <p class="service-card__desc">
              From MVP to production-grade systems — we design, build and ship
              software that scales with your ambitions.
            </p>
          </a>
          <a class="service-card" [routerLink]="['/services']">
            <svg class="service-card__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
              <path d="M2 12h20" />
            </svg>
            <h3 class="service-card__title">Technical Consulting</h3>
            <p class="service-card__desc">
              Architecture reviews, tech strategy, and team augmentation —
              sharp advice when the stakes are high.
            </p>
          </a>
          <a class="service-card" [routerLink]="['/services']">
            <svg class="service-card__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a4 4 0 0 1 4 4c0 2-2 3-2 5h-4c0-2-2-3-2-5a4 4 0 0 1 4-4z" />
              <path d="M10 17h4M10 21h4M10 19h4" />
              <path d="M5 9l-1-1M19 9l1-1M12 2V1M3 15h1M20 15h1" />
            </svg>
            <h3 class="service-card__title">AI & Automation</h3>
            <p class="service-card__desc">
              Intelligent solutions and workflow automation — harness AI to
              eliminate repetitive work and unlock new capabilities.
            </p>
          </a>
          <a class="service-card" [routerLink]="['/services']">
            <svg class="service-card__icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
              <path d="M6 19h12" />
              <path d="M12 11a3 3 0 1 0 0-1 3 3 0 0 0 0 1z" />
              <path d="M9 15l1.5-1.5L12 15l1.5-1.5L15 15" />
            </svg>
            <h3 class="service-card__title">Cloud & DevOps</h3>
            <p class="service-card__desc">
              Infrastructure, CI/CD, and cloud architecture — robust platforms
              that your team can deploy to with confidence.
            </p>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .services {
      padding: 4rem 2rem;
      background: transparent;
    }

    .services__inner {
      max-width: 1120px;
      margin: 0 auto;
    }

    .services__heading {
      margin: 0 0 3rem;
      font-family: var(--cc-font-serif);
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 400;
      color: var(--cc-on-surface);
      text-align: center;
    }

    .services__grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }

    .service-card {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 2rem;
      background: var(--cc-glass-bg);
      border: 1px solid var(--cc-glass-border);
      border-radius: 12px;
      text-decoration: none;
      color: var(--cc-on-surface);
      backdrop-filter: blur(8px);
      transition: border-color 0.15s, transform 0.15s;
    }

    .service-card:hover {
      border-color: var(--cc-accent);
    }

    .service-card__icon {
      width: 2rem;
      height: 2rem;
      color: var(--cc-accent);
    }

    .service-card__title {
      margin: 0;
      font: var(--mat-sys-title-large);
      font-family: var(--cc-font-sans);
    }

    .service-card__desc {
      margin: 0;
      font: var(--mat-sys-body-large);
      font-family: var(--cc-font-sans);
      opacity: 0.75;
    }

    @media (min-width: 1024px) {
      .services {
        padding: 6rem 4rem;
      }
    }

    @media (max-width: 767px) {
      .services {
        padding: 4rem 2rem;
      }

      .services__grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ServicesSectionComponent {}
