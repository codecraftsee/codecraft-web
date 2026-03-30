import { ChangeDetectionStrategy, Component } from '@angular/core';

interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

interface TeamMember {
  name: string;
  title: string;
  quote: string;
  bio: string;
  tags: string[];
  emoji: string;
  image?: string;
  isAvatar?: boolean;
  cvUrl?: string;
  social: SocialLink[];
}

@Component({
  selector: 'cc-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container">
      <section class="hero">
        <h1 class="hero__title">Meet Our Team</h1>
        <p class="hero__subtitle">Talented leaders, engineers, and strategists working together to bring your vision to life.</p>
      </section>

      <div class="team-grid" role="list">
        @for (member of members; track member.name; let i = $index) {
          <article class="team-member" role="listitem" [style.--card-index]="i">
            <div class="member-image" [attr.aria-hidden]="true">
              @if (member.image) {
                <img [src]="member.image" [alt]="member.name" [class.avatar-placeholder]="member.isAvatar" />
              } @else {
                <span class="member-emoji">{{ member.emoji }}</span>
              }
            </div>
            <div class="member-info">
              <h2 class="member-name">{{ member.name }}</h2>
              <p class="member-quote">"{{ member.quote }}"</p>
              <p class="member-role">{{ member.title }}</p>
              <p class="member-bio">{{ member.bio }}</p>
              <div class="member-skills" aria-label="Skills">
                @for (tag of member.tags; track tag) {
                  <span class="skill-tag">{{ tag }}</span>
                }
              </div>
              <div class="member-social" aria-label="Social links">
                @for (link of member.social; track link.label) {
                  <a class="social-link" [href]="link.url" [attr.aria-label]="link.label" target="_blank" rel="noopener noreferrer">
                    {{ link.icon }}
                  </a>
                }
                @if (member.cvUrl) {
                  <a class="cv-link" [href]="member.cvUrl" download aria-label="Download CV">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                  </a>
                }
              </div>
            </div>
          </article>
        }
      </div>
    </div>

    <footer class="footer container">
      <p>&copy; 2026 CodeCraft Solutions. All rights reserved.</p>
    </footer>
  `,
  styles: `
    :host {
      display: block;
      background: transparent;
      color: #F1F5F9;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      min-height: 100dvh;
      overflow-x: hidden;
    }

    .container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }

    /* Hero */
    .hero { padding: 6rem 0 2rem; text-align: center; }
    .hero__title {
      display: inline-block;
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 1rem;
      padding: 0.05em 0;
      line-height: 1.2;
      background: linear-gradient(135deg, #10B981, #059669, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero__subtitle {
      font-size: 18px;
      color: #cbd5e1;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.7;
    }

    /* Team Grid */
    .team-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
    }

    /* Card */
    .team-member {
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05));
      border: 1px solid rgba(16, 185, 129, 0.1);
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.4s ease;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      opacity: 0;
      transform: translateY(20px);
      animation: card-in 0.5s ease-out forwards;
      animation-delay: calc(var(--card-index) * 0.1s);
    }
    .team-member:hover {
      border-color: rgba(16, 185, 129, 0.3);
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
      transform: translateY(-12px);
      box-shadow: 0 25px 50px rgba(16, 185, 129, 0.15);
    }

    /* Image Area */
    .member-image {
      width: 100%;
      height: 300px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1));
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .member-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .member-emoji {
      font-size: 80px;
      line-height: 1;
    }
    .member-image::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.1), transparent);
      transition: left 0.6s;
    }
    .team-member:hover .member-image::after {
      left: 100%;
    }

    /* Info Section */
    .member-info { padding: 2rem; display: flex; flex-direction: column; flex: 1; }
    .member-social { margin-top: auto; }

    .member-name {
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 0.5rem;
      color: #fff;
    }
    .member-quote {
      font-size: 13px;
      font-style: italic;
      color: rgba(165, 180, 252, 0.6);
      margin: 0 0 0.5rem;
      line-height: 1.4;
    }
    .member-role {
      font-size: 13px;
      color: #10B981;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 0 0 1rem;
    }
    .member-bio {
      font-size: 13px;
      color: #cbd5e1;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }

    /* Skill Tags */
    .member-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-bottom: 1.5rem;
    }
    .skill-tag {
      font-size: 11px;
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
      padding: 0.4rem 0.8rem;
      border-radius: 20px;
      border: 1px solid rgba(16, 185, 129, 0.2);
    }

    /* Social Links */
    .member-social {
      display: flex;
      gap: 1rem;
      padding-top: 1.5rem;
      border-top: 1px solid rgba(16, 185, 129, 0.1);
    }
    .social-link {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 8px;
      color: #10B981;
      text-decoration: none;
      transition: all 0.3s;
      font-size: 16px;
    }
    .social-link:hover {
      background: rgba(16, 185, 129, 0.2);
      border-color: rgba(16, 185, 129, 0.4);
      transform: translateY(-4px);
    }

    /* Footer */
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 3rem 0;
      margin-top: 4rem;
      text-align: center;
      color: #94a3b8;
      font-size: 13px;
    }

    /* Avatar placeholder theme filters */
    :host-context(.light-theme) .avatar-placeholder {
      filter: hue-rotate(10deg) saturate(1.2) brightness(0.85);
    }
    :host-context(.sable-theme) .avatar-placeholder {
      filter: hue-rotate(200deg) saturate(1.8) brightness(1.05);
    }

    /* Light Theme Overrides */
    :host-context(.light-theme) {
      color: #1a1a2e;
    }
    :host-context(.light-theme) .hero__title {
      background: linear-gradient(135deg, #0099cc, #0066cc, #cc00cc);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .hero__subtitle {
      color: #94a3b8;
    }
    :host-context(.light-theme) .team-member {
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
      border-color: rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .team-member:hover {
      border-color: rgba(0, 119, 204, 0.3);
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03));
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
    }
    :host-context(.light-theme) .member-image {
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.05));
    }
    :host-context(.light-theme) .member-image::after {
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
    }
    :host-context(.light-theme) .member-name {
      color: #1a1a2e;
    }
    :host-context(.light-theme) .member-quote {
      color: rgba(100, 116, 139, 0.7);
    }
    :host-context(.light-theme) .member-role {
      color: #0077cc;
    }
    :host-context(.light-theme) .member-bio {
      color: #94a3b8;
    }
    :host-context(.light-theme) .skill-tag {
      background: rgba(0, 119, 204, 0.08);
      color: #0077cc;
      border-color: rgba(0, 119, 204, 0.15);
    }
    :host-context(.light-theme) .member-social {
      border-top-color: rgba(0, 0, 0, 0.08);
    }
    .cv-link {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.2);
      border-radius: 8px;
      color: #10B981;
      text-decoration: none;
      transition: all 0.3s;
    }
    .cv-link:hover {
      background: rgba(16, 185, 129, 0.2);
      border-color: rgba(16, 185, 129, 0.4);
      transform: translateY(-4px);
    }

    :host-context(.light-theme) .cv-link {
      background: rgba(0, 119, 204, 0.08);
      border-color: rgba(0, 119, 204, 0.15);
      color: #0077cc;
    }
    :host-context(.light-theme) .cv-link:hover {
      background: rgba(0, 119, 204, 0.15);
      border-color: rgba(0, 119, 204, 0.3);
    }

    :host-context(.light-theme) .social-link {
      background: rgba(0, 119, 204, 0.08);
      border-color: rgba(0, 119, 204, 0.15);
      color: #0077cc;
    }
    :host-context(.light-theme) .social-link:hover {
      background: rgba(0, 119, 204, 0.15);
      border-color: rgba(0, 119, 204, 0.3);
    }
    :host-context(.light-theme) .footer {
      border-top-color: rgba(0, 0, 0, 0.08);
      color: #94a3b8;
    }

    :host-context(.sable-theme) {
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .hero__title {
      background: linear-gradient(135deg, #F59E0B, #D97706, #EA580C);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.sable-theme) .hero__subtitle {
      color: #D4B896;
    }
    :host-context(.sable-theme) .team-member {
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(217, 119, 6, 0.05), rgba(217, 119, 6, 0.03));
      border-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .team-member:hover {
      border-color: rgba(245, 158, 11, 0.35);
      background-color: var(--cc-surface);
      background-image: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(217, 119, 6, 0.05));
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
    }
    :host-context(.sable-theme) .member-image {
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(217, 119, 6, 0.12));
    }
    :host-context(.sable-theme) .member-image::after {
      background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.06), transparent);
    }
    :host-context(.sable-theme) .member-name {
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .member-quote {
      color: rgba(212, 184, 150, 0.7);
    }
    :host-context(.sable-theme) .member-role {
      color: #F59E0B;
    }
    :host-context(.sable-theme) .member-bio {
      color: #D4B896;
    }
    :host-context(.sable-theme) .skill-tag {
      background: rgba(217, 119, 6, 0.1);
      color: #F59E0B;
      border-color: rgba(217, 119, 6, 0.2);
    }
    :host-context(.sable-theme) .member-social {
      border-top-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .cv-link {
      background: rgba(217, 119, 6, 0.1);
      border-color: rgba(217, 119, 6, 0.2);
      color: #F59E0B;
    }
    :host-context(.sable-theme) .cv-link:hover {
      background: rgba(217, 119, 6, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
    }
    :host-context(.sable-theme) .social-link {
      background: rgba(217, 119, 6, 0.1);
      border-color: rgba(217, 119, 6, 0.2);
      color: #F59E0B;
    }
    :host-context(.sable-theme) .social-link:hover {
      background: rgba(217, 119, 6, 0.2);
      border-color: rgba(245, 158, 11, 0.4);
    }
    :host-context(.sable-theme) .footer {
      border-top-color: rgba(217, 119, 6, 0.12);
      color: #A07850;
    }

    /* Animations */
    @keyframes card-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    @media (prefers-reduced-motion: reduce) {
      .team-member { animation: none; opacity: 1; transform: none; }
      .team-member:hover { transform: none; }
      .member-image::after { transition: none; }
      .social-link { transition: none; }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .team-grid { grid-template-columns: 1fr; }
      .hero__title { font-size: 32px; }
      .hero__subtitle { font-size: 16px; }
      .member-image { height: 250px; }
      .member-emoji { font-size: 60px; }
    }
  `,
})
export class TeamComponent {
  readonly members: TeamMember[] = [
    {
      name: 'Miodrag Pavkovic',
      title: 'CEO & Full-Stack Software Engineer',
      quote: 'Ship fast. Think long-term.',
      bio: 'Strategic business leader and frontend specialist driving digital transformation with hands-on engineering expertise.',
      tags: ['Leadership', 'Frontend', 'Full-Stack'],
      emoji: '👨‍💼',
      image: 'images/mio.jpg',
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/miodrag-pavkovi%C4%87-4351129/' },
      ],
    },
    {
      name: 'Dejan Blanarik',
      title: 'Chief Technology Officer & Software Engineer',
      quote: 'Clean code is the best documentation.',
      cvUrl: 'cv/Dejan-Blanarik-CV.pdf',
      bio: 'Technology visionary architecting scalable systems and driving innovation.',
      tags: ['Technology', 'Architecture', 'Innovation', 'Frontend'],
      emoji: '👨‍💻',
      image: 'images/dejan.jpg',
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/dejan-blanarik/' },
      ],
    },
    {
      name: 'Marija Seder',
      title: 'UX/UI Designer',
      quote: 'Design is how it works, not just how it looks.',
      bio: 'Creative problem solver focused on user-centered design and modern aesthetics.',
      tags: ['UX Research', 'UI Design', 'Figma'],
      emoji: '👩‍💼',
      image: 'images/marijas.png',
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/marija-seder/' },
      ],
    },
    {
      name: 'Predrag Karic',
      title: 'Mobile Software Engineer',
      quote: 'Great apps live in your pocket, not just your browser.',
      bio: 'Mobile engineer specializing in native iOS and Android development, crafting seamless cross-platform experiences.',
      tags: ['iOS', 'Android', 'Swift', 'Kotlin', 'Mobile'],
      emoji: '📱',
      image: 'images/avatar-mobile-dev.svg',
      isAvatar: true,
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/predrag-karic-door8c/' },
      ],
    },
    {
      name: 'Darko Karpic',
      title: 'Software Engineer',
      quote: 'Good architecture is invisible — until it saves you.',
      bio: 'Backend engineer with deep expertise in Java and Spring, building robust and scalable server-side systems.',
      tags: ['Backend', 'Java', 'Spring'],
      emoji: '🖥️',
      image: 'images/avatar-backend-dev.svg',
      isAvatar: true,
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/darko-karpic-731812175/' },
      ],
    },
    {
      name: 'Miroslav Pavkovic',
      title: 'CEO & Software Engineer',
      quote: 'Reliability is a feature.',
      bio: 'Backend software engineer and team lead driving technical excellence and business growth.',
      tags: ['Backend', 'Team Lead', 'Leadership'],
      emoji: '👨‍💻',
      image: 'images/miroslav.jpg',
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/miroslav-pavkovic-a0248283/' },
      ],
    },
  ];
}
