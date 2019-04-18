import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public server: string;
    public darkThemeEnabled: boolean;
    private default: ISettings;

    constructor(private storage: Storage) {
        this.default = <ISettings>{
            server: 'https://ft.sleeyax.com',
            darkThemeEnabled: false
        };

        this.load().then(settings => {
            this.server = settings.server;
            this.darkThemeEnabled = settings.darkThemeEnabled;
        });
    }

    /**
     * Load all settings from storage
     */
    public load(): Promise<ISettings> {
        return Promise.all([
            this.storage.get('server'),
            this.storage.get('darkThemeEnabled')
        ]).then(([server, darkThemeEnabled]) => {
            return <ISettings> {
                server: server != null ? server : this.default.server,
                darkThemeEnabled: darkThemeEnabled != null ? darkThemeEnabled : this.default.darkThemeEnabled
            };
        });
        /*return new Promise(async resolve => {
            const server = await this.storage.get('server');
            const darkThemeEnabled = await this.storage.get('darkThemeEnabled');
            resolve(<ISettings>{
                server: server != null ? server : this.default.server,
                darkThemeEnabled: darkThemeEnabled != null ? darkThemeEnabled : this.default.darkThemeEnabled
            });
        });*/
    }

    /**
     * Save all settings
     */
    public async saveAll() {
        await this.storage.set('server', this.server);
        await this.storage.set('darkThemeEnabled', this.darkThemeEnabled);
    }

    public get(key: 'server' | 'darkThemeEnabled') {
        return this.storage.get(key);
    }
}

interface ISettings {
    server: string,
    darkThemeEnabled: boolean
}
