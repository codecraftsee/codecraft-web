import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { BookNavigationComponent } from './book-navigation.component';

describe('BookNavigationComponent', () => {
  let fixture: ComponentFixture<BookNavigationComponent>;
  let component: BookNavigationComponent;

  beforeEach(async () => {
    window.matchMedia = (query: string) =>
      ({ matches: false, media: query, addEventListener: () => {}, removeEventListener: () => {} }) as unknown as MediaQueryList;

    await TestBed.configureTestingModule({
      imports: [BookNavigationComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(BookNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render four chapter entries', () => {
    const chapters = fixture.nativeElement.querySelectorAll('.chapter');
    expect(chapters.length).toBe(4);
  });

  it('should display Roman numerals for chapters', () => {
    const numerals = fixture.nativeElement.querySelectorAll('.chapter__numeral');
    const texts = Array.from(numerals).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(texts).toEqual(['I', 'II', 'III', 'IV']);
  });

  it('should display chapter titles', () => {
    const titles = fixture.nativeElement.querySelectorAll('.chapter__title');
    const texts = Array.from(titles).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(texts).toEqual(['Home', 'Code Crafters', 'Services', 'Contact']);
  });

  it('should have a nav element with aria-label', () => {
    const nav = fixture.nativeElement.querySelector('nav');
    expect(nav).toBeTruthy();
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('should render the wordmark', () => {
    const wordmark = fixture.nativeElement.querySelector('.wordmark');
    expect(wordmark.textContent).toContain('CodeCraft');
  });

  it('should render the theme toggle', () => {
    const toggle = fixture.nativeElement.querySelector('cc-theme-toggle');
    expect(toggle).toBeTruthy();
  });

  it('should have a menu toggle button with aria-label', () => {
    const btn = fixture.nativeElement.querySelector('.menu-toggle');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('aria-label')).toBe('Toggle navigation menu');
  });

  it('should toggle drawer open state', () => {
    expect(component.drawerOpen()).toBe(false);
    component.toggleDrawer();
    expect(component.drawerOpen()).toBe(true);
    component.toggleDrawer();
    expect(component.drawerOpen()).toBe(false);
  });

  it('should close drawer', () => {
    component.toggleDrawer();
    expect(component.drawerOpen()).toBe(true);
    component.closeDrawer();
    expect(component.drawerOpen()).toBe(false);
  });
});
