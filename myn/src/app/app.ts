import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeComponent } from "./shared/components/theme/theme.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('myn');
}
