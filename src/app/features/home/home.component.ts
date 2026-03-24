import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

interface Chapter {
  number: string;
  label: string;
  title: string;
  description: string;
  meta: { icon: string; label: string }[];
  cta: string;
}

@Component({
  selector: 'cc-home',
  imports: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
  },
  template: `
    <!-- Progress Bar -->
    <div class="progress-bar" [style.width.%]="scrollProgress()" aria-hidden="true"></div>

    <div class="container">
      <!-- Hero -->
      <section class="hero">
        <h1 class="hero__title">Your Digital Story</h1>
        <p class="hero__subtitle">Crafted with code. Built with precision. Designed for impact.</p>
      </section>

      <!-- Chapters Grid -->
      <div class="chapters-grid" id="chapters" role="list" aria-label="Our process chapters">
        @for (chapter of chapters; track chapter.number; let i = $index) {
          <article class="chapter-card" role="listitem" [style.--card-index]="i">
            <div class="chapter-card__number">{{ chapter.number }}</div>
            <div class="chapter-card__label">{{ chapter.label }}</div>
            <h3 class="chapter-card__title">{{ chapter.title }}</h3>
            <p class="chapter-card__desc">{{ chapter.description }}</p>
            <div class="chapter-card__meta">
              @for (tag of chapter.meta; track tag.label) {
                <span>{{ tag.icon }} {{ tag.label }}</span>
              }
            </div>
            <div class="chapter-card__arrow">{{ chapter.cta }}</div>
          </article>
        }
      </div>
    </div>

    <!-- Footer -->
    <footer class="footer container">
      <p>&copy; 2026 CodeCraft Solutions. All rights reserved.</p>
    </footer>
  `,
  styles: `
    :host {
      display: block;
      background: #0f1419;
      color: #e0e7ff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
      min-height: 100dvh;
      overflow-x: hidden;
    }

    .container { max-width: 1400px; margin: 0 auto; padding: 0 2rem; }

    /* Progress Bar */
    .progress-bar {
      position: fixed;
      bottom: 0;
      left: 0;
      height: 3px;
      background: linear-gradient(90deg, #00d4ff, #0099ff);
      z-index: 100;
      transition: width 0.1s;
    }

    /* Hero */
    .hero { padding: 6rem 0; text-align: center; }
    .hero__title {
      display: inline-block;
      font-size: 48px;
      font-weight: 800;
      margin: 0 0 1rem;
      padding: 0.05em 0;
      line-height: 1.2;
      background: linear-gradient(135deg, #00d4ff, #0099ff, #ff00ff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero__subtitle {
      font-size: 18px;
      color: #a5b4fc;
      max-width: 600px;
      margin: 0 auto 2rem;
      line-height: 1.7;
    }

    /* Chapters Grid */
    .chapters-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 4rem 0;
    }

    /* Chapter Card */
    .chapter-card {
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.05), rgba(0, 153, 255, 0.05));
      border: 1px solid rgba(0, 212, 255, 0.1);
      border-radius: 12px;
      padding: 2.5rem;
      cursor: pointer;
      transition: all 0.4s ease;
      position: relative;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px);
      animation: card-in 0.5s ease-out forwards;
      animation-delay: calc(var(--card-index) * 0.1s);
    }

    /* Shine sweep */
    .chapter-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
      transition: left 0.6s;
    }
    .chapter-card:hover::before { left: 100%; }

    .chapter-card:hover {
      border-color: rgba(0, 212, 255, 0.3);
      background: linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 153, 255, 0.1));
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 212, 255, 0.1);
    }

    .chapter-card__number {
      display: inline-block;
      font-size: 56px;
      font-weight: 800;
      line-height: 1.2;
      padding: 0.05em 0;
      background: linear-gradient(135deg, #00d4ff, #0099ff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      opacity: 0.3;
      margin-bottom: 1rem;
    }
    .chapter-card__label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #64748b;
      margin-bottom: 0.5rem;
    }
    .chapter-card__title {
      font-size: 28px;
      font-weight: 700;
      line-height: 1.2;
      margin: 0 0 0.8rem;
      color: #fff;
    }
    .chapter-card__desc {
      font-size: 14px;
      color: #a5b4fc;
      line-height: 1.6;
      margin: 0 0 1.5rem;
    }
    .chapter-card__meta {
      display: flex;
      gap: 2rem;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 1.5rem;
    }
    .chapter-card__meta span {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .chapter-card__arrow {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      color: #00d4ff;
      font-weight: 600;
      font-size: 13px;
      transition: all 0.3s;
    }
    .chapter-card__arrow::after {
      content: '\u2192';
      transition: transform 0.3s;
    }
    .chapter-card:hover .chapter-card__arrow { gap: 1rem; }
    .chapter-card:hover .chapter-card__arrow::after { transform: translateX(4px); }

    /* Footer */
    .footer {
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      padding: 3rem 0;
      margin-top: 4rem;
      text-align: center;
      color: #64748b;
      font-size: 13px;
    }

    /* Light Theme Overrides */
    :host-context(.light-theme) {
      background: #ffffff;
      color: #1a1a2e;
    }
:host-context(.light-theme) .hero__title {
      background: linear-gradient(135deg, #0099cc, #0066cc, #cc00cc);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .hero__subtitle {
      color: #64748b;
    }
    :host-context(.light-theme) .chapter-card {
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.02), rgba(0, 0, 0, 0.02));
      border-color: rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .chapter-card:hover {
      border-color: rgba(0, 153, 255, 0.3);
      background: linear-gradient(135deg, rgba(0, 0, 0, 0.03), rgba(0, 0, 0, 0.03));
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
    }
    :host-context(.light-theme) .chapter-card::before {
      background: linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent);
    }
    :host-context(.light-theme) .chapter-card__label {
      color: #94a3b8;
    }
    :host-context(.light-theme) .chapter-card__title {
      color: #1a1a2e;
    }
    :host-context(.light-theme) .chapter-card__desc {
      color: #64748b;
    }
    :host-context(.light-theme) .chapter-card__meta {
      color: #94a3b8;
    }
    :host-context(.light-theme) .chapter-card__arrow {
      color: #0077cc;
    }
    :host-context(.light-theme) .footer {
      border-top-color: rgba(0, 0, 0, 0.08);
      color: #94a3b8;
    }

    :host-context(.sable-theme) {
      background: #1C1917;
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
    :host-context(.sable-theme) .chapter-card {
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.05), rgba(217, 119, 6, 0.03));
      border-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .chapter-card:hover {
      border-color: rgba(245, 158, 11, 0.35);
      background: linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(217, 119, 6, 0.05));
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    }
    :host-context(.sable-theme) .chapter-card::before {
      background: linear-gradient(90deg, transparent, rgba(245, 158, 11, 0.06), transparent);
    }
    :host-context(.sable-theme) .chapter-card__label {
      color: #A07850;
    }
    :host-context(.sable-theme) .chapter-card__title {
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .chapter-card__desc {
      color: #D4B896;
    }
    :host-context(.sable-theme) .chapter-card__meta {
      color: #A07850;
    }
    :host-context(.sable-theme) .chapter-card__arrow {
      color: #F59E0B;
    }
    :host-context(.sable-theme) .footer {
      border-top-color: rgba(217, 119, 6, 0.12);
      color: #A07850;
    }

    /* Animations */
    @keyframes card-in { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

    @media (prefers-reduced-motion: reduce) {
      .chapter-card { animation: none; opacity: 1; transform: none; }
      .chapter-card:hover { transform: none; }
      .chapter-card::before { transition: none; }
    }

    /* Responsive */
    @media (max-width: 768px) {
      .chapters-grid { grid-template-columns: 1fr; }
      .hero__title { font-size: 32px; }
      .hero__subtitle { font-size: 16px; }
      .nav { gap: 1rem; font-size: 11px; }
      .chapter-card__title { font-size: 22px; }
      .chapter-card__number { font-size: 40px; }
    }
  `,
})
export class HomeComponent {
  readonly scrollProgress = signal(0);

