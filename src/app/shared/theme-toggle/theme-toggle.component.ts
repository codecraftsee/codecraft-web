import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'cc-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      type="button"
      [attr.aria-label]="ariaLabel()"
      (click)="themeService.toggle()"
    >
      <span class="icon-wrapper">
        @if (themeService.activeTheme() === 'light') {
          <!-- Sun icon: currently in light mode -->
          <svg data-testid="sun-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h1a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2zM3 11h1a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm15.36-6.36a1 1 0 0 1 0 1.42l-.71.7a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0zM6.34 17.66a1 1 0 0 1 0 1.41l-.7.71a1 1 0 1 1-1.42-1.42l.71-.7a1 1 0 0 1 1.41 0zm12.73.71l-.71-.7a1 1 0 1 1 1.42-1.42l.7.71a1 1 0 0 1-1.41 1.41zM5.64 6.05l-.71.7a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 1.42z"/>
          </svg>
        } @else if (themeService.activeTheme() === 'dark') {
          <!-- Moon icon: currently in dark mode -->
          <svg data-testid="moon-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
          </svg>
        } @else {
          <!-- Flame icon: currently in sable mode -->
          <svg data-testid="flame-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path fill="currentColor" d="M12 2c0 0-4 4.5-4 9a4 4 0 0 0 8 0c0-1.9-.8-3.5-1.7-5C14 7.5 14 9 12.5 10c0 0 1-1.5.5-3C12.5 5.5 12 3.5 12 2z"/>
          </svg>
        }
      </span>
    </button>
  `,
  styles: `
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      padding: 0;
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      background: transparent;
      color: #a5b4fc;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    button:hover {
      color: #00d4ff;
      border-color: rgba(0, 212, 255, 0.3);
      background: rgba(0, 212, 255, 0.05);
    }
    button:active {
      transform: scale(0.92);
    }
    .icon-wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    :host-context(.light-theme) button {
      border-color: rgba(0, 0, 0, 0.12);
      color: #64748b;
    }
    :host-context(.light-theme) button:hover {
      color: #0077cc;
      border-color: rgba(0, 119, 204, 0.3);
      background: rgba(0, 119, 204, 0.05);
    }

    :host-context(.sable-theme) button {
      border-color: rgba(217, 119, 6, 0.25);
      color: #F59E0B;
    }
    :host-context(.sable-theme) button:hover {
      color: #FCD34D;
      border-color: rgba(245, 158, 11, 0.45);
      background: rgba(245, 158, 11, 0.08);
    }
  `,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);

  protected ariaLabel(): string {
    const theme = this.themeService.activeTheme();
    if (theme === 'light') return 'Switch to dark mode';
    if (theme === 'dark') return 'Switch to Sable mode';
    return 'Switch to light mode';
  }
}
