import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BackgroundComponent } from './background.component';

describe('BackgroundComponent', () => {
  let fixture: ComponentFixture<BackgroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackgroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackgroundComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render four gradient blobs', () => {
    const blobs = fixture.nativeElement.querySelectorAll('.blob');
    expect(blobs.length).toBe(4);
  });

  it('should mark blobs as aria-hidden', () => {
    const blobs = fixture.nativeElement.querySelectorAll('.blob');
    blobs.forEach((blob: HTMLElement) => {
      expect(blob.getAttribute('aria-hidden')).toBe('true');
    });
  });

  it('should have a background layer container', () => {
    const layer = fixture.nativeElement.querySelector('.bg-layer');
    expect(layer).toBeTruthy();
  });
});
