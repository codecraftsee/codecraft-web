## MODIFIED Requirements

### Requirement: Form submission
Upon successful completion of step 3, the system SHALL call `ContactService.submit()` with the combined form values from all three steps. While the request is in flight the system SHALL show a loading state. On success the system SHALL display a success confirmation message in place of the form. On failure the system SHALL display an inline error message and keep the form visible.

#### Scenario: Successful submission
- **WHEN** user clicks "Submit" on step 3 with all fields valid and the API call succeeds
- **THEN** the form is replaced by a success message thanking the user and confirming a response within 24 hours

#### Scenario: Failed submission
- **WHEN** user clicks "Submit" on step 3 with all fields valid but the API call fails
- **THEN** the form remains visible, the Submit button is re-enabled, and an inline error message is displayed

#### Scenario: Submit button disabled during request
- **WHEN** user clicks "Submit" and the request is in flight
- **THEN** the Submit button is disabled until the request completes
