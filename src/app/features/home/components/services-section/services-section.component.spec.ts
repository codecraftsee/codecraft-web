import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ServicesSectionComponent } from './services-section.component';

describe('ServicesSectionComponent', () => {
  let fixture: ComponentFixture<ServicesSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ServicesSectionComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(ServicesSectionComponent);
    fixture.detectChanges();
  });

  it('renders four service cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.service-card');
    expect(cards.length).toBe(4);
  });

  it('each card links to /services', () => {
    const cards = fixture.nativeElement.querySelectorAll('a.service-card');
    cards.forEach((card: Element) => {
      expect(card.getAttribute('href')).toBe('/services');
    });
  });

  it('uses SVG icons instead of emoji', () => {
    const svgs = fixture.nativeElement.querySelectorAll('.service-card__icon');
    expect(svgs.length).toBe(4);
    svgs.forEach((svg: Element) => {
      expect(svg.tagName.toLowerCase()).toBe('svg');
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
