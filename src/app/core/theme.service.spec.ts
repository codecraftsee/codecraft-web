import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  const setupService = (storedTheme?: string) => {
    localStorage.clear();
    if (storedTheme) localStorage.setItem('cc-theme', storedTheme);

    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
    TestBed.tick();
  };

  beforeEach(() => (document.documentElement.className = ''));

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  describe('hydration safety', () => {
    it('starts with the default theme until the first render, then applies the stored one', () => {
      localStorage.setItem('cc-theme', 'sable');
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);

      expect(service.activeTheme()).toBe('dark');
      expect(localStorage.getItem('cc-theme')).toBe('sable');

      TestBed.tick();
      expect(service.activeTheme()).toBe('sable');
    });

    it('keeps a theme the user picked before the stored one was restored', () => {
      localStorage.setItem('cc-theme', 'light');
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);

      service.cycleTheme(); // e.g. a click replayed during hydration: dark → sable
      TestBed.tick();

      expect(service.activeTheme()).toBe('sable');
      expect(localStorage.getItem('cc-theme')).toBe('sable');
    });

    it('falls back to the theme index.html applied from the OS preference when nothing is stored', () => {
      document.documentElement.className = 'light-theme';
      setupService();

      expect(service.activeTheme()).toBe('light');
      expect(document.documentElement.classList.contains('light-theme')).toBe(true);
    });

    it('still works when localStorage is blocked', () => {
      vi.spyOn(localStorage, 'getItem').mockImplementation(() => {
        throw new DOMException('blocked', 'SecurityError');
      });
      vi.spyOn(localStorage, 'setItem').mockImplementation(() => {
        throw new DOMException('blocked', 'SecurityError');
      });
      document.documentElement.className = 'sable-theme';
      TestBed.configureTestingModule({});
      service = TestBed.inject(ThemeService);
      TestBed.tick();

      expect(service.activeTheme()).toBe('sable');
      service.cycleTheme();
      TestBed.tick();
      expect(document.documentElement.classList.contains('light-theme')).toBe(true);
    });

    it('never touches storage or the document on the server', () => {
      localStorage.setItem('cc-theme', 'sable');
      document.documentElement.className = 'light-theme';
      TestBed.configureTestingModule({ providers: [{ provide: PLATFORM_ID, useValue: 'server' }] });
      service = TestBed.inject(ThemeService);
      TestBed.tick();

      expect(service.activeTheme()).toBe('dark');
      expect(localStorage.getItem('cc-theme')).toBe('sable');
      expect(document.documentElement.className).toBe('light-theme');
    });
  });

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
      TestBed.tick();
      expect(localStorage.getItem('cc-theme')).toBe('sable');
    });

    it('writes light to localStorage when toggling from sable', () => {
      setupService('sable');
      service.toggle();
      TestBed.tick();
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
      TestBed.tick();
      expect(document.documentElement.classList.contains('sable-theme')).toBe(true);
      expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
      expect(document.documentElement.classList.contains('light-theme')).toBe(false);
    });
  });
});
