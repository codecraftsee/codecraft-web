# CodeCraft Solutions — Claude Code Instructions

## 📚 Angular Reference Docs (always use latest)
- https://angular.dev/assets/context/best-practices.md
- https://angular.dev/llms.txt
- https://angular.dev/llms-full.txt

> Always read the best-practices.md link above before writing any Angular code.

---

## 🏗️ Project Overview

- **Company:** CodeCraft Solutions
- **App:** codecraft-web — company website / web app
- **Stack:** Angular 20+, TypeScript (strict), RxJS, Angular Material
- **Architecture:** Standalone components, signals, feature-based structure
- **Testing:** Vitest + Angular TestBed
- **Module Boundaries:** Sheriff
- **API Client:** Auto-generated via ng-openapi-gen

---

## 📁 Folder Structure

```
src/app/
  features/          ← feature-specific modules (lazy loaded)
    home/
    about/
    services/
    contact/
  shared/            ← reusable UI components, pipes, directives
  core/              ← singleton services, interceptors, guards, API client
    api/             ← auto-generated, DO NOT edit manually
```

---

## ✅ TypeScript Best Practices

- Use strict type checking (already enabled in tsconfig)
- Prefer type inference when the type is obvious
- Never use `any` — use `unknown` when type is uncertain
- Always define return types for public methods
- Use interfaces for data shapes, types for unions/aliases

---

## ✅ Angular Best Practices

- **Standalone components ONLY** — never use NgModules
- Do NOT set `standalone: true` in decorators — it is the default in Angular v20+
- Use **signals** for all state management
- Use `computed()` for derived state
- Use `input()` and `output()` functions instead of `@Input` / `@Output` decorators
- Use `inject()` function instead of constructor injection
- Set `changeDetection: ChangeDetectionStrategy.OnPush` on every component
- Use `NgOptimizedImage` for all static images
- Implement **lazy loading** for all feature routes
- Do NOT use `@HostBinding` or `@HostListener` — use `host` object in decorator instead
- Do NOT use `ngClass` — use `class` bindings instead
- Do NOT use `ngStyle` — use `style` bindings instead

---

## ✅ Templates

- Use native control flow: `@if`, `@for`, `@switch`
- Never use `*ngIf`, `*ngFor`, `*ngSwitch`
- Use async pipe to handle observables
- Keep templates simple — no complex logic
- Do not use arrow functions in templates
- Do not assume globals like `new Date()` are available in templates

---

## ✅ Services

- Design services around a single responsibility
- Always use `providedIn: 'root'` for singleton services
- Use `inject()` function — never constructor injection

---

## ✅ State Management

- Use signals for local component state
- Use `computed()` for derived state
- Keep state transformations pure and predictable
- Never use `mutate()` on signals — use `update()` or `set()` instead

---

## ✅ Accessibility (mandatory)

- All components MUST pass AXE checks
- Must follow WCAG AA: focus management, color contrast, ARIA attributes
- Always add `alt` text to images
- Use semantic HTML elements

---

## 🏛️ Module Boundaries (enforced by Sheriff)

```
features/*  →  can import from: shared, core
shared      →  can import from: core only
core        →  cannot import from: features or shared
```

Never violate these boundaries. Sheriff will catch it in CI.

---

## 🔌 API Layer

- API services are auto-generated from OpenAPI spec via `ng-openapi-gen`
- **NEVER manually edit files in `src/app/core/api/`**
- Run `npm run api:gen` to regenerate after backend spec changes

---

## 🧪 Testing

- Every component and service MUST have a unit test
- Test file lives next to source: `component.spec.ts`
- Use Vitest + Angular TestBed
- Test behavior, not implementation details

---

## 🔧 Key Commands

```bash
ng serve            # run dev server
ng build            # production build
ng test             # run unit tests
npm run api:gen     # regenerate API client from OpenAPI spec
openspec init       # refresh AI guidance
```

---

## 🔄 OpenSpec Workflow

Always use OpenSpec for new features — agree on specs before writing code.

```
/opsx:new <feature-name>    # start a new feature
/opsx:ff                    # generate proposal, specs, design, tasks
/opsx:apply                 # implement the tasks
/opsx:archive               # archive and update permanent specs
```

- Always read `openspec/project.md` before starting work
- Start a **fresh Claude Code session** before `/opsx:apply` for clean context
- Commit the `openspec/` folder to git — specs are living documentation

---

## ⚠️ Rules — Never Break These

- Never use `any` type
- Never manually edit `src/app/core/api/`
- Never use NgModules
- Never use `*ngIf`, `*ngFor`, `*ngSwitch`
- Never use constructor injection
- Never import across Sheriff module boundaries
- Never skip unit tests
