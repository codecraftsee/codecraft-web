## Why

The contact form currently only logs submissions to the console — no email is ever sent. Integrating Web3Forms allows real email delivery directly from the browser using Angular's `HttpClient`, with no backend required.

## What Changes

- Add `provideHttpClient()` to `app.config.ts`
- Create a `ContactService` that POSTs form data to the Web3Forms API
- Update `ContactComponent` to use the service instead of `console.log`
- Add `loading` and `error` signals to handle async submission state
- Disable the Submit button while a request is in flight
- Show an inline error message if submission fails

## Capabilities

### New Capabilities
- `email-submission`: HTTP POST to Web3Forms API with loading/error state handling

### Modified Capabilities
- `contact-form`: Submission behaviour changes from console log to real HTTP call with loading and error states

## Impact

- `src/app/app.config.ts` — add `provideHttpClient()`
- `src/app/features/contact/contact.service.ts` — new service (new file)
- `src/app/features/contact/contact.component.ts` — inject service, update `onSubmit()`, template changes
- `src/app/features/contact/contact.component.spec.ts` — mock service in tests
- New runtime dependency on Web3Forms API (`https://api.web3forms.com/submit`)
- Requires a Web3Forms access key (free, obtained at web3forms.com)
