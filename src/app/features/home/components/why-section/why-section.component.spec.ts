import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { WhySectionComponent } from './why-section.component';

describe('WhySectionComponent', () => {
  let fixture: ComponentFixture<WhySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WhySectionComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(WhySectionComponent);
    fixture.detectChanges();
  });

  it('renders four TOC entries', () => {
    const entries = fixture.nativeElement.querySelectorAll('.toc__entry');
    expect(entries.length).toBe(4);
  });

  it('each entry has a chapter label, title, and description', () => {
    const entries = fixture.nativeElement.querySelectorAll('.toc__entry');
    entries.forEach((entry: Element) => {
      expect(entry.querySelector('.toc__chapter-label')).toBeTruthy();
      expect(entry.querySelector('.toc__title')).toBeTruthy();
      expect(entry.querySelector('.toc__desc')).toBeTruthy();
    });
  });

  it('displays numbers 01 through 04', () => {
    const numbers = fixture.nativeElement.querySelectorAll('.toc__number');
    expect(numbers[0].textContent.trim()).toBe('01');
    expect(numbers[1].textContent.trim()).toBe('02');
    expect(numbers[2].textContent.trim()).toBe('03');
    expect(numbers[3].textContent.trim()).toBe('04');
  });

  it('links to correct routes', () => {
    const links = fixture.nativeElement.querySelectorAll('.toc__link');
    expect(links[0].getAttribute('href')).toBe('/');
    expect(links[1].getAttribute('href')).toBe('/about');
    expect(links[2].getAttribute('href')).toBe('/services');
    expect(links[3].getAttribute('href')).toBe('/contact');
  });

  it('heading reads Contents', () => {
    const heading = fixture.nativeElement.querySelector('.toc__heading');
    expect(heading.textContent.trim()).toBe('Contents');
  });

  it('displays chapter labels with Roman numerals', () => {
    const labels = fixture.nativeElement.querySelectorAll('.toc__chapter-label');
    expect(labels[0].textContent.trim()).toBe('Chapter I');
    expect(labels[1].textContent.trim()).toBe('Chapter II');
    expect(labels[2].textContent.trim()).toBe('Chapter III');
    expect(labels[3].textContent.trim()).toBe('Chapter IV');
  });
});
