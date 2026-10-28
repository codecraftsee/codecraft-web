import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { TeamComponent } from './team.component';
import { Theme, ThemeService } from '../../core/theme.service';

describe('TeamComponent', () => {
  let fixture: ComponentFixture<TeamComponent>;
  let component: TeamComponent;
  let el: HTMLElement;
  const activeTheme = signal<Theme>('dark');

  const cards = (): HTMLElement[] => Array.from(el.querySelectorAll('.cc-id'));

  beforeEach(() => {
    activeTheme.set('dark');
    TestBed.configureTestingModule({
      imports: [TeamComponent],
      providers: [{ provide: ThemeService, useValue: { activeTheme } }],
    });
    fixture = TestBed.createComponent(TeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders the roster heading and operator count', () => {
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('PERSONNEL ROSTER');
    expect(el.textContent).toContain(`${component.members.length} OPERATORS`);
  });

  it('renders one card per team member', () => {
    expect(component.members.length).toBeGreaterThan(0);
    expect(cards().length).toBe(component.members.length);
  });

  it('each card displays name, role, quote, and tags', () => {
    cards().forEach((card, i) => {
      const member = component.members[i];
      expect(card.querySelector('.cc-id__name')?.textContent?.trim()).toBe(member.name);
      expect(card.querySelector('.cc-id__role')?.textContent?.trim()).toBe(member.title);
      expect(card.querySelector('.cc-id__quote')?.textContent?.trim()).toBe(`"${member.quote}"`);

      const tags = Array.from(card.querySelectorAll('.cc-id__tags .cc-chip')).map(t =>
        t.textContent?.trim(),
      );
      expect(tags).toEqual(member.tags);
    });
  });

  it('renders ID number, initials, and file name for each card', () => {
    const [first] = cards();
    expect(first.querySelector('.cc-id__num')?.textContent?.trim()).toBe('ID·001');
    expect(first.querySelector('.cc-id__foot')?.textContent).toContain('SIG · MP');
    expect(first.querySelector('.cc-id__foot')?.textContent).toContain('FILE · miodrag_pavkovic.id');
  });

  it('renders member photos with alt text', () => {
    cards().forEach((card, i) => {
      const member = component.members[i];
      const img = card.querySelector('.cc-id__photo img');
      if (member.image) {
        expect(img?.getAttribute('alt')).toBe(member.name);
      } else {
        expect(img).toBeNull();
        expect(card.querySelector('.cc-id__emoji')?.textContent?.trim()).toBe(member.emoji);
      }
    });
  });

  it('swaps avatar images to match the active theme', () => {
    const index = component.members.findIndex(m => m.lightImage && m.sableImage);
    const member = component.members[index];
    const src = (): string | null | undefined =>
      cards()[index].querySelector('.cc-id__photo img')?.getAttribute('src');

    expect(src()).toBe(member.image);

    activeTheme.set('light');
    fixture.detectChanges();
    expect(src()).toBe(member.lightImage);

    activeTheme.set('sable');
    fixture.detectChanges();
    expect(src()).toBe(member.sableImage);
  });

  it('renders a CV download link only for members with a CV', () => {
    cards().forEach((card, i) => {
      const member = component.members[i];
      const cv = card.querySelector('a[download]');
      if (member.cvUrl) {
        expect(cv?.getAttribute('href')).toBe(member.cvUrl);
        expect(cv?.getAttribute('aria-label')).toBe(`Download CV for ${member.name}`);
      } else {
        expect(cv).toBeNull();
      }
    });
  });

  it('renders social links that open safely in a new tab', () => {
    cards().forEach((card, i) => {
      const social = component.members[i].social;
      const links = Array.from(card.querySelectorAll('a[target="_blank"]'));
      expect(links.length).toBe(social.length);
      links.forEach((link, j) => {
        expect(link.getAttribute('href')).toBe(social[j].url);
        expect(link.getAttribute('aria-label')).toBe(social[j].label);
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
      });
    });
  });

  it('roster has role="list" and cards have role="listitem"', () => {
    expect(el.querySelector('.cc-roster')?.getAttribute('role')).toBe('list');
    cards().forEach(card => expect(card.getAttribute('role')).toBe('listitem'));
  });
});
