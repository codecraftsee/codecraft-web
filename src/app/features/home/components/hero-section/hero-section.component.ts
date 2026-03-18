import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cc-hero-section',
  imports: [RouterLink, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="hero">
      <div class="hero__content">
        <h1 class="hero__headline">
          Build software that<br><span class="hero__accent">actually ships.</span>
        </h1>
        <p class="hero__sub">
          CodeCraft delivers end-to-end software development and technical consulting
          for teams that refuse to settle for slow.
        </p>
        <div class="hero__ctas">
          <a mat-flat-button [routerLink]="['/contact']" class="hero__cta hero__cta--primary">
            Let's talk
          </a>
          <a mat-stroked-button [routerLink]="['/services']" class="hero__cta hero__cta--secondary">
            Our services
          </a>
        </div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      padding: 6rem 2rem 4rem;
      background-color: var(--cc-surface);
    }

    .hero__content {
      max-width: 1120px;
      text-align: center;
    }

    .hero__headline {
      margin: 0 0 1.5rem;
      font-family: var(--cc-font-serif);
      font-size: clamp(2.5rem, 6vw, 4.5rem);
      font-weight: 400;
      color: var(--cc-on-surface);
      line-height: 1.1;
    }

    .hero__accent {
      border-bottom: 4px solid var(--cc-accent);
      padding-bottom: 2px;
    }

    .hero__sub {
      margin: 0 0 2.5rem;
      font: var(--mat-sys-title-large);
      font-family: var(--cc-font-sans);
      color: var(--cc-on-surface);
      opacity: 0.75;
      max-width: 640px;
      margin-inline: auto;
    }

    .hero__ctas {
      display: flex;
      gap: 1rem;
      justify-content: center;
    }

    .hero__cta {
      font-size: 1rem;
      padding: 0 2rem;
      min-height: 48px;
      border-radius: 0.75rem;
    }

    .hero__cta--secondary {
      border-color: var(--cc-accent);
      color: var(--cc-accent);
    }

    @media (max-width: 767px) {
      .hero {
        padding: 4rem 2rem 3rem;
      }

      .hero__headline {
        font-size: 2.25rem;
      }

      .hero__sub {
        font: var(--mat-sys-body-large);
        font-family: var(--cc-font-sans);
      }

      .hero__ctas {
        flex-direction: column;
        align-items: center;
      }

      .hero__cta {
        width: 100%;
        max-width: 280px;
      }
    }
  `,
})
export class HeroSectionComponent {}
