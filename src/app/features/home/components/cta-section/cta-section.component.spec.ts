import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { CtaSectionComponent } from './cta-section.component';

describe('CtaSectionComponent', () => {
  let fixture: ComponentFixture<CtaSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CtaSectionComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(CtaSectionComponent);
    fixture.detectChanges();
  });

  it('renders a headline', () => {
    const heading = fixture.nativeElement.querySelector('h2');
    expect(heading).toBeTruthy();
    expect(heading.textContent.trim().length).toBeGreaterThan(0);
  });

  it('CTA button links to /contact', () => {
    const btn = fixture.nativeElement.querySelector('a[ng-reflect-router-link], a[routerLink]');
    expect(btn).toBeTruthy();
    expect(btn.getAttribute('href')).toBe('/contact');
  });
});
