import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { SiteHeaderComponent } from './site-header.component';
import { ThemeService } from '../../core/theme.service';

describe('SiteHeaderComponent', () => {
  let fixture: ComponentFixture<SiteHeaderComponent>;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SiteHeaderComponent],
      providers: [
        provideRouter([]),
        {
          provide: ThemeService,
          useValue: { activeTheme: signal('dark'), toggle: vi.fn() },
        },
      ],
    });

    fixture = TestBed.createComponent(SiteHeaderComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the logo', () => {
    const img = el.querySelector('.logo__img');
    expect(img).toBeTruthy();
    expect(img?.getAttribute('alt')).toBe('CodeCraft');
  });

  it('renders navigation links', () => {
    const links = el.querySelectorAll('.nav__link');
    expect(links.length).toBe(3);
    expect(links[0].textContent?.trim()).toBe('Home');
    expect(links[1].textContent?.trim()).toBe('Services');
    expect(links[2].textContent?.trim()).toBe('Team');
  });

  it('renders the theme toggle', () => {
    expect(el.querySelector('cc-theme-toggle')).toBeTruthy();
  });

  it('has main navigation aria-label', () => {
    const nav = el.querySelector('nav');
    expect(nav?.getAttribute('aria-label')).toBe('Main navigation');
  });
});
