import {Component} from '@angular/core';
import {SettingsService} from "../services/settings.service";
import {ThemeService} from "../services/theme.service";

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
    constructor(private settings: SettingsService, private theme: ThemeService) {}
}
