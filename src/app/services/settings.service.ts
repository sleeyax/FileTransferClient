import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {forEach} from "@angular-devkit/schematics";
import {promise} from "selenium-webdriver";
import IEventType = promise.IEventType;

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    public server: string;
    public darkThemeEnabled: boolean;
    private default: ISettings;

    constructor(private storage: Storage) {
        this.default = <ISettings>{
            server: 'http://127.0.0.1:8000',
            darkThemeEnabled: false
        };
        this.server = this.default.server;
        this.darkThemeEnabled = this.default.darkThemeEnabled;

        this.storage.forEach((value, key) => {
            this[key] = value;
        });
    }

    /**
     * Load all settings from storage
     */
    public load(): Promise<ISettings> {
        return new Promise(async resolve => {
            const server = await this.storage.get('server');
            const darkThemeEnabled = await this.storage.get('darkThemeEnabled');
            resolve(<ISettings>{
                server: server != null ? server : this.default.server,
                darkThemeEnabled: darkThemeEnabled != null ? darkThemeEnabled : this.default.darkThemeEnabled
            });
        });
    }

    /**
     * Save all settings
     */
    public async saveAll() {
        await this.storage.set('server', this.server);
        await this.storage.set('darkThemeEnabled', this.darkThemeEnabled);
    }

    /**
     * Save single setting
     * @param key
     * @param value
     */
    public async saveAsync(key: string, value: string) {
        await this.storage.set(key, value);
    }

    public get(key: 'server' | 'darkThemeEnabled') {
        return this.storage.get(key);
    }
}

interface ISettings {
    server: string,
    darkThemeEnabled: boolean
}
