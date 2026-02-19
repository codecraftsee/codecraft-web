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
          Build software that<br>actually ships.
        </h1>
        <p class="hero__sub">
          CodeCraft delivers end-to-end software development and technical consulting
          for teams that refuse to settle for slow.
        </p>
        <a mat-flat-button [routerLink]="['/contact']" class="hero__cta">
          Let's talk
        </a>
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
      max-width: 720px;
      text-align: center;
    }

    .hero__headline {
      margin: 0 0 1.5rem;
      font: var(--mat-sys-display-large);
      color: var(--cc-on-surface);
      line-height: 1.1;
    }

    .hero__sub {
      margin: 0 0 2.5rem;
      font: var(--mat-sys-title-large);
      color: var(--cc-on-surface);
      opacity: 0.75;
    }

    .hero__cta {
      font-size: 1rem;
      padding: 0 2rem;
      height: 52px;
    }

    @media (max-width: 767px) {
      .hero__headline {
        font: var(--mat-sys-display-small);
      }

      .hero__sub {
        font: var(--mat-sys-body-large);
      }
    }
  `,
})
export class HeroSectionComponent {}
