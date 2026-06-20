import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="cc-foot">
      <div class="cc-foot__inner">
        <span class="cc-mono">© 2026 CODECRAFT SOLUTIONS · ALL RIGHTS RESERVED</span>
        <span class="cc-mono">HELLO&#64;CODECRAFTSOLUTIONS.RS</span>
        <span class="cc-mono">NOVI SAD · RS · REMOTE</span>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }

    .cc-foot {
      border-top: 1px solid var(--cc-rule-strong);
      padding: 22px 28px;
      margin-top: 16px;
      background: var(--cc-bg);
    }

    .cc-foot__inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      letter-spacing: 0.18em;
      color: var(--cc-ink-mute);
    }

    .cc-mono {
      font-family: var(--cc-font-mono);
      font-feature-settings: 'ss01', 'cv01';
    }

    @media (max-width: 640px) {
      .cc-foot__inner {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
      }
    }
  `,
})
export class FooterComponent {}
