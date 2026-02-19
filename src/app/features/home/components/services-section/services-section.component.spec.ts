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

  it('renders two service cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.service-card');
    expect(cards.length).toBe(2);
  });

  it('each card links to /services', () => {
    const cards = fixture.nativeElement.querySelectorAll('a.service-card');
    cards.forEach((card: Element) => {
      expect(card.getAttribute('href')).toBe('/services');
    });
  });
});
