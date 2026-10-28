import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GlassElevation, GlassPanelComponent } from './glass-panel.component';

@Component({
  imports: [GlassPanelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<cc-glass-panel [elevation]="elevation()">{{ content }}</cc-glass-panel>`,
})
class TestHostComponent {
  readonly content = 'Hello glass';
  readonly elevation = signal<GlassElevation>('medium');
}

describe('GlassPanelComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let host: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render projected content', () => {
    const panel = fixture.nativeElement.querySelector('cc-glass-panel');
    expect(panel.textContent).toContain('Hello glass');
  });

  it('should apply medium elevation class by default', () => {
    const panel = fixture.nativeElement.querySelector('cc-glass-panel');
    expect(panel.classList.contains('glass--medium')).toBe(true);
  });

  it('should apply low elevation class', async () => {
    host.elevation.set('low');
    fixture.detectChanges();
    await fixture.whenStable();
    const panel = fixture.nativeElement.querySelector('cc-glass-panel');
    expect(panel.classList.contains('glass--low')).toBe(true);
  });

  it('should apply high elevation class', async () => {
    host.elevation.set('high');
    fixture.detectChanges();
    await fixture.whenStable();
    const panel = fixture.nativeElement.querySelector('cc-glass-panel');
    expect(panel.classList.contains('glass--high')).toBe(true);
  });

  it('should always have the base glass class', () => {
    const panel = fixture.nativeElement.querySelector('cc-glass-panel');
    expect(panel.classList.contains('glass')).toBe(true);
  });
});
