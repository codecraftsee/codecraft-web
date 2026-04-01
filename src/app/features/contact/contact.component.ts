import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ContactService } from './contact.service';

@Component({
  selector: 'cc-contact',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">

      @if (submitted()) {
        <section class="success" role="alert" aria-live="polite">
          <div class="success__icon" aria-hidden="true">✓</div>
          <h1 class="success__title">Message Sent!</h1>
          <p class="success__text">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        </section>
      } @else {
        <section class="hero">
          <h1 class="hero__title">Let's Talk About Your Project</h1>
          <p class="hero__subtitle">Tell us what you're building and we'll get back to you within 24 hours.</p>
          <div class="trust-badges" aria-label="Our commitments">
            <span class="badge">Free consultation</span>
            <span class="badge">Response within 24h</span>
            <span class="badge">No obligation</span>
          </div>
        </section>

        <div class="progress" aria-label="Form progress">
          <div class="progress__steps">
            @for (step of [1, 2, 3]; track step) {
              <div class="progress__step" [class.progress__step--active]="currentStep() === step" [class.progress__step--done]="currentStep() > step">
                <div class="progress__dot">{{ currentStep() > step ? '✓' : step }}</div>
              </div>
              @if (step < 3) {
                <div class="progress__line" [class.progress__line--done]="currentStep() > step"></div>
              }
            }
          </div>
          <p class="progress__label">Step {{ currentStep() }} of 3</p>
        </div>

        <div class="form-card">

          <!-- Step 1: Project Details -->
          @if (currentStep() === 1) {
            <form [formGroup]="step1" (ngSubmit)="nextStep()" novalidate>
              <h2 class="form-card__title">Tell us about your project</h2>
              <div class="field">
                <label class="field__label" for="projectDescription">
                  Project description <span class="field__required" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="projectDescription"
                  class="field__input field__input--textarea"
                  formControlName="projectDescription"
                  rows="5"
                  placeholder="Describe what you want to build, the problem you're solving, or the outcome you're looking for…"
                  [attr.aria-invalid]="step1.controls.projectDescription.invalid && step1.controls.projectDescription.touched"
                  aria-describedby="projectDescription-error"
                ></textarea>
                @if (step1.controls.projectDescription.invalid && step1.controls.projectDescription.touched) {
                  <p class="field__error" id="projectDescription-error" role="alert">Please describe your project.</p>
                }
              </div>
              <div class="actions">
                <button type="submit" class="btn btn--primary">Next →</button>
              </div>
            </form>
          }

          <!-- Step 2: Timeline & Budget -->
          @if (currentStep() === 2) {
            <form [formGroup]="step2" (ngSubmit)="nextStep()" novalidate>
              <h2 class="form-card__title">Timeline &amp; budget</h2>
              <div class="field">
                <label class="field__label" for="timeline">
                  When do you need this? <span class="field__required" aria-hidden="true">*</span>
                </label>
                <select
                  id="timeline"
                  class="field__input"
                  formControlName="timeline"
                  [attr.aria-invalid]="step2.controls.timeline.invalid && step2.controls.timeline.touched"
                  aria-describedby="timeline-error"
                >
                  <option value="" disabled>Select a timeline…</option>
                  <option value="asap">ASAP</option>
                  <option value="1-3months">1–3 months</option>
                  <option value="3-6months">3–6 months</option>
                  <option value="exploring">Just exploring</option>
                </select>
                @if (step2.controls.timeline.invalid && step2.controls.timeline.touched) {
                  <p class="field__error" id="timeline-error" role="alert">Please select a timeline.</p>
                }
              </div>
              <div class="field">
                <label class="field__label" for="budget">
                  Estimated budget <span class="field__required" aria-hidden="true">*</span>
                </label>
                <select
                  id="budget"
                  class="field__input"
                  formControlName="budget"
                  [attr.aria-invalid]="step2.controls.budget.invalid && step2.controls.budget.touched"
                  aria-describedby="budget-error"
                >
                  <option value="" disabled>Select a budget range…</option>
                  <option value="lt5k">&lt; €5k</option>
                  <option value="5k-15k">€5k – €15k</option>
                  <option value="15k-50k">€15k – €50k</option>
                  <option value="50k+">€50k+</option>
                </select>
                @if (step2.controls.budget.invalid && step2.controls.budget.touched) {
                  <p class="field__error" id="budget-error" role="alert">Please select a budget range.</p>
                }
              </div>
              <div class="actions">
                <button type="button" class="btn btn--ghost" (click)="prevStep()">← Back</button>
                <button type="submit" class="btn btn--primary">Next →</button>
              </div>
            </form>
          }

          <!-- Step 3: Contact Info -->
          @if (currentStep() === 3) {
            <form [formGroup]="step3" (ngSubmit)="onSubmit()" novalidate>
              <h2 class="form-card__title">Your contact details</h2>
              <div class="field">
                <label class="field__label" for="name">
                  Full name <span class="field__required" aria-hidden="true">*</span>
                </label>
                <input
                  id="name"
                  type="text"
                  class="field__input"
                  formControlName="name"
                  placeholder="Jane Smith"
                  autocomplete="name"
                  [attr.aria-invalid]="step3.controls.name.invalid && step3.controls.name.touched"
                  aria-describedby="name-error"
                />
                @if (step3.controls.name.invalid && step3.controls.name.touched) {
                  <p class="field__error" id="name-error" role="alert">Please enter your name.</p>
                }
              </div>
              <div class="field">
                <label class="field__label" for="email">
                  Email address <span class="field__required" aria-hidden="true">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  class="field__input"
                  formControlName="email"
                  placeholder="jane@company.com"
                  autocomplete="email"
                  [attr.aria-invalid]="step3.controls.email.invalid && step3.controls.email.touched"
                  aria-describedby="email-error"
                />
                @if (step3.controls.email.touched) {
                  @if (step3.controls.email.errors?.['required']) {
                    <p class="field__error" id="email-error" role="alert">Please enter your email address.</p>
                  } @else if (step3.controls.email.errors?.['email']) {
                    <p class="field__error" id="email-error" role="alert">Please enter a valid email address.</p>
                  }
                }
              </div>
              <div class="field">
                <label class="field__label" for="company">Company / website <span class="field__optional">(optional)</span></label>
                <input
                  id="company"
                  type="text"
                  class="field__input"
                  formControlName="company"
                  placeholder="Acme Inc. or acme.com"
                  autocomplete="organization"
                />
              </div>
              <div class="actions">
                <button type="button" class="btn btn--ghost" (click)="prevStep()">← Back</button>
                <button type="submit" class="btn btn--primary" [disabled]="loading()">
                  {{ loading() ? 'Sending…' : 'Send message' }}
                </button>
              </div>
            </form>
          }

        </div>

        @if (error()) {
          <p class="submit-error" role="alert">{{ error() }}</p>
        }

        <p class="fallback">
          Prefer email?
          <a class="fallback__link" href="mailto:hello@codecraftsolutions.rs">hello@codecraftsolutions.rs</a>
        </p>
      }

    </div>
  `,
  styles: `
    :host {
      display: block;
      background: transparent;
      color: #F1F5F9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      min-height: 100dvh;
    }

    .container {
      max-width: 680px;
      margin: 0 auto;
      padding: 0 2rem 6rem;
    }

    /* Hero */
    .hero {
      padding: 6rem 0 2.5rem;
      text-align: center;
    }
    .hero__title {
      display: inline-block;
      font-size: 42px;
      font-weight: 800;
      margin: 0 0 1rem;
      padding: 0.05em 0;
      line-height: 1.2;
      background: linear-gradient(135deg, #10B981, #059669, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero__subtitle {
      font-size: 17px;
      color: #cbd5e1;
      line-height: 1.7;
      margin: 0 0 2rem;
    }

    /* Trust badges */
    .trust-badges {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.75rem;
    }
    .badge {
      font-size: 12px;
      font-weight: 500;
      padding: 0.4rem 1rem;
      border-radius: 20px;
      border: 1px solid rgba(16, 185, 129, 0.2);
      background: rgba(16, 185, 129, 0.06);
      color: #10B981;
      letter-spacing: 0.02em;
    }

    /* Progress */
    .progress {
      margin: 2.5rem 0;
      text-align: center;
    }
    .progress__steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0;
      margin-bottom: 0.75rem;
    }
    .progress__step { display: flex; align-items: center; }
    .progress__dot {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 700;
      border: 2px solid rgba(16, 185, 129, 0.2);
      background: rgba(16, 185, 129, 0.05);
      color: #94a3b8;
      transition: all 0.3s;
    }
    .progress__step--active .progress__dot {
      border-color: #10B981;
      background: rgba(16, 185, 129, 0.12);
      color: #10B981;
      box-shadow: 0 0 16px rgba(16, 185, 129, 0.25);
    }
    .progress__step--done .progress__dot {
      border-color: #10B981;
      background: #10B981;
      color: #1E1E2E;
    }
    .progress__line {
      width: 60px;
      height: 2px;
      background: rgba(16, 185, 129, 0.15);
      transition: background 0.3s;
    }
    .progress__line--done {
      background: rgba(16, 185, 129, 0.5);
    }
    .progress__label {
      font-size: 13px;
      color: #94a3b8;
      margin: 0;
    }

    /* Form card */
    .form-card {
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(16, 185, 129, 0.04), rgba(5, 150, 105, 0.04));
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 16px;
      padding: 2.5rem;
    }
    .form-card__title {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin: 0 0 2rem;
    }

    /* Fields */
    .field { margin-bottom: 1.5rem; }
    .field__label {
      display: block;
      font-size: 13px;
      font-weight: 600;
      color: #cbd5e1;
      margin-bottom: 0.5rem;
      letter-spacing: 0.02em;
    }
    .field__required { color: #10B981; margin-left: 2px; }
    .field__optional { color: #94a3b8; font-weight: 400; }
    .field__input {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid rgba(16, 185, 129, 0.15);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      color: #F1F5F9;
      font-size: 14px;
      font-family: inherit;
      transition: border-color 0.2s, box-shadow 0.2s;
      appearance: none;
      -webkit-appearance: none;
    }
    .field__input--textarea { resize: vertical; min-height: 120px; }
    .field__input:focus {
      outline: none;
      border-color: rgba(16, 185, 129, 0.5);
      box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
    }
    .field__input[aria-invalid="true"] {
      border-color: rgba(255, 80, 100, 0.5);
    }
    .field__input[aria-invalid="true"]:focus {
      box-shadow: 0 0 0 3px rgba(255, 80, 100, 0.1);
    }
    .field__input option { background: #1a2233; color: #F1F5F9; }
    .field__error {
      font-size: 12px;
      color: #f87171;
      margin: 0.4rem 0 0;
    }

    /* Actions */
    .actions {
      display: flex;
      justify-content: flex-end;
      gap: 0.75rem;
      margin-top: 2rem;
    }
    .btn {
      padding: 0.65rem 1.5rem;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s;
      border: 1px solid transparent;
    }
    .btn--primary {
      background: linear-gradient(135deg, #10B981, #059669);
      color: #1E1E2E;
      border-color: transparent;
    }
    .btn--primary:active {
      transform: scale(0.96);
      opacity: 0.85;
    }
    .btn--primary:hover {
      opacity: 0.9;
      transform: translateY(-1px);
      box-shadow: 0 8px 20px rgba(16, 185, 129, 0.25);
    }
    .btn--ghost {
      background: transparent;
      color: #cbd5e1;
      border-color: rgba(16, 185, 129, 0.15);
    }
    .btn--ghost:active {
      transform: scale(0.96);
      opacity: 0.8;
    }
    .btn--ghost:hover {
      border-color: rgba(16, 185, 129, 0.35);
      color: #10B981;
    }

    /* Success state */
    .success {
      padding: 8rem 0;
      text-align: center;
    }
    .success__icon {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10B981, #059669);
      color: #1E1E2E;
      font-size: 28px;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
    }
    .success__title {
      font-size: 36px;
      font-weight: 800;
      margin: 0 0 1rem;
      padding: 0.05em 0;
      line-height: 1.2;
      background: linear-gradient(135deg, #10B981, #059669);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      display: inline-block;
    }
    .success__text {
      font-size: 16px;
      color: #cbd5e1;
      line-height: 1.7;
      margin: 0;
    }

    /* Submit error */
    .submit-error {
      font-size: 13px;
      color: #f87171;
      background: rgba(248, 113, 113, 0.08);
      border: 1px solid rgba(248, 113, 113, 0.2);
      border-radius: 8px;
      padding: 0.75rem 1rem;
      margin-top: 1.5rem;
      text-align: center;
    }

    /* Disabled button */
    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      transform: none !important;
      box-shadow: none !important;
    }

    /* Email fallback */
    .fallback {
      text-align: center;
      margin-top: 2rem;
      font-size: 13px;
      color: #94a3b8;
    }
    .fallback__link {
      color: #cbd5e1;
      text-decoration: underline;
      text-underline-offset: 3px;
      transition: color 0.2s;
    }
    .fallback__link:hover { color: #10B981; }

    /* Light theme */
    :host-context(.light-theme) {
      color: #1a1a2e;
    }
    :host-context(.light-theme) .hero__title {
      background: linear-gradient(135deg, #F59E0B, #D97706, #EA580C);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .hero__subtitle { color: #94a3b8; }
    :host-context(.light-theme) .badge {
      background: rgba(245, 158, 11, 0.06);
      border-color: rgba(245, 158, 11, 0.2);
      color: #F59E0B;
    }
    :host-context(.light-theme) .progress__dot {
      border-color: rgba(0, 0, 0, 0.12);
      background: rgba(0, 0, 0, 0.02);
      color: #94a3b8;
    }
    :host-context(.light-theme) .progress__step--active .progress__dot {
      border-color: #F59E0B;
      background: rgba(245, 158, 11, 0.08);
      color: #F59E0B;
      box-shadow: 0 0 16px rgba(245, 158, 11, 0.2);
    }
    :host-context(.light-theme) .progress__step--done .progress__dot {
      border-color: #F59E0B;
      background: #F59E0B;
      color: #fff;
    }
    :host-context(.light-theme) .progress__line { background: rgba(0, 0, 0, 0.08); }
    :host-context(.light-theme) .progress__line--done { background: rgba(245, 158, 11, 0.4); }
    :host-context(.light-theme) .progress__label { color: #94a3b8; }
    :host-context(.light-theme) .form-card {
      background: rgba(0, 0, 0, 0.02);
      border-color: rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .form-card__title { color: #1a1a2e; }
    :host-context(.light-theme) .field__label { color: #94a3b8; }
    :host-context(.light-theme) .field__required { color: #F59E0B; }
    :host-context(.light-theme) .field__input {
      background: #ffffff;
      border-color: rgba(0, 0, 0, 0.12);
      color: #1a1a2e;
    }
    :host-context(.light-theme) .field__input:focus {
      border-color: rgba(245, 158, 11, 0.5);
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.08);
    }
    :host-context(.light-theme) .field__input option { background: #fff; color: #1a1a2e; }
    :host-context(.light-theme) .btn--ghost {
      color: #94a3b8;
      border-color: rgba(0, 0, 0, 0.12);
    }
    :host-context(.light-theme) .btn--ghost:hover {
      border-color: rgba(245, 158, 11, 0.35);
      color: #F59E0B;
    }
    :host-context(.light-theme) .success__title {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .success__text { color: #94a3b8; }
    :host-context(.light-theme) .submit-error {
      color: #dc2626;
      background: rgba(220, 38, 38, 0.06);
      border-color: rgba(220, 38, 38, 0.15);
    }
    :host-context(.light-theme) .fallback { color: #94a3b8; }
    :host-context(.light-theme) .fallback__link { color: #94a3b8; }
    :host-context(.light-theme) .fallback__link:hover { color: #F59E0B; }

    :host-context(.sable-theme) {
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .hero__title {
      background: linear-gradient(135deg, #F59E0B, #D97706, #EA580C);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.sable-theme) .hero__subtitle { color: #D4B896; }
    :host-context(.sable-theme) .badge {
      background: rgba(217, 119, 6, 0.08);
      border-color: rgba(217, 119, 6, 0.2);
      color: #F59E0B;
    }
    :host-context(.sable-theme) .progress__dot {
      border-color: rgba(217, 119, 6, 0.2);
      background: rgba(217, 119, 6, 0.04);
      color: #A07850;
    }
    :host-context(.sable-theme) .progress__step--active .progress__dot {
      border-color: #F59E0B;
      background: rgba(245, 158, 11, 0.1);
      color: #F59E0B;
      box-shadow: 0 0 16px rgba(245, 158, 11, 0.25);
    }
    :host-context(.sable-theme) .progress__step--done .progress__dot {
      border-color: #D97706;
      background: #D97706;
      color: #1C1917;
    }
    :host-context(.sable-theme) .progress__line { background: rgba(217, 119, 6, 0.15); }
    :host-context(.sable-theme) .progress__line--done { background: rgba(245, 158, 11, 0.45); }
    :host-context(.sable-theme) .progress__label { color: #A07850; }
    :host-context(.sable-theme) .form-card {
      background: rgba(217, 119, 6, 0.04);
      border-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .form-card__title { color: #F5F0E8; }
    :host-context(.sable-theme) .field__label { color: #D4B896; }
    :host-context(.sable-theme) .field__required { color: #F59E0B; }
    :host-context(.sable-theme) .field__input {
      background: rgba(28, 25, 23, 0.6);
      border-color: rgba(217, 119, 6, 0.2);
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .field__input:focus {
      border-color: rgba(245, 158, 11, 0.5);
      box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
    }
    :host-context(.sable-theme) .field__input option { background: #1C1917; color: #F5F0E8; }
    :host-context(.sable-theme) .btn--primary {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      color: #1C1917;
    }
    :host-context(.sable-theme) .btn--primary:hover {
      box-shadow: 0 8px 20px rgba(245, 158, 11, 0.25);
    }
    :host-context(.sable-theme) .btn--ghost {
      color: #D4B896;
      border-color: rgba(217, 119, 6, 0.2);
    }
    :host-context(.sable-theme) .btn--ghost:hover {
      border-color: rgba(245, 158, 11, 0.4);
      color: #F59E0B;
    }
    :host-context(.sable-theme) .success__title {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.sable-theme) .success__text { color: #D4B896; }
    :host-context(.sable-theme) .fallback { color: #A07850; }
    :host-context(.sable-theme) .fallback__link { color: #D4B896; }
    :host-context(.sable-theme) .fallback__link:hover { color: #F59E0B; }

    /* Reduced motion */
    @media (prefers-reduced-motion: reduce) {
      .btn, .field__input, .progress__dot, .progress__line { transition: none; }
      .btn--primary:hover { transform: none; }
    }

    /* Responsive */
    @media (max-width: 600px) {
      .hero__title { font-size: 30px; }
      .hero__subtitle { font-size: 15px; }
      .form-card { padding: 1.5rem; }
      .progress__line { width: 32px; }
    }
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  constructor() {
    inject(Router).events.pipe(
      filter(e => e instanceof NavigationEnd && e.url === '/contact'),
      takeUntilDestroyed(),
    ).subscribe(() => {
      this.submitted.set(false);
      this.loading.set(false);
      this.error.set(null);
      this.currentStep.set(1);
      this.step1.reset();
      this.step2.reset();
      this.step3.reset();
    });
  }

  readonly currentStep = signal<1 | 2 | 3>(1);
  readonly submitted = signal(false);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly step1 = this.fb.group({
    projectDescription: ['', Validators.required],
  });

  readonly step2 = this.fb.group({
    timeline: ['', Validators.required],
    budget: ['', Validators.required],
  });

  readonly step3 = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    company: [''],
  });

  nextStep(): void {
    const group = this.currentStep() === 1 ? this.step1 : this.step2;
    if (group.invalid) {
      group.markAllAsTouched();
      return;
    }
    this.currentStep.update(s => (s + 1) as 1 | 2 | 3);
  }

  prevStep(): void {
    this.currentStep.update(s => (s - 1) as 1 | 2 | 3);
  }

  onSubmit(): void {
    if (this.step3.invalid) {
      this.step3.markAllAsTouched();
      return;
    }
    this.loading.set(true);
    this.error.set(null);
    this.contactService.submit({
      ...this.step1.value,
      ...this.step2.value,
      ...this.step3.value,
    }).subscribe({
      next: () => { this.loading.set(false); this.submitted.set(true); },
      error: () => { this.loading.set(false); this.error.set('Something went wrong. Please try again or email us directly.'); },
    });
  }
}
