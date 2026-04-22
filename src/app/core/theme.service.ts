import { effect, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark' | 'sable';

const STORAGE_KEY = 'cc-theme';

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

  toggle(): void {
    this.activeTheme.update(t => (t === 'dark' ? 'sable' : 'dark'));
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'dark' || stored === 'sable') return stored;
    return 'dark';
  }
}
