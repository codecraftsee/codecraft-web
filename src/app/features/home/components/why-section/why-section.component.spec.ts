import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhySectionComponent } from './why-section.component';

describe('WhySectionComponent', () => {
  let fixture: ComponentFixture<WhySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WhySectionComponent],
    });
    fixture = TestBed.createComponent(WhySectionComponent);
    fixture.detectChanges();
  });

  it('renders four process steps', () => {
    const steps = fixture.nativeElement.querySelectorAll('.step');
    expect(steps.length).toBe(4);
  });

  it('each step has a number, title, and description', () => {
    const steps = fixture.nativeElement.querySelectorAll('.step');
    steps.forEach((step: Element) => {
      expect(step.querySelector('.step__number')).toBeTruthy();
      expect(step.querySelector('.step__title')).toBeTruthy();
      expect(step.querySelector('.step__desc')).toBeTruthy();
    });
  });

  it('displays step numbers 01 through 04', () => {
    const numbers = fixture.nativeElement.querySelectorAll('.step__number');
    expect(numbers[0].textContent.trim()).toBe('01');
    expect(numbers[1].textContent.trim()).toBe('02');
    expect(numbers[2].textContent.trim()).toBe('03');
    expect(numbers[3].textContent.trim()).toBe('04');
  });

  it('heading reads Our Approach', () => {
    const heading = fixture.nativeElement.querySelector('.approach__heading');
    expect(heading.textContent.trim()).toBe('Our Approach');
  });
});
