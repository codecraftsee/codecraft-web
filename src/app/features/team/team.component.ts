import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { ChapterHeaderComponent } from '../../shared/chapter-header/chapter-header.component';

type SkillCategory = 'technical' | 'leadership' | 'domain';

interface Skill {
  name: string;
  proficiency: number;
  category: SkillCategory;
}

interface TeamMember {
  name: string;
  title: string;
  initials: string;
  bio: string;
  tags: string[];
  skills: Skill[];
  gradient: { number: string; avatar: string; border: string };
  colors: { from: string; to: string };
  image?: string;
}

interface LeafPosition {
  cx: number;
  cy: number;
}

interface MemberLevel {
  level: number;
  label: string;
}

const LEVELS: { min: number; level: number; label: string }[] = [
  { min: 96, level: 6, label: 'guru' },
  { min: 93, level: 5, label: 'master' },
  { min: 91, level: 4, label: 'expert' },
  { min: 89, level: 3, label: 'advanced' },
  { min: 70, level: 2, label: 'medium' },
  { min: 60, level: 1, label: 'beginner' },
  { min: 0, level: 0, label: 'novice' },
];

function memberLevel(skills: Skill[]): MemberLevel {
  const avg = skills.reduce((sum, s) => sum + s.proficiency, 0) / skills.length;
  const match = LEVELS.find(l => avg >= l.min) ?? LEVELS[LEVELS.length - 1];
  return { level: match.level, label: match.label };
}

function levelColor(level: number): string {
  switch (level) {
    case 6: return 'linear-gradient(135deg, #F59E0B, #FBBF24)';
    case 5: return 'linear-gradient(135deg, #EC4899, #F472B6)';
    case 4: return 'linear-gradient(135deg, #10B981, #34D399)';
    case 3: return 'linear-gradient(135deg, #3B82F6, #60A5FA)';
    case 2: return 'linear-gradient(135deg, #8B5CF6, #A78BFA)';
    case 1: return 'linear-gradient(135deg, #06B6D4, #22D3EE)';
    default: return 'linear-gradient(135deg, #9CA3AF, #D1D5DB)';
  }
}

function skillBadge(proficiency: number): string {
  if (proficiency >= 90) return 'expert';
  if (proficiency >= 80) return 'advanced';
  if (proficiency >= 70) return 'intermediate';
  return 'developing';
}

function skillColor(proficiency: number): string {
  if (proficiency >= 90) return 'linear-gradient(90deg, #10B981, #34D399)';
  if (proficiency >= 80) return 'linear-gradient(90deg, #F59E0B, #FBBF24)';
  if (proficiency >= 70) return 'linear-gradient(90deg, #3B82F6, #60A5FA)';
  return 'linear-gradient(90deg, #9CA3AF, #D1D5DB)';
}

function badgeBg(proficiency: number): string {
  if (proficiency >= 90) return '#10B981';
  if (proficiency >= 80) return '#F59E0B';
  if (proficiency >= 70) return '#3B82F6';
  return '#9CA3AF';
}

