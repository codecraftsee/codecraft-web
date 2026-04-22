import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
import { ThemeService } from '../../core/theme.service';

interface SocialLink {
  icon: string;
  label: string;
  url: string;
}

interface SkillCategory {
  name: string;
  skills: string[];
}

interface TeamMember {
  name: string;
  title: string;
  quote: string;
  bio: string;
  tags: string[];
  skillCategories: SkillCategory[];
  emoji: string;
  image?: string;
  lightImage?: string;
  sableImage?: string;
  isAvatar?: boolean;
  cvUrl?: string;
  social: SocialLink[];
}

@Component({
  selector: 'cc-team',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(document:keydown.escape)': 'closeMember()',
  },
  template: `
    <div class="container">
      <section class="hero">
        <h1 class="hero__title">Meet Our Team</h1>
        <p class="hero__subtitle">Talented leaders, engineers, and strategists working together to bring your vision to life.</p>
      </section>

      <div class="team-grid" role="list">
        @for (member of members; track member.name; let i = $index) {
          <article
            class="team-member"
            role="listitem"
            [style.--card-index]="i"
          >
            <div class="member-image" [attr.aria-hidden]="true">
              @if (member.image) {
                <img [src]="resolveAvatar(member)" [alt]="member.name" [class.avatar-placeholder]="member.isAvatar" [class.avatar-themed]="member.isAvatar && resolveAvatar(member) !== member.image" />
              } @else {
                <span class="member-emoji">{{ member.emoji }}</span>
              }
            </div>
            <div class="member-info">
              <h2 class="member-name">{{ member.name }}</h2>
              <p class="member-role">{{ member.title }}</p>
              <p class="member-quote">"{{ member.quote }}"</p>

              <div class="member-actions">
                <button
                  type="button"
                  class="btn btn--primary"
                  (click)="openMember(member, $event)"
                  [attr.aria-label]="'View profile of ' + member.name"
                >
                  View profile
                </button>
              </div>
            </div>
          </article>
        }
      </div>
    </div>

    <footer class="footer container">
      <p>&copy; 2026 CodeCraft Solutions. All rights reserved.</p>
    </footer>

    @if (selectedMember(); as member) {
      <div class="modal-backdrop" (click)="closeMember()" aria-hidden="true"></div>
      <div class="modal" role="dialog" aria-modal="true" [attr.aria-label]="member.name">
        <button class="modal__close" (click)="closeMember()" aria-label="Close details" type="button">×</button>

        <header class="modal__header">
          @if (member.image) {
            <img [src]="resolveAvatar(member)" [alt]="member.name" class="modal__avatar" [class.avatar-placeholder]="member.isAvatar" [class.avatar-themed]="member.isAvatar && resolveAvatar(member) !== member.image" />
          } @else {
            <span class="modal__avatar modal__avatar--emoji" aria-hidden="true">{{ member.emoji }}</span>
          }
          <div class="modal__heading">
            <h2 class="modal__name">{{ member.name }}</h2>
            <p class="modal__title">{{ member.title }}</p>
            <p class="modal__quote">"{{ member.quote }}"</p>
          </div>
        </header>

        <p class="modal__bio">{{ member.bio }}</p>

        <div class="constellation" [class.constellation--focused]="activeCategory() !== null" role="group" aria-label="Skills constellation">
          <svg class="constellation__svg" viewBox="-260 -260 520 520" aria-hidden="true">
            @for (cat of member.skillCategories; track cat.name; let i = $index) {
              <line
                x1="0" y1="0"
                [attr.x2]="hexX(i, member.skillCategories.length)"
                [attr.y2]="hexY(i, member.skillCategories.length)"
                class="constellation__line"
                [class.constellation__line--active]="activeCategory() === cat.name"
              />
            }
          </svg>

          @if (activeCategory(); as active) {
            <button
              type="button"
              class="constellation__center constellation__center--active"
              (click)="toggleCategory(active)"
              [attr.aria-label]="'Close ' + active + ' skills'"
            >
              <span class="constellation__category">{{ active }}</span>
              <span class="constellation__close" aria-hidden="true">×</span>
            </button>
          } @else {
            <div class="constellation__center" aria-hidden="true">
              @if (member.image) {
                <img [src]="resolveAvatar(member)" alt="" />
              } @else {
                <span>{{ member.emoji }}</span>
              }
            </div>
          }

          @for (cat of member.skillCategories; track cat.name; let i = $index) {
            <button
              type="button"
              class="hex-node"
              [class.hex-node--active]="activeCategory() === cat.name"
              [style.--x.px]="hexX(i, member.skillCategories.length)"
              [style.--y.px]="hexY(i, member.skillCategories.length)"
              (click)="toggleCategory(cat.name)"
              [attr.aria-pressed]="activeCategory() === cat.name"
              [attr.aria-label]="cat.name + ' skills'"
            >
              <span>{{ cat.name }}</span>
            </button>
          }

          @if (!activeCategory()) {
            <p class="constellation__hint" aria-live="polite">Tap a category to reveal skills</p>
          }
        </div>

        @if (activeCategory(); as active) {
          @for (cat of member.skillCategories; track cat.name) {
            @if (cat.name === active) {
              <div
                class="skill-panel"
                role="list"
                [attr.aria-label]="cat.name + ' skill list'"
              >
                @for (skill of cat.skills; track skill; let j = $index) {
                  <span class="skill-pill" role="listitem" [style.--pill-index]="j">{{ skill }}</span>
                }
              </div>
            }
          }
        }

        <footer class="modal__footer" aria-label="Links">
          @if (member.cvUrl) {
            <a class="btn btn--secondary" [href]="member.cvUrl" download aria-label="Download CV">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              <span>Download CV</span>
            </a>
          }
          @for (link of member.social; track link.label) {
            <a class="social-link" [href]="link.url" [attr.aria-label]="link.label" target="_blank" rel="noopener noreferrer">{{ link.icon }}</a>
          }
        </footer>
      </div>
    }
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

    .member-name {
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 0.35rem;
      color: #fff;
    }
    .member-role {
      font-size: 12px;
      color: #10B981;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      margin: 0 0 0.75rem;
      font-weight: 600;
    }
    .member-quote {
      font-size: 14px;
      font-style: italic;
      color: rgba(165, 180, 252, 0.75);
      margin: 0 0 1.5rem;
      line-height: 1.5;
    }

    /* Actions (card footer) */
    .member-actions {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.6rem;
      margin-top: auto;
      padding-top: 1.25rem;
      border-top: 1px solid rgba(16, 185, 129, 0.1);
    }

    /* Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.45rem;
      font-family: inherit;
      font-size: 13px;
      font-weight: 600;
      line-height: 1;
      padding: 0.65rem 1rem;
      border-radius: 10px;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none;
      transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.25s, box-shadow 0.25s;
      white-space: nowrap;
    }
    .btn:focus-visible { outline: 2px solid #10B981; outline-offset: 2px; }
    .btn--primary {
      background: linear-gradient(135deg, #10B981, #059669);
      color: #fff;
      box-shadow: 0 8px 18px rgba(16, 185, 129, 0.28);
    }
    .btn--primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 24px rgba(16, 185, 129, 0.38);
    }
    .btn--secondary {
      background: rgba(16, 185, 129, 0.1);
      border-color: rgba(16, 185, 129, 0.3);
      color: #10B981;
    }
    .btn--secondary:hover {
      background: rgba(16, 185, 129, 0.18);
      border-color: rgba(16, 185, 129, 0.5);
      transform: translateY(-2px);
    }

    /* Social Links */
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
    :host-context(.light-theme) .avatar-themed {
      filter: none;
    }
    :host-context(.sable-theme) .avatar-placeholder {
      filter: hue-rotate(200deg) saturate(1.8) brightness(1.05);
    }
    :host-context(.sable-theme) .avatar-themed {
      filter: none;
    }

    /* Light Theme Overrides */
    :host-context(.light-theme) {
      color: #030712;
    }
    :host-context(.light-theme) .hero__title {
      background: linear-gradient(135deg, #EA580C, #C2410C, #9A3412);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .hero__subtitle {
      color: #374151;
    }
    :host-context(.light-theme) .team-member {
      background-color: var(--cc-surface);
      background-image: none;
      border-color: #D1D5DB;
    }
    :host-context(.light-theme) .team-member:hover {
      border-color: rgba(234, 88, 12, 0.4);
      background-color: var(--cc-surface);
      background-image: none;
      box-shadow: 0 25px 50px rgba(15, 23, 42, 0.12);
    }
    :host-context(.light-theme) .member-image {
      background: linear-gradient(135deg, #F9FAFB, #F3F4F6);
    }
    :host-context(.light-theme) .member-image::after {
      background: linear-gradient(90deg, transparent, rgba(234, 88, 12, 0.08), transparent);
    }
    :host-context(.light-theme) .member-name {
      color: #030712;
    }
    :host-context(.light-theme) .member-quote {
      color: #4B5563;
    }
    :host-context(.light-theme) .member-role {
      color: #EA580C;
    }
    :host-context(.light-theme) .member-actions {
      border-top-color: #E5E7EB;
    }
    :host-context(.light-theme) .btn--primary {
      background: linear-gradient(135deg, #EA580C, #C2410C);
      box-shadow: 0 8px 18px rgba(234, 88, 12, 0.3);
    }
    :host-context(.light-theme) .btn--primary:hover {
      box-shadow: 0 12px 24px rgba(234, 88, 12, 0.42);
    }
    :host-context(.light-theme) .btn--secondary {
      background: rgba(234, 88, 12, 0.08);
      border-color: rgba(234, 88, 12, 0.3);
      color: #C2410C;
    }
    :host-context(.light-theme) .btn--secondary:hover {
      background: rgba(234, 88, 12, 0.16);
      border-color: rgba(234, 88, 12, 0.5);
    }
    :host-context(.light-theme) .btn:focus-visible { outline-color: #EA580C; }

    :host-context(.light-theme) .social-link {
      background: rgba(234, 88, 12, 0.08);
      border-color: rgba(234, 88, 12, 0.2);
      color: #C2410C;
    }
    :host-context(.light-theme) .social-link:hover {
      background: rgba(234, 88, 12, 0.15);
      border-color: rgba(234, 88, 12, 0.35);
    }
    :host-context(.light-theme) .footer {
      border-top-color: #E5E7EB;
      color: #4B5563;
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
    :host-context(.sable-theme) .member-actions {
      border-top-color: rgba(217, 119, 6, 0.12);
    }
    :host-context(.sable-theme) .btn--primary {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      box-shadow: 0 8px 18px rgba(245, 158, 11, 0.28);
    }
    :host-context(.sable-theme) .btn--primary:hover {
      box-shadow: 0 12px 24px rgba(245, 158, 11, 0.4);
    }
    :host-context(.sable-theme) .btn--secondary {
      background: rgba(217, 119, 6, 0.12);
      border-color: rgba(245, 158, 11, 0.3);
      color: #F59E0B;
    }
    :host-context(.sable-theme) .btn--secondary:hover {
      background: rgba(217, 119, 6, 0.22);
      border-color: rgba(245, 158, 11, 0.5);
    }
    :host-context(.sable-theme) .btn:focus-visible { outline-color: #F59E0B; }
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

    /* ── Modal ── */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      z-index: 150;
      background: rgba(2, 6, 23, 0.7);
      backdrop-filter: blur(6px);
      animation: backdrop-in 0.2s ease-out;
    }

    .modal {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 151;
      width: min(680px, 92vw);
      max-height: 92dvh;
      overflow-y: auto;
      padding: 1.5rem 1.75rem;
      border-radius: 20px;
      background: var(--cc-glass-bg, rgba(15, 23, 42, 0.92));
      backdrop-filter: blur(var(--cc-glass-blur, 16px));
      border: 1px solid rgba(16, 185, 129, 0.25);
      box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
      color: #F1F5F9;
      animation: modal-in 0.28s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .modal__close {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(16, 185, 129, 0.2);
      background: rgba(16, 185, 129, 0.1);
      color: #10B981;
      border-radius: 10px;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
      transition: background 0.2s, transform 0.2s;
    }
    .modal__close:hover { background: rgba(16, 185, 129, 0.2); transform: scale(1.05); }
    .modal__close:focus-visible { outline: 2px solid #10B981; outline-offset: 2px; }

    .modal__header {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .modal__avatar {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid rgba(16, 185, 129, 0.4);
      flex-shrink: 0;
    }
    .modal__avatar--emoji {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 48px;
      background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15));
    }
    .modal__heading { min-width: 0; }
    .modal__name { margin: 0 0 0.25rem; font-size: 22px; font-weight: 700; color: #fff; }
    .modal__title { margin: 0 0 0.25rem; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: #10B981; }
    .modal__quote { margin: 0; font-style: italic; font-size: 13px; color: rgba(165, 180, 252, 0.7); }
    .modal__bio { margin: 0 0 0.5rem; font-size: 13px; line-height: 1.55; color: #cbd5e1; }

    /* ── Constellation ── */
    .constellation {
      position: relative;
      width: 380px;
      height: 340px;
      max-width: 100%;
      margin: 1rem auto 0.5rem;
      overflow: visible;
      transition: height 0.3s ease;
    }
    .constellation--focused { height: 300px; }
    .constellation__svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      overflow: visible;
    }
    .constellation__line {
      stroke: rgba(16, 185, 129, 0.25);
      stroke-width: 1.5;
      transition: stroke 0.3s, stroke-width 0.3s, filter 0.3s;
    }
    .constellation__line--active {
      opacity: 0;
    }
    .constellation__center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 96px;
      height: 96px;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid rgba(16, 185, 129, 0.5);
      box-shadow: 0 0 32px rgba(16, 185, 129, 0.35);
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(15, 23, 42, 0.8);
      font-size: 44px;
      padding: 0;
      color: inherit;
      font-family: inherit;
      transition: width 0.3s ease, height 0.3s ease, box-shadow 0.3s ease;
    }
    .constellation__center img { width: 100%; height: 100%; object-fit: cover; }
    button.constellation__center { cursor: pointer; }
    button.constellation__center:focus-visible { outline: 2px solid #10B981; outline-offset: 4px; }
    .constellation__center--active {
      width: 132px;
      height: 132px;
      border-width: 2px;
      border-color: rgba(16, 185, 129, 0.75);
      box-shadow: 0 0 40px rgba(16, 185, 129, 0.55), inset 0 0 24px rgba(16, 185, 129, 0.15);
      background: radial-gradient(circle, rgba(16, 185, 129, 0.18), rgba(15, 23, 42, 0.9));
      overflow: visible;
      flex-direction: column;
      gap: 0.15rem;
    }
    .constellation__category {
      font-size: 18px;
      font-weight: 800;
      line-height: 1.15;
      padding: 0 0.5rem;
      text-align: center;
      background: linear-gradient(135deg, #10B981, #34d399);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .constellation__close {
      font-size: 14px;
      color: rgba(16, 185, 129, 0.7);
      font-weight: 600;
      line-height: 1;
    }
    .constellation__hint {
      position: absolute;
      bottom: -1.5rem;
      left: 50%;
      transform: translateX(-50%);
      margin: 0;
      font-size: 12px;
      color: rgba(165, 180, 252, 0.6);
      white-space: nowrap;
    }

    .hex-node {
      position: absolute;
      top: calc(50% + var(--y, 0px));
      left: calc(50% + var(--x, 0px));
      transform: translate(-50%, -50%);
      width: 88px;
      height: 80px;
      padding: 0;
      border: 0;
      background: transparent;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: 600;
      color: #10B981;
      transition: transform 0.25s ease, color 0.25s ease;
    }
    .hex-node > span {
      position: relative;
      z-index: 1;
      padding: 0 0.4rem;
      text-align: center;
      line-height: 1.2;
    }
    .hex-node::before {
      content: '';
      position: absolute;
      inset: 0;
      clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%);
      background: rgba(16, 185, 129, 0.12);
      border: 1px solid rgba(16, 185, 129, 0.35);
      transition: background 0.25s ease, box-shadow 0.25s ease;
    }
    .hex-node:hover { transform: translate(-50%, -50%) scale(1.08); }
    .hex-node:hover::before { background: rgba(16, 185, 129, 0.22); }
    .hex-node:focus-visible { outline: none; }
    .hex-node:focus-visible::before { box-shadow: 0 0 0 2px #10B981; }
    .hex-node--active {
      opacity: 0;
      pointer-events: none;
      transform: translate(-50%, -50%) scale(0.6);
    }

    .skill-burst {
      position: absolute;
      top: calc(50% + var(--burst-y, 0px));
      left: calc(50% + var(--burst-x, 0px));
      transform: translate(-50%, -50%);
      width: 170px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.35rem;
      pointer-events: none;
    }
    .skill-panel {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem 0.55rem;
      max-width: 560px;
      margin: 0.5rem auto 0.25rem;
      padding: 0.75rem 0.5rem 0;
      border-top: 1px dashed rgba(16, 185, 129, 0.25);
    }
    .skill-panel .skill-pill {
      font-size: 13px;
      padding: 0.5rem 0.85rem;
    }
    .skill-pill {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.4);
      color: #10B981;
      font-size: 11.5px;
      font-weight: 600;
      padding: 0.35rem 0.65rem;
      border-radius: 999px;
      backdrop-filter: blur(8px);
      opacity: 0;
      transform: scale(0.6);
      animation: skill-pop 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      animation-delay: calc(var(--pill-index, 0) * 50ms);
    }

    .modal__footer {
      display: flex;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(16, 185, 129, 0.15);
      margin-top: 1rem;
    }

    /* Theme overrides for modal */
    :host-context(.light-theme) .modal {
      background: rgba(255, 255, 255, 0.98);
      color: #030712;
      border-color: rgba(234, 88, 12, 0.3);
    }
    :host-context(.light-theme) .modal__name { color: #030712; }
    :host-context(.light-theme) .modal__title { color: #EA580C; }
    :host-context(.light-theme) .modal__bio { color: #374151; }
    :host-context(.light-theme) .modal__close { background: rgba(234, 88, 12, 0.1); border-color: rgba(234, 88, 12, 0.25); color: #C2410C; }
    :host-context(.light-theme) .modal__avatar { border-color: rgba(234, 88, 12, 0.45); }
    :host-context(.light-theme) .constellation__line { stroke: rgba(234, 88, 12, 0.3); }
    :host-context(.light-theme) .constellation__line--active { stroke: #EA580C; filter: drop-shadow(0 0 6px rgba(234, 88, 12, 0.5)); }
    :host-context(.light-theme) .constellation__center { background: rgba(255, 255, 255, 0.95); border-color: rgba(234, 88, 12, 0.55); box-shadow: 0 0 28px rgba(234, 88, 12, 0.3); }
    :host-context(.light-theme) .hex-node { color: #C2410C; }
    :host-context(.light-theme) .hex-node::before { background: rgba(234, 88, 12, 0.08); border-color: rgba(234, 88, 12, 0.35); }
    :host-context(.light-theme) .hex-node--active { color: #fff; }
    :host-context(.light-theme) .hex-node--active::before { background: linear-gradient(135deg, #EA580C, #C2410C); box-shadow: 0 0 24px rgba(234, 88, 12, 0.5); }
    :host-context(.light-theme) .skill-pill { background: rgba(234, 88, 12, 0.1); border-color: rgba(234, 88, 12, 0.4); color: #C2410C; }
    :host-context(.light-theme) .modal__footer { border-top-color: rgba(234, 88, 12, 0.2); }
    :host-context(.light-theme) .constellation__center--active {
      border-color: rgba(234, 88, 12, 0.75);
      box-shadow: 0 0 48px rgba(234, 88, 12, 0.5), inset 0 0 32px rgba(234, 88, 12, 0.15);
      background: radial-gradient(circle, rgba(234, 88, 12, 0.18), rgba(255, 255, 255, 0.95));
    }
    :host-context(.light-theme) .constellation__category {
      background: linear-gradient(135deg, #EA580C, #C2410C);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.light-theme) .constellation__close { color: rgba(194, 65, 12, 0.85); }

    :host-context(.sable-theme) .modal {
      background: rgba(28, 20, 14, 0.95);
      border-color: rgba(245, 158, 11, 0.3);
      color: #F5F0E8;
    }
    :host-context(.sable-theme) .modal__name { color: #F5F0E8; }
    :host-context(.sable-theme) .modal__title { color: #F59E0B; }
    :host-context(.sable-theme) .modal__bio { color: #D4B896; }
    :host-context(.sable-theme) .modal__close { background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.3); color: #F59E0B; }
    :host-context(.sable-theme) .modal__avatar { border-color: rgba(245, 158, 11, 0.45); }
    :host-context(.sable-theme) .constellation__line { stroke: rgba(245, 158, 11, 0.3); }
    :host-context(.sable-theme) .constellation__line--active { stroke: #F59E0B; filter: drop-shadow(0 0 6px rgba(245, 158, 11, 0.6)); }
    :host-context(.sable-theme) .constellation__center { background: rgba(28, 20, 14, 0.9); border-color: rgba(245, 158, 11, 0.55); box-shadow: 0 0 28px rgba(245, 158, 11, 0.35); }
    :host-context(.sable-theme) .hex-node { color: #F59E0B; }
    :host-context(.sable-theme) .hex-node::before { background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.35); }
    :host-context(.sable-theme) .hex-node--active::before { background: linear-gradient(135deg, #F59E0B, #D97706); }
    :host-context(.sable-theme) .skill-pill { background: rgba(245, 158, 11, 0.15); border-color: rgba(245, 158, 11, 0.4); color: #F59E0B; }
    :host-context(.sable-theme) .modal__footer { border-top-color: rgba(245, 158, 11, 0.2); }
    :host-context(.sable-theme) .constellation__center--active {
      border-color: rgba(245, 158, 11, 0.75);
      box-shadow: 0 0 48px rgba(245, 158, 11, 0.5), inset 0 0 32px rgba(245, 158, 11, 0.15);
      background: radial-gradient(circle, rgba(245, 158, 11, 0.2), rgba(28, 20, 14, 0.92));
    }
    :host-context(.sable-theme) .constellation__category {
      background: linear-gradient(135deg, #F59E0B, #D97706);
      -webkit-background-clip: text;
      background-clip: text;
    }
    :host-context(.sable-theme) .constellation__close { color: rgba(245, 158, 11, 0.75); }

    @keyframes backdrop-in { from { opacity: 0; } to { opacity: 1; } }
    @keyframes modal-in {
      from { opacity: 0; transform: translate(-50%, -50%) scale(0.94); }
      to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes skill-pop {
      from { opacity: 0; transform: scale(0.6); }
      to   { opacity: 1; transform: scale(1); }
    }

    @media (prefers-reduced-motion: reduce) {
      .modal-backdrop, .modal { animation: none; }
      .skill-pill { animation: none; opacity: 1; transform: none; }
      .constellation__line, .hex-node, .hex-node::before, .constellation__center { transition: none; }
    }

    @media (max-width: 640px) {
      .modal { padding: 1.25rem; padding-top: 3rem; }
      .modal__header { flex-direction: column; text-align: center; gap: 0.75rem; }
      .constellation { width: 320px; height: 300px; }
      .constellation--focused { height: 280px; }
    }
    @media (max-width: 400px) {
      .constellation { width: 280px; height: 280px; }
      .constellation--focused { height: 260px; }
    }
  `,
})
export class TeamComponent {
  readonly theme = inject(ThemeService);

