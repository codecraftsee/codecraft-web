import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { vi } from 'vitest';
import { routes } from '../../app.routes';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';

/** Meets the step 1 minLength(20) validator. */
const VALID_DESCRIPTION = 'A great project that needs building';

function createMockService(returnValue: Observable<unknown> = of({})) {
  return { submit: vi.fn().mockReturnValue(returnValue) };
}

describe('ContactComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideRouter(routes),
        { provide: ContactService, useValue: createMockService() },
      ],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('8.2 should show validation error and stay on step 1 when Next clicked with empty description', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.nextStep();
    fixture.detectChanges();

    expect(component.step()).toBe(1);
    expect(component.step1Form.controls.projectDescription.touched).toBe(true);
    expect(component.step1Form.invalid).toBe(true);
  });

  it('8.3 should advance to step 2 when Next clicked with valid description', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step1Form.controls.projectDescription.setValue(VALID_DESCRIPTION);
    component.nextStep();

    expect(component.step()).toBe(2);
  });

  it('8.4 should return to step 1 when Back clicked on step 2', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step1Form.controls.projectDescription.setValue(VALID_DESCRIPTION);
    component.nextStep();
    component.prevStep();

    expect(component.step()).toBe(1);
  });

  it('6.2 successful submission calls service and sets submitted to true', () => {
    const mockService = createMockService(of({}));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3Form.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();

    expect(mockService.submit).toHaveBeenCalled();
    expect(component.submitted()).toBe(true);
    expect(component.submitError()).toBe('');
  });

  it('6.3 failed submission sets error signal and leaves submitted as false', () => {
    const mockService = createMockService(throwError(() => new Error('network')));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3Form.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();

    expect(component.submitted()).toBe(false);
    expect(component.submitError()).toBeTruthy();
    expect(component.loading()).toBe(false);
  });

  it('6.4 loading is false after successful completion', () => {
    const mockService = createMockService(of({}));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3Form.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();

    expect(component.loading()).toBe(false);
  });

  it('8.6 should show success message after submission', () => {
    const mockService = createMockService(of({}));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3Form.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.cc-success')).toBeTruthy();
    expect(el.querySelector('.cc-stepper')).toBeFalsy();
  });
});
