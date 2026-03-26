import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'cc-site-header',
  imports: [RouterLink, RouterLinkActive, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <a class="logo" routerLink="/" aria-label="CodeCraft Home">
        <img [src]="logoSrc()" alt="CodeCraft" class="logo__img" />
      </a>
      <nav class="nav" aria-label="Main navigation">
        <a class="nav__link" routerLink="/" routerLinkActive="nav__link--active" [routerLinkActiveOptions]="{exact: true}" aria-label="Home">
          <svg class="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          <span class="nav__label">Home</span>
        </a>
        <a class="nav__link" routerLink="/services" routerLinkActive="nav__link--active" aria-label="Services">
          <svg class="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07"/></svg>
          <span class="nav__label">Services</span>
        </a>
        <a class="nav__link" routerLink="/team" routerLinkActive="nav__link--active" aria-label="Team">
          <svg class="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          <span class="nav__label">Team</span>
        </a>
        <a class="nav__btn" routerLink="/contact" routerLinkActive="nav__btn--active" aria-label="Contact Us">
          <svg class="nav__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span class="nav__label">Contact Us</span>
        </a>
      </nav>
      <cc-theme-toggle />
    </header>
  `,
  styles: `
    :host { display: block; }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .logo { text-decoration: none; display: flex; align-items: center; }
    .logo__img { height: 24px; width: auto; filter: invert(1); }

    .nav { display: flex; gap: 2rem; align-items: center; }

    .nav__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      display: none;
    }

    .nav__link {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 13px;
      text-decoration: none;
      color: #a5b4fc;
      transition: all 0.3s;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
    }
    .nav__link:hover { color: #00d4ff; }
    .nav__link--active { color: #00d4ff; font-weight: 600; }
    .nav__btn--active { box-shadow: 0 0 0 2px #00d4ff; }

    .nav__btn {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 13px;
      font-weight: 600;
      text-decoration: none;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 0.45rem 1.1rem;
      border-radius: 8px;
      border: none;
      background: linear-gradient(135deg, #00d4ff, #0099ff);
      color: #0f1419;
      transition: all 0.3s;
    }
    .nav__btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(0, 212, 255, 0.25);
    }

    /* Light Theme */
    :host-context(.light-theme) .header {
      border-bottom-color: rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .logo__img {
      filter: none;
    }
    :host-context(.light-theme) .nav__link {
      color: #64748b;
    }
    :host-context(.light-theme) .nav__link:hover {
      color: #0077cc;
    }
    :host-context(.light-theme) .nav__link--active { color: #0077cc; }
    :host-context(.light-theme) .nav__btn--active { box-shadow: 0 0 0 2px #0077cc; }
    :host-context(.light-theme) .nav__btn {
      background: linear-gradient(135deg, #0099ff, #0066cc);
      color: #ffffff;
    }

    :host-context(.sable-theme) .header {
      border-bottom-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .logo__img {
      filter: none;
    }
    :host-context(.sable-theme) .nav__link {
      color: #D4B896;
    }
    :host-context(.sable-theme) .nav__link:hover {
      color: #F59E0B;
    }
    :host-context(.sable-theme) .nav__link--active { color: #F59E0B; font-weight: 600; }
    :host-context(.sable-theme) .nav__btn--active { box-shadow: 0 0 0 2px #F59E0B; }
    :host-context(.sable-theme) .nav__btn {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      color: #1C1917;
    }

    /* Mobile — icons only */
    @media (max-width: 640px) {
      .header { padding: 1.25rem 1.25rem; }
      .nav { gap: 0.5rem; }

      .nav__label { display: none; }
      .nav__icon { display: block; }

      .nav__link {
        width: 38px;
        height: 38px;
        justify-content: center;
        border-radius: 8px;
        padding: 0;
        letter-spacing: 0;
        background: rgba(0, 212, 255, 0.06);
        border: 1px solid rgba(0, 212, 255, 0.12);
      }
      .nav__link:hover {
        background: rgba(0, 212, 255, 0.12);
        border-color: rgba(0, 212, 255, 0.3);
      }

      .nav__btn {
        width: 38px;
        height: 38px;
        justify-content: center;
        padding: 0;
        border-radius: 8px;
        letter-spacing: 0;
      }

      :host-context(.light-theme) .nav__link {
        background: rgba(0, 0, 0, 0.03);
        border-color: rgba(0, 0, 0, 0.1);
      }
      :host-context(.light-theme) .nav__link:hover {
        background: rgba(0, 153, 255, 0.08);
        border-color: rgba(0, 153, 255, 0.2);
      }

      :host-context(.sable-theme) .nav__link {
        background: rgba(217, 119, 6, 0.06);
        border-color: rgba(217, 119, 6, 0.15);
      }
      :host-context(.sable-theme) .nav__link:hover {
        background: rgba(245, 158, 11, 0.12);
        border-color: rgba(245, 158, 11, 0.3);
      }
    }
  `,
})
export class SiteHeaderComponent {
  private readonly themeService = inject(ThemeService);

  readonly logoSrc = computed(() =>
    this.themeService.activeTheme() === 'sable'
      ? 'images/codecraft-sable.svg'
      : 'images/codecraft.svg'
  );
}
