import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from './contact.service';

@Component({
  selector: 'cc-contact',
  imports: [ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bp-page">
      @if (submitted()) {
        <!-- SUCCESS STATE -->
        <section class="bp-plate bp-plate--narrow" aria-live="polite" role="alert">
          <span class="bp-plate__corners" aria-hidden="true"></span>
          <div class="bp-success">
            <div class="bp-success__stamp" aria-hidden="true">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
            <div class="bp-callout">
              <span class="bp-callout__dot"></span>
              <span class="bp-mono">REQUEST RECEIVED · ID·{{ requestId() }}</span>
            </div>
            <h1 class="bp-h1">Transmission<br><span class="bp-h1__accent">acknowledged.</span></h1>
            <p class="bp-lede">Engineering team notified. Expect a response in &lt; 24h UTC.</p>
            <button class="bp-btn bp-btn--ghost" (click)="reset()" type="button">
              <span class="bp-btn__label">SUBMIT_ANOTHER</span>
            </button>
          </div>
        </section>
      } @else {
        <!-- FORM STATE -->
        <section class="bp-plate bp-plate--narrow">
          <span class="bp-plate__corners" aria-hidden="true"></span>
          <div class="bp-dims bp-dims--top">
            <span class="bp-mono">VIEW · 04 / INTAKE</span>
            <span class="bp-dims__line"></span>
            <span class="bp-mono">FORM · CC-04</span>
          </div>

          <div class="bp-section__head">
            <span class="bp-mono bp-section__num">§01</span>
            <h1 class="bp-h2">PROJECT INTAKE FORM</h1>
            <span class="bp-section__rule"></span>
            <span class="bp-mono bp-section__count">STEP {{ step() }} / 3</span>
          </div>

          <!-- STEPPER -->
          <div class="bp-stepper" aria-label="Form progress">
            @for (n of [1,2,3]; track n) {
              <div class="bp-step"
                [class.is-active]="step() === n"
                [class.is-done]="step() > n"
                [attr.aria-current]="step() === n ? 'step' : null">
                <span class="bp-mono bp-step__num">0{{ n }}</span>
                <span class="bp-step__label">{{ ['SCOPE','CONSTRAINTS','IDENTIFY'][n - 1] }}</span>
              </div>
            }
          </div>

          <!-- FORM FRAME -->
          <div class="bp-form-frame">

            <!-- STEP 1 -->
            @if (step() === 1) {
              <form [formGroup]="step1Form" (ngSubmit)="nextStep()" novalidate class="bp-form">
                <label class="bp-field">
                  <span class="bp-mono bp-field__label">
                    01 / PROJECT_DESCRIPTION
                    <span class="bp-field__req" aria-hidden="true"> *</span>
                  </span>
                  <textarea
                    formControlName="projectDescription"
                    rows="6"
                    placeholder="Describe the system, the problem, the desired outcome…"
                    [attr.aria-invalid]="step1Form.controls.projectDescription.invalid && step1Form.controls.projectDescription.touched"
                  ></textarea>
                  @if (step1Form.controls.projectDescription.invalid && step1Form.controls.projectDescription.touched) {
                    <span class="bp-mono bp-field__err" role="alert">! Please describe your project.</span>
                  }
                </label>
                <div class="bp-actions">
                  <button class="bp-btn bp-btn--primary" type="submit">
                    <span class="bp-btn__label">CONTINUE</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </form>
            }

            <!-- STEP 2 -->
            @if (step() === 2) {
              <form [formGroup]="step2Form" (ngSubmit)="nextStep()" novalidate class="bp-form">
                <label class="bp-field">
                  <span class="bp-mono bp-field__label">
                    02 / TIMELINE
                    <span class="bp-field__req" aria-hidden="true"> *</span>
                  </span>
                  <select formControlName="timeline"
                    [attr.aria-invalid]="step2Form.controls.timeline.invalid && step2Form.controls.timeline.touched">
                    <option value="">— SELECT —</option>
                    <option value="asap">ASAP</option>
                    <option value="1-3">1–3 months</option>
                    <option value="3-6">3–6 months</option>
                    <option value="exploring">Exploring</option>
                  </select>
                  @if (step2Form.controls.timeline.invalid && step2Form.controls.timeline.touched) {
                    <span class="bp-mono bp-field__err" role="alert">! Please select a timeline.</span>
                  }
                </label>
                <label class="bp-field">
                  <span class="bp-mono bp-field__label">
                    03 / BUDGET
                    <span class="bp-field__req" aria-hidden="true"> *</span>
                  </span>
                  <select formControlName="budget"
                    [attr.aria-invalid]="step2Form.controls.budget.invalid && step2Form.controls.budget.touched">
                    <option value="">— SELECT —</option>
                    <option value="lt5">&lt; €5K</option>
                    <option value="5-15">€5K – €15K</option>
                    <option value="15-50">€15K – €50K</option>
                    <option value="50+">€50K+</option>
                  </select>
                  @if (step2Form.controls.budget.invalid && step2Form.controls.budget.touched) {
                    <span class="bp-mono bp-field__err" role="alert">! Please select a budget range.</span>
                  }
                </label>
                <div class="bp-actions bp-actions--split">
                  <button class="bp-btn bp-btn--ghost" (click)="prevStep()" type="button">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span class="bp-btn__label">BACK</span>
                  </button>
                  <button class="bp-btn bp-btn--primary" type="submit">
                    <span class="bp-btn__label">CONTINUE</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                </div>
              </form>
            }

            <!-- STEP 3 -->
            @if (step() === 3) {
              <form [formGroup]="step3Form" (ngSubmit)="onSubmit()" novalidate class="bp-form">
                <label class="bp-field">
                  <span class="bp-mono bp-field__label">
                    04 / FULL_NAME
                    <span class="bp-field__req" aria-hidden="true"> *</span>
                  </span>
                  <input formControlName="name" placeholder="Last, First" autocomplete="name"
                    [attr.aria-invalid]="step3Form.controls.name.invalid && step3Form.controls.name.touched" />
                  @if (step3Form.controls.name.invalid && step3Form.controls.name.touched) {
                    <span class="bp-mono bp-field__err" role="alert">! Please enter your name.</span>
                  }
                </label>
                <label class="bp-field">
                  <span class="bp-mono bp-field__label">
                    05 / EMAIL
                    <span class="bp-field__req" aria-hidden="true"> *</span>
                  </span>
                  <input type="email" formControlName="email" placeholder="user&#64;domain.tld" autocomplete="email"
                    [attr.aria-invalid]="step3Form.controls.email.invalid && step3Form.controls.email.touched" />
                  @if (step3Form.controls.email.touched && step3Form.controls.email.errors?.['required']) {
                    <span class="bp-mono bp-field__err" role="alert">! Email address required.</span>
                  }
                  @if (step3Form.controls.email.touched && step3Form.controls.email.errors?.['email']) {
                    <span class="bp-mono bp-field__err" role="alert">! Please enter a valid email address.</span>
                  }
                </label>
                <label class="bp-field">
                  <span class="bp-mono bp-field__label">
                    06 / COMPANY
                    <span class="bp-field__opt"> (OPT)</span>
                  </span>
                  <input formControlName="company" placeholder="Optional" autocomplete="organization" />
                </label>
                @if (submitError()) {
                  <p class="bp-mono bp-field__err" role="alert">! {{ submitError() }}</p>
                }
                <div class="bp-actions bp-actions--split">
                  <button class="bp-btn bp-btn--ghost" (click)="prevStep()" type="button">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
                    <span class="bp-btn__label">BACK</span>
                  </button>
                  <button class="bp-btn bp-btn--primary" type="submit" [disabled]="loading()">
                    <span class="bp-btn__label">{{ loading() ? 'TRANSMITTING…' : 'TRANSMIT' }}</span>
                    @if (!loading()) {
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    }
                  </button>
                </div>
              </form>
            }
          </div>
        </section>
      }
    </div>
  `,
  styles: `
    :host { display: block; }

    .bp-mono { font-family: var(--cc-font-mono); font-feature-settings: 'ss01','cv01'; }

    .bp-page {
      padding: 32px;
      max-width: 1280px;
      margin: 0 auto;
    }

    /* PLATE */
    .bp-plate {
      position: relative;
      background-color: var(--cc-bg);
      border: 1px solid var(--cc-rule-strong);
      padding: 32px 36px 40px;
    }
    .bp-plate--narrow { max-width: 860px; margin: 0 auto; width: 100%; box-sizing: border-box; }
    .bp-plate__corners { pointer-events: none; }
    .bp-plate::before, .bp-plate::after,
    .bp-plate__corners::before, .bp-plate__corners::after {
      content: ''; position: absolute;
      width: 16px; height: 16px;
      border: 1.5px solid var(--cc-accent);
      pointer-events: none; z-index: 1;
    }
    .bp-plate::before  { top: -1px;    left: -1px;  border-right: 0; border-bottom: 0; }
    .bp-plate::after   { top: -1px;    right: -1px; border-left: 0;  border-bottom: 0; }
    .bp-plate__corners::before { bottom: -1px; left: -1px;  border-right: 0; border-top: 0; position: absolute; }
    .bp-plate__corners::after  { bottom: -1px; right: -1px; border-left: 0;  border-top: 0; position: absolute; }

    .bp-dims {
      display: flex; align-items: center; gap: 14px;
      font-size: 10px; color: var(--cc-ink-mute); letter-spacing: 0.18em;
    }
    .bp-dims--top { margin-bottom: 28px; }
    .bp-dims__line { flex: 1; height: 1px; background: var(--cc-rule-strong); }

    .bp-section__head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 16px; }
    .bp-section__num  { font-size: 11px; letter-spacing: 0.2em; color: var(--cc-accent); }
    .bp-h2 { font-family: var(--cc-font-mono); font-size: 13px; font-weight: 600; letter-spacing: 0.22em; margin: 0; color: var(--cc-ink); }
    .bp-section__rule  { flex: 1; height: 1px; background: var(--cc-rule-strong); }
    .bp-section__count { font-size: 10px; letter-spacing: 0.18em; color: var(--cc-ink-mute); }

    /* STEPPER */
    .bp-stepper {
      display: flex; gap: 0;
      border: 1px solid var(--cc-rule-strong);
      margin: 4px 0 24px;
    }
    .bp-step {
      flex: 1; padding: 14px 18px;
      border-right: 1px solid var(--cc-rule);
      display: flex; align-items: center; gap: 12px;
      font-size: 11px; letter-spacing: 0.18em;
      color: var(--cc-ink-mute);
    }
    .bp-step:last-child { border-right: 0; }
    .bp-step.is-active  { color: var(--cc-accent); background: var(--cc-panel); }
    .bp-step.is-done    { color: var(--cc-ink-soft); }
    .bp-step__num { font-size: 10px; opacity: 0.6; }
    .bp-step.is-active .bp-step__num { opacity: 1; }

    /* FORM FRAME */
    .bp-form-frame {
      border: 1px solid var(--cc-rule-strong);
      background: var(--cc-panel);
      padding: 30px 32px;
    }
    .bp-form { display: flex; flex-direction: column; gap: 22px; }
    .bp-field { display: flex; flex-direction: column; gap: 9px; }
    .bp-field__label {
      font-size: 10px; letter-spacing: 0.2em; color: var(--cc-ink-mute);
    }
    .bp-field__req { color: var(--cc-accent); }
    .bp-field__opt { color: var(--cc-ink-mute); }
    .bp-field input,
    .bp-field textarea,
    .bp-field select {
      background: var(--cc-bg);
      border: 1px solid var(--cc-rule-strong);
      padding: 13px 14px;
      font-family: var(--cc-font-display);
      font-size: 14px;
      color: var(--cc-ink);
      outline: none;
      resize: vertical;
    }
    .bp-field input:focus,
    .bp-field textarea:focus,
    .bp-field select:focus {
      border-color: var(--cc-accent);
      box-shadow: 0 0 0 3px var(--cc-accent-glow);
    }
    .bp-field textarea { min-height: 140px; }
    .bp-field select {
      appearance: none;
      background-image:
        linear-gradient(45deg, transparent 50%, var(--cc-ink-soft) 50%),
        linear-gradient(135deg, var(--cc-ink-soft) 50%, transparent 50%);
      background-position: calc(100% - 18px) center, calc(100% - 13px) center;
      background-size: 5px 5px;
      background-repeat: no-repeat;
      padding-right: 36px;
      background-color: var(--cc-bg);
    }
    .bp-field select option { background: var(--cc-bg); color: var(--cc-ink); }
    .bp-field__err { font-size: 11px; color: var(--cc-err); letter-spacing: 0.06em; }

    /* BUTTONS */
    .bp-actions { display: flex; justify-content: flex-end; gap: 10px; }
    .bp-actions--split { justify-content: space-between; }
    .bp-btn {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 13px 18px; font-family: var(--cc-font-mono);
      font-size: 11px; font-weight: 600; letter-spacing: 0.18em;
      border: 1px solid; cursor: pointer;
      transition: all 0.18s ease; background: transparent;
      text-decoration: none; text-transform: uppercase;
    }
    .bp-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .bp-btn--primary { background: var(--cc-accent); color: var(--cc-bg); border-color: var(--cc-accent); }
    .bp-btn--primary:hover:not(:disabled) { filter: brightness(1.1); box-shadow: 0 0 0 4px var(--cc-accent-glow); transform: translateY(-1px); }
    .bp-btn--ghost { color: var(--cc-ink); border-color: var(--cc-rule-strong); }
    .bp-btn--ghost:hover { border-color: var(--cc-accent); color: var(--cc-accent); background: var(--cc-accent-soft); }

    /* SUCCESS */
    .bp-success { text-align: center; padding: 40px 20px; max-width: 580px; margin: 0 auto; }
    .bp-success__stamp {
      width: 84px; height: 84px;
      border: 2px solid var(--cc-accent); color: var(--cc-accent);
      display: inline-flex; align-items: center; justify-content: center;
      margin-bottom: 26px;
    }
    .bp-callout {
      display: inline-flex; align-items: center; gap: 8px;
      font-size: 10px; letter-spacing: 0.2em; color: var(--cc-accent);
      margin-bottom: 20px; text-transform: uppercase;
    }
    .bp-callout__dot { width: 7px; height: 7px; background: var(--cc-accent); display: inline-block; }
    .bp-h1 {
      font-family: var(--cc-font-display);
      font-size: clamp(36px, 4vw, 60px);
      line-height: 0.96; font-weight: 700;
      letter-spacing: -0.025em;
      margin: 0 0 24px; color: var(--cc-ink);
    }
    .bp-h1__accent { color: var(--cc-accent); }
    .bp-lede { font-size: 17px; line-height: 1.55; color: var(--cc-ink-soft); margin: 0 0 32px; }

    @media (max-width: 980px) {
      .bp-page { padding: 18px; }
      .bp-plate { padding: 22px; }
      .bp-stepper { flex-direction: column; }
      .bp-step { border-right: 0; border-bottom: 1px solid var(--cc-rule); }
      .bp-form-frame { padding: 20px; }
    }
  `,
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly step = signal(1);
  readonly submitted = signal(false);
  readonly loading = signal(false);
  readonly submitError = signal('');
  readonly requestId = signal('');

  readonly step1Form = this.fb.group({
    projectDescription: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly step2Form = this.fb.group({
    timeline: ['', Validators.required],
    budget:   ['', Validators.required],
  });

  readonly step3Form = this.fb.group({
    name:    ['', Validators.required],
    email:   ['', [Validators.required, Validators.email]],
    company: [''],
  });

  nextStep(): void {
    if (this.step() === 1) {
      this.step1Form.markAllAsTouched();
      if (this.step1Form.invalid) return;
    } else if (this.step() === 2) {
      this.step2Form.markAllAsTouched();
      if (this.step2Form.invalid) return;
    }
    this.step.update(s => s + 1);
  }

  prevStep(): void {
    this.step.update(s => Math.max(1, s - 1));
  }

  onSubmit(): void {
    this.step3Form.markAllAsTouched();
    if (this.step3Form.invalid) return;

    this.loading.set(true);
    this.submitError.set('');

    const payload = {
      ...this.step1Form.value,
      ...this.step2Form.value,
      ...this.step3Form.value,
    };

    this.contactService.submit(payload).subscribe({
      next: () => {
        this.loading.set(false);
        this.requestId.set(String(Math.floor(Math.random() * 9000 + 1000)));
        this.submitted.set(true);
      },
      error: () => {
        this.loading.set(false);
        this.submitError.set('Transmission failed. Try again or email us directly.');
      },
    });
  }

  reset(): void {
    this.submitted.set(false);
    this.step.set(1);
    this.step1Form.reset();
    this.step2Form.reset();
    this.step3Form.reset();
    this.submitError.set('');
  }
}
