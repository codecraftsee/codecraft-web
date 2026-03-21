import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'cc-why-section',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="toc" aria-label="Site contents">
      <div class="toc__inner">
        <h2 class="toc__heading">Contents</h2>

        <ul class="toc__list">
          <li class="toc__entry">
            <a class="toc__link" routerLink="/">
              <span class="toc__body">
                <span class="toc__chapter-label">Chapter I</span>
                <span class="toc__title">Home</span>
                <span class="toc__desc">Where the story begins</span>
              </span>
              <span class="toc__leader" aria-hidden="true"></span>
              <span class="toc__number" aria-hidden="true">01</span>
            </a>
          </li>

          <li class="toc__entry">
            <a class="toc__link" routerLink="/team">
              <span class="toc__body">
                <span class="toc__chapter-label">Chapter II</span>
                <span class="toc__title">Code Crafters</span>
                <span class="toc__desc">Meet the team</span>
              </span>
              <span class="toc__leader" aria-hidden="true"></span>
              <span class="toc__number" aria-hidden="true">02</span>
            </a>
          </li>

          <li class="toc__entry">
            <a class="toc__link" routerLink="/services">
              <span class="toc__body">
                <span class="toc__chapter-label">Chapter III</span>
                <span class="toc__title">Services</span>
                <span class="toc__desc">What we build and how</span>
              </span>
              <span class="toc__leader" aria-hidden="true"></span>
              <span class="toc__number" aria-hidden="true">03</span>
            </a>
          </li>

          <li class="toc__entry">
            <a class="toc__link" routerLink="/contact">
              <span class="toc__body">
                <span class="toc__chapter-label">Chapter IV</span>
                <span class="toc__title">Contact</span>
                <span class="toc__desc">Start a conversation</span>
              </span>
              <span class="toc__leader" aria-hidden="true"></span>
              <span class="toc__number" aria-hidden="true">04</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  `,
  styles: `
    .toc {
      padding: 2rem 2rem;
      width: 100%;
    }

    .toc__inner {
      max-width: 720px;
      margin: 0 auto;
    }

    .toc__heading {
      margin: 0 0 3.5rem;
      font-family: var(--cc-font-serif);
      font-size: clamp(1.5rem, 3vw, 2rem);
      font-weight: 400;
      font-style: italic;
      color: var(--cc-on-surface);
      text-align: center;
      letter-spacing: 0.06em;
      opacity: 0.6;
    }

    .toc__list {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    .toc__entry {
      border-top: 1px solid var(--cc-outline);
    }

    .toc__entry:last-child {
      border-bottom: 1px solid var(--cc-outline);
    }

    /* ── Entry link: grid layout ── */
    .toc__link {
      display: grid;
      grid-template-columns: 1fr auto auto;
      align-items: baseline;
      gap: 1rem;
      padding: 2.25rem 0.25rem;
      text-decoration: none;
      color: var(--cc-on-surface);
      transition: color 0.3s;
    }

    /* Hover — pointer devices only */
    @media (hover: hover) {
      .toc__link:hover .toc__number {
        color: var(--cc-accent);
        opacity: 0.9;
      }

      .toc__link:hover .toc__title {
        color: var(--cc-accent);
      }

      .toc__link:hover .toc__leader {
        border-color: var(--cc-accent);
        opacity: 0.4;
      }
    }

    /* Active — touch devices */
    .toc__link:active .toc__number {
      color: var(--cc-accent);
      opacity: 0.9;
    }

    .toc__link:active .toc__title {
      color: var(--cc-accent);
    }

    .toc__link:active .toc__leader {
      border-color: var(--cc-accent);
      opacity: 0.4;
    }

    .toc__link:focus-visible {
      outline: 2px solid var(--cc-accent);
      outline-offset: 6px;
      border-radius: 2px;
    }

    /* ── Left: chapter info ── */
    .toc__body {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
      min-width: 0;
    }

    .toc__chapter-label {
      font-family: var(--cc-font-sans);
      font-size: 0.6875rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.14em;
      color: var(--cc-on-surface);
      opacity: 0.35;
    }

    .toc__title {
      font-family: var(--cc-font-serif);
      font-size: clamp(1.75rem, 4vw, 2.5rem);
      font-weight: 400;
      line-height: 1.15;
      transition: color 0.3s;
    }

    .toc__desc {
      font-family: var(--cc-font-sans);
      font-size: 0.8125rem;
      font-style: italic;
      color: var(--cc-on-surface);
      opacity: 0.4;
      letter-spacing: 0.01em;
      margin-top: 0.15rem;
    }

    /* ── Dot leader ── */
    .toc__leader {
      align-self: end;
      flex-shrink: 1;
      min-width: 3rem;
      width: 100%;
      max-width: 8rem;
      height: 0;
      border-bottom: 2px dotted var(--cc-outline);
      margin-bottom: 0.55em;
      transition: border-color 0.3s, opacity 0.3s;
    }

    /* ── Right: page number ── */
    .toc__number {
      font-family: var(--cc-font-serif);
      font-size: clamp(3.5rem, 7vw, 5.5rem);
      font-weight: 400;
      line-height: 1;
      color: var(--cc-on-surface);
      opacity: 0.15;
      text-align: right;
      transition: color 0.3s, opacity 0.3s;
      min-width: 3.5rem;
    }

    /* ── Desktop ── */
    @media (min-width: 1024px) {
      .toc {
        padding: 3rem 4rem;
      }

      .toc__link {
        padding: 2.5rem 0.5rem;
      }
    }

    /* ── Mobile ── */
    @media (max-width: 767px) {
      .toc {
        padding: 1.5rem 0.5rem;
      }

      .toc__link {
        padding: 1.5rem 0;
        gap: 0.5rem;
      }

      .toc__leader {
        min-width: 1rem;
        max-width: 3rem;
      }

      .toc__number {
        font-size: 2.5rem;
        min-width: 2rem;
      }
    }
  `,
})
export class WhySectionComponent {}
