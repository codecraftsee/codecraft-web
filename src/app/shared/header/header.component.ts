import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../core/theme.service';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'cc-header',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <a class="logo-link" routerLink="/" aria-label="CodeCraft home">
        <img
          ngSrc="codecraft.svg"
          alt="CodeCraft"
          width="985"
          height="369"
          priority
          class="logo"
          [class.logo--dark]="themeService.activeTheme() === 'dark'"
        />
      </a>

      <nav class="nav" aria-label="Main navigation">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">Home</a>
        <a routerLink="/about" routerLinkActive="active">About</a>
        <a routerLink="/services" routerLinkActive="active">Services</a>
        <a routerLink="/contact" routerLinkActive="active">Contact</a>
      </nav>

      <cc-theme-toggle />
    </header>
  `,
  styles: `
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      display: flex;
      align-items: center;
      gap: 1.5rem;
      padding: 0 2rem;
      height: 64px;
      background-color: var(--cc-surface);
      border-bottom: 1px solid var(--cc-outline);
    }

    .logo-link {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      text-decoration: none;
    }

    .logo {
      height: 40px;
      width: auto;
    }

    .logo--dark {
      filter: invert(1);
    }

    .nav {
      display: flex;
      gap: 0.25rem;
      margin-left: auto;
    }

    .nav a {
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      color: var(--cc-on-surface);
      text-decoration: none;
      font-size: 0.9375rem;
      font-weight: 500;
      transition: background-color 0.15s;
    }

    .nav a:hover {
      background-color: var(--cc-surface-variant);
    }

    .nav a.active {
      color: var(--cc-primary);
      background-color: var(--cc-surface-variant);
    }

    cc-theme-toggle {
      flex-shrink: 0;
    }

    @media (max-width: 767px) {
      .nav {
        display: none;
      }

      cc-theme-toggle {
        margin-left: auto;
      }
    }
  `,
})
export class HeaderComponent {
  protected readonly themeService = inject(ThemeService);
}