  readonly chapters: Chapter[] = [
    {
      number: '01',
      label: 'Chapter I',
      title: 'Discovery',
      description: 'We dive deep into your vision, understanding your goals, market, and audience to craft the perfect digital solution.',
      meta: [{ icon: '\uD83D\uDCCA', label: 'Strategy' }, { icon: '\uD83D\uDCA1', label: 'Insights' }],
      cta: 'Explore',
    },
    {
      number: '02',
      label: 'Chapter II',
      title: 'Design',
      description: 'Our team creates stunning, user-centered designs that transform complex ideas into elegant, intuitive interfaces.',
      meta: [{ icon: '\uD83C\uDFA8', label: 'Creative' }, { icon: '\u2728', label: 'Modern' }],
      cta: 'Explore',
    },
    {
      number: '03',
      label: 'Chapter III',
      title: 'Development',
      description: 'We build robust, scalable solutions using cutting-edge technologies and best practices in code quality.',
      meta: [{ icon: '\uD83D\uDCBB', label: 'Tech' }, { icon: '\u26A1', label: 'Performance' }],
      cta: 'Explore',
    },
    {
      number: '04',
      label: 'Chapter IV',
      title: 'Optimization',
      description: 'We test, refine, and optimize every detail to ensure your solution performs flawlessly across all platforms.',
      meta: [{ icon: '\uD83D\uDD27', label: 'Testing' }, { icon: '\uD83D\uDCC8', label: 'Results' }],
      cta: 'Explore',
    },
    {
      number: '05',
      label: 'Chapter V',
      title: 'Launch & Support',
      description: 'We deploy with confidence and provide ongoing support to keep your digital presence thriving and secure.',
      meta: [{ icon: '\uD83D\uDE80', label: 'Launch' }, { icon: '\uD83D\uDEE1\uFE0F', label: 'Support' }],
      cta: 'Explore',
    },
    {
      number: '06',
      label: 'Chapter VI',
      title: "Let's Connect",
      description: 'Ready to start your next chapter? Get in touch with our team to discuss your project and explore possibilities.',
      meta: [{ icon: '\uD83D\uDCAC', label: 'Chat' }, { icon: '\uD83D\uDCE7', label: 'Email' }],
      cta: 'Contact',
    },
  ];

  onScroll(): void {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    this.scrollProgress.set(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
  }
}
