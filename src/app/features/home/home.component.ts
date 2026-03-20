import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WhySectionComponent } from './components/why-section/why-section.component';
import { ThemeToggleComponent } from '../../shared/theme-toggle/theme-toggle.component';

@Component({
  selector: 'cc-home',
  imports: [WhySectionComponent, ThemeToggleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="book-cover">
      <div class="page">
        <div class="page__edges" aria-hidden="true"></div>
        <div class="page__content">
          <header class="book-cover__header">
            <h1 class="book-cover__title">
              <svg
            class="book-cover__logo"
            role="img"
            aria-label="CodeCraft"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 984.78 368.72"
          >
            <polygon points="984.77 257.64 984.77 326.83 942.88 368.72 520.19 368.72 520.19 299.53 562.08 257.64 984.77 257.64"/>
            <path d="M594.73,407.9H718.41c11.33,0,22.91,1.5,33.94-.3,26.48-4.32,42.81,10.27,57.11,28.5a32.51,32.51,0,0,1,6.43,18.45q.79,69.18.16,138.37c-.16,18.86-27.38,47.08-46.09,47.25-55.51.51-111,.2-166.53.09-2.69,0-5.37-1.1-8.7-1.83Zm46.93,41.79V597.82H769V449.69Z" transform="translate(-74.54 -406.71)"/>
            <path d="M912,448.33v49.78h147.33v41.74H983v-.25H911.8V598H1059v41.76c-16.58,0-32.86,0-49.12,0-31.16,0-62.33.17-93.49,0-25-.19-52-27.12-52.1-52q-.23-65,0-130c.06-18.27,24.15-49.26,41.47-49.66,50.82-1.13,101.68-.39,153.53-.39v40.63Z" transform="translate(-74.54 -406.71)"/>
            <path d="M121.93,447.94V598.26h23.26c35.13,0,70.29.87,105.38-.38,16.61-.6,22.69,4.59,20.33,20.72-.87,6-.14,12.21-.14,19.79-6.1.53-11,1.31-15.85,1.32-42.5.1-85,.19-127.49,0-26.38-.11-52.75-26.68-52.8-53q-.14-64.14,0-128.3c.08-24.46,26.4-51,51-51.11,47.54-.22,95.07-.07,143.88-.07v40.68Z" transform="translate(-74.54 -406.71)"/>
            <polygon points="240.17 183.98 240.17 46.36 297.05 0 421.57 0 421.57 48.53 292.44 48.53 292.44 183.98 240.17 183.98"/>
            <polygon points="472.31 51.79 472.31 189.41 415.42 235.77 290.9 235.77 290.9 187.24 420.04 187.24 420.04 51.79 472.31 51.79"/>
            <path class="logo-invert" d="M772.43,729.18c5.17,8.51,10.14,16.7,15.12,24.92-8.86,3.31-14.63,1.4-19.1-6.06-3.38-5.63-6.74-11.27-10.32-16.78-.8-1.23-2.44-2.7-3.74-2.74-8.4-.25-16.81-.13-25.92-.13v26.45H714.79V686.21c1.59-.11,3.22-.32,4.86-.32q24.79,0,49.6,0c8.7,0,16.18,7.41,16.22,15.92a48.32,48.32,0,0,0,.06,7C787.16,719.1,780.6,724.37,772.43,729.18Zm-43.81-13.4h42.72V698.42H728.62Z" transform="translate(-74.54 -406.71)"/>
            <path class="logo-invert" d="M856.52,731.52h-42.1v23.23c-4.32,0-8,.19-11.69-.14-.91-.09-2.34-1.91-2.35-2.94-.13-17.56-.2-35.12,0-52.67.06-5.09,8.64-13,13.87-13.06q20.93-.21,41.86,0c5.24.05,14.06,7.87,14.11,12.84.18,18.36.07,36.73.07,55.57H856.52Zm-42-12.78h41.58V698.55H814.47Z" transform="translate(-74.54 -406.71)"/>
            <path class="logo-invert" d="M701.41,742.5V755h-5.78c-12.4,0-24.79,0-37.19,0-8.42,0-16.48-7.74-16.5-15.82q-.06-19,0-38.11c0-7.2,8.1-15.14,15.49-15.18,14.46-.06,28.91,0,43.79,0v12.06H656.45V742.5Z" transform="translate(-74.54 -406.71)"/>
            <path class="logo-invert" d="M945.27,686v12.07H900.45v16.84h37.32v12.25H900.08c0,7.74-.32,15,.11,22.3.28,4.76-1.45,6.36-6.1,5.73-1.52-.21-3.28.38-4.59-.16s-3.2-2-3.22-3.14q-.28-26.34-.06-52.69c0-4.48,8.14-13,12.68-13.12C914.21,685.83,929.53,686,945.27,686Z" transform="translate(-74.54 -406.71)"/>
            <path class="logo-invert" d="M994.9,754.6H981.12V698.31H953.41v-12h68.68v11.61H994.9Z" transform="translate(-74.54 -406.71)"/>
          </svg>
        </h1>
        <p class="book-cover__sub">Software that actually ships.</p>
      </header>

          <cc-why-section />

          <footer class="book-cover__footer">
            <cc-theme-toggle />
          </footer>
        </div>
      </div>
    </div>
  `,
  styles: `
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100dvh;
      padding: 2rem;
    }

    :host-context(.dark-theme) {
      background: rgba(12, 10, 24, 0.4);
      backdrop-filter: blur(60px);
      -webkit-backdrop-filter: blur(60px);
    }

    .book-cover {
      width: 100%;
      max-width: 860px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ── Book page ── */
    .page {
      position: relative;
      width: 100%;
      background: var(--cc-page-bg, rgba(255, 255, 255, 0.85));
      border-radius: 2px 6px 6px 2px;
      box-shadow:
        /* main drop shadow */
        0 4px 24px rgba(0, 0, 0, 0.1),
        /* spine — dark inset on the left edge */
        inset 6px 0 12px -6px rgba(0, 0, 0, 0.15),
        /* page thickness — stacked pages on right */
        3px 2px 0 -1px var(--cc-page-edge, rgba(240, 240, 240, 0.9)),
        5px 4px 0 -2px var(--cc-page-edge, rgba(230, 230, 230, 0.8)),
        7px 5px 12px -2px rgba(0, 0, 0, 0.06);
      overflow: hidden;
    }

    /* Subtle gradient along the spine for depth */
    .page::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.04) 0%,
        transparent 3%,
        transparent 97%,
        rgba(0, 0, 0, 0.02) 100%
      );
      pointer-events: none;
      z-index: 1;
    }

    /* Stacked page edges visible on the bottom */
    .page__edges {
      position: absolute;
      bottom: -3px;
      left: 4px;
      right: 1px;
      height: 6px;
      background: var(--cc-page-edge, rgba(240, 240, 240, 0.9));
      border-radius: 0 0 4px 4px;
      box-shadow:
        0 2px 0 0 var(--cc-page-edge, rgba(230, 230, 230, 0.8)),
        0 4px 8px rgba(0, 0, 0, 0.06);
      z-index: -1;
    }

    .page__content {
      position: relative;
      z-index: 1;
      padding: 3rem 3rem 2rem;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ── Dark theme page overrides ── */
    :host-context(.dark-theme) .page {
      --cc-page-bg: rgba(38, 36, 58, 0.7);
      --cc-page-edge: rgba(58, 55, 82, 0.75);
      border: 1px solid rgba(255, 255, 255, 0.1);
      box-shadow:
        0 6px 40px rgba(0, 0, 0, 0.5),
        inset 6px 0 16px -6px rgba(0, 0, 0, 0.35),
        3px 2px 0 -1px rgba(55, 52, 78, 0.85),
        6px 4px 0 -2px rgba(48, 45, 70, 0.75),
        8px 6px 20px -2px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(24px);
    }

    :host-context(.dark-theme) .page__edges {
      background: rgba(58, 55, 82, 0.85);
      box-shadow:
        0 2px 0 0 rgba(50, 48, 72, 0.75),
        0 4px 12px rgba(0, 0, 0, 0.25);
    }

    :host-context(.dark-theme) .page::before {
      background: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.1) 0%,
        transparent 4%,
        transparent 96%,
        rgba(0, 0, 0, 0.06) 100%
      );
    }

    .book-cover__header {
      text-align: center;
      margin-bottom: 1rem;
    }

    .book-cover__title {
      margin: 0;
      line-height: 0;
    }

    .book-cover__logo {
      height: clamp(3rem, 8vw, 5rem);
      width: auto;
      fill: var(--cc-on-surface);
    }

    .book-cover__logo .logo-invert {
      fill: var(--cc-surface);
    }

    .book-cover__sub {
      margin: 0.5rem 0 0;
      font-family: var(--cc-font-sans);
      font-size: 1rem;
      color: var(--cc-on-surface);
      opacity: 0.5;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      font-weight: 300;
    }

    .book-cover__footer {
      margin-top: 2rem;
      opacity: 0.6;
      transition: opacity 0.2s;
    }

    .book-cover__footer:hover {
      opacity: 1;
    }

    @media (max-width: 767px) {
      :host {
        padding: 0;
      }

      .book-cover {
        max-width: 100%;
      }

      .page {
        border-radius: 0;
        min-height: 100dvh;
      }

      .page__content {
        padding: 3rem 1.5rem 2rem;
      }
    }
  `,
})
export class HomeComponent {}
