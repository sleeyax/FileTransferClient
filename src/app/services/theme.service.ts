import {Inject, Injectable} from '@angular/core';
import {SettingsService} from "./settings.service";
import {DOCUMENT} from "@angular/common";

@Injectable({
    providedIn: 'root'
})
/**
 * Service used to change application theme
 */
export class ThemeService {
    private theme: string = 'light-theme';

    /**
     * ThemeService Constructor
     * Inject to apply theme instantly (based on darkThemeEnabled option in settings)
     * @param settings
     * @param document
     */
    constructor(private settings: SettingsService, @Inject(DOCUMENT) private document: Document) {
        this.load().then(theme => {this.theme = theme != null ? theme : this.theme; this.change(this.theme);});
    }

    public load(): Promise<string> {
        return new Promise((resolve) => {
            // Get setting from settings and apply theme accordingly
            this.settings.get('darkThemeEnabled').then((darkThemeEnabled) => {
                resolve(this.boolToThemeName(darkThemeEnabled));
            });
        });
    }

    /**
     * Switch from light to dark or the other way around
     * Use this in your view for a live theme change
     */
    public switchToDark(isDarkTheme: boolean) {
        this.change(this.boolToThemeName(isDarkTheme));
    }

    /**
     * Swith from light to dark and viceversa
     */
    public toggle() {
        this.change(this.boolToThemeName(!this.settings.darkThemeEnabled));
    }

    /**
     * Convert darkThemeEnabled boolean to its name
     */
    private boolToThemeName(darkThemeEnabled: boolean) {
        return darkThemeEnabled ? 'dark-theme' : 'light-theme';
    }

    /**
     * Change the theme
     * @param theme
     */
    private change(theme: string) {
        this.theme = theme;
        this.document.documentElement.className = this.theme;
    }
}
