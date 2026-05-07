import { effect, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'sable';

const STORAGE_KEY = 'cc-theme';
const THEMES: Theme[] = ['dark', 'light', 'sable'];

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly activeTheme = signal<Theme>(this.getInitialTheme());

  constructor() {
    effect(() => {
      const theme = this.activeTheme();
      document.documentElement.classList.toggle('light-theme', theme === 'light');
      document.documentElement.classList.toggle('dark-theme', theme === 'dark');
      document.documentElement.classList.toggle('sable-theme', theme === 'sable');
      localStorage.setItem(STORAGE_KEY, theme);
    });
  }

  cycleTheme(): void {
    this.activeTheme.update(t => {
      const idx = THEMES.indexOf(t);
      return THEMES[(idx + 1) % THEMES.length];
    });
  }

  // Legacy compat — kept so existing callers don't break
  toggle(): void {
    this.cycleTheme();
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (stored && THEMES.includes(stored)) return stored;
    return 'dark';
  }
}
