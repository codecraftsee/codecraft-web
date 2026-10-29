import { afterNextRender, DOCUMENT, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type Theme = 'light' | 'dark' | 'sable';

const STORAGE_KEY = 'cc-theme';
const THEMES: Theme[] = ['light', 'dark', 'sable'];
const DEFAULT_THEME: Theme = 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  /** False until the initial theme is restored, so the default never overwrites it. */
  private readonly restored = signal(false);
  /** Set when the user picks a theme before restore (e.g. a replayed click). */
  private userChanged = false;

  /**
   * Starts as the default on both server and client so prerendered HTML hydrates
   * without mismatches. After the first render it takes the theme the inline script
   * in index.html already applied to <html> (stored preference or OS setting).
   */
  readonly activeTheme = signal<Theme>(DEFAULT_THEME);

  constructor() {
    if (!this.isBrowser) return;

    afterNextRender(() => {
      if (!this.userChanged) {
        this.activeTheme.set(this.readInitialTheme());
      }
      this.restored.set(true);
    });

    effect(() => {
      const theme = this.activeTheme();
      if (!this.restored()) return;
      const classes = this.document.documentElement.classList;
      classes.toggle('light-theme', theme === 'light');
      classes.toggle('dark-theme', theme === 'dark');
      classes.toggle('sable-theme', theme === 'sable');
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch {
        // Storage blocked (e.g. private mode) — theme still applies for this visit.
      }
    });
  }

  cycleTheme(): void {
    this.userChanged = true;
    this.activeTheme.update(t => {
      const idx = THEMES.indexOf(t);
      return THEMES[(idx + 1) % THEMES.length];
    });
  }

  // Legacy compat — kept so existing callers don't break
  toggle(): void {
    this.cycleTheme();
  }

  private readInitialTheme(): Theme {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Theme | null;
      if (stored && THEMES.includes(stored)) return stored;
    } catch {
      // Storage blocked — fall through to the class set by index.html.
    }
    const classes = this.document.documentElement.classList;
    return THEMES.find(t => classes.contains(`${t}-theme`)) ?? DEFAULT_THEME;
  }
}
