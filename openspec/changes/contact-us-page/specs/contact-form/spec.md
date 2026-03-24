## ADDED Requirements

### Requirement: Multi-step form progression
The system SHALL present the contact form as a 3-step wizard. The user SHALL only see one step at a time. Step 1 collects project details; Step 2 collects timeline and budget; Step 3 collects contact information.

#### Scenario: User views step 1 on page load
- **WHEN** user navigates to `/contact`
- **THEN** step 1 is displayed and the progress indicator shows "Step 1 of 3"

#### Scenario: User advances to next step with valid input
- **WHEN** user fills in all required fields on the current step and clicks "Next"
- **THEN** the form advances to the next step and the progress indicator updates

#### Scenario: User attempts to advance with invalid input
- **WHEN** user clicks "Next" with one or more required fields empty or invalid
- **THEN** the form stays on the current step and inline error messages appear on all invalid fields

#### Scenario: User goes back to a previous step
- **WHEN** user clicks "Back" on step 2 or step 3
- **THEN** the form returns to the previous step with previously entered values preserved

### Requirement: Step 1 — Project details
Step 1 SHALL collect: project description (required, textarea).

#### Scenario: Project description field present
- **WHEN** user is on step 1
- **THEN** a labelled textarea for project description is visible and required

### Requirement: Step 2 — Timeline and budget
Step 2 SHALL collect: timeline (required, single-select: "ASAP", "1–3 months", "3–6 months", "Just exploring") and estimated budget (required, single-select: "< €5k", "€5k–€15k", "€15k–€50k", "€50k+").

#### Scenario: Timeline and budget options present
- **WHEN** user is on step 2
- **THEN** both timeline and budget selects are visible with their respective options

### Requirement: Step 3 — Contact information
Step 3 SHALL collect: full name (required), email address (required, must be valid email format), and company/website (optional).

#### Scenario: Valid email accepted
- **WHEN** user enters a correctly formatted email address
- **THEN** no email validation error is shown

#### Scenario: Invalid email rejected
- **WHEN** user enters text that is not a valid email address and clicks "Submit"
- **THEN** an inline error message is shown on the email field

### Requirement: Form submission
Upon successful completion of step 3, the system SHALL call a submission handler that logs the complete form value to the console. The system SHALL then display a success confirmation message in place of the form.

#### Scenario: Successful submission
- **WHEN** user clicks "Submit" on step 3 with all fields valid
- **THEN** the form is replaced by a success message thanking the user and confirming a response within 24 hours

### Requirement: Trust signals
The page SHALL display trust-building copy before the form: "Free consultation", "Response within 24h", "No obligation".

#### Scenario: Trust signals visible on load
- **WHEN** user navigates to `/contact`
- **THEN** all three trust signals are visible above the form

### Requirement: Email fallback
The page SHALL display a visible email fallback link below the form so users who prefer not to fill in the form can contact CodeCraft directly.

#### Scenario: Email fallback link present
- **WHEN** user is on the contact page
- **THEN** an email `mailto:` link is visible below the form container
