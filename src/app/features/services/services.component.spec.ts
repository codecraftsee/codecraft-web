import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServicesComponent } from './services.component';

describe('ServicesComponent', () => {
  let fixture: ComponentFixture<ServicesComponent>;
  let component: ServicesComponent;
  let el: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServicesComponent],
    });

    fixture = TestBed.createComponent(ServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders hero heading and subtitle', () => {
    expect(el.querySelector('.hero__title')?.textContent?.trim()).toBe('Our Services');
    expect(el.querySelector('.hero__subtitle')?.textContent?.trim()).toBeTruthy();
  });

  it('renders 4 service cards', () => {
    const cards = el.querySelectorAll('.card');
    expect(cards.length).toBe(6);
  });

  it('each card displays number, title, description, and tags', () => {
    const cards = el.querySelectorAll('.card');

    cards.forEach(card => {
      expect(card.querySelector('.card__number')?.textContent?.trim()).toBeTruthy();
      expect(card.querySelector('.card__title')?.textContent?.trim()).toBeTruthy();
      expect(card.querySelector('.card__desc')?.textContent?.trim()).toBeTruthy();
      expect(card.querySelectorAll('.card__tag').length).toBeGreaterThan(0);
    });
  });

  it('displays correct service titles in order', () => {
    const titles = Array.from(el.querySelectorAll('.card__title'))
      .map(t => t.textContent?.trim());
    expect(titles).toEqual(['Web Applications', 'AngularJS Migration', 'Performance Engineering', 'On-Demand Engineering', 'Mobile Development', 'Websites']);
  });

  it('displays correct service numbers', () => {
    const numbers = Array.from(el.querySelectorAll('.card__number'))
      .map(n => n.textContent?.trim());
    expect(numbers).toEqual(['01', '02', '03', '04', '05', '06']);
  });

  it('timeline has aria-label', () => {
    const timeline = el.querySelector('.timeline');
    expect(timeline?.getAttribute('aria-label')).toBe('Service offerings');
  });

  it('renders a dot for each timeline item', () => {
    const dots = el.querySelectorAll('.timeline__dot');
    expect(dots.length).toBe(6);
  });
});
