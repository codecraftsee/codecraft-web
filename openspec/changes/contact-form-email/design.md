## Context

The contact form (`ContactComponent`) currently calls `console.log` on submission and immediately sets `submitted = true`. No email is sent. The fix is to POST the form data to Web3Forms, a free third-party API that forwards the payload to a registered email inbox. Angular's built-in `HttpClient` is the right tool — no extra dependencies needed beyond registering the provider.

`HttpClient` is not yet provided in `app.config.ts`, so that must be added first.

## Goals / Non-Goals

**Goals:**
- Real email delivery on form submission via Web3Forms API
- Proper async UX: loading state while the request is in flight, error state if it fails
- Submit button disabled during the request to prevent double-submission
- Inline error message if the API call fails

**Non-Goals:**
- No server-side email sending or backend API
- No email templating beyond what Web3Forms provides
- No retry logic — a single attempt; user can resubmit manually
- No storing submissions locally or in a database

## Decisions

**1. Web3Forms over Formspree or EmailJS**
Web3Forms requires only an HTTP POST with `access_key` + form fields — no SDK, no account-specific endpoint URL. It's the least invasive integration and aligns perfectly with Angular's `HttpClient`. Formspree has a 50/month free limit; EmailJS requires an SDK and more setup.

**2. `ContactService` as a dedicated injectable**
Wrapping the HTTP call in `ContactService` (`providedIn: 'root'`) keeps the component free of HTTP concerns, makes the service easy to mock in tests, and follows the single-responsibility principle. The component just calls `service.submit(data)` and reacts to the Observable.

**3. Access key stored as a module constant, not environment file**
No `src/environments/` directory exists in this project. A `WEB3FORMS_ACCESS_KEY` constant at the top of `contact.service.ts` with a `// TODO: move to environment config` comment is the simplest approach. It's visible, easy to replace, and doesn't require scaffolding environment files.

**4. `loading` and `error` signals in the component**
The component already uses signals for all state. Adding `loading = signal(false)` and `error = signal<string | null>(null)` is consistent with the existing pattern. No RxJS state management needed — the Observable from `HttpClient` is subscribed once per submission and drives these two signals.

**5. Subscribe in component, not async pipe**
`onSubmit()` is an imperative action triggered by a user event, not a reactive data stream. Using `.subscribe()` in the method is cleaner than wiring an async pipe for a one-shot HTTP call. The subscription is short-lived (one request) and does not need manual cleanup.

## Risks / Trade-offs

- **Access key exposed in client bundle** → Web3Forms keys are designed to be public (they're domain-restricted in the Web3Forms dashboard). Low risk, but the key should be locked to the production domain in the Web3Forms settings.
- **Web3Forms service outage** → The error state and email fallback link ensure users always have an alternative. Mitigation: error message directs users to the mailto link.
- **CORS** → Web3Forms explicitly supports browser-side POSTs. No CORS issue expected.

## Migration Plan

1. Add `provideHttpClient()` to `app.config.ts`
2. Create `contact.service.ts`
3. Update `contact.component.ts` — inject service, replace `onSubmit()`, add loading/error to template
4. Update `contact.component.spec.ts` — mock service
5. User registers at web3forms.com, gets access key, pastes into `WEB3FORMS_ACCESS_KEY`

Rollback: revert `onSubmit()` to `console.log` + `submitted.set(true)` — no data migration needed.

## Open Questions

- Which email address should Web3Forms deliver to? (needs to match the registered Web3Forms account)
- Should the subject line be customised (e.g. "New enquiry from [name]")? Web3Forms supports a `subject` field in the POST body.
