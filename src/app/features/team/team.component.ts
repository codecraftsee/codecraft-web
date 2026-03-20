import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
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
  image?: string;
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

          <div class="showcase">
            @for (member of members; track member.name; let i = $index) {
              <div
                class="member-card"
                [class.active]="activeIndex() === i"
                [class.expanded]="expandedSkills() === i"
                (mouseenter)="activate(i)"
                (mouseleave)="deactivate()"
              >
                <div class="member-card__gradient-bar" [style.background]="member.gradient.border"></div>
                <span class="member-card__number" [style.background]="member.gradient.number">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <div class="member-card__avatar" [style.background]="member.gradient.avatar">
                  @if (member.image) {
                    <img [src]="member.image" [alt]="member.name" class="member-card__avatar-img" />
                  } @else {
                    <span class="member-card__initials">{{ member.initials }}</span>
                  }
                </div>
                <span class="member-card__name">{{ member.name }}</span>
                <span class="member-card__role">{{ member.title }}</span>
                <p class="member-card__bio">{{ member.bio }}</p>
                <div class="member-card__tags">
                  @for (tag of member.tags; track tag) {
                    <span class="tag">{{ tag }}</span>
                  }
                </div>

                <button
                  class="skills-toggle"
                  [class.active]="expandedSkills() === i"
                  (click)="toggleSkills(i)"
                  [attr.aria-expanded]="expandedSkills() === i"
                  [attr.aria-controls]="'skills-' + i"
                >
                  <span>{{ expandedSkills() === i ? 'Hide Skills' : 'Show Skills' }}</span>
                  <span class="skills-toggle__icon" [class.open]="expandedSkills() === i">&#9662;</span>
                </button>

                <div
                  class="skills-section"
                  [class.expanded]="expandedSkills() === i"
                  [attr.id]="'skills-' + i"
                  role="list"
                  aria-label="Skills"
                >
                  @if (expandedSkills() === i) {
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
                  }
                </div>
              </div>
            }
          </div>
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
    .showcase { display:grid; grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:2.5rem; margin-top:2rem; text-align:left; position:relative; }
    .showcase::before { content:''; position:absolute; top:0; left:0; right:0; height:2px; background:linear-gradient(90deg,transparent,#7C3AED,#EC4899,#14B8A6,#F59E0B,#06B6D4,#10B981,transparent); opacity:.6; }
    .member-card { position:relative; display:flex; flex-direction:column; padding:2rem; border:.5px solid var(--cc-outline); border-radius:16px; color:var(--cc-on-surface); overflow:hidden; transition:transform .3s,box-shadow .3s,border-color .3s; background:var(--cc-page-bg,#fff); }
    .member-card:hover,.member-card.active { transform:translateY(-8px); box-shadow:0 20px 40px rgba(0,0,0,.12); border-color:var(--cc-accent); }
    .member-card__gradient-bar { position:absolute; top:0; left:0; right:0; height:4px; }
    .member-card__number { font-family:var(--cc-font-serif); font-size:3rem; font-weight:700; line-height:1; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; color:transparent; margin-bottom:1rem; }
    .member-card__avatar { width:80px; height:80px; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:1.5rem; border:3px solid #fff; box-shadow:0 6px 12px rgba(0,0,0,.12); }
    :host-context(.dark-theme) .member-card__avatar { border-color:rgba(255,255,255,.15); }
    .member-card__avatar-img { width:100%; height:100%; border-radius:50%; object-fit:cover; }
    .member-card__initials { font-family:var(--cc-font-serif); font-size:2rem; font-weight:700; color:#fff; }
    .member-card__name { font-family:var(--cc-font-serif); font-size:1rem; font-weight:600; }
    .member-card__role { font-family:var(--cc-font-sans); font-size:.75rem; font-weight:500; opacity:.55; margin-top:.25rem; }
    .member-card__bio { font-family:var(--cc-font-sans); font-size:.8125rem; line-height:1.6; opacity:.7; margin:1rem 0 0; }
    .member-card__tags { display:flex; flex-wrap:wrap; gap:.5rem; margin-top:1rem; }
    .tag { font-size:.6875rem; padding:.25rem .625rem; background:var(--cc-surface-variant,#f3f4f6); border-radius:12px; opacity:.7; }
    .skills-toggle { display:flex; align-items:center; justify-content:space-between; width:100%; margin-top:1rem; padding:.5rem .75rem; border:1px solid var(--cc-outline); border-radius:8px; background:var(--cc-surface-variant,#f9fafb); font-size:.75rem; font-weight:500; color:var(--cc-on-surface); opacity:.7; cursor:pointer; transition:background .3s,border-color .3s; }
    .skills-toggle:hover { border-color:var(--cc-accent); }
    .skills-toggle.active { background:rgba(6,182,212,.08); border-color:#7dd3fc; opacity:1; }
    .skills-toggle:focus-visible { outline:2px solid var(--cc-accent); outline-offset:2px; }
    .skills-toggle__icon { font-size:.625rem; transition:transform .3s; }
    .skills-toggle__icon.open { transform:rotate(180deg); }
    .skills-section { max-height:0; overflow:hidden; transition:max-height .3s,opacity .3s; opacity:0; }
    .skills-section.expanded { max-height:600px; opacity:1; margin-top:1.5rem; padding-top:1.5rem; border-top:1px solid var(--cc-outline); display:flex; flex-direction:column; gap:.75rem; }
    .skill__header { display:flex; align-items:center; justify-content:space-between; }
    .skill__name { font-size:.75rem; font-weight:500; }
    .skill__badge { font-size:.5625rem; font-weight:600; padding:.125rem .375rem; border-radius:4px; color:#fff; text-transform:uppercase; }
    .skill__bar { height:6px; background:var(--cc-surface-variant,#e5e7eb); border-radius:3px; overflow:hidden; margin-top:.25rem; }
    .skill__fill { height:100%; border-radius:3px; transition:width .4s ease-out; }
    .skill__percent { font-size:.6875rem; opacity:.5; margin-top:.125rem; font-weight:600; }
    @media (prefers-reduced-motion:reduce) { .member-card:hover,.member-card.active { transform:none; } .skill__fill,.skills-section { transition:none; } }
    @media (max-width:767px) { :host { padding:0; } .page { max-width:100%; border-radius:0; min-height:100dvh; } .crafters { padding:1.5rem 1rem 2rem; } .showcase { grid-template-columns:1fr; gap:1.5rem; } .member-card__number { font-size:2.25rem; } }
  `,
})
export class TeamComponent {
  readonly activeIndex = signal<number | null>(null);
  readonly expandedSkills = signal<number | null>(null);

  readonly members: TeamMember[] = [
    {
      name: 'Victoria Hartwell', title: 'Chief Executive Officer', initials: 'V',
      bio: 'Strategic business leader with expertise in digital transformation and market innovation',
      tags: ['Leadership', 'Strategy', 'Vision'],
      gradient: { number: 'linear-gradient(135deg, #7C3AED, #EC4899)', avatar: 'linear-gradient(135deg, #7C3AED 0%, #EC4899 100%)', border: 'linear-gradient(90deg, #7C3AED, #EC4899)' },
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
      skills: [
        { name: 'Process Optimization', proficiency: 94, category: 'domain' },
        { name: 'Project Management', proficiency: 92, category: 'leadership' },
        { name: 'Team Coordination', proficiency: 90, category: 'leadership' },
        { name: 'Vendor Management', proficiency: 87, category: 'domain' },
        { name: 'Compliance', proficiency: 89, category: 'domain' },
      ],
    },
  ];

  getSkillBadge(proficiency: number): string {
    return skillBadge(proficiency);
  }

  getSkillColor(proficiency: number): string {
    return skillColor(proficiency);
  }

  getBadgeBg(proficiency: number): string {
    return badgeBg(proficiency);
  }

  activate(index: number): void {
    this.activeIndex.set(index);
  }

  deactivate(): void {
    this.activeIndex.set(null);
  }

  toggleSkills(index: number): void {
    this.expandedSkills.update(current => current === index ? null : index);
  }
}
