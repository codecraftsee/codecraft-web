import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-why-section',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="approach">
      <div class="approach__inner">
        <h2 class="approach__heading">Our Approach</h2>
        <div class="approach__steps">
          <div class="step">
            <span class="step__number" aria-hidden="true">01</span>
            <div class="step__content">
              <h3 class="step__title">Discovery</h3>
              <p class="step__desc">
                We start by understanding your business goals, constraints, and users.
                No assumptions — just deep listening and sharp questions.
              </p>
            </div>
          </div>
          <div class="step">
            <span class="step__number" aria-hidden="true">02</span>
            <div class="step__content">
              <h3 class="step__title">Strategy</h3>
              <p class="step__desc">
                We define the architecture, tech stack, and delivery roadmap.
                Every decision is deliberate and aligned with your timeline.
              </p>
            </div>
          </div>
          <div class="step">
            <span class="step__number" aria-hidden="true">03</span>
            <div class="step__content">
              <h3 class="step__title">Build</h3>
              <p class="step__desc">
                Iterative development with tight feedback loops. You see progress
                early and often — no surprises at the finish line.
              </p>
            </div>
          </div>
          <div class="step">
            <span class="step__number" aria-hidden="true">04</span>
            <div class="step__content">
              <h3 class="step__title">Launch & Scale</h3>
              <p class="step__desc">
                Deployment, monitoring, and continuous improvement. We stay with you
                through launch and beyond to make sure it sticks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .approach {
      padding: 6rem 2rem;
      background-color: var(--cc-surface);
    }

    .approach__inner {
      max-width: 1120px;
      margin: 0 auto;
    }

    .approach__heading {
      margin: 0 0 3rem;
      font-family: var(--cc-font-serif);
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 400;
      color: var(--cc-on-surface);
      text-align: center;
    }

    .approach__steps {
      display: flex;
      flex-direction: column;
      gap: 3rem;
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: 2rem;
    }

    .step__number {
      font-family: var(--cc-font-serif);
      font-size: 3.5rem;
      line-height: 1;
      color: var(--cc-accent);
      flex-shrink: 0;
      min-width: 4.5rem;
    }

    .step__content {
      flex: 1;
      padding-top: 0.5rem;
    }

    .step__title {
      margin: 0 0 0.5rem;
      font: var(--mat-sys-title-large);
      font-family: var(--cc-font-sans);
      color: var(--cc-on-surface);
    }

    .step__desc {
      margin: 0;
      font: var(--mat-sys-body-large);
      font-family: var(--cc-font-sans);
      color: var(--cc-on-surface);
      opacity: 0.75;
      max-width: 540px;
    }

    @media (min-width: 1024px) {
      .approach {
        padding: 6rem 4rem;
      }
    }

    @media (max-width: 767px) {
      .approach {
        padding: 4rem 2rem;
      }

      .step {
        flex-direction: column;
        gap: 0.5rem;
      }

      .step__number {
        font-size: 3rem;
      }
    }
  `,
})
export class WhySectionComponent {}
