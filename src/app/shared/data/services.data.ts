export interface Service {
  num: string;
  title: string;
  desc: string;
  tags: string[];
}

export const SERVICES: Service[] = [
  { num: '01', title: 'Web Applications',    desc: 'Full-stack web platforms built for scale, reliability, and great UX — from SPAs to complex dashboards.', tags: ['Angular', 'React', 'Node', 'TypeScript'] },
  { num: '02', title: 'Mobile Development',  desc: 'Cross-platform mobile apps that feel native. React Native and Flutter — one codebase, every device.', tags: ['React Native', 'Flutter', 'iOS', 'Android'] },
  { num: '03', title: 'Cloud & DevOps',       desc: 'CI/CD pipelines, container orchestration, and infrastructure-as-code. Your system, always running.', tags: ['AWS', 'Docker', 'K8s', 'Terraform'] },
  { num: '04', title: 'API & Backend',        desc: 'Robust REST and GraphQL APIs, microservices architecture, and data pipelines designed for growth.', tags: ['NestJS', 'Go', 'Postgres', 'Redis'] },
  { num: '05', title: 'UI/UX Design',         desc: 'Design systems, prototypes, and pixel-perfect interfaces that are as functional as they are beautiful.', tags: ['Figma', 'Design Systems', 'A11y'] },
  { num: '06', title: 'Tech Consulting',      desc: 'Architecture reviews, technology selection, and strategic guidance for teams scaling their engineering.', tags: ['Architecture', 'ADRs', 'Audits'] },
];
