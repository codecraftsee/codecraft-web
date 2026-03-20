import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ChapterHeaderComponent } from './chapter-header.component';
import { ThemeService } from '../../core/theme.service';

describe('ChapterHeaderComponent', () => {
  let fixture: ComponentFixture<ChapterHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChapterHeaderComponent],
      providers: [
        provideRouter([]),
        {
          provide: ThemeService,
          useValue: { activeTheme: signal('light'), toggle: vi.fn() },
        },
      ],
    });
    fixture = TestBed.createComponent(ChapterHeaderComponent);
    fixture.detectChanges();
  });

  it('renders a back link to contents', () => {
    const link = fixture.nativeElement.querySelector('.chapter-header__back');
    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/');
  });

  it('displays "Contents" text', () => {
    const link = fixture.nativeElement.querySelector('.chapter-header__back');
    expect(link.textContent).toContain('Contents');
  });
});
