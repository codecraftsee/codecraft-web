import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-why-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="why">
      <div class="why__inner">
        <h2 class="why__heading">Why CodeCraft</h2>
        <div class="why__grid">
          <div class="why-item">
            <span class="why-item__icon" aria-hidden="true">🚀</span>
            <h3 class="why-item__title">We ship fast</h3>
            <p class="why-item__desc">
              Tight feedback loops and pragmatic decisions get working software into your hands quickly.
            </p>
          </div>
          <div class="why-item">
            <span class="why-item__icon" aria-hidden="true">🔩</span>
            <h3 class="why-item__title">We build to last</h3>
            <p class="why-item__desc">
              Clean architecture and rigorous testing mean the codebase you get won't slow you down later.
            </p>
          </div>
          <div class="why-item">
            <span class="why-item__icon" aria-hidden="true">🤝</span>
            <h3 class="why-item__title">We work as partners</h3>
            <p class="why-item__desc">
              Transparent communication and genuine ownership — we're invested in your success.
            </p>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .why {
      padding: 6rem 2rem;
      background-color: var(--cc-surface-variant);
    }

    .why__inner {
      max-width: 960px;
      margin: 0 auto;
    }

    .why__heading {
      margin: 0 0 3rem;
      font: var(--mat-sys-display-small);
      color: var(--cc-on-surface);
      text-align: center;
    }

    .why__grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 2rem;
    }

    .why-item {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .why-item__icon {
      font-size: 2rem;
    }

    .why-item__title {
      margin: 0;
      font: var(--mat-sys-title-large);
      color: var(--cc-on-surface);
    }

    .why-item__desc {
      margin: 0;
      font: var(--mat-sys-body-large);
      color: var(--cc-on-surface);
      opacity: 0.8;
    }

    @media (max-width: 1199px) and (min-width: 768px) {
      .why__grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    @media (max-width: 767px) {
      .why__grid {
        grid-template-columns: 1fr;
      }
    }
  `,
})
export class WhySectionComponent {}
