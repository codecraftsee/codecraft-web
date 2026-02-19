import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';
import { ServicesSectionComponent } from './components/services-section/services-section.component';
import { WhySectionComponent } from './components/why-section/why-section.component';
import { CtaSectionComponent } from './components/cta-section/cta-section.component';

@Component({
  selector: 'cc-home',
  imports: [
    HeroSectionComponent,
    ServicesSectionComponent,
    WhySectionComponent,
    CtaSectionComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <cc-hero-section />
    <cc-services-section />
    <cc-why-section />
    <cc-cta-section />
  `,
})
export class HomeComponent {}
