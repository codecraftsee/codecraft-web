import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cc-background',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bg-layer">
      <div class="blob blob--1" aria-hidden="true"></div>
      <div class="blob blob--2" aria-hidden="true"></div>
      <div class="blob blob--3" aria-hidden="true"></div>
      <div class="blob blob--4" aria-hidden="true"></div>
    </div>
  `,
  styles: `
    .bg-layer {
      position: fixed;
      inset: 0;
      z-index: 0;
      overflow: hidden;
      pointer-events: none;
    }

    .blob {
      position: absolute;
      border-radius: 50%;
      will-change: transform;
      filter: blur(80px);
      opacity: 0.6;
    }

    .blob--1 {
      width: 60vw;
      height: 60vw;
      top: -20%;
      left: -10%;
      background: radial-gradient(circle, var(--cc-backdrop-start) 0%, transparent 70%);
      animation: drift1 30s ease-in-out infinite alternate;
    }

    .blob--2 {
      width: 50vw;
      height: 50vw;
      top: 40%;
      right: -15%;
      background: radial-gradient(circle, var(--cc-backdrop-mid) 0%, transparent 70%);
      animation: drift2 25s ease-in-out infinite alternate;
    }

    .blob--3 {
      width: 45vw;
      height: 45vw;
      bottom: -10%;
      left: 20%;
      background: radial-gradient(circle, var(--cc-backdrop-end) 0%, transparent 70%);
      animation: drift3 35s ease-in-out infinite alternate;
    }

    .blob--4 {
      width: 30vw;
      height: 30vw;
      top: 30%;
      left: 40%;
      background: radial-gradient(circle, var(--cc-backdrop-accent) 0%, transparent 70%);
      animation: drift4 20s ease-in-out infinite alternate;
      opacity: 0.4;
    }

    @keyframes drift1 {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      100% { transform: translate3d(10vw, 5vh, 0) scale(1.1); }
    }

    @keyframes drift2 {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      100% { transform: translate3d(-8vw, -10vh, 0) scale(0.95); }
    }

    @keyframes drift3 {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      100% { transform: translate3d(5vw, -8vh, 0) scale(1.05); }
    }

    @keyframes drift4 {
      0% { transform: translate3d(0, 0, 0) scale(1); }
      100% { transform: translate3d(-6vw, 6vh, 0) scale(1.15); }
    }

    @media (prefers-reduced-motion: reduce) {
      .blob {
        animation: none !important;
      }
    }
  `,
})
export class BackgroundComponent {}
