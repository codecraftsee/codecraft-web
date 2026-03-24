## 1. App Setup

- [x] 1.1 Add `provideHttpClient()` to `src/app/app.config.ts`

## 2. Contact Service

- [x] 2.1 Create `src/app/features/contact/contact.service.ts` with `@Injectable({ providedIn: 'root' })`
- [x] 2.2 Inject `HttpClient` via `inject(HttpClient)`
- [x] 2.3 Add `WEB3FORMS_ACCESS_KEY` constant at the top of the file with a `// TODO: move to environment config` comment
- [x] 2.4 Implement `submit(data: Record<string, unknown>)` method that POSTs to `https://api.web3forms.com/submit` with `access_key` merged into the payload

## 3. Component — Logic

- [x] 3.1 Inject `ContactService` in `ContactComponent` via `inject(ContactService)`
- [x] 3.2 Add `readonly loading = signal(false)` and `readonly error = signal<string | null>(null)` signals
- [x] 3.3 Replace the `console.log` + `submitted.set(true)` in `onSubmit()` with: set `loading(true)`, clear `error`, call `contactService.submit(...)`, on success set `loading(false)` + `submitted(true)`, on error set `loading(false)` + `error('Something went wrong…')`

## 4. Component — Template

- [x] 4.1 Bind `[disabled]="loading()"` on the Submit button
- [x] 4.2 Show a spinner or "Sending…" label on the Submit button while `loading()` is true
- [x] 4.3 Add an inline error block above the email fallback link: `@if (error()) { <p class="submit-error">{{ error() }}</p> }`

## 5. Component — Styles

- [x] 5.1 Add `.submit-error` style (red/warning colour, consistent with existing `.field__error`)
- [x] 5.2 Add `:host-context(.light-theme) .submit-error` override
- [x] 5.3 Style the disabled state of the Submit button (`[disabled]` opacity + cursor)

## 6. Tests

- [x] 6.1 Update `contact.component.spec.ts` to provide a mock `ContactService` using `{ provide: ContactService, useValue: mockService }`
- [x] 6.2 Add test: successful submission calls service and sets `submitted` to `true`
- [x] 6.3 Add test: failed submission sets `error` signal and leaves `submitted` as `false`
- [x] 6.4 Add test: `loading` is `true` while the request is in flight and `false` after completion
