import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-bp-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bp-foot">
      <div class="bp-foot__inner">
        <span class="bp-mono">© 2026 CODECRAFT_SOLUTIONS · ALL RIGHTS RESERVED</span>
        <span class="bp-mono">HELLO&#64;CODECRAFTSOLUTIONS.RS</span>
        <span class="bp-mono">BELGRADE · RS · REMOTE</span>
      </div>
    </footer>
  `,
  styles: `
    :host { display: block; }

    .bp-foot {
      border-top: 1px solid var(--cc-rule-strong);
      padding: 22px 28px;
      margin-top: 16px;
      background: var(--cc-bg);
    }

    .bp-foot__inner {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      font-size: 10px;
      letter-spacing: 0.18em;
      color: var(--cc-ink-mute);
    }

    .bp-mono {
      font-family: var(--cc-font-mono);
      font-feature-settings: 'ss01', 'cv01';
    }

    @media (max-width: 640px) {
      .bp-foot__inner {
        flex-direction: column;
        gap: 8px;
        align-items: flex-start;
      }
    }
  `,
})
export class FooterComponent {}