@Component({
  selector: 'cc-team',
  imports: [ChapterHeaderComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="page">
      <div class="page__edges" aria-hidden="true"></div>
      <div class="page__content">
        <cc-chapter-header />

        <section class="crafters" aria-label="Team members">
          <h1 class="crafters__heading">Code Crafters</h1>
          <p class="crafters__subtitle">The people who build what ships.</p>

          <svg class="orbit__svg" viewBox="0 0 400 400" role="img" aria-label="Team orbital diagram">
            <defs>
              <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#7C3AED" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#EC4899" stop-opacity="0.7" />
              </radialGradient>
              @for (member of members; track member.name; let i = $index) {
                <linearGradient [attr.id]="'leaf-grad-' + i" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" [attr.stop-color]="member.colors.from" />
                  <stop offset="100%" [attr.stop-color]="member.colors.to" />
                </linearGradient>
                <clipPath [attr.id]="'leaf-clip-' + i">
                  <circle [attr.cx]="leafPositions[i].cx" [attr.cy]="leafPositions[i].cy" r="36" />
                </clipPath>
              }
            </defs>

            <!-- orbit rings -->
            <circle class="orbit__ring" cx="200" cy="200" r="100" />
            <circle class="orbit__ring" cx="200" cy="200" r="155" />

            <!-- center sun -->
            <circle class="orbit__center" cx="200" cy="200" r="40" fill="url(#sun-grad)" />
            <text x="200" y="207" text-anchor="middle" class="orbit__center-text">CC</text>

            <!-- member nodes -->
            @for (member of members; track member.name; let i = $index) {
              <a
                class="leaf"
                [class.leaf--selected]="selectedMember() === i"
                role="button"
                tabindex="0"
                [attr.aria-label]="member.name + ', ' + member.title"
                (click)="selectMember(i)"
                (keydown.enter)="selectMember(i)"
                (keydown.space)="selectMember(i); $event.preventDefault()"
                [style.animation-delay]="(0.3 + i * 0.1) + 's'"
              >
                @if (member.image) {
                  <image
                    [attr.x]="leafPositions[i].cx - 36"
                    [attr.y]="leafPositions[i].cy - 36"
                    width="72"
                    height="72"
                    [attr.href]="member.image"
                    [attr.clip-path]="'url(#leaf-clip-' + i + ')'"
                  />
                } @else {
                  <circle
                    [attr.cx]="leafPositions[i].cx"
                    [attr.cy]="leafPositions[i].cy"
                    r="36"
                    [attr.fill]="'url(#leaf-grad-' + i + ')'"
                  />
                }
                @if (!member.image) {
                  <text
                    [attr.x]="leafPositions[i].cx"
                    [attr.y]="leafPositions[i].cy + 7"
                    text-anchor="middle"
                    class="leaf__initials"
                  >{{ member.initials }}</text>
                }
              </a>
            }
          </svg>

          @if (selectedMemberData(); as member) {
            <div class="detail-panel">
              <div class="detail-panel__gradient-bar" [style.background]="member.gradient.border"></div>
              <div class="detail-panel__level" [style.background]="getLevelColor(member.skills)">
                <span class="detail-panel__level-num">{{ getLevel(member.skills).level }}</span>
                <span class="detail-panel__level-label">{{ getLevel(member.skills).label }}</span>
              </div>
              <div class="detail-panel__header">
                <div class="detail-panel__avatar" [style.background]="member.gradient.avatar">
                  @if (member.image) {
                    <img [src]="member.image" [alt]="member.name" class="detail-panel__avatar-img" />
                  } @else {
                    <span class="detail-panel__initials">{{ member.initials }}</span>
                  }
                </div>
                <div class="detail-panel__info">
                  <span class="detail-panel__name">{{ member.name }}</span>
                  <span class="detail-panel__role">{{ member.title }}</span>
                </div>
              </div>
              <p class="detail-panel__bio">{{ member.bio }}</p>
              <div class="detail-panel__tags">
                @for (tag of member.tags; track tag) {
                  <span class="tag">{{ tag }}</span>
                }
              </div>
              <div class="detail-panel__skills" role="list" aria-label="Skills">
                @for (skill of member.skills; track skill.name) {
                  <div class="skill" role="listitem">
                    <div class="skill__header">
                      <span class="skill__name">{{ skill.name }}</span>
                      <span class="skill__badge" [style.background]="getBadgeBg(skill.proficiency)">{{ getSkillBadge(skill.proficiency) }}</span>
                    </div>
                    <div class="skill__bar" role="progressbar" [attr.aria-valuenow]="skill.proficiency" aria-valuemin="0" aria-valuemax="100" [attr.aria-label]="skill.name + ' proficiency: ' + skill.proficiency + '%'">
                      <div class="skill__fill" [style.width.%]="skill.proficiency" [style.background]="getSkillColor(skill.proficiency)"></div>
                    </div>
                    <span class="skill__percent">{{ skill.proficiency }}%</span>
                  </div>
                }
              </div>
            </div>
          }
        </section>
      </div>
    </div>
  `,
  styles: `
    :host { display:flex; align-items:center; justify-content:center; min-height:100dvh; padding:2rem; }
    :host-context(.dark-theme) { background:rgba(12,10,24,.4); backdrop-filter:blur(60px); -webkit-backdrop-filter:blur(60px); }
    .page { position:relative; width:100%; max-width:860px; background:var(--cc-page-bg,rgba(255,255,255,.85)); border-radius:2px 6px 6px 2px; box-shadow:0 4px 24px rgba(0,0,0,.1),inset 6px 0 12px -6px rgba(0,0,0,.15),3px 2px 0 -1px var(--cc-page-edge,rgba(240,240,240,.9)),5px 4px 0 -2px var(--cc-page-edge,rgba(230,230,230,.8)); overflow:hidden; }
    .page::before { content:''; position:absolute; inset:0; border-radius:inherit; background:linear-gradient(to right,rgba(0,0,0,.04) 0%,transparent 3%,transparent 97%,rgba(0,0,0,.02) 100%); pointer-events:none; z-index:1; }
    .page__edges { position:absolute; bottom:-3px; left:4px; right:1px; height:6px; background:var(--cc-page-edge,rgba(240,240,240,.9)); border-radius:0 0 4px 4px; box-shadow:0 2px 0 0 var(--cc-page-edge,rgba(230,230,230,.8)); z-index:-1; }
    .page__content { position:relative; z-index:1; }
    :host-context(.dark-theme) .page { --cc-page-bg:rgba(38,36,58,.7); --cc-page-edge:rgba(58,55,82,.75); border:1px solid rgba(255,255,255,.1); box-shadow:0 6px 40px rgba(0,0,0,.5),inset 6px 0 16px -6px rgba(0,0,0,.35),3px 2px 0 -1px rgba(55,52,78,.85),6px 4px 0 -2px rgba(48,45,70,.75); backdrop-filter:blur(24px); }
    :host-context(.dark-theme) .page__edges { background:rgba(58,55,82,.85); box-shadow:0 2px 0 0 rgba(50,48,72,.75); }
    .crafters { padding:2rem 3rem 3rem; text-align:center; }
    .crafters__heading { margin:0; font-family:var(--cc-font-serif); font-size:clamp(2rem,5vw,3rem); font-weight:400; color:var(--cc-on-surface); }
    .crafters__subtitle { margin:.5rem 0 0; font-family:var(--cc-font-sans); font-size:.9375rem; font-style:italic; color:var(--cc-on-surface); opacity:.5; }

    /* SVG Orbit */
    .orbit__svg { display:block; width:100%; max-width:400px; margin:2rem auto 0; overflow:visible; }
    .orbit__ring { fill:none; stroke:var(--cc-outline,#d1d5db); stroke-width:1; stroke-dasharray:6 4; opacity:0; animation:orbit-ring .6s ease-out forwards; }
    .orbit__center { filter:drop-shadow(0 2px 8px rgba(124,58,237,.3)); }
    .orbit__center-text { fill:#fff; font-family:var(--cc-font-serif); font-size:1.25rem; font-weight:700; pointer-events:none; }

    /* Nodes */
    .leaf { cursor:pointer; opacity:0; transform-origin:center; animation:orbit-in .4s ease-out forwards; outline:none; }
    .leaf:focus-visible { outline:3px solid var(--cc-accent,#7C3AED); outline-offset:3px; }
    .leaf--selected circle { stroke:#fff; stroke-width:3; filter:drop-shadow(0 2px 8px rgba(0,0,0,.25)); }
    .leaf__initials { fill:#fff; font-family:var(--cc-font-serif); font-size:1.375rem; font-weight:700; pointer-events:none; }

    :host-context(.dark-theme) .leaf--selected circle { stroke:rgba(255,255,255,.6); }

    /* Detail Panel */
    .detail-panel { position:relative; margin-top:2rem; padding:2rem; border:.5px solid var(--cc-outline); border-radius:16px; background:var(--cc-page-bg,#fff); text-align:left; overflow:hidden; animation:panel-in .3s ease-out; }
    .detail-panel__gradient-bar { position:absolute; top:0; left:0; right:0; height:4px; }
    .detail-panel__level { position:absolute; top:1rem; right:1rem; display:flex; flex-direction:column; align-items:center; padding:.5rem .75rem; border-radius:10px; color:#fff; box-shadow:0 2px 8px rgba(0,0,0,.15); }
    .detail-panel__level-num { font-family:var(--cc-font-serif); font-size:1.5rem; font-weight:800; line-height:1; }
    .detail-panel__level-label { font-family:var(--cc-font-sans); font-size:.5625rem; font-weight:600; text-transform:uppercase; letter-spacing:.05em; opacity:.9; }
    .detail-panel__header { display:flex; align-items:center; gap:1rem; margin-bottom:1rem; }
    .detail-panel__avatar { width:64px; height:64px; border-radius:50%; display:flex; align-items:center; justify-content:center; flex-shrink:0; border:3px solid #fff; box-shadow:0 4px 8px rgba(0,0,0,.12); }
    :host-context(.dark-theme) .detail-panel__avatar { border-color:rgba(255,255,255,.15); }
    .detail-panel__avatar-img { width:100%; height:100%; border-radius:50%; object-fit:cover; }
    .detail-panel__initials { font-family:var(--cc-font-serif); font-size:1.5rem; font-weight:700; color:#fff; }
    .detail-panel__info { display:flex; flex-direction:column; }
    .detail-panel__name { font-family:var(--cc-font-serif); font-size:1.125rem; font-weight:600; color:var(--cc-on-surface); }
    .detail-panel__role { font-family:var(--cc-font-sans); font-size:.8125rem; font-weight:500; opacity:.55; margin-top:.125rem; }
    .detail-panel__bio { font-family:var(--cc-font-sans); font-size:.875rem; line-height:1.6; opacity:.7; margin:0 0 1rem; }
    .detail-panel__tags { display:flex; flex-wrap:wrap; gap:.5rem; margin-bottom:1.5rem; }
    .tag { font-size:.6875rem; padding:.25rem .625rem; background:var(--cc-surface-variant,#f3f4f6); border-radius:12px; opacity:.7; }
    .detail-panel__skills { display:flex; flex-direction:column; gap:.75rem; padding-top:1rem; border-top:1px solid var(--cc-outline); }

    /* Skill items */
    .skill__header { display:flex; align-items:center; justify-content:space-between; }
    .skill__name { font-size:.75rem; font-weight:500; }
    .skill__badge { font-size:.5625rem; font-weight:600; padding:.125rem .375rem; border-radius:4px; color:#fff; text-transform:uppercase; }
    .skill__bar { height:6px; background:var(--cc-surface-variant,#e5e7eb); border-radius:3px; overflow:hidden; margin-top:.25rem; }
    .skill__fill { height:100%; border-radius:3px; transition:width .4s ease-out; }
    .skill__percent { font-size:.6875rem; opacity:.5; margin-top:.125rem; font-weight:600; }

    /* Animations */
    @keyframes orbit-ring { from { opacity:0; } to { opacity:.5; } }
    @keyframes orbit-in { from { opacity:0; transform:scale(.5); } to { opacity:1; transform:scale(1); } }
    @keyframes panel-in { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }

    @media (prefers-reduced-motion:reduce) {
      .orbit__ring { animation:none; opacity:.5; }
      .leaf { animation:none; opacity:1; }
      .detail-panel { animation:none; }
      .skill__fill { transition:none; }
    }

    @media (max-width:767px) {
      :host { padding:0; }
      .page { max-width:100%; border-radius:0; min-height:100dvh; }
      .crafters { padding:1.5rem 1rem 2rem; }
      .detail-panel { padding:1.25rem; }
      .detail-panel__header { flex-direction:column; align-items:flex-start; }
    }
  `,
})
export class TeamComponent {
  readonly selectedMember = signal<number | null>(null);
  readonly selectedMemberData = computed(() => {
    const idx = this.selectedMember();
    return idx !== null ? this.members[idx] : null;
  });

  readonly leafPositions: LeafPosition[] = [
    // Inner orbit (r=100): CEO, CTO — diagonal placement
    { cx: 271, cy: 129 },
    { cx: 129, cy: 271 },
    // Outer orbit (r=155): CFO, VP Eng, VP Product, VP Ops — cardinal directions
    { cx: 355, cy: 200 },
    { cx: 200, cy: 355 },
    { cx: 45, cy: 200 },
    { cx: 200, cy: 45 },
  ];

  readonly members: TeamMember[] = [
    {
      name: 'Victoria Hartwell', title: 'Chief Executive Officer', initials: 'V',
      bio: 'Strategic business leader with expertise in digital transformation and market innovation',
      tags: ['Leadership', 'Strategy', 'Vision'],
      gradient: { number: 'linear-gradient(135deg, #7C3AED, #EC4899)', avatar: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', border: 'linear-gradient(90deg, #7C3AED, #EC4899)' },
      colors: { from: '#7C3AED', to: '#EC4899' },
      image: 'images/mio.jpg',
      skills: [
        { name: 'Strategic Planning', proficiency: 95, category: 'leadership' },
        { name: 'Team Leadership', proficiency: 92, category: 'leadership' },
        { name: 'Business Development', proficiency: 88, category: 'domain' },
        { name: 'Market Analysis', proficiency: 90, category: 'domain' },
      ],
    },
    {
      name: 'David Nakamura', title: 'Chief Technology Officer', initials: 'D',
      bio: 'Technology visionary architecting scalable systems and driving innovation',
      tags: ['Technology', 'Architecture', 'Innovation'],
      gradient: { number: 'linear-gradient(135deg, #14B8A6, #2DD4BF)', avatar: 'linear-gradient(135deg, #14B8A6 0%, #2DD4BF 100%)', border: 'linear-gradient(90deg, #14B8A6, #2DD4BF)' },
      colors: { from: '#14B8A6', to: '#2DD4BF' },
      image: 'images/dejan.jpg',
      skills: [
        { name: 'System Architecture', proficiency: 98, category: 'technical' },
        { name: 'Cloud Infrastructure', proficiency: 96, category: 'technical' },
        { name: 'Technical Leadership', proficiency: 94, category: 'leadership' },
        { name: 'AI/ML Integration', proficiency: 85, category: 'technical' },
      ],
    },
    {
      name: 'Catherine Bennett', title: 'Chief Financial Officer', initials: 'C',
      bio: 'Financial strategist ensuring sustainable growth and fiscal responsibility',
      tags: ['Finance', 'Planning', 'Governance'],
      gradient: { number: 'linear-gradient(135deg, #F59E0B, #FBBF24)', avatar: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', border: 'linear-gradient(90deg, #F59E0B, #FBBF24)' },
      colors: { from: '#F59E0B', to: '#FBBF24' },
      skills: [
        { name: 'Financial Planning', proficiency: 96, category: 'domain' },
        { name: 'Risk Management', proficiency: 92, category: 'domain' },
        { name: 'Budget Optimization', proficiency: 94, category: 'domain' },
        { name: 'Strategic Finance', proficiency: 90, category: 'leadership' },
      ],
    },
    {
      name: 'Alexander Mueller', title: 'Vice President of Engineering', initials: 'A',
      bio: 'Engineering leader building high-performance teams and delivering enterprise solutions',
      tags: ['Engineering', 'Leadership', 'Quality'],
      gradient: { number: 'linear-gradient(135deg, #EC4899, #F472B6)', avatar: 'linear-gradient(135deg, #EC4899 0%, #F472B6 100%)', border: 'linear-gradient(90deg, #EC4899, #F472B6)' },
      colors: { from: '#EC4899', to: '#F472B6' },
      skills: [
        { name: 'Team Management', proficiency: 90, category: 'leadership' },
        { name: 'Full-Stack Development', proficiency: 92, category: 'technical' },
        { name: 'Code Quality', proficiency: 94, category: 'technical' },
        { name: 'System Design', proficiency: 91, category: 'technical' },
        { name: 'DevOps/CI-CD', proficiency: 88, category: 'technical' },
      ],
    },
    {
      name: 'Jessica Park', title: 'Vice President of Product', initials: 'J',
      bio: 'Product strategist translating market needs into innovative solutions',
      tags: ['Product', 'Market', 'Innovation'],
      gradient: { number: 'linear-gradient(135deg, #06B6D4, #22D3EE)', avatar: 'linear-gradient(135deg, #06B6D4 0%, #22D3EE 100%)', border: 'linear-gradient(90deg, #06B6D4, #22D3EE)' },
      colors: { from: '#06B6D4', to: '#22D3EE' },
      skills: [
        { name: 'Product Strategy', proficiency: 93, category: 'domain' },
        { name: 'User Research', proficiency: 89, category: 'domain' },
        { name: 'Market Analysis', proficiency: 91, category: 'domain' },
        { name: 'Roadmap Planning', proficiency: 90, category: 'leadership' },
        { name: 'Stakeholder Management', proficiency: 88, category: 'leadership' },
      ],
    },
    {
      name: "Michael O'Brien", title: 'Vice President of Operations', initials: 'M',
      bio: 'Operations expert streamlining processes and driving organizational excellence',
      tags: ['Operations', 'Service', 'Excellence'],
      gradient: { number: 'linear-gradient(135deg, #10B981, #34D399)', avatar: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)', border: 'linear-gradient(90deg, #10B981, #34D399)' },
      colors: { from: '#10B981', to: '#34D399' },
      skills: [
        { name: 'Process Optimization', proficiency: 94, category: 'domain' },
        { name: 'Project Management', proficiency: 92, category: 'leadership' },
        { name: 'Team Coordination', proficiency: 90, category: 'leadership' },
        { name: 'Vendor Management', proficiency: 87, category: 'domain' },
        { name: 'Compliance', proficiency: 89, category: 'domain' },
      ],
    },
  ];

  selectMember(index: number): void {
    this.selectedMember.update(current => current === index ? null : index);
  }

  getSkillBadge(proficiency: number): string {
    return skillBadge(proficiency);
  }

  getSkillColor(proficiency: number): string {
    return skillColor(proficiency);
  }

  getBadgeBg(proficiency: number): string {
    return badgeBg(proficiency);
  }

  getLevel(skills: Skill[]): MemberLevel {
    return memberLevel(skills);
  }

  getLevelColor(skills: Skill[]): string {
    return levelColor(memberLevel(skills).level);
  }
}
