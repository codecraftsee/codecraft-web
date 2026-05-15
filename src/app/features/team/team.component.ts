import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

interface SkillCategory { name: string; skills: string[]; }
interface SocialLink { icon: string; label: string; url: string; }
interface TeamMember {
  name: string; title: string; quote: string; bio: string;
  tags: string[]; skillCategories: SkillCategory[];
  emoji: string; image?: string; lightImage?: string; sableImage?: string;
  isAvatar?: boolean; cvUrl?: string; social: SocialLink[];
}

@Component({
  selector: 'cc-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {},
  template: `
    <div class="cc-page">
      <section class="cc-plate" aria-label="Personnel roster">
        <span class="cc-plate__corners" aria-hidden="true"></span>
        <div class="cc-dims cc-dims--top">
          <span class="cc-mono">VIEW · 03 / PERSONNEL</span>
          <span class="cc-dims__line"></span>
          <span class="cc-mono">{{ members.length }} OPERATORS</span>
        </div>

        <div class="cc-section__head">
          <span class="cc-mono cc-section__num">§01</span>
          <h1 class="cc-h2">PERSONNEL ROSTER</h1>
          <span class="cc-section__rule"></span>
          <span class="cc-mono cc-section__count">CLEARED</span>
        </div>

        <div class="cc-roster" role="list">
          @for (m of members; track m.name; let i = $index) {
            <article class="cc-id" role="listitem">
              <header class="cc-id__head">
                <span class="cc-mono cc-id__num">ID·{{ pad(i + 1) }}</span>
                <span class="cc-mono cc-id__cls">L{{ i + 3 }} CLEARANCE</span>
              </header>
              <div class="cc-id__body">
                <div class="cc-id__photo">
                  @if (m.image) {
                    <img [src]="resolveAvatar(m)" [alt]="m.name" />
                  } @else {
                    <span class="cc-id__emoji" aria-hidden="true">{{ m.emoji }}</span>
                  }
                  <span class="cc-id__crosshair" aria-hidden="true">
                    <svg viewBox="0 0 80 80">
                      <rect x="2" y="2" width="76" height="76" fill="none" stroke="currentColor" stroke-width="0.6" stroke-dasharray="3 3"/>
                      <line x1="40" y1="0"  x2="40" y2="14" stroke="currentColor" stroke-width="0.8"/>
                      <line x1="40" y1="66" x2="40" y2="80" stroke="currentColor" stroke-width="0.8"/>
                      <line x1="0"  y1="40" x2="14" y2="40" stroke="currentColor" stroke-width="0.8"/>
                      <line x1="66" y1="40" x2="80" y2="40" stroke="currentColor" stroke-width="0.8"/>
                    </svg>
                  </span>
                </div>
                <div class="cc-id__meta">
                  <h2 class="cc-id__name">{{ m.name }}</h2>
                  <p class="cc-mono cc-id__role">{{ m.title }}</p>
                  <p class="cc-id__quote">"{{ m.quote }}"</p>
                  <div class="cc-id__tags">
                    @for (t of m.tags; track t) {
                      <span class="cc-chip">{{ t }}</span>
                    }
                  </div>
                  <div class="cc-id__actions">
                    @if (m.cvUrl) {
                      <a class="cc-btn cc-btn--ghost" [href]="m.cvUrl" download [attr.aria-label]="'Download CV for ' + m.name">
                        <span class="cc-btn__label">CV_DOWNLOAD</span>
                      </a>
                    }
                    @for (link of m.social; track link.label) {
                      <a class="cc-btn cc-btn--ghost cc-btn--sm" [href]="link.url" [attr.aria-label]="link.label" target="_blank" rel="noopener noreferrer">
                        <span class="cc-btn__label">{{ link.icon.toUpperCase() }}</span>
                      </a>
                    }
                  </div>
                </div>
              </div>
              <footer class="cc-id__foot cc-mono">
                <span>SIG · {{ initials(m.name) }}</span>
                <span>FILE · {{ filename(m.name) }}</span>
              </footer>
            </article>
          }
        </div>
      </section>
    </div>
  `,
  styles: `
    :host { display: block; }

    .cc-mono { font-family: var(--cc-font-mono); font-feature-settings: 'ss01','cv01'; }

    .cc-page { padding: 32px; max-width: 1280px; margin: 0 auto; }

    /* PLATE */
    .cc-plate {
      position: relative;
      background-color: var(--cc-bg);
      border: 1px solid var(--cc-rule-strong);
      padding: 32px 36px 40px;
    }
    .cc-plate__corners { pointer-events: none; }
    .cc-plate::before, .cc-plate::after,
    .cc-plate__corners::before, .cc-plate__corners::after {
      content: ''; position: absolute;
      width: 16px; height: 16px;
      border: 1.5px solid var(--cc-accent);
      pointer-events: none; z-index: 1;
    }
    .cc-plate::before  { top: -1px;    left: -1px;  border-right: 0; border-bottom: 0; }
    .cc-plate::after   { top: -1px;    right: -1px; border-left: 0;  border-bottom: 0; }
    .cc-plate__corners::before { bottom: -1px; left: -1px;  border-right: 0; border-top: 0; position: absolute; }
    .cc-plate__corners::after  { bottom: -1px; right: -1px; border-left: 0;  border-top: 0; position: absolute; }

    .cc-dims {
      display: flex; align-items: center; gap: 14px;
      font-size: 10px; color: var(--cc-ink-mute); letter-spacing: 0.18em;
    }
    .cc-dims--top { margin-bottom: 28px; }
    .cc-dims__line { flex: 1; height: 1px; background: var(--cc-rule-strong); }

    .cc-section__head { display: flex; align-items: baseline; gap: 16px; margin-bottom: 20px; }
    .cc-section__num  { font-size: 11px; letter-spacing: 0.2em; color: var(--cc-accent); }
    .cc-h2 { font-family: var(--cc-font-mono); font-size: 13px; font-weight: 600; letter-spacing: 0.22em; margin: 0; color: var(--cc-ink); }
    .cc-section__rule  { flex: 1; height: 1px; background: var(--cc-rule-strong); }
    .cc-section__count { font-size: 10px; letter-spacing: 0.18em; color: var(--cc-ink-mute); }

    /* ROSTER */
    .cc-roster {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      margin-top: 4px;
    }
    .cc-id { border: 1px solid var(--cc-rule-strong); background: var(--cc-panel); }
    .cc-id__head {
      display: flex; justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px dashed var(--cc-rule-strong);
      font-size: 10px; letter-spacing: 0.16em;
    }
    .cc-id__num { color: var(--cc-accent); }
    .cc-id__cls { color: var(--cc-ink-mute); }
    .cc-id__body { display: grid; grid-template-columns: 132px 1fr; gap: 18px; padding: 18px; }
    .cc-id__photo {
      position: relative; width: 132px; height: 156px;
      border: 1px solid var(--cc-rule-strong); overflow: hidden;
      flex-shrink: 0;
    }
    .cc-id__photo img {
      width: 100%; height: 100%; object-fit: cover;
      filter: grayscale(0.7) contrast(1.05);
      transition: filter 0.4s;
    }
    .cc-id:hover .cc-id__photo img { filter: grayscale(0) contrast(1); }
    .cc-id__emoji {
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      font-size: 48px;
      background: var(--cc-bg2);
    }
    .cc-id__crosshair {
      position: absolute; inset: 0;
      color: var(--cc-accent); opacity: 0.6; pointer-events: none;
    }
    .cc-id__crosshair svg { width: 100%; height: 100%; }
    .cc-id__name {
      font-family: var(--cc-font-display); font-size: 22px; font-weight: 700;
      letter-spacing: -0.015em; margin: 0 0 4px; color: var(--cc-ink);
    }
    .cc-id__role {
      font-size: 10px; letter-spacing: 0.18em; color: var(--cc-accent);
      margin: 0 0 14px; text-transform: uppercase;
    }
    .cc-id__quote {
      font-family: var(--cc-font-display); font-size: 14px;
      font-style: italic; color: var(--cc-ink-soft);
      margin: 0 0 14px; line-height: 1.5;
    }
    .cc-id__tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 14px; }
    .cc-id__actions { display: flex; gap: 8px; flex-wrap: wrap; }
    .cc-id__foot {
      display: flex; justify-content: space-between;
      padding: 9px 16px;
      border-top: 1px dashed var(--cc-rule-strong);
      font-size: 9px; letter-spacing: 0.18em; color: var(--cc-ink-mute);
    }

    .cc-chip {
      font-size: 10px; font-family: var(--cc-font-mono); letter-spacing: 0.1em;
      color: var(--cc-ink-soft); border: 1px solid var(--cc-rule-strong);
      padding: 3px 8px; background: transparent; text-transform: uppercase;
    }

    /* BUTTONS */
    .cc-btn {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 12px; font-family: var(--cc-font-mono);
      font-size: 10px; font-weight: 600; letter-spacing: 0.16em;
      border: 1px solid; cursor: pointer;
      transition: all 0.18s ease; background: transparent;
      text-decoration: none; text-transform: uppercase;
    }
    .cc-btn--ghost { color: var(--cc-ink); border-color: var(--cc-rule-strong); }
    .cc-btn--ghost:hover { border-color: var(--cc-accent); color: var(--cc-accent); background: var(--cc-accent-soft); }
    .cc-btn--sm { padding: 6px 10px; font-size: 9px; }

    @media (max-width: 980px) {
      .cc-page { padding: 18px; }
      .cc-plate { padding: 22px; }
      .cc-roster { grid-template-columns: 1fr; }
      .cc-id__body { grid-template-columns: 110px 1fr; gap: 14px; }
      .cc-id__photo { width: 110px; height: 130px; }
    }
  `,
})
export class TeamComponent {
  private readonly themeService = inject(ThemeService);

