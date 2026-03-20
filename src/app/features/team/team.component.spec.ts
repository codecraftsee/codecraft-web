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

  it('renders 6 member cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.member-card');
    expect(cards.length).toBe(6);
  });

  it('each card has number, name, role, bio, and tags', () => {
    const cards = fixture.nativeElement.querySelectorAll('.member-card');
    cards.forEach((card: HTMLElement) => {
      expect(card.querySelector('.member-card__number')).toBeTruthy();
      expect(card.querySelector('.member-card__name')).toBeTruthy();
      expect(card.querySelector('.member-card__role')).toBeTruthy();
      expect(card.querySelector('.member-card__bio')).toBeTruthy();
      expect(card.querySelector('.member-card__tags')).toBeTruthy();
    });
  });

  it('number text matches formatted index 01–06', () => {
    const numbers = fixture.nativeElement.querySelectorAll('.member-card__number');
    const texts = Array.from(numbers).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(texts).toEqual(['01', '02', '03', '04', '05', '06']);
  });

  it('displays correct member names', () => {
    const names = fixture.nativeElement.querySelectorAll('.member-card__name');
    const nameTexts = Array.from(names).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(nameTexts).toEqual(component.members.map(m => m.name));
  });

  it('displays correct member titles', () => {
    const roles = fixture.nativeElement.querySelectorAll('.member-card__role');
    const roleTexts = Array.from(roles).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(roleTexts).toEqual(component.members.map(m => m.title));
  });

  it('gradient bar has inline gradient style', () => {
    const bars = fixture.nativeElement.querySelectorAll('.member-card__gradient-bar');
    bars.forEach((bar: HTMLElement) => {
      const style = bar.getAttribute('style') || '';
      expect(style).toContain('linear-gradient');
    });
  });

  it('avatar shows initials for members without image', () => {
    const initials = fixture.nativeElement.querySelectorAll('.member-card__initials');
    expect(initials.length).toBe(component.members.filter(m => !m.image).length);
    const texts = Array.from(initials).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(texts).toEqual(component.members.filter(m => !m.image).map(m => m.initials));
  });

  it('includes the chapter header', () => {
    expect(fixture.nativeElement.querySelector('cc-chapter-header')).toBeTruthy();
  });

  it('has the page wrapper', () => {
    expect(fixture.nativeElement.querySelector('.page')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.page__edges')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.page__content')).toBeTruthy();
  });

  it('activeIndex signal defaults to null', () => {
    expect(component.activeIndex()).toBeNull();
  });

  it('activate sets activeIndex and deactivate clears it', () => {
    component.activate(2);
    expect(component.activeIndex()).toBe(2);
    component.deactivate();
    expect(component.activeIndex()).toBeNull();
  });

  it('cards display bio text', () => {
    const bios = fixture.nativeElement.querySelectorAll('.member-card__bio');
    const bioTexts = Array.from(bios).map((el: unknown) => (el as HTMLElement).textContent?.trim());
    expect(bioTexts).toEqual(component.members.map(m => m.bio));
  });

  it('cards display tags', () => {
    const cards = fixture.nativeElement.querySelectorAll('.member-card');
    cards.forEach((card: HTMLElement, i: number) => {
      const tags = card.querySelectorAll('.tag');
      const tagTexts = Array.from(tags).map((el: unknown) => (el as HTMLElement).textContent?.trim());
      expect(tagTexts).toEqual(component.members[i].tags);
    });
  });

  it('each card has a Show Skills button', () => {
    const buttons = fixture.nativeElement.querySelectorAll('.skills-toggle');
    expect(buttons.length).toBe(6);
    buttons.forEach((btn: HTMLButtonElement) => {
      expect(btn.textContent).toContain('Show Skills');
    });
  });

  it('skills section is hidden by default', () => {
    expect(fixture.nativeElement.querySelector('.skill')).toBeNull();
  });

  it('toggleSkills expands skills for a member', () => {
    component.toggleSkills(0);
    fixture.detectChanges();

    const skills = fixture.nativeElement.querySelectorAll('.skill');
    expect(skills.length).toBe(component.members[0].skills.length);
  });

  it('expanded skills show name, badge, bar, and percentage', () => {
    component.toggleSkills(0);
    fixture.detectChanges();

    const firstSkill = fixture.nativeElement.querySelector('.skill');
    expect(firstSkill.querySelector('.skill__name')).toBeTruthy();
    expect(firstSkill.querySelector('.skill__badge')).toBeTruthy();
    expect(firstSkill.querySelector('.skill__bar')).toBeTruthy();
    expect(firstSkill.querySelector('.skill__percent')).toBeTruthy();
  });

  it('skill badge shows correct proficiency level', () => {
    component.toggleSkills(0);
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('.skill__badge');
    // First skill: Strategic Planning at 95% → expert
    expect((badges[0] as HTMLElement).textContent?.trim()).toBe('expert');
  });

  it('skill bar width matches proficiency', () => {
    component.toggleSkills(0);
    fixture.detectChanges();

    const fills = fixture.nativeElement.querySelectorAll('.skill__fill');
    expect((fills[0] as HTMLElement).style.width).toBe('95%');
  });

  it('toggleSkills collapses when called again with same index', () => {
    component.toggleSkills(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skill')).toBeTruthy();

    component.toggleSkills(0);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skill')).toBeNull();
  });

  it('toggle button text changes when expanded', () => {
    component.toggleSkills(0);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('.skills-toggle');
    expect(button.textContent).toContain('Hide Skills');
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

  it('member with image renders img element', () => {
    const imgFixture = TestBed.createComponent(TeamComponent);
    const imgComponent = imgFixture.componentInstance;
    (imgComponent as unknown as { members: unknown[] }).members = [
      { ...imgComponent.members[0], image: 'https://example.com/photo.jpg' },
      ...imgComponent.members.slice(1),
    ];
    imgFixture.detectChanges();

    const img = imgFixture.nativeElement.querySelector('.member-card__avatar-img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe('https://example.com/photo.jpg');

    const firstCard = imgFixture.nativeElement.querySelector('.member-card');
    expect(firstCard.querySelector('.member-card__initials')).toBeNull();
  });
});
