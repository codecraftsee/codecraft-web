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

    it('reads stored light preference from localStorage', () => {
      setupService('light');
      expect(service.activeTheme()).toBe('light');
    });

    it('ignores an unknown stored value and falls back to dark', () => {
      setupService('neon');
      expect(service.activeTheme()).toBe('dark');
    });

    it('defaults to dark when no preference is stored', () => {
      setupService();
      expect(service.activeTheme()).toBe('dark');
    });
  });

  describe('cycleTheme()', () => {
    it('cycles dark → sable → light → dark', () => {
      setupService('dark');
      service.cycleTheme();
      expect(service.activeTheme()).toBe('sable');
      service.cycleTheme();
      expect(service.activeTheme()).toBe('light');
      service.cycleTheme();
      expect(service.activeTheme()).toBe('dark');
    });

    it('toggle() is an alias for cycleTheme()', () => {
      setupService('sable');
      service.toggle();
      expect(service.activeTheme()).toBe('light');
    });
  });

  describe('localStorage persistence', () => {
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
