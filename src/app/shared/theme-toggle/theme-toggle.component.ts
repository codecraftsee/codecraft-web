import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

@Component({
  selector: 'cc-theme-toggle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      mat-icon-button
      [attr.aria-label]="themeService.activeTheme() === 'light' ? 'Switch to dark mode' : 'Switch to light mode'"
      (click)="themeService.toggle()"
    >
      @if (themeService.activeTheme() === 'light') {
        <!-- Moon icon: clicking will switch to dark -->
        <svg data-testid="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"/>
        </svg>
      } @else {
        <!-- Sun icon: clicking will switch to light -->
        <svg data-testid="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path fill="currentColor" d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0-5a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V3a1 1 0 0 1 1-1zm0 17a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1zm9-9h1a1 1 0 0 1 0 2h-1a1 1 0 0 1 0-2zM3 11h1a1 1 0 0 1 0 2H3a1 1 0 0 1 0-2zm15.36-6.36a1 1 0 0 1 0 1.42l-.71.7a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 0zM6.34 17.66a1 1 0 0 1 0 1.41l-.7.71a1 1 0 1 1-1.42-1.42l.71-.7a1 1 0 0 1 1.41 0zm12.73.71l-.71-.7a1 1 0 1 1 1.42-1.42l.7.71a1 1 0 0 1-1.41 1.41zM5.64 6.05l-.71.7a1 1 0 0 1-1.41-1.41l.7-.71a1 1 0 0 1 1.42 1.42z"/>
        </svg>
      }
    </button>
  `,
  styles: `
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--cc-on-surface);
    }
  `,
})
export class ThemeToggleComponent {
  protected readonly themeService = inject(ThemeService);
}
