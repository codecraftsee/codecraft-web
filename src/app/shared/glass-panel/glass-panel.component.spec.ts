import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { GlassPanelComponent } from './glass-panel.component';

@Component({
  imports: [GlassPanelComponent],
  template: `<cc-glass-panel [elevation]="elevation">{{ content }}</cc-glass-panel>`,
})
class TestHostComponent {
  content = 'Hello glass';
  elevation: 'low' | 'medium' | 'high' = 'medium';
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
    host.elevation = 'low';
    fixture.changeDetectorRef.markForCheck();
    fixture.detectChanges();
    await fixture.whenStable();
    const panel = fixture.nativeElement.querySelector('cc-glass-panel');
    expect(panel.classList.contains('glass--low')).toBe(true);
  });

  it('should apply high elevation class', async () => {
    host.elevation = 'high';
    fixture.changeDetectorRef.markForCheck();
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
