import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let fixture: ComponentFixture<TeamComponent>;
  let component: TeamComponent;

  beforeEach(() => {
    window.matchMedia = (query: string) =>
      ({ matches: false, media: query, addEventListener: () => {}, removeEventListener: () => {} }) as unknown as MediaQueryList;

    TestBed.configureTestingModule({
      imports: [TeamComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the chapter heading', () => {
    const heading = fixture.nativeElement.querySelector('.crafters__heading');
    expect(heading.textContent.trim()).toBe('Code Crafters');
  });

  it('includes the chapter header', () => {
    expect(fixture.nativeElement.querySelector('cc-chapter-header')).toBeTruthy();
  });

  it('has the page wrapper', () => {
    expect(fixture.nativeElement.querySelector('.page')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.page__edges')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.page__content')).toBeTruthy();
  });

  it('renders SVG orbit with correct viewBox', () => {
    const svg = fixture.nativeElement.querySelector('.orbit__svg');
    expect(svg).toBeTruthy();
    expect(svg.getAttribute('viewBox')).toBe('0 0 400 400');
  });

  it('renders 2 orbit rings', () => {
    const rings = fixture.nativeElement.querySelectorAll('.orbit__ring');
    expect(rings.length).toBe(2);
  });

  it('renders the center element', () => {
    const center = fixture.nativeElement.querySelector('.orbit__center');
    expect(center).toBeTruthy();
  });

  it('renders 6 leaf elements with aria-labels', () => {
    const leaves = fixture.nativeElement.querySelectorAll('.leaf');
    expect(leaves.length).toBe(6);
    leaves.forEach((leaf: Element, i: number) => {
      const label = leaf.getAttribute('aria-label');
      expect(label).toContain(component.members[i].name);
      expect(label).toContain(component.members[i].title);
    });
  });

  it('leaves have circles with initials text or images', () => {
    const leaves = fixture.nativeElement.querySelectorAll('.leaf');
    leaves.forEach((leaf: Element, i: number) => {
      if (component.members[i].image) {
        expect(leaf.querySelector('image')).toBeTruthy();
        expect(leaf.querySelector('.leaf__initials')).toBeNull();
      } else {
        expect(leaf.querySelector('circle')).toBeTruthy();
        expect(leaf.querySelector('.leaf__initials')?.textContent?.trim()).toBe(component.members[i].initials);
      }
    });
  });

  it('selectedMember defaults to null — no detail panel', () => {
    expect(component.selectedMember()).toBeNull();
    expect(fixture.nativeElement.querySelector('.detail-panel')).toBeNull();
  });

  it('selectMember(0) renders detail panel with correct member data', () => {
    component.selectMember(0);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.detail-panel');
    expect(panel).toBeTruthy();

    const name = panel.querySelector('.detail-panel__name');
    expect(name.textContent.trim()).toBe(component.members[0].name);

    const role = panel.querySelector('.detail-panel__role');
    expect(role.textContent.trim()).toBe(component.members[0].title);
  });

  it('panel shows bio, tags, and skills', () => {
    component.selectMember(0);
    fixture.detectChanges();

    const panel = fixture.nativeElement.querySelector('.detail-panel');
    const bio = panel.querySelector('.detail-panel__bio');
    expect(bio.textContent.trim()).toBe(component.members[0].bio);

    const tags = panel.querySelectorAll('.tag');
    const tagTexts = Array.from(tags).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(tagTexts).toEqual(component.members[0].tags);

    const skills = panel.querySelectorAll('.skill');
    expect(skills.length).toBe(component.members[0].skills.length);
  });

  it('skill badges show correct level text', () => {
    component.selectMember(0);
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('.skill__badge');
    // First skill: Strategic Planning at 95% → expert
    expect((badges[0] as HTMLElement).textContent?.trim()).toBe('expert');
  });

  it('skill bar widths match proficiency', () => {
    component.selectMember(0);
    fixture.detectChanges();

    const fills = fixture.nativeElement.querySelectorAll('.skill__fill');
    expect((fills[0] as HTMLElement).style.width).toBe('95%');
  });

  it('selectMember(0) twice collapses panel', () => {
    component.selectMember(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.detail-panel')).toBeTruthy();

    component.selectMember(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.detail-panel')).toBeNull();
  });

  it('selectMember(0) then selectMember(2) swaps to member 2', () => {
    component.selectMember(0);
    fixture.detectChanges();

    component.selectMember(2);
    fixture.detectChanges();

    const name = fixture.nativeElement.querySelector('.detail-panel__name');
    expect(name.textContent.trim()).toBe(component.members[2].name);
  });

  it('getSkillBadge returns correct levels', () => {
    expect(component.getSkillBadge(95)).toBe('expert');
    expect(component.getSkillBadge(85)).toBe('advanced');
    expect(component.getSkillBadge(75)).toBe('intermediate');
    expect(component.getSkillBadge(65)).toBe('developing');
  });

  it('each member has skills with valid proficiency values', () => {
    component.members.forEach(member => {
      expect(member.skills.length).toBeGreaterThan(0);
      member.skills.forEach(skill => {
        expect(skill.proficiency).toBeGreaterThanOrEqual(50);
        expect(skill.proficiency).toBeLessThanOrEqual(100);
      });
    });
  });

  it('member with image renders image element in SVG', () => {
    const imgFixture = TestBed.createComponent(TeamComponent);
    const imgComponent = imgFixture.componentInstance;
    (imgComponent as unknown as { members: unknown[] }).members = [
      { ...imgComponent.members[0], image: 'https://example.com/photo.jpg' },
      ...imgComponent.members.slice(1),
    ];
    imgFixture.detectChanges();

    const leaf = imgFixture.nativeElement.querySelector('.leaf');
    const image = leaf.querySelector('image');
    expect(image).toBeTruthy();
    expect(image.getAttribute('href')).toBe('https://example.com/photo.jpg');

    // Should not render circle for image member
    expect(leaf.querySelector('circle')).toBeNull();
  });

  it('SVG has role="img" and aria-label', () => {
    const svg = fixture.nativeElement.querySelector('.orbit__svg');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toBe('Team orbital diagram');
  });

  it('detail panel shows level badge in top corner', () => {
    component.selectMember(0);
    fixture.detectChanges();

    const level = fixture.nativeElement.querySelector('.detail-panel__level');
    expect(level).toBeTruthy();
    const num = level.querySelector('.detail-panel__level-num');
    const label = level.querySelector('.detail-panel__level-label');
    // Victoria's avg: (95+92+88+90)/4 = 91.25 → level 4 expert
    expect(num.textContent.trim()).toBe('4');
    expect(label.textContent.trim()).toBe('expert');
  });

  it('getLevel returns correct levels based on average proficiency', () => {
    expect(component.getLevel([{ name: 'a', proficiency: 97, category: 'technical' }])).toEqual({ level: 6, label: 'guru' });
    expect(component.getLevel([{ name: 'a', proficiency: 94, category: 'technical' }])).toEqual({ level: 5, label: 'master' });
    expect(component.getLevel([{ name: 'a', proficiency: 92, category: 'technical' }])).toEqual({ level: 4, label: 'expert' });
    expect(component.getLevel([{ name: 'a', proficiency: 90, category: 'technical' }])).toEqual({ level: 3, label: 'advanced' });
    expect(component.getLevel([{ name: 'a', proficiency: 70, category: 'technical' }])).toEqual({ level: 2, label: 'medium' });
    expect(component.getLevel([{ name: 'a', proficiency: 60, category: 'technical' }])).toEqual({ level: 1, label: 'beginner' });
    expect(component.getLevel([{ name: 'a', proficiency: 50, category: 'technical' }])).toEqual({ level: 0, label: 'novice' });
  });

  it('skill bars have progressbar role with aria attributes', () => {
    component.selectMember(0);
    fixture.detectChanges();

    const bars = fixture.nativeElement.querySelectorAll('.skill__bar');
    bars.forEach((bar: Element) => {
      expect(bar.getAttribute('role')).toBe('progressbar');
      expect(bar.getAttribute('aria-valuemin')).toBe('0');
      expect(bar.getAttribute('aria-valuemax')).toBe('100');
      expect(bar.getAttribute('aria-valuenow')).toBeTruthy();
    });
  });
});
