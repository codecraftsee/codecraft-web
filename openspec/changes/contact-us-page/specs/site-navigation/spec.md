## ADDED Requirements

### Requirement: Contact link in main navigation
The site header navigation SHALL include a "Contact" link that navigates to `/contact`. It SHALL appear after the existing "Team" link.

#### Scenario: Contact link visible in header
- **WHEN** user views any page on the site
- **THEN** the header navigation contains a "Contact" link

#### Scenario: Contact link navigates to contact page
- **WHEN** user clicks the "Contact" nav link
- **THEN** the browser navigates to `/contact` and the contact page is displayed
