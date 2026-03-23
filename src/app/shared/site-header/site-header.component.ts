import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  selector: 'cc-site-header',
  imports: [RouterLink, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="header">
      <a class="logo" routerLink="/" aria-label="CodeCraft Home">
        <img src="images/codecraft.svg" alt="CodeCraft" class="logo__img" />
      </a>
      <nav class="nav" aria-label="Main navigation">
        <a class="nav__link" routerLink="/">Home</a>
        <a class="nav__link" routerLink="/services">Services</a>
        <a class="nav__link" routerLink="/team">Team</a>
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
    .nav { display: flex; gap: 2rem; }
    .nav__link {
      font-size: 13px;
      text-decoration: none;
      color: #a5b4fc;
      transition: all 0.3s;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
    }
    .nav__link:hover { color: #00d4ff; }

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
  `,
})
export class SiteHeaderComponent {}
