import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ServicesComponent } from './services.component';
import { SERVICES } from '../../shared/data/services.data';

describe('ServicesComponent', () => {
  let fixture: ComponentFixture<ServicesComponent>;
  let el: HTMLElement;

  const rows = (): HTMLButtonElement[] => Array.from(el.querySelectorAll('.cc-svc-row'));
  const text = (selector: string): string | undefined =>
    el.querySelector(selector)?.textContent?.trim();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServicesComponent],
      providers: [provideRouter([])],
    });

    fixture = TestBed.createComponent(ServicesComponent);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('renders the catalogue heading', () => {
    expect(text('h1')).toBe('SERVICE CATALOGUE');
  });

  it('renders an index row for every service', () => {
    expect(rows().length).toBe(SERVICES.length);
  });

  it('displays service numbers and titles in order', () => {
    const numbers = rows().map(r => r.querySelector('.cc-svc-row__num')?.textContent?.trim());
    const titles = rows().map(r => r.querySelector('.cc-svc-row__title')?.textContent?.trim());

    expect(numbers).toEqual(['01', '02', '03', '04', '05', '06']);
    expect(titles).toEqual([
      'Web Applications',
      'AngularJS Migration',
      'Performance Engineering',
      'On-Demand Engineering',
      'Mobile Development',
      'Websites',
    ]);
  });

  it('shows the first service in the detail panel by default', () => {
    expect(text('.cc-detail-title')).toBe(SERVICES[0].title);
    expect(text('.cc-detail-desc')).toBe(SERVICES[0].desc);
    expect(text('.cc-section__count')).toBe(`ITEM 1 / ${SERVICES.length}`);
  });

  it('switches the detail panel when another service is clicked', () => {
    rows()[2].click();
    fixture.detectChanges();

    expect(text('.cc-detail-title')).toBe(SERVICES[2].title);
    expect(text('.cc-section__count')).toBe(`ITEM 3 / ${SERVICES.length}`);

    const chips = Array.from(el.querySelectorAll('.cc-detail-tags .cc-chip')).map(c =>
      c.textContent?.trim(),
    );
    expect(chips).toEqual(expect.arrayContaining(SERVICES[2].tags));
  });

  it('exposes the index as an accessible tab list', () => {
    expect(el.querySelector('.cc-svc-index')?.getAttribute('role')).toBe('tablist');
    expect(el.querySelector('#svc-detail')?.getAttribute('role')).toBe('tabpanel');

    rows()[1].click();
    fixture.detectChanges();

    const selected = rows().map(r => r.getAttribute('aria-selected'));
    expect(selected).toEqual(['false', 'true', 'false', 'false', 'false', 'false']);
    rows().forEach(r => expect(r.getAttribute('aria-controls')).toBe('svc-detail'));
  });

  it('navigates to contact when Request Quote is clicked', () => {
    const navigate = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);

    el.querySelector<HTMLButtonElement>('.cc-btn--primary')?.click();

    expect(navigate).toHaveBeenCalledWith(['/contact']);
  });
});
