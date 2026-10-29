import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { SiteHeaderComponent } from './site-header.component';
import { Theme, ThemeService } from '../../core/theme.service';

describe('SiteHeaderComponent', () => {
  let fixture: ComponentFixture<SiteHeaderComponent>;
  let el: HTMLElement;
  const activeTheme = signal<Theme>('dark');
  const cycleTheme = vi.fn();

  beforeEach(() => {
    activeTheme.set('dark');
    cycleTheme.mockClear();

    TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [
        provideRouter([]),
        { provide: ThemeService, useValue: { activeTheme, cycleTheme } },
      ],
    });

    fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  afterEach(() => fixture.destroy());

  it('shows a clock placeholder before the first render, so prerendered HTML hydrates cleanly', () => {
    const fresh = TestBed.createComponent(SiteHeaderComponent);
    expect(fresh.componentInstance.utcTime()).toBe('--:--:--');
    fresh.destroy();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the logo as a labelled home link', () => {
    const mark = el.querySelector('a.cc-mark');
    expect(mark?.getAttribute('aria-label')).toBe('CodeCraft Solutions home');
    expect(mark?.getAttribute('href')).toBe('/');
    expect(mark?.querySelector('svg')?.getAttribute('aria-hidden')).toBe('true');
  });

  it('renders navigation links', () => {
    const links = Array.from(el.querySelectorAll('a.cc-tab'));
    const labels = links.map(l => l.querySelector('.cc-tab__label')?.textContent?.trim());
    const hrefs = links.map(l => l.getAttribute('href'));

    expect(labels).toEqual(['HOME', 'SERVICES', 'TEAM', 'CONTACT']);
    expect(hrefs).toEqual(['/', '/services', '/team', '/contact']);
  });

  it('marks the home tab active on the root route', () => {
    const active = el.querySelectorAll('a.cc-tab.is-active');
    expect(active.length).toBe(1);
    expect(active[0].querySelector('.cc-tab__label')?.textContent?.trim()).toBe('HOME');
  });

  it('renders the theme toggle with the current theme', () => {
    const button = el.querySelector<HTMLButtonElement>('button.cc-theme-btn');
    expect(button?.textContent).toContain('THEME / DARK');

    activeTheme.set('sable');
    fixture.detectChanges();
    expect(button?.textContent).toContain('THEME / SABLE');
  });

  it('cycles the theme when the toggle is clicked', () => {
    el.querySelector<HTMLButtonElement>('button.cc-theme-btn')?.click();
    expect(cycleTheme).toHaveBeenCalledOnce();
  });

  describe('UTC clock', () => {
    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2026-10-28T09:15:30Z'));
    });
    afterEach(() => vi.useRealTimers());

    it('shows the time after the first render and ticks every second', () => {
      const header = TestBed.createComponent(SiteHeaderComponent);
      header.detectChanges();
      expect(header.componentInstance.utcTime()).toBe('09:15:30');

      vi.advanceTimersByTime(1000);
      expect(header.componentInstance.utcTime()).toBe('09:15:31');
      header.destroy();
    });

    it('stops the clock when destroyed', () => {
      const header = TestBed.createComponent(SiteHeaderComponent);
      header.detectChanges();
      expect(vi.getTimerCount()).toBe(1);

      header.destroy();
      expect(vi.getTimerCount()).toBe(0);
    });
  });

  it('has main navigation aria-label', () => {
    const nav = el.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
  });
});
