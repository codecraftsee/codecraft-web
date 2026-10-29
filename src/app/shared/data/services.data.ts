export interface Deliverable {
  name: string;
  kind: string;
}

export interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  /** How clients typically engage us for this service. */
  engagement: string;
  deliverables: Deliverable[];
}

export const SERVICES: Service[] = [
  {
    num: '01', title: 'Web Applications',
    desc: 'Dynamic, high-performing web apps tailored to complex problems and engaged users.',
    tags: ['SPA', 'Real-time', 'Cloud-native'],
    engagement: 'Fixed scope or dedicated team',
    deliverables: [
      { name: 'Architecture Spec', kind: 'Docs' },
      { name: 'Source Code', kind: 'Repo' },
      { name: 'CI/CD Pipeline', kind: 'Config' },
      { name: 'Handover Docs', kind: 'MD' },
    ],
  },
  {
    num: '02', title: 'AngularJS Migration',
    desc: 'Modernise legacy AngularJS to Angular — preserve business logic, unlock performance and long-term support.',
    tags: ['Legacy', 'TypeScript', 'Incremental'],
    engagement: 'Audit, then phased delivery',
    deliverables: [
      { name: 'Migration Audit', kind: 'PDF' },
      { name: 'Migration Plan', kind: 'Docs' },
      { name: 'Migrated Codebase', kind: 'Repo' },
      { name: 'Test Suite', kind: 'Repo' },
    ],
  },
  {
    num: '03', title: 'Performance Engineering',
    desc: 'Discover, audit and fix bottlenecks across your stack — load times, UI lag, slow APIs, hot queries.',
    tags: ['Profiling', 'Core Web Vitals', 'DB Tuning'],
    engagement: 'Fixed-scope audit + fixes',
    deliverables: [
      { name: 'Performance Audit', kind: 'PDF' },
      { name: 'Prioritised Fixes', kind: 'List' },
      { name: 'Implemented Fixes', kind: 'Repo' },
      { name: 'Before / After Metrics', kind: 'Report' },
    ],
  },
  {
    num: '04', title: 'On-Demand Engineering',
    desc: 'Embedded support that squashes critical bugs, unblocks sprints and helps you hit deadlines.',
    tags: ['Urgent', 'Sprint Help', 'Augmentation'],
    engagement: 'Flexible, from 1 week',
    deliverables: [
      { name: 'Embedded Engineers', kind: 'Team' },
      { name: 'Sprint Delivery', kind: 'Repo' },
      { name: 'Code Reviews', kind: 'PRs' },
    ],
  },
  {
    num: '05', title: 'Mobile Development',
    desc: 'Native iOS and Android or cross-platform Flutter apps — built for performance, reliability and a seamless experience.',
    tags: ['Swift', 'Kotlin', 'Flutter', 'Native'],
    engagement: 'Fixed scope or dedicated team',
    deliverables: [
      { name: 'iOS & Android Apps', kind: 'Native / Flutter' },
      { name: 'Store Release', kind: 'App Store / Play' },
      { name: 'Source Code', kind: 'Repo' },
    ],
  },
  {
    num: '06', title: 'Websites',
    desc: 'Responsive, visually engaging sites that communicate your brand and convert visitors into customers.',
    tags: ['Responsive', 'SEO', 'CMS'],
    engagement: 'Fixed scope',
    deliverables: [
      { name: 'Responsive Site', kind: 'Web' },
      { name: 'SEO Setup', kind: 'Config' },
      { name: 'CMS', kind: 'Admin' },
      { name: 'Launch & Hosting', kind: 'Deploy' },
    ],
  },
];
