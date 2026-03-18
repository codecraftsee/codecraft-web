import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeroSectionComponent } from './hero-section.component';

describe('HeroSectionComponent', () => {
  let fixture: ComponentFixture<HeroSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeroSectionComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(HeroSectionComponent);
    fixture.detectChanges();
  });

  it('renders an h1 headline', () => {
    const h1 = fixture.nativeElement.querySelector('h1');
    expect(h1).toBeTruthy();
    expect(h1.textContent.trim().length).toBeGreaterThan(0);
  });

  it('headline contains an accent-underlined keyword', () => {
    const accent = fixture.nativeElement.querySelector('.hero__accent');
    expect(accent).toBeTruthy();
  });

  it('primary CTA links to /contact', () => {
    const cta = fixture.nativeElement.querySelector('.hero__cta--primary');
    expect(cta).toBeTruthy();
    expect(cta.textContent.trim()).toBe("Let's talk");
  });

  it('secondary CTA links to /services', () => {
    const cta = fixture.nativeElement.querySelector('.hero__cta--secondary');
    expect(cta).toBeTruthy();
    expect(cta.textContent.trim()).toBe('Our services');
  });
});
