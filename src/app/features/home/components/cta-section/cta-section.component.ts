import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'cc-cta-section',
  imports: [RouterLink, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="cta">
      <div class="cta__inner">
        <h2 class="cta__heading">Ready to build something great?</h2>
        <a mat-flat-button [routerLink]="['/contact']" class="cta__button">
          Get in touch
        </a>
      </div>
    </section>
  `,
  styles: `
    .cta {
      padding: 6rem 2rem;
      background-color: var(--cc-primary);
    }

    .cta__inner {
      max-width: 720px;
      margin: 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2rem;
    }

    .cta__heading {
      margin: 0;
      font: var(--mat-sys-display-small);
      color: var(--cc-on-primary);
    }

    .cta__button {
      font-size: 1rem;
      padding: 0 2rem;
      height: 52px;
    }
  `,
})
export class CtaSectionComponent {}
