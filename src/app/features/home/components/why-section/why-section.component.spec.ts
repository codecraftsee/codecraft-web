import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhySectionComponent } from './why-section.component';

describe('WhySectionComponent', () => {
  let fixture: ComponentFixture<WhySectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [WhySectionComponent],
    });
    fixture = TestBed.createComponent(WhySectionComponent);
    fixture.detectChanges();
  });

  it('renders exactly three differentiator items', () => {
    const items = fixture.nativeElement.querySelectorAll('.why-item');
    expect(items.length).toBe(3);
  });

  it('each item has an icon, title, and description', () => {
    const items = fixture.nativeElement.querySelectorAll('.why-item');
    items.forEach((item: Element) => {
      expect(item.querySelector('.why-item__icon')).toBeTruthy();
      expect(item.querySelector('.why-item__title')).toBeTruthy();
      expect(item.querySelector('.why-item__desc')).toBeTruthy();
    });
  });
});
