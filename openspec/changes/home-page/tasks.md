## 1. App Shell

- [ ] 1.1 Replace `src/app/app.html` with `<cc-header>` + `<router-outlet>`
- [ ] 1.2 Add `/` lazy route in `src/app/app.routes.ts` pointing to `HomeComponent`
- [ ] 1.3 Import `RouterOutlet` and `HeaderComponent` in `AppComponent`

## 2. HeaderComponent

- [ ] 2.1 Create `src/app/shared/header/header.component.ts` — standalone, OnPush
- [ ] 2.2 Add wordmark ("CodeCraft"), `RouterLink` nav links (Home, About, Services, Contact), and `ThemeToggleComponent`
- [ ] 2.3 Apply `routerLinkActive="active"` to each nav link
- [ ] 2.4 Style header: sticky, flex layout, `--cc-surface` background, `--cc-outline` border-bottom
- [ ] 2.5 Add responsive styles: hide nav links below 768px, keep wordmark and toggle visible
- [ ] 2.6 Write unit test: renders wordmark, renders nav links, renders theme toggle

## 3. Home Feature Module

- [ ] 3.1 Create `src/app/features/home/` directory structure
- [ ] 3.2 Create `src/app/features/home/home.component.ts` — standalone, OnPush, composes all four section components

## 4. HeroSectionComponent

- [ ] 4.1 Create `src/app/features/home/components/hero-section/hero-section.component.ts` — standalone, OnPush
- [ ] 4.2 Template: `<section>` with `<h1>` headline, subheadline `<p>`, and CTA `<a mat-flat-button [routerLink]="['/contact']">`
- [ ] 4.3 Style: `min-height: 100dvh`, centred flex layout, `--cc-surface` background, headline uses `--mat-sys-display-large`
- [ ] 4.4 Write unit test: headline rendered, CTA links to `/contact`

## 5. ServicesSectionComponent

- [ ] 5.1 Create `src/app/features/home/components/services-section/services-section.component.ts` — standalone, OnPush
- [ ] 5.2 Template: two cards each with icon placeholder, title, description, and `[routerLink]="['/services']"`
- [ ] 5.3 Style: two-column CSS grid on ≥768px, single column below; cards use `--cc-surface-variant` background, `--cc-outline` border
- [ ] 5.4 Write unit test: two cards rendered, each links to `/services`

## 6. WhySectionComponent

- [ ] 6.1 Create `src/app/features/home/components/why-section/why-section.component.ts` — standalone, OnPush
- [ ] 6.2 Template: three items each with icon placeholder, bold title, one-sentence description
- [ ] 6.3 Style: three-column grid on ≥1200px, two-column on 768–1199px, single column below
- [ ] 6.4 Write unit test: three items rendered

## 7. CtaSectionComponent

- [ ] 7.1 Create `src/app/features/home/components/cta-section/cta-section.component.ts` — standalone, OnPush
- [ ] 7.2 Template: `<section>` with headline and `<a mat-flat-button [routerLink]="['/contact']">Get in touch</a>`
- [ ] 7.3 Style: full-width, `--cc-primary` background, `--cc-on-primary` text, centred content
- [ ] 7.4 Write unit test: headline rendered, button links to `/contact`

## 8. Verification

- [ ] 8.1 Run `ng build` — confirm no compile errors
- [ ] 8.2 Run `ng test --no-watch` — confirm all new tests pass
- [ ] 8.3 Run `ng serve` and verify all four sections render correctly in browser
- [ ] 8.4 Verify light/dark toggle works on the home page
- [ ] 8.5 Verify responsive layout at 375px, 768px, and 1280px viewports
- [ ] 8.6 Verify nav links route correctly to `/about`, `/services`, `/contact` (404s expected — pages not built yet)
