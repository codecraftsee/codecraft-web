import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type GlassElevation = 'low' | 'medium' | 'high';

@Component({
  selector: 'cc-glass-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-content />`,
  host: {
    '[class]': '"glass glass--" + elevation()',
  },
  styles: `
    :host {
      display: block;
    }

    .glass {
      background: var(--cc-glass-bg);
      border: 1px solid var(--cc-glass-border);
      border-radius: 16px;
      box-shadow: var(--cc-glass-shadow);
      backdrop-filter: blur(var(--cc-glass-blur));
    }

    .glass--low {
      backdrop-filter: blur(8px);
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
    }

    .glass--medium {
      backdrop-filter: blur(var(--cc-glass-blur));
      box-shadow: var(--cc-glass-shadow);
    }

    .glass--high {
      backdrop-filter: blur(24px);
      box-shadow: 0 12px 48px rgba(0, 0, 0, 0.15);
    }

    @supports not (backdrop-filter: blur(1px)) {
      .glass {
        background: var(--cc-surface);
        opacity: 0.95;
      }
    }
  `,
})
export class GlassPanelComponent {
  readonly elevation = input<GlassElevation>('medium');
}
