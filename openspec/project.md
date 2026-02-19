# CodeCraft Solutions — Project Overview

## What We're Building

A public-facing company website for **CodeCraft Solutions**. The site serves as the primary
online presence: introducing the company, showcasing services, and providing a way for
prospective clients to get in touch.

CodeCraft Solutions offers **custom software development and technical consulting** — helping
businesses of all sizes (startups, SMBs, enterprises) design, build, and scale software products.

---

## Target Audience

- Startups and SMBs looking for a software development partner
- Enterprises seeking specialised development teams or technical consulting
- Decision-makers and founders evaluating CodeCraft as a vendor or partner
- Broad audience — no single vertical or company size is excluded

---

## Pages & Features

| Route | Feature module | Purpose |
|---|---|---|
| `/` | `home` | Hero, value proposition, highlights |
| `/about` | `about` | Company story, team, values |
| `/services` | `services` | Service offerings and details |
| `/contact` | `contact` | Contact form / inquiry |

---

## Business Goals

- Establish a bold, credible online presence that stands out from generic agency sites
- Generate inbound leads via the contact form
- Clearly communicate both development and consulting offerings
- Achieve ≥ 90 Lighthouse score across all pages

---

## Content & Tone

- **Tone:** Bold and innovative — forward-looking, opinionated, startup-energy. Copy should
  feel confident and direct, not corporate. Avoid filler phrases.
- **Brand colours:** TBD — to be defined during design phase
- **Logo / assets location:** `src/assets/`

---

## What "Done" Looks Like for v1

- All four pages implemented and routed
- Contact form submits successfully (integration TBD)
- Passes WCAG AA accessibility audit
- Lighthouse performance score ≥ 90 on all pages
- Fully responsive (mobile, tablet, desktop)
- Deployed (hosting platform TBD)

---

## Out of Scope (v1)

- User authentication / accounts
- CMS or content editing interface
- Blog or news section
- E-commerce / payments

---

## Key Integrations

- Contact form backend: TBD
- Analytics: TBD
- Hosting: TBD

---

## Domain & Stakeholders

- Stakeholders / team: TBD

---

## Current State

> Last updated: 2026-02-19

### Foundation (complete)
- Angular 21 scaffolded, strict TypeScript, SCSS, routing enabled
- Angular Material 21 installed — scoped to form fields, buttons, dialogs only
- Sheriff module boundaries enforced (`features → shared → core`)
- ESLint flat config wired up (Angular ESLint integration pending)
- Test runner: Vitest (Angular 21 default — not Jest as originally noted in CLAUDE.md)

### Theming system (complete)
- `ThemeService` (`core/`) — signal-based, `localStorage` persistence, `prefers-color-scheme` fallback
- Light/dark toggle via `.light-theme` / `.dark-theme` class on `<html>`
- SCSS token layer: `_tokens.scss`, `_light.scss`, `_dark.scss` — `--cc-*` prefix, M3-compatible
- FOUC prevention inline script in `index.html`
- `ThemeToggleComponent` (`shared/`) — OnPush, inline SVG icons, WCAG AA aria-labels
- 17/17 unit tests passing

### Not yet started
- Feature pages: home, about, services, contact
- App shell / navigation
- Contact form integration
- Brand colour palette (tokens use placeholder M3 palettes)
