import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './theme.component.html',
})
export class ThemeComponent {
  constructor(private themeService: ThemeService) {}

  isDarkTheme = computed(() => this.themeService.isDark());
  toggleTitle = computed(() => this.isDarkTheme() ? 'Mudar para modo claro' : 'Mudar para modo escuro');

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}