  readonly members: TeamMember[] = [
    {
      name: 'Miodrag Pavkovic',
      title: 'CEO & Full-Stack Software Engineer',
      quote: 'Ship fast. Think long-term.',
      bio: 'Strategic business leader and frontend specialist driving digital transformation with hands-on engineering expertise.',
      tags: ['Leadership', 'Frontend', 'Full-Stack'],
      skillCategories: [
        { name: 'Frontend', skills: ['Angular', 'React', 'TypeScript', 'JavaScript'] },
        { name: 'Backend', skills: ['Java', 'Python', 'Go', 'Node.js'] },
        { name: 'DevOps', skills: ['Docker', 'Kubernetes', 'AWS', 'Firebase'] },
      ],
      emoji: '👨‍💼', image: 'images/mio.jpg',
      cvUrl: 'cv/Miodrag_Pavkovic_CV.pdf',
      social: [{ icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/miodrag-pavkovi%C4%87-4351129/' }],
    },
    {
      name: 'Dejan Blanarik',
      title: 'Chief Technology Officer',
      quote: 'Clean code is the best documentation.',
      bio: 'Technology visionary architecting scalable systems and driving innovation.',
      tags: ['Technology', 'Architecture', 'Frontend'],
      skillCategories: [
        { name: 'Front-End', skills: ['React', 'Next.js', 'Angular', 'TypeScript'] },
        { name: 'Back-End', skills: ['Node.js', 'NestJS', 'GraphQL'] },
        { name: 'Tools', skills: ['Docker', 'Vite', 'Turborepo', 'Cypress'] },
      ],
      emoji: '👨‍💻', image: 'images/dejan.jpg',
      cvUrl: 'cv/Dejan-Blanarik-CV.pdf',
      social: [{ icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/dejan-blanarik/' }],
    },
    {
      name: 'Marija Seder',
      title: 'UX/UI Designer',
      quote: 'Design is how it works, not just how it looks.',
      bio: 'Creative problem solver focused on user-centered design and modern aesthetics.',
      tags: ['UX Research', 'UI Design', 'Figma'],
      skillCategories: [
        { name: 'UX Research', skills: ['User Interviews', 'Usability Testing', 'Personas'] },
        { name: 'UI Design', skills: ['Design Systems', 'Typography', 'A11y'] },
        { name: 'Figma', skills: ['Auto-layout', 'Variants', 'Prototyping'] },
      ],
      emoji: '👩‍💼', image: 'images/marijas.png',
      social: [{ icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/marija-seder/' }],
    },
    {
      name: 'Predrag Karić',
      title: 'Senior Mobile Developer',
      quote: 'Great apps live in your pocket, not just your browser.',
      bio: 'Experienced mobile engineer building scalable iOS and cross-platform applications.',
      tags: ['iOS', 'Swift', 'Kotlin', 'KMP'],
      skillCategories: [
        { name: 'iOS', skills: ['Swift', 'SwiftUI', 'UIKit', 'Core Data'] },
        { name: 'Cross-Platform', skills: ['Kotlin Multiplatform', 'RxSwift', 'Combine'] },
        { name: 'Tools', skills: ['Git', 'Jenkins', 'Bitrise', 'TestFlight'] },
      ],
      emoji: '📱', image: 'images/avatar-mobile-dev.svg',
      lightImage: 'images/avatar-mobile-dev-light.svg',
      sableImage: 'images/avatar-mobile-dev-sable.svg',
      isAvatar: true,
      cvUrl: 'cv/Predrag_Karic_CV.pdf',
      social: [{ icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/predrag-karic-door8c/' }],
    },
    {
      name: 'Darko Karpić',
      title: 'Backend Engineer',
      quote: 'Good architecture is invisible — until it saves you.',
      bio: 'Fast learner with strong ability to adapt to complex distributed systems.',
      tags: ['Backend', 'Java', 'Spring', 'Microservices'],
      skillCategories: [
        { name: 'Languages', skills: ['Java', 'Kotlin'] },
        { name: 'Frameworks', skills: ['Spring Boot', 'Spring', 'Hibernate'] },
        { name: 'DevOps', skills: ['Docker', 'AWS', 'Jenkins', 'Kubernetes'] },
      ],
      emoji: '🖥️', image: 'images/avatar-backend-dev.svg',
      lightImage: 'images/avatar-backend-dev-light.svg',
      sableImage: 'images/avatar-backend-dev-sable.svg',
      isAvatar: true,
      cvUrl: 'cv/Darko_Karpic_CV.pdf',
      social: [{ icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/darko-karpic-731812175/' }],
    },
    {
      name: 'Miroslav Pavkovic',
      title: 'CEO & Software Engineer',
      quote: 'Reliability is a feature.',
      bio: 'Backend software engineer and team lead driving technical excellence and business growth.',
      tags: ['Backend', 'Team Lead', 'Leadership'],
      skillCategories: [
        { name: 'Languages', skills: ['Java', 'Python', 'PHP', 'Groovy'] },
        { name: 'Back-End', skills: ['Spring Boot', 'Spring Cloud', 'RabbitMQ'] },
        { name: 'DevOps', skills: ['Docker', 'Kubernetes', 'AWS', 'Jenkins'] },
      ],
      emoji: '👨‍💻', image: 'images/miroslav.jpg',
      cvUrl: 'cv/Miroslav_Pavkovic_CV.pdf',
      social: [{ icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/miroslav-pavkovic-a0248283/' }],
    },
  ];

  resolveAvatar(m: TeamMember): string | undefined {
    const t = this.themeService.activeTheme();
    if (t === 'light' && m.lightImage) return m.lightImage;
    if (t === 'sable' && m.sableImage) return m.sableImage;
    return m.image;
  }

  pad(n: number): string {
    return String(n).padStart(3, '0');
  }

  initials(name: string): string {
    return name.split(' ').map(p => p[0]).join('');
  }

  filename(name: string): string {
    return name.toLowerCase().replace(/\s+/g, '_') + '.id';
  }
}
