import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of, throwError } from 'rxjs';
import { routes } from '../../app.routes';
import { ContactComponent } from './contact.component';
import { ContactService } from './contact.service';

function createMockService(returnValue: ReturnType<typeof of> = of({})) {
  return { submit: jasmine.createSpy('submit').and.returnValue(returnValue) };
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

    expect(component.currentStep()).toBe(1);
    expect(component.step1.controls.projectDescription.touched).toBe(true);
    expect(component.step1.invalid).toBe(true);
  });

  it('8.3 should advance to step 2 when Next clicked with valid description', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step1.controls.projectDescription.setValue('A great project');
    component.nextStep();

    expect(component.currentStep()).toBe(2);
  });

  it('8.4 should return to step 1 when Back clicked on step 2', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step1.controls.projectDescription.setValue('A great project');
    component.nextStep();
    component.prevStep();

    expect(component.currentStep()).toBe(1);
  });

  it('6.2 successful submission calls service and sets submitted to true', () => {
    const mockService = createMockService(of({}));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();

    expect(mockService.submit).toHaveBeenCalled();
    expect(component.submitted()).toBe(true);
    expect(component.error()).toBeNull();
  });

  it('6.3 failed submission sets error signal and leaves submitted as false', () => {
    const mockService = createMockService(throwError(() => new Error('network')));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();

    expect(component.submitted()).toBe(false);
    expect(component.error()).toBeTruthy();
    expect(component.loading()).toBe(false);
  });

  it('6.4 loading is false after successful completion', () => {
    const mockService = createMockService(of({}));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();

    expect(component.loading()).toBe(false);
  });

  it('8.6 should show success message after submission', () => {
    const mockService = createMockService(of({}));
    TestBed.overrideProvider(ContactService, { useValue: mockService });
    const fixture = TestBed.createComponent(ContactComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.step3.setValue({ name: 'Jane', email: 'jane@example.com', company: '' });
    component.onSubmit();
    fixture.detectChanges();

    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('.success')).toBeTruthy();
    expect(el.querySelector('.form-card')).toBeFalsy();
  });
});
