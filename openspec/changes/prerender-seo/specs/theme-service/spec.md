## MODIFIED Requirements

### Requirement: Persist theme preference
The service SHALL persist the user's theme preference to `localStorage` under the key
`cc-theme` whenever the active theme changes, but only in the browser and only after the
stored preference has been restored.

#### Scenario: Preference written on toggle
- **WHEN** `toggle()` is called after the first render
- **THEN** `localStorage.getItem('cc-theme')` SHALL return the new active theme value

#### Scenario: Preference restored after first render
- **WHEN** the service initialises in the browser and `localStorage` contains a valid `cc-theme` value
- **THEN** `activeTheme` SHALL start as the default (`dark`) so prerendered HTML hydrates without mismatches
- **AND** after the first render `activeTheme` SHALL be set to the stored value
- **AND** the stored value SHALL NOT be overwritten by the default before it is restored

#### Scenario: Server prerendering
- **WHEN** the service initialises during server prerendering
- **THEN** it SHALL NOT read or write `localStorage` or modify `document.documentElement`
