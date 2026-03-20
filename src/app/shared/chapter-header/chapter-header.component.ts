import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'cc-chapter-header',
  imports: [RouterLink, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="chapter-header">
      <a class="chapter-header__back" routerLink="/">
        <svg
          aria-hidden="true"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M19 12H5M12 5l-7 7 7 7" />
        </svg>
        <span>Contents</span>
      </a>
      <cc-theme-toggle />
    </header>
  `,
  styles: `
    .chapter-header {
      position: sticky;
      top: 0;
      z-index: 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
    }

    .chapter-header__back {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
      color: var(--cc-on-surface);
      font-family: var(--cc-font-sans);
      font-size: 0.875rem;
      font-weight: 500;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      opacity: 0.6;
      transition: opacity 0.2s, color 0.2s;
    }

    .chapter-header__back:hover {
      opacity: 1;
      color: var(--cc-accent);
    }

    .chapter-header__back:focus-visible {
      outline: 2px solid var(--cc-accent);
      outline-offset: 4px;
      border-radius: 4px;
    }
  `,
})
export class ChapterHeaderComponent {}
