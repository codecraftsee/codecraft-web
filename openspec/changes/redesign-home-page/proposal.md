## Why

The current home page uses a minimal scaffold with placeholder styling. To compete credibly as a software consultancy, CodeCraft needs a polished, modern look-and-feel inspired by high-quality agency sites like chaseai.io — clean, light-mode-first, generous whitespace, bold typography with serif accents, and clear visual hierarchy that builds trust with prospective clients.

## What Changes

- **New brand typography**: Introduce Inter (sans-serif) + Instrument Serif (serif accent) font pairing for a modern-meets-sophisticated feel
- **New brand colour palette**: Define a concrete accent colour and neutral palette in the existing theme token system (replacing placeholder M3 values)
- **Hero section redesign**: Large headline with underlined keyword emphasis, descriptive subtitle, dual CTA buttons (primary + secondary/outlined), centered layout with generous padding
- **Services section redesign**: Feature cards in a responsive grid layout with icons, titles, descriptions, and example outcomes — styled as minimal bordered cards with whitespace emphasis
- **Why/approach section redesign**: Numbered process/roadmap steps (01, 02, 03, 04) with hierarchical typography showing how CodeCraft works
- **CTA section redesign**: Consultation-oriented closing section with bold headline and primary CTA button
- **Global component styling**: Rounded buttons (`border-radius: 0.75rem`), consistent spacing scale, subtle section background variations
- **Responsive design**: All sections fully responsive across mobile, tablet, and desktop breakpoints

## Capabilities

### New Capabilities
- `home-visual-design`: Visual design system for the home page — typography pairing, colour palette, button styles, card patterns, spacing scale, and section layout patterns
- `home-sections`: Section-level component designs for hero, services, process/approach, and CTA — including content structure, responsive behaviour, and interaction states

### Modified Capabilities
- `theme-tokens`: Extend the minimum token set with new tokens needed for the redesign (accent colour, secondary surface colours, additional semantic tokens for cards/sections)

## Impact

- **Styles**: `_light.scss`, `_dark.scss`, `_tokens.scss` — new token values and additional tokens
- **Components**: All home feature components (`hero-section`, `services-section`, `why-section`, `cta-section`) — template and style rewrites
- **Assets**: New font files or Google Fonts imports (Inter, Instrument Serif)
- **Dependencies**: No new npm packages required (fonts loaded via CSS)
- **Tests**: Existing component tests need updates to match new template structure
