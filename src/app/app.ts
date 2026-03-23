import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BackgroundComponent } from './shared/background/background.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BackgroundComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
