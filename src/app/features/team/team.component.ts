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
  thought: string;
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

function levelGradientColors(level: number): { from: string; to: string } {
  switch (level) {
    case 6: return { from: '#F59E0B', to: '#FBBF24' };
    case 5: return { from: '#EC4899', to: '#F472B6' };
    case 4: return { from: '#10B981', to: '#34D399' };
    case 3: return { from: '#3B82F6', to: '#60A5FA' };
    case 2: return { from: '#8B5CF6', to: '#A78BFA' };
    case 1: return { from: '#06B6D4', to: '#22D3EE' };
    default: return { from: '#9CA3AF', to: '#D1D5DB' };
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

          <svg class="starmap__svg" viewBox="0 0 520 460" role="img" aria-label="Team constellation diagram">
            <defs>
              <radialGradient id="sun-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FBBF24" stop-opacity="1" />
                <stop offset="60%" stop-color="#F59E0B" stop-opacity="0.9" />
                <stop offset="100%" stop-color="#F97316" stop-opacity="0.7" />
              </radialGradient>
              <filter id="star-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              <filter id="core-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
              @for (member of members; track member.name; let i = $index) {
                <linearGradient [attr.id]="'leaf-grad-' + i" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" [attr.stop-color]="getLevelGradientColors(member.skills).from" />
                  <stop offset="100%" [attr.stop-color]="getLevelGradientColors(member.skills).to" />
                </linearGradient>
                <clipPath [attr.id]="'leaf-clip-' + i">
                  <circle [attr.cx]="leafPositions[i].cx" [attr.cy]="leafPositions[i].cy" r="36" />
                </clipPath>
              }
            </defs>

            <!-- background stars -->
            @for (star of backgroundStars; track $index; let i = $index) {
              <circle class="starfield__dot"
                [attr.cx]="star.cx" [attr.cy]="star.cy" [attr.r]="star.r"
                [style.opacity]="star.opacity"
                [style.animation-delay]="(i * 0.04) + 's'" />
            }

            <!-- constellation lines -->
            @for (edge of constellationEdges; track $index; let i = $index) {
              <line class="starmap__line"
                [attr.x1]="edge.x1" [attr.y1]="edge.y1"
                [attr.x2]="edge.x2" [attr.y2]="edge.y2"
                [style.animation-delay]="(0.4 + i * 0.06) + 's'" />
            }

            <!-- center star -->
            <circle class="starmap__core" cx="260" cy="230" r="38" fill="url(#sun-grad)" filter="url(#core-glow)" />
            <image x="230" y="219" width="60" height="22" href="images/codecraft.svg" class="starmap__core-logo" />

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
                [style.animation-delay]="(0.5 + i * 0.1) + 's'"
                filter="url(#star-glow)"
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
              <g class="thought-bubble" [style.animation-delay]="(0.8 + i * 0.1) + 's'">
                <rect class="thought-bubble__bg"
                  [attr.x]="leafPositions[i].cx - 60"
                  [attr.y]="leafPositions[i].cy + bubbleOffsets[i] - 12"
                  width="120" height="24" rx="6" />
                <text class="thought-bubble__text"
                  [attr.x]="leafPositions[i].cx"
                  [attr.y]="leafPositions[i].cy + bubbleOffsets[i] + 4"
                  text-anchor="middle">{{ member.thought }}</text>
              </g>
            }
          </svg>

          @if (selectedMemberData(); as member) {
            <div class="detail-panel">
              <div class="detail-panel__gradient-bar" [style.background]="getLevelColor(member.skills)"></div>
              <div class="detail-panel__level" [style.background]="getLevelColor(member.skills)">
                <span class="detail-panel__level-num">{{ getLevel(member.skills).level }}</span>
                <span class="detail-panel__level-label">{{ getLevel(member.skills).label }}</span>
              </div>
              <div class="detail-panel__header">
                <div class="detail-panel__avatar" [style.background]="getLevelColor(member.skills)">
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

    /* SVG Starmap */
    .starmap__svg { display:block; width:100%; max-width:520px; margin:2rem auto 0; overflow:visible; }
    .starfield__dot { fill:var(--cc-outline,#d1d5db); opacity:0; animation:star-twinkle .6s ease-out forwards; }
    .starmap__line { stroke:var(--cc-outline,#d1d5db); stroke-width:1; opacity:0; animation:line-draw .5s ease-out forwards; }
    .starmap__core { opacity:0; transform-origin:260px 230px; animation:core-in .5s ease-out .3s forwards; }
    .starmap__core-logo { pointer-events:none; }
    :host-context(.dark-theme) .starmap__line { stroke:rgba(180,154,255,.25); }
    :host-context(.dark-theme) .starfield__dot { fill:rgba(255,255,255,.2); }

    /* Nodes */
    .leaf { cursor:pointer; opacity:0; transform-origin:center; animation:star-in .4s ease-out forwards; outline:none; }
    .leaf:focus-visible { outline:3px solid var(--cc-accent,#7C3AED); outline-offset:3px; }
    .leaf--selected circle { stroke:#fff; stroke-width:3; filter:drop-shadow(0 2px 8px rgba(0,0,0,.25)); }
    .leaf__initials { fill:#fff; font-family:var(--cc-font-serif); font-size:1.375rem; font-weight:700; pointer-events:none; }

    :host-context(.dark-theme) .leaf--selected circle { stroke:rgba(255,255,255,.6); }

    /* Thought Bubbles */
    .thought-bubble { opacity:0; animation:bubble-in .4s ease-out forwards; }
    .thought-bubble__bg { fill:var(--cc-page-bg,rgba(255,255,255,.9)); stroke:var(--cc-outline,#d1d5db); stroke-width:0.5; }
    .thought-bubble__text { fill:var(--cc-on-surface,#333); font-family:var(--cc-font-sans); font-size:.5rem; font-style:italic; opacity:.7; pointer-events:none; }

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
    @keyframes star-twinkle { from { opacity:0; } to { opacity:var(--star-opacity,.3); } }
    @keyframes line-draw { from { opacity:0; } to { opacity:.25; } }
    @keyframes core-in { from { opacity:0; transform:scale(.5); } to { opacity:1; transform:scale(1); } }
    @keyframes star-in { from { opacity:0; transform:scale(.3); } to { opacity:1; transform:scale(1); } }
    @keyframes panel-in { from { opacity:0; transform:translateY(-12px); } to { opacity:1; transform:translateY(0); } }
    @keyframes bubble-in { from { opacity:0; } to { opacity:1; } }

    @media (prefers-reduced-motion:reduce) {
      .starfield__dot { animation:none; }
      .starmap__line { animation:none; opacity:.25; }
      .starmap__core { animation:none; opacity:1; }
      .leaf { animation:none; opacity:1; }
      .detail-panel { animation:none; }
      .thought-bubble { animation:none; opacity:1; }
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
    // Constellation: organic asymmetric star-map positions
    { cx: 310, cy: 88 },   // CEO — upper right, "north star"
    { cx: 155, cy: 130 },  // CTO — upper left
    { cx: 80, cy: 268 },   // CFO — left mid-low
    { cx: 215, cy: 370 },  // VP Eng — bottom center-left
    { cx: 385, cy: 345 },  // VP Product — bottom right
    { cx: 430, cy: 195 },  // VP Ops — right upper-mid
  ];

  // Bubble Y offset per member: positive = below avatar, negative = above
  readonly bubbleOffsets: number[] = [
    50,   // CEO (cy=88) — below
    50,   // CTO (cy=130) — below
    -55,  // CFO (cy=268) — above
    -55,  // VP Eng (cy=370) — above
    -55,  // VP Product (cy=345) — above
    -55,  // VP Ops (cy=195) — above
  ];

  readonly constellationEdges: { x1: number; y1: number; x2: number; y2: number }[] = [
    // Outer ring
    { x1: 310, y1: 88, x2: 155, y2: 130 },    // CEO — CTO
    { x1: 155, y1: 130, x2: 80, y2: 268 },     // CTO — CFO
    { x1: 80, y1: 268, x2: 215, y2: 370 },     // CFO — VP Eng
    { x1: 215, y1: 370, x2: 385, y2: 345 },    // VP Eng — VP Product
    { x1: 385, y1: 345, x2: 430, y2: 195 },    // VP Product — VP Ops
    { x1: 430, y1: 195, x2: 310, y2: 88 },     // VP Ops — CEO
    // Spokes to center
    { x1: 260, y1: 230, x2: 310, y2: 88 },     // CC — CEO
    { x1: 260, y1: 230, x2: 155, y2: 130 },    // CC — CTO
    { x1: 260, y1: 230, x2: 215, y2: 370 },    // CC — VP Eng
  ];

  readonly backgroundStars: { cx: number; cy: number; r: number; opacity: number }[] = [
    { cx: 42, cy: 55, r: 0.8, opacity: 0.2 }, { cx: 478, cy: 32, r: 1.2, opacity: 0.3 },
    { cx: 18, cy: 180, r: 0.6, opacity: 0.15 }, { cx: 495, cy: 140, r: 1, opacity: 0.25 },
    { cx: 60, cy: 410, r: 0.8, opacity: 0.2 }, { cx: 450, cy: 420, r: 0.6, opacity: 0.18 },
    { cx: 120, cy: 40, r: 1, opacity: 0.22 }, { cx: 380, cy: 55, r: 0.7, opacity: 0.2 },
    { cx: 240, cy: 25, r: 0.9, opacity: 0.25 }, { cx: 30, cy: 320, r: 0.7, opacity: 0.18 },
    { cx: 500, cy: 280, r: 1.1, opacity: 0.28 }, { cx: 170, cy: 440, r: 0.6, opacity: 0.15 },
    { cx: 350, cy: 440, r: 0.8, opacity: 0.2 }, { cx: 90, cy: 140, r: 0.5, opacity: 0.12 },
    { cx: 470, cy: 370, r: 0.9, opacity: 0.22 }, { cx: 260, cy: 450, r: 0.7, opacity: 0.16 },
    { cx: 15, cy: 70, r: 1, opacity: 0.2 }, { cx: 510, cy: 90, r: 0.6, opacity: 0.18 },
    { cx: 140, cy: 295, r: 0.5, opacity: 0.14 }, { cx: 420, cy: 110, r: 0.8, opacity: 0.22 },
    { cx: 55, cy: 440, r: 0.7, opacity: 0.16 }, { cx: 330, cy: 15, r: 1.1, opacity: 0.25 },
    { cx: 195, cy: 55, r: 0.6, opacity: 0.18 }, { cx: 480, cy: 240, r: 0.5, opacity: 0.14 },
  ];

  readonly members: TeamMember[] = [
    {
      name: 'Miodrag Pavkovic', title: 'Chief Executive Officer', initials: 'M', thought: 'Vision drives innovation.',
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
      name: 'Dejan Blanarik', title: 'Chief Technology Officer', initials: 'D', thought: 'Architecture is destiny.',
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
      name: 'Marija Seder', title: 'Chief Financial Officer', initials: 'M', thought: 'Numbers tell the story.',
      bio: 'Financial strategist ensuring sustainable growth and fiscal responsibility',
      tags: ['Finance', 'Planning', 'Governance'],
      gradient: { number: 'linear-gradient(135deg, #F59E0B, #FBBF24)', avatar: 'linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)', border: 'linear-gradient(90deg, #F59E0B, #FBBF24)' },
      colors: { from: '#F59E0B', to: '#FBBF24' },
      image: 'images/marija.jpg',
      skills: [
        { name: 'Financial Planning', proficiency: 96, category: 'domain' },
        { name: 'Risk Management', proficiency: 92, category: 'domain' },
        { name: 'Budget Optimization', proficiency: 94, category: 'domain' },
        { name: 'Strategic Finance', proficiency: 90, category: 'leadership' },
      ],
    },
    {
      name: 'Alexander Mueller', title: 'Vice President of Engineering', initials: 'A', thought: 'Quality is non-negotiable.',
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
      name: 'Jessica Park', title: 'Vice President of Product', initials: 'J', thought: 'Users come first.',
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
      name: "Michael O'Brien", title: 'Vice President of Operations', initials: 'M', thought: 'Process enables freedom.',
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

  getLevelGradientColors(skills: Skill[]): { from: string; to: string } {
    return levelGradientColors(memberLevel(skills).level);
  }
}
