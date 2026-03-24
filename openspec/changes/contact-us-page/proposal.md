## Why

CodeCraft Solutions has no way for potential clients to get in touch directly from the website. A contact page with a multi-step form reduces friction, builds trust, and converts visitors into leads.

## What Changes

- Add a new `/contact` route with a lazy-loaded `ContactComponent`
- Multi-step form (3 steps): project details → timeline & budget → contact info
- Step progress indicator showing current step out of total
- Trust-building copy: "Free consultation", "Response within 24h", "No obligation"
- Email fallback link for users who prefer not to fill the form
- Form submission sends data to a configured endpoint (or logs to console as placeholder)
- Add "Contact Us" link to the site header navigation

## Capabilities

### New Capabilities
- `contact-form`: Multi-step contact/enquiry form with progress indicator, validation, and submission handling

### Modified Capabilities
- `site-navigation`: Add "Contact Us" nav link pointing to `/contact`

## Impact

- New feature route: `src/app/features/contact/`
- Header component updated to include contact nav link
- No new dependencies — uses Angular reactive forms (already available)
- No backend required for MVP; form submission logs to console with a clear hook for future API integration
