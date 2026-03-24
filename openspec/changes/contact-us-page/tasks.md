## 1. Routing

- [x] 1.1 Add `/contact` route to `src/app/app.routes.ts` with lazy-loaded `ContactComponent`

## 2. Contact Component — Scaffold

- [x] 2.1 Create `src/app/features/contact/contact.component.ts` as a standalone, OnPush component
- [x] 2.2 Create `src/app/features/contact/contact.component.spec.ts`

## 3. Contact Component — Form

- [x] 3.1 Import `ReactiveFormsModule` and define three `FormGroup`s: `step1`, `step2`, `step3`
- [x] 3.2 Add `step1` fields: `projectDescription` (required textarea)
- [x] 3.3 Add `step2` fields: `timeline` (required select), `budget` (required select)
- [x] 3.4 Add `step3` fields: `name` (required), `email` (required, email validator), `company` (optional)
- [x] 3.5 Add `currentStep` signal (`signal<1|2|3>(1)`) and `submitted` signal (`signal(false)`)

## 4. Contact Component — Template

- [x] 4.1 Add hero section with page title and trust signals ("Free consultation", "Response within 24h", "No obligation")
- [x] 4.2 Add step progress indicator showing "Step N of 3"
- [x] 4.3 Render step 1 form fields using `@if (currentStep() === 1)`
- [x] 4.4 Render step 2 form fields using `@if (currentStep() === 2)`
- [x] 4.5 Render step 3 form fields using `@if (currentStep() === 3)`
- [x] 4.6 Add "Next" button that validates current step's `FormGroup` before advancing
- [x] 4.7 Add "Back" button on steps 2 and 3 that returns to previous step without clearing values
- [x] 4.8 Add "Submit" button on step 3 that calls `onSubmit()`
- [x] 4.9 Add inline validation error messages on all required fields (shown after touch)
- [x] 4.10 Add success confirmation state shown after submission (`@if (submitted())`)
- [x] 4.11 Add email fallback link below the form container (`mailto:hello@codecraftsolutions.com`)

## 5. Contact Component — Submission Handler

- [x] 5.1 Implement `onSubmit()`: mark step 3 controls as touched, check validity, set `submitted` signal to `true`, log full form value to console with a `// TODO: replace with API call` comment

## 6. Contact Component — Styles

- [x] 6.1 Add inline styles matching the site visual language (dark background `#0f1419`, cyan accent `#00d4ff`, gradient title)
- [x] 6.2 Style the step progress indicator
- [x] 6.3 Style form fields, labels, and inline error messages
- [x] 6.4 Style "Next" / "Back" / "Submit" buttons
- [x] 6.5 Style success confirmation state
- [x] 6.6 Add `:host-context(.light-theme)` overrides for all styled elements
- [x] 6.7 Add `@media (prefers-reduced-motion: reduce)` and responsive mobile styles

## 7. Site Header

- [x] 7.1 Add `<a class="nav__link" routerLink="/contact">Contact</a>` after the "Team" link in `src/app/shared/site-header/site-header.component.ts`

## 8. Tests

- [x] 8.1 Test that `/contact` route renders `ContactComponent`
- [x] 8.2 Test that "Next" on step 1 with empty field shows validation error and does not advance
- [x] 8.3 Test that "Next" on step 1 with valid input advances to step 2
- [x] 8.4 Test that "Back" on step 2 returns to step 1
- [x] 8.5 Test that `onSubmit()` with valid step 3 sets `submitted` to `true`
- [x] 8.6 Test that success message is shown after submission
