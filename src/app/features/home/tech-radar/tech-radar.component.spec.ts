import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { TechRadarComponent } from './tech-radar.component';

describe('TechRadarComponent', () => {
  const CYCLE_MS = 4200;

  const create = (platform: 'browser' | 'server'): TechRadarComponent => {
    TestBed.configureTestingModule({
      imports: [TechRadarComponent],
      providers: [{ provide: PLATFORM_ID, useValue: platform }],
    });
    const fixture = TestBed.createComponent(TechRadarComponent);
    fixture.detectChanges();
    return fixture.componentInstance;
  };

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('auto-cycles through technologies in the browser', () => {
    const radar = create('browser');
    expect(radar.active()).toBe(0);

    vi.advanceTimersByTime(CYCLE_MS);
    expect(radar.active()).toBe(1);
  });

  it('pauses auto-cycling while hovered', () => {
    const radar = create('browser');
    radar.paused.set(true);
    TestBed.tick();

    vi.advanceTimersByTime(CYCLE_MS * 2);
    expect(radar.active()).toBe(0);
  });

  it('does not start a timer during server prerendering', () => {
    const radar = create('server');

    expect(vi.getTimerCount()).toBe(0);
    vi.advanceTimersByTime(CYCLE_MS * 2);
    expect(radar.active()).toBe(0);
  });
});
