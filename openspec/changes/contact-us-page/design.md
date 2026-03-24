## Context

The site has three routes (`/`, `/services`, `/team`) and a `SiteHeaderComponent` with nav links. There is no way for visitors to contact CodeCraft. The header uses `RouterLink` and plain `<a>` nav items — adding a Contact link is a one-line change. The contact form itself lives in a new lazy-loaded feature component consistent with how all other features are structured.

No backend exists. Form submission will call a stub method for now, with a clear integration point for a real API later.

## Goals / Non-Goals

**Goals:**
- New `/contact` route with `ContactComponent` (lazy-loaded, standalone, OnPush)
- Multi-step form: step 1 (project details) → step 2 (timeline & budget) → step 3 (contact info)
- Step progress indicator (e.g. "Step 2 of 3")
- Trust signals: "Free consultation", "Response within 24h", "No obligation"
- Email fallback link below the form
- "Contact" nav link added to `SiteHeaderComponent`
- Visual style consistent with existing pages (dark background, cyan accent, gradient title)
- Light theme support via `:host-context(.light-theme)`

**Non-Goals:**
- No backend integration (MVP — console log only)
- No file upload or attachment fields
- No CAPTCHA or anti-spam for now
- No email validation beyond HTML5 `type="email"`

## Decisions

**1. Angular Reactive Forms over Template-driven**
Multi-step forms with validation per step are much cleaner with `FormGroup`. Each step gets its own `FormGroup`; only the active group is validated on "Next". Template-driven forms would make this awkward.

**2. Single component, not a routed wizard**
Three steps rendered within one `ContactComponent` using a `currentStep` signal (`signal<1|2|3>(1)`). No child routes. Keeps the implementation simple and avoids router complexity for a 3-step flow.

**3. Signals for all state**
`currentStep`, `submitted`, and form values use Angular signals per project convention. No RxJS needed.

**4. Inline styles (single-file component)**
Matches all existing feature components. No separate stylesheet file.

**5. Step validation before advancing**
"Next" button marks all controls in the current step's `FormGroup` as touched and checks `valid` before moving forward. Invalid fields show inline error messages.

**6. Console log stub for submission**
`onSubmit()` logs the full form value. A `// TODO: replace with API call` comment marks the integration point.

## Risks / Trade-offs

- **No real submission** → Users filling the form will get a success state but no email is sent. Acceptable for MVP; must be replaced before launch.
  Mitigation: The email fallback link is always visible so there's a real contact path.

- **Form state lost on navigation** → If user navigates away mid-form, data is lost.
  Mitigation: Acceptable for now; the form is short enough that re-filling is not a burden.

## Migration Plan

1. Create `src/app/features/contact/contact.component.ts`
2. Create `src/app/features/contact/contact.component.spec.ts`
3. Add `/contact` route to `app.routes.ts`
4. Add "Contact" `routerLink="/contact"` to `SiteHeaderComponent`

No database, no migrations, no rollback needed.

## Open Questions

- What email address should the fallback link use? (placeholder: `hello@codecraftsolutions.com`)
- Budget ranges to offer: suggested `< €5k`, `€5k–€15k`, `€15k–€50k`, `€50k+` — confirm with team.
- Should the form POST to an email service (e.g. Resend, Formspree) at launch?
