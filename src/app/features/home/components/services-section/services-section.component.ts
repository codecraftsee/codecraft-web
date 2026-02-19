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
            <span class="service-card__icon" aria-hidden="true">⚙️</span>
            <h3 class="service-card__title">Software Development</h3>
            <p class="service-card__desc">
              From MVP to production-grade systems — we design, build and ship
              software that scales with your ambitions.
            </p>
          </a>
          <a class="service-card" [routerLink]="['/services']">
            <span class="service-card__icon" aria-hidden="true">🧭</span>
            <h3 class="service-card__title">Technical Consulting</h3>
            <p class="service-card__desc">
              Architecture reviews, tech strategy, and team augmentation —
              sharp advice when the stakes are high.
            </p>
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .services {
      padding: 6rem 2rem;
      background-color: var(--cc-surface);
    }

    .services__inner {
      max-width: 960px;
      margin: 0 auto;
    }

    .services__heading {
      margin: 0 0 3rem;
      font: var(--mat-sys-display-small);
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
      background-color: var(--cc-surface-variant);
      border: 1px solid var(--cc-outline);
      border-radius: 12px;
      text-decoration: none;
      color: var(--cc-on-surface);
      transition: border-color 0.15s;
    }

    .service-card:hover {
      border-color: var(--cc-primary);
    }

    .service-card__icon {
      font-size: 2rem;
    }

    .service-card__title {
      margin: 0;
      font: var(--mat-sys-title-large);
    }

    .service-card__desc {
      margin: 0;
      font: var(--mat-sys-body-large);
      opacity: 0.8;
    }

    @media (max-width: 767px) {
      .services__grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class ServicesSectionComponent {}
