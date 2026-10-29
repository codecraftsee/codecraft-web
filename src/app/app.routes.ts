import { Routes } from '@angular/router';
import { PageSeo } from './core/seo.service';

const seo = (page: PageSeo): { seo: PageSeo } => ({ seo: page });

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(m => m.HomeComponent),
    data: seo({
      title: 'CodeCraft Solutions — Software Engineering Studio in Novi Sad',
      description:
        'We engineer software systems that ship and stay shipped. Web and mobile software ' +
        'for teams who treat their codebase as critical infrastructure. Novi Sad, Serbia · EU & NA clients.',
    }),
  },
  {
    path: 'team',
    loadComponent: () =>
      import('./features/team/team.component').then(m => m.TeamComponent),
    data: seo({
      title: 'Team — CodeCraft Solutions',
      description:
        'Meet the CodeCraft Solutions engineers: full-stack, frontend, backend, mobile and UX ' +
        'specialists building Angular, React, Java, Spring, Swift and Kotlin software.',
    }),
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/services.component').then(m => m.ServicesComponent),
    data: seo({
      title: 'Services — Web Apps, AngularJS Migration & Performance | CodeCraft Solutions',
      description:
        'Web applications, AngularJS to Angular migration, performance engineering, on-demand ' +
        'engineering, native iOS/Android and Flutter mobile apps, and websites.',
    }),
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/contact.component').then(m => m.ContactComponent),
    data: seo({
      title: 'Start a Project — CodeCraft Solutions',
      description:
        'Tell us about your project and get a response within 24 hours. ' +
        'Email hello@codecraftsolutions.rs or use the project intake form.',
    }),
  },
];
