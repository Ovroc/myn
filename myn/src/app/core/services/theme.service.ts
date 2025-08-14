import { Injectable, signal, computed, effect } from '@angular/core';

export type Theme = 'black' | 'lofi';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'myn-theme';
  private readonly _currentTheme = signal<Theme>('lofi');

  readonly currentTheme = this._currentTheme.asReadonly();

  readonly isDark = computed(() => ['black'].includes(this.currentTheme()));
  readonly isLofi = computed(() => this.currentTheme() === 'lofi');

  constructor() {
    this.initializeTheme();

    effect(
      () => {
        const theme = this.currentTheme();
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(this.THEME_KEY, theme);
      },
      { allowSignalWrites: true }
    );
  }

  public toggleTheme(): void {
    const nextTheme = this.isDark() ? 'lofi' : 'black';
    this.setTheme(nextTheme);
  }

  private setTheme(theme: Theme): void {
    this._currentTheme.set(theme);
  }

  private initializeTheme(): void {
    const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme && this.isValidTheme(savedTheme)) {
      this.setTheme(savedTheme);
    } else {
      this.setTheme(prefersDark ? 'black' : 'lofi');
    }

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.setTheme(e.matches ? 'black' : 'lofi');
      }
    });
  }

  private isValidTheme(theme: string): theme is Theme {
    return ['lofi', 'black'].includes(theme as Theme);
  }
}
