## ADDED Requirements

### Requirement: HTTP POST to Web3Forms API
The system SHALL send form data to `https://api.web3forms.com/submit` via HTTP POST, including the `access_key` field and all collected form values. This SHALL be performed by a dedicated `ContactService` using Angular's `HttpClient`.

#### Scenario: Successful POST
- **WHEN** the Web3Forms API returns a 2xx response
- **THEN** the `loading` signal is set to `false` and the `submitted` signal is set to `true`

#### Scenario: Failed POST
- **WHEN** the Web3Forms API returns an error or the network is unavailable
- **THEN** the `loading` signal is set to `false`, the `submitted` signal remains `false`, and the `error` signal is set to a user-facing error message

### Requirement: Loading state during submission
The system SHALL set a `loading` signal to `true` immediately when a submission request is initiated, and back to `false` when the request completes (success or error).

#### Scenario: Submit button disabled while loading
- **WHEN** the form is submitted and the HTTP request is in flight
- **THEN** the Submit button is disabled and cannot be clicked again

#### Scenario: Loading state cleared on completion
- **WHEN** the HTTP request completes with any outcome
- **THEN** the `loading` signal is set to `false`

### Requirement: Error message on submission failure
The system SHALL display an inline error message when submission fails, guiding the user to retry or use the email fallback.

#### Scenario: Error message visible after failure
- **WHEN** the HTTP POST returns an error
- **THEN** an error message is shown in the UI above the email fallback link

#### Scenario: Error cleared on next submission attempt
- **WHEN** user clicks Submit again after a previous failure
- **THEN** the error message is cleared before the new request is initiated
