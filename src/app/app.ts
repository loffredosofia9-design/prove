import { Component, signal, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('car-rent-1');
    currentTheme = 'orange';

  constructor(private renderer: Renderer2) {}

  setTheme(theme: string) {
    // Rimuovi classe vecchia
    this.renderer.removeClass(document.body, this.currentTheme + '-theme');

    // Aggiungi nuova classe
    this.renderer.addClass(document.body, theme + '-theme');

    // Aggiorna tema corrente
    this.currentTheme = theme;
  }
}
