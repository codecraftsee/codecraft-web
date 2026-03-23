import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeamComponent } from './team.component';

describe('TeamComponent', () => {
  let fixture: ComponentFixture<TeamComponent>;
  let component: TeamComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TeamComponent],
    });
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the hero with title and subtitle', () => {
    const title = fixture.nativeElement.querySelector('.hero__title');
    expect(title.textContent.trim()).toBe('Meet Our Team');

    const subtitle = fixture.nativeElement.querySelector('.hero__subtitle');
    expect(subtitle.textContent).toContain('Talented leaders');
  });

  it('renders 4 team member cards', () => {
    const cards = fixture.nativeElement.querySelectorAll('.team-member');
    expect(cards.length).toBe(4);
  });

  it('each card displays member name, role, and bio', () => {
    const cards = fixture.nativeElement.querySelectorAll('.team-member');
    cards.forEach((card: Element, i: number) => {
      const name = card.querySelector('.member-name');
      expect(name?.textContent?.trim()).toBe(component.members[i].name);

      const role = card.querySelector('.member-role');
      expect(role?.textContent?.trim()).toBe(component.members[i].title);

      const bio = card.querySelector('.member-bio');
      expect(bio?.textContent?.trim()).toBe(component.members[i].bio);
    });
  });

  it('renders skill tags for each member', () => {
    const cards = fixture.nativeElement.querySelectorAll('.team-member');
    cards.forEach((card: Element, i: number) => {
      const tags = card.querySelectorAll('.skill-tag');
      expect(tags.length).toBe(component.members[i].tags.length);
      const tagTexts = Array.from(tags).map((el: unknown) => (el as HTMLElement).textContent?.trim());
      expect(tagTexts).toEqual(component.members[i].tags);
    });
  });

  it('renders social links for each member', () => {
    const cards = fixture.nativeElement.querySelectorAll('.team-member');
    cards.forEach((card: Element, i: number) => {
      const links = card.querySelectorAll('.social-link');
      expect(links.length).toBe(component.members[i].social.length);
      links.forEach((link: Element, j: number) => {
        expect(link.getAttribute('aria-label')).toBe(component.members[i].social[j].label);
        expect(link.getAttribute('href')).toBe(component.members[i].social[j].url);
      });
    });
  });

  it('members with images render img elements', () => {
    const cards = fixture.nativeElement.querySelectorAll('.team-member');
    component.members.forEach((member, i) => {
      const img = cards[i].querySelector('.member-image img');
      const emoji = cards[i].querySelector('.member-emoji');
      if (member.image) {
        expect(img).toBeTruthy();
        expect(img.getAttribute('src')).toBe(member.image);
        expect(img.getAttribute('alt')).toBe(member.name);
        expect(emoji).toBeNull();
      } else {
        expect(img).toBeNull();
        expect(emoji).toBeTruthy();
        expect(emoji.textContent?.trim()).toBe(member.emoji);
      }
    });
  });

  it('team grid has role="list" and cards have role="listitem"', () => {
    const grid = fixture.nativeElement.querySelector('.team-grid');
    expect(grid.getAttribute('role')).toBe('list');

    const cards = fixture.nativeElement.querySelectorAll('.team-member');
    cards.forEach((card: Element) => {
      expect(card.getAttribute('role')).toBe('listitem');
    });
  });

  it('social links have target="_blank" and rel="noopener noreferrer"', () => {
    const links = fixture.nativeElement.querySelectorAll('.social-link');
    links.forEach((link: Element) => {
      expect(link.getAttribute('target')).toBe('_blank');
      expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    });
  });

  it('each member has required data fields', () => {
    component.members.forEach(member => {
      expect(member.name).toBeTruthy();
      expect(member.title).toBeTruthy();
      expect(member.bio).toBeTruthy();
      expect(member.tags.length).toBeGreaterThan(0);
      expect(member.emoji).toBeTruthy();
      expect(member.social.length).toBeGreaterThan(0);
    });
  });

  it('renders footer', () => {
    const footer = fixture.nativeElement.querySelector('.footer');
    expect(footer).toBeTruthy();
    expect(footer.textContent).toContain('CodeCraft Solutions');
  });
});