  readonly selectedMember = signal<TeamMember | null>(null);
  readonly activeCategory = signal<string | null>(null);

  private triggerElement: HTMLElement | null = null;

  constructor() {
    effect(() => {
      const open = this.selectedMember() !== null;
      if (typeof document === 'undefined') return;
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  openMember(member: TeamMember, event?: Event): void {
    this.triggerElement = (event?.currentTarget as HTMLElement) ?? null;
    this.selectedMember.set(member);
    this.activeCategory.set(null);
  }

  closeMember(): void {
    if (this.selectedMember() === null) return;
    this.selectedMember.set(null);
    this.activeCategory.set(null);
    queueMicrotask(() => this.triggerElement?.focus());
  }

  toggleCategory(name: string): void {
    this.activeCategory.update(curr => (curr === name ? null : name));
  }

  hexX(i: number, n: number): number {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return Math.cos(angle) * 120;
  }

  hexY(i: number, n: number): number {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    return Math.sin(angle) * 120;
  }

  readonly members: TeamMember[] = [
    {
      name: 'Miodrag Pavkovic',
      title: 'CEO & Full-Stack Software Engineer',
      quote: 'Ship fast. Think long-term.',
      bio: 'Strategic business leader and frontend specialist driving digital transformation with hands-on engineering expertise.',
      tags: ['Leadership', 'Frontend', 'Full-Stack'],
      skillCategories: [
        { name: 'Leadership', skills: ['Strategy', 'Product Vision', 'Team Building', 'Client Relations'] },
        { name: 'Frontend', skills: ['Angular', 'TypeScript', 'RxJS', 'SCSS', 'Signals'] },
        { name: 'Full-Stack', skills: ['Node.js', 'REST APIs', 'PostgreSQL', 'CI/CD', 'Cloud'] },
      ],
      emoji: '👨‍💼',
      image: 'images/mio.jpg',
      cvUrl: 'cv/Miodrag_Pavkovic_CV.pdf',
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
      skillCategories: [
        { name: 'Architecture', skills: ['System Design', 'Micro-frontends', 'Monorepos', 'Module Boundaries'] },
        { name: 'Frontend', skills: ['Angular', 'RxJS', 'TypeScript', 'NgRx', 'Testing'] },
        { name: 'Innovation', skills: ['POC Prototyping', 'Tech Radar', 'Tooling', 'DX'] },
        { name: 'Technology', skills: ['CI/CD', 'Cloud', 'Observability', 'Security'] },
      ],
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
      skillCategories: [
        { name: 'UX Research', skills: ['User Interviews', 'Usability Testing', 'Personas', 'Journey Maps'] },
        { name: 'UI Design', skills: ['Design Systems', 'Typography', 'Color Theory', 'Accessibility'] },
        { name: 'Figma', skills: ['Auto-layout', 'Variants', 'Prototyping', 'Design Tokens'] },
      ],
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
      skillCategories: [
        { name: 'iOS', skills: ['Swift', 'SwiftUI', 'UIKit', 'Core Data', 'App Store'] },
        { name: 'Android', skills: ['Kotlin', 'Jetpack Compose', 'Coroutines', 'Room', 'Play Store'] },
        { name: 'Mobile', skills: ['Offline-first', 'Push Notifications', 'Performance', 'CI/CD'] },
      ],
      emoji: '📱',
      image: 'images/avatar-mobile-dev.svg',
      lightImage: 'images/avatar-mobile-dev-light.svg',
      sableImage: 'images/avatar-mobile-dev-sable.svg',
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
      skillCategories: [
        { name: 'Java', skills: ['Java 21', 'JVM Tuning', 'Concurrency', 'Streams'] },
        { name: 'Spring', skills: ['Spring Boot', 'Spring Security', 'Spring Data', 'WebFlux'] },
        { name: 'Backend', skills: ['REST', 'PostgreSQL', 'Redis', 'Kafka', 'Docker'] },
      ],
      emoji: '🖥️',
      image: 'images/avatar-backend-dev.svg',
      lightImage: 'images/avatar-backend-dev-light.svg',
      sableImage: 'images/avatar-backend-dev-sable.svg',
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
      skillCategories: [
        { name: 'Backend', skills: ['Node.js', 'Python', 'PostgreSQL', 'REST', 'gRPC'] },
        { name: 'Team Lead', skills: ['Mentoring', 'Code Review', 'Agile', 'Delivery'] },
        { name: 'Leadership', skills: ['Strategy', 'Hiring', 'Roadmapping', 'Stakeholders'] },
      ],
      emoji: '👨‍💻',
      image: 'images/miroslav.jpg',
      cvUrl: 'cv/Miroslav_Pavkovic_CV.pdf',
      social: [
        { icon: 'in', label: 'LinkedIn', url: 'https://www.linkedin.com/in/miroslav-pavkovic-a0248283/' },
      ],
    },
  ];

  resolveAvatar(member: TeamMember): string | undefined {
    const t = this.theme.activeTheme();
    if (t === 'light' && member.lightImage) return member.lightImage;
    if (t === 'sable' && member.sableImage) return member.sableImage;
    return member.image;
  }
}
