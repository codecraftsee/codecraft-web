import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  const setupService = (storedTheme?: string) => {
    localStorage.clear();
    if (storedTheme) localStorage.setItem('cc-theme', storedTheme);

    window.matchMedia = (query: string) =>
      ({ matches: false, media: query } as MediaQueryList);

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    TestBed.flushEffects();
  };

  afterEach(() => localStorage.clear());

  describe('initial theme', () => {
    it('reads stored dark preference from localStorage', () => {
      setupService('dark');
      expect(service.activeTheme()).toBe('dark');
    });

    it('reads stored sable preference from localStorage', () => {
      setupService('sable');
      expect(service.activeTheme()).toBe('sable');
    });

    it('ignores a stored light preference and falls back to dark', () => {
      setupService('light');
      expect(service.activeTheme()).toBe('dark');
    });

    it('defaults to dark when no preference is stored', () => {
      setupService();
      expect(service.activeTheme()).toBe('dark');
    });
  });

  describe('toggle()', () => {
    it('switches from dark to sable', () => {
      setupService('dark');
      service.toggle();
      expect(service.activeTheme()).toBe('sable');
    });

    it('switches from sable to dark', () => {
      setupService('sable');
      service.toggle();
      expect(service.activeTheme()).toBe('dark');
    });
  });

  describe('localStorage persistence', () => {
    it('writes sable to localStorage when toggling from dark', () => {
      setupService('dark');
      service.toggle();
      TestBed.flushEffects();
      expect(localStorage.getItem('cc-theme')).toBe('sable');
    });

    it('writes dark to localStorage when toggling from sable', () => {
      setupService('sable');
      service.toggle();
      TestBed.flushEffects();
      expect(localStorage.getItem('cc-theme')).toBe('dark');
    });
  });

  describe('DOM class', () => {
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
      setupService('dark');
      service.toggle();
      TestBed.flushEffects();
      expect(document.documentElement.classList.contains('sable-theme')).toBe(true);
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
      expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    });
  });
});
