import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideRouter([])],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('renders the wordmark', () => {
    const wordmark = fixture.nativeElement.querySelector('.wordmark');
    expect(wordmark.textContent.trim()).toBe('CodeCraft');
  });

  it('renders all four nav links', () => {
    const links = fixture.nativeElement.querySelectorAll('.nav a');
    const labels = Array.from(links).map((l: Element) => l.textContent?.trim());
    expect(labels).toEqual(['Home', 'About', 'Services', 'Contact']);
  });

  it('renders the theme toggle', () => {
    const toggle = fixture.nativeElement.querySelector('cc-theme-toggle');
    expect(toggle).toBeTruthy();
  });
});
