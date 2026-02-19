import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ThemeToggleComponent } from './theme-toggle.component';
import { ThemeService } from '../../core/theme.service';

describe('ThemeToggleComponent', () => {
  let fixture: ComponentFixture<ThemeToggleComponent>;
  let toggleSpy: ReturnType<typeof vi.fn>;
  let activeThemeSignal: ReturnType<typeof signal<'light' | 'dark'>>;

  const setupComponent = (theme: 'light' | 'dark') => {
    activeThemeSignal = signal<'light' | 'dark'>(theme);
    toggleSpy = vi.fn();

    TestBed.configureTestingModule({
      imports: [ThemeToggleComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: { activeTheme: activeThemeSignal, toggle: toggleSpy },
        },
      ],
    });

    fixture = TestBed.createComponent(ThemeToggleComponent);
    fixture.detectChanges();
  };

  describe('when theme is light', () => {
    beforeEach(() => setupComponent('light'));

    it('renders the moon icon', () => {
      const svg = fixture.nativeElement.querySelector('[data-testid="moon-icon"]');
      expect(svg).toBeTruthy();
    });

    it('sets aria-label to switch to dark mode', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Switch to dark mode');
    });
  });

  describe('when theme is dark', () => {
    beforeEach(() => setupComponent('dark'));

    it('renders the sun icon', () => {
      const svg = fixture.nativeElement.querySelector('[data-testid="sun-icon"]');
      expect(svg).toBeTruthy();
    });

    it('sets aria-label to switch to light mode', () => {
      const button = fixture.nativeElement.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Switch to light mode');
    });
  });

  describe('interaction', () => {
    beforeEach(() => setupComponent('light'));

    it('calls themeService.toggle() on click', () => {
      const button = fixture.nativeElement.querySelector('button');
      button.click();
      expect(toggleSpy).toHaveBeenCalledTimes(1);
    });
  });
});
