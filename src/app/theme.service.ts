import { Injectable } from '@angular/core';

const STORAGE_KEY = 'b2b-calculator-theme';

/**
 * Przełącznik jasny/ciemny - dark to domyślny, "fancy" motyw aplikacji
 * (theme.scss: html bez selektora), light to override pod klasą
 * "light-theme" na <html> (theme.scss: html.light-theme). Wybór
 * zapamiętywany w localStorage, respektowany od razu przy starcie apki
 * (index.html ma inline-script zapobiegający "mignięciu" złym motywem -
 * patrz komentarz tam).
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  isLight = document.documentElement.classList.contains('light-theme');

  toggle(): void {
    this.isLight = !this.isLight;
    this.apply();
  }

  private apply(): void {
    document.documentElement.classList.toggle('light-theme', this.isLight);
    try {
      localStorage.setItem(STORAGE_KEY, this.isLight ? 'light' : 'dark');
    } catch {
      // localStorage niedostępny (np. tryb prywatny) - motyw po prostu nie
      // przetrwa odświeżenia, nic więcej się nie psuje.
    }
  }
}
