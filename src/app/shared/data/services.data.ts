export interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  { num: '01', title: 'Web Applications',        desc: 'Dynamic, high-performing web apps tailored to complex problems and engaged users.',                                  tags: ['SPA', 'Real-time', 'Cloud-native'] },
  { num: '02', title: 'AngularJS Migration',     desc: 'Modernise legacy AngularJS to Angular — preserve business logic, unlock performance and long-term support.',          tags: ['Legacy', 'TypeScript', 'Incremental'] },
  { num: '03', title: 'Performance Engineering', desc: 'Discover, audit and fix bottlenecks across your stack — load times, UI lag, slow APIs, hot queries.',                 tags: ['Profiling', 'Core Web Vitals', 'DB Tuning'] },
  { num: '04', title: 'On-Demand Engineering',   desc: 'Embedded support that squashes critical bugs, unblocks sprints and helps you hit deadlines.',                         tags: ['Urgent', 'Sprint Help', 'Augmentation'] },
  { num: '05', title: 'Mobile Development',      desc: 'Native iOS and Android apps — built for performance, reliability and a seamless experience.',                         tags: ['Swift', 'Kotlin', 'Native'] },
  { num: '06', title: 'Websites',                desc: 'Responsive, visually engaging sites that communicate your brand and convert visitors into customers.',                tags: ['Responsive', 'SEO', 'CMS'] },
];
