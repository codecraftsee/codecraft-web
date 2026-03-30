import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './shared/background/background.component';
import { SiteHeaderComponent } from './shared/site-header/site-header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackgroundComponent, SiteHeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mousemove)': 'onMouseMove($event)',
  },
})
export class App {
  private el = inject(ElementRef);

  onMouseMove(e: MouseEvent): void {
    const main = this.el.nativeElement.querySelector('.content-area') as HTMLElement;
    const rect = main.getBoundingClientRect();
    this.el.nativeElement.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    this.el.nativeElement.style.setProperty('--my', `${e.clientY - rect.top + main.scrollTop}px`);
  }
}
