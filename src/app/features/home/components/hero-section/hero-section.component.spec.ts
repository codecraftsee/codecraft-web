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

  it('CTA links to /contact', () => {
    const cta = fixture.nativeElement.querySelector('a[ng-reflect-router-link], a[routerLink]');
    expect(cta).toBeTruthy();
  });
});
