import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

interface Chapter {
  numeral: string;
  title: string;
  route: string;
  exact: boolean;
}

@Component({
  selector: 'cc-book-navigation',
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="menu-toggle"
      (click)="toggleDrawer()"
      [attr.aria-expanded]="drawerOpen()"
      aria-label="Toggle navigation menu"
    >
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
        @if (drawerOpen()) {
          <path d="M18 6L6 18M6 6l12 12" />
        } @else {
          <path d="M4 7h16M4 12h16M4 17h16" />
        }
      </svg>
    </button>

    @if (drawerOpen()) {
      <div class="overlay" (click)="closeDrawer()" aria-hidden="true"></div>
    }

    <aside class="sidebar" [class.sidebar--open]="drawerOpen()">
      <a class="wordmark" routerLink="/">CodeCraft</a>

      <div class="separator" aria-hidden="true"></div>

      <nav aria-label="Main navigation">
        <ul class="chapters" role="list">
          @for (chapter of chapters; track chapter.route) {
            <li>
              <a
                class="chapter"
                [routerLink]="chapter.route"
                routerLinkActive="chapter--active"
                [routerLinkActiveOptions]="{ exact: chapter.exact }"
                (click)="closeDrawer()"
              >
                <span class="chapter__numeral">{{ chapter.numeral }}</span>
                <span class="chapter__title">{{ chapter.title }}</span>
              </a>
            </li>
          }
        </ul>
      </nav>

      <div class="sidebar__footer">
        <div class="separator" aria-hidden="true"></div>
        <cc-theme-toggle />
      </div>
    </aside>
  `,
  styles: `
    :host {
      display: contents;
    }

    /* ── Menu toggle (tablet + mobile) ── */
    .menu-toggle {
      display: none;
      position: fixed;
      top: 1rem;
      left: 1rem;
      z-index: 200;
      width: 48px;
      height: 48px;
      border: 1px solid var(--cc-glass-border);
      border-radius: 12px;
      background: var(--cc-glass-bg);
      backdrop-filter: blur(var(--cc-glass-blur));
      color: var(--cc-on-surface);
      cursor: pointer;
      align-items: center;
      justify-content: center;
    }

    /* ── Overlay (mobile drawer) ── */
    .overlay {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 99;
      background: rgba(0, 0, 0, 0.4);
    }

    /* ── Sidebar ── */
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 280px;
      height: 100dvh;
      display: flex;
      flex-direction: column;
      padding: 2.5rem 2rem;
      background: var(--cc-glass-bg);
      backdrop-filter: blur(var(--cc-glass-blur));
      border-right: 1px solid var(--cc-glass-border);
    }

    .wordmark {
      font-family: var(--cc-font-serif);
      font-size: 1.75rem;
      font-weight: 400;
      color: var(--cc-primary);
      text-decoration: none;
      letter-spacing: -0.02em;
    }

    .separator {
      height: 1px;
      background: linear-gradient(
        to right,
        var(--cc-outline),
        transparent
      );
      margin: 1.5rem 0;
    }

    /* ── Chapter list ── */
    .chapters {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .chapter {
      display: flex;
      align-items: baseline;
      gap: 1rem;
      padding: 0.75rem 1rem;
      border-radius: 10px;
      text-decoration: none;
      color: var(--cc-on-surface);
      transition: background-color 0.15s;
    }

    .chapter:hover {
      background-color: var(--cc-surface-variant);
    }

    .chapter--active {
      background-color: var(--cc-surface-variant);
      color: var(--cc-primary);
    }

    .chapter__numeral {
      font-family: var(--cc-font-serif);
      font-size: 1.125rem;
      min-width: 2rem;
      opacity: 0.5;
    }

    .chapter--active .chapter__numeral {
      opacity: 1;
      color: var(--cc-primary);
    }

    .chapter__title {
      font-family: var(--cc-font-sans);
      font-size: 0.9375rem;
      font-weight: 500;
    }

    /* ── Footer ── */
    .sidebar__footer {
      margin-top: auto;
    }

    /* ── Tablet: collapsible ── */
    @media (max-width: 1023px) {
      .menu-toggle {
        display: flex;
      }

      .sidebar {
        transform: translateX(-100%);
        transition: transform 0.3s ease;
      }

      .sidebar--open {
        transform: translateX(0);
      }
    }

    /* ── Mobile: drawer with overlay ── */
    @media (max-width: 767px) {
      .overlay {
        display: block;
      }

      .sidebar {
        box-shadow: 4px 0 24px rgba(0, 0, 0, 0.2);
      }
    }
  `,
})
export class BookNavigationComponent {
  readonly chapters: Chapter[] = [
    { numeral: 'I', title: 'Home', route: '/', exact: true },
    { numeral: 'II', title: 'Code Crafters', route: '/team', exact: false },
    { numeral: 'III', title: 'Services', route: '/services', exact: false },
    { numeral: 'IV', title: 'Contact', route: '/contact', exact: false },
  ];

  readonly drawerOpen = signal(false);

  toggleDrawer(): void {
    this.drawerOpen.update(open => !open);
  }

  closeDrawer(): void {
    this.drawerOpen.set(false);
  }
}
