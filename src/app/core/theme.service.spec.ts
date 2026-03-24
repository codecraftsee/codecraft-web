import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  const setupService = (storedTheme?: string, prefersDark = false) => {
    localStorage.clear();
    if (storedTheme) localStorage.setItem('cc-theme', storedTheme);

    window.matchMedia = (query: string) =>
      ({ matches: prefersDark && query === '(prefers-color-scheme: dark)' } as MediaQueryList);

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    TestBed.flushEffects();
  };

  afterEach(() => localStorage.clear());

  describe('initial theme', () => {
    it('reads stored light preference from localStorage', () => {
      setupService('light');
      expect(service.activeTheme()).toBe('light');
    });

    it('reads stored dark preference from localStorage', () => {
      setupService('dark');
      expect(service.activeTheme()).toBe('dark');
    });

    it('reads stored sable preference from localStorage', () => {
      setupService('sable');
      expect(service.activeTheme()).toBe('sable');
    });

    it('falls back to dark when OS prefers dark and no stored preference', () => {
      setupService(undefined, true);
      expect(service.activeTheme()).toBe('dark');
    });

    it('falls back to light when OS prefers light and no stored preference', () => {
      setupService(undefined, false);
      expect(service.activeTheme()).toBe('light');
    });
  });

  describe('toggle()', () => {
    it('switches from light to dark', () => {
      setupService('light');
      service.toggle();
      expect(service.activeTheme()).toBe('dark');
    });

    it('switches from dark to sable', () => {
      setupService('dark');
      service.toggle();
      expect(service.activeTheme()).toBe('sable');
    });

    it('switches from sable to light', () => {
      setupService('sable');
      service.toggle();
      expect(service.activeTheme()).toBe('light');
    });
  });

  describe('localStorage persistence', () => {
    it('writes dark to localStorage when toggling from light', () => {
      setupService('light');
      service.toggle();
      TestBed.flushEffects();
      expect(localStorage.getItem('cc-theme')).toBe('dark');
    });

    it('writes sable to localStorage when toggling from dark', () => {
      setupService('dark');
      service.toggle();
      TestBed.flushEffects();
      expect(localStorage.getItem('cc-theme')).toBe('sable');
    });

    it('writes light to localStorage when toggling from sable', () => {
      setupService('sable');
      service.toggle();
      TestBed.flushEffects();
      expect(localStorage.getItem('cc-theme')).toBe('light');
    });
  });

  describe('DOM class', () => {
    it('applies light-theme class to documentElement', () => {
      setupService('light');
      expect(document.documentElement.classList.contains('light-theme')).toBe(true);
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
      expect(document.documentElement.classList.contains('sable-theme')).toBe(false);
    });

    it('applies dark-theme class to documentElement', () => {
      setupService('dark');
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
      expect(document.documentElement.classList.contains('light-theme')).toBe(false);
      expect(document.documentElement.classList.contains('sable-theme')).toBe(false);
    });

    it('applies sable-theme class to documentElement', () => {
      setupService('sable');
      expect(document.documentElement.classList.contains('sable-theme')).toBe(true);
      expect(document.documentElement.classList.contains('light-theme')).toBe(false);
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    });

    it('swaps classes on toggle', () => {
      setupService('light');
      service.toggle();
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
      expect(document.documentElement.classList.contains('light-theme')).toBe(false);
      expect(document.documentElement.classList.contains('sable-theme')).toBe(false);
    });
  });
});
