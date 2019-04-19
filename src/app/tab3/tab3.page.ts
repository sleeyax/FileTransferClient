import {Component} from '@angular/core';
import {SettingsService} from "../services/settings.service";
import {ThemeService} from "../services/theme.service";
import {HttpClient} from "@angular/common/http";
import {StatusService} from "../services/status.service";

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

    public serverIsValid: boolean = true;

    constructor(private settings: SettingsService, private theme: ThemeService, private http: HttpClient, private status: StatusService) {}

    /**
     * Check if we can connect to the server
     */
    private verifyServer(server: string): Promise<boolean> {
        return this.http.get(server, {responseType: 'text'}).toPromise()
            .then(() => {return true;})
            .catch(() => {return false;});
    }

    /**
     * Save settings
     */
    public async save() {
        if (!await this.verifyServer(this.settings.server)) {
            this.serverIsValid = false;
            return;
        }

        this.serverIsValid = true;
        await this.settings.saveAll();
        await this.status.showSuccess('Settings saved successfully!');
    }
}
