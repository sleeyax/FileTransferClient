import {Injectable} from '@angular/core';
import {Platform} from "@ionic/angular";
import { File } from '@ionic-native/file/ngx';

@Injectable({
    providedIn: 'root'
})
export class DeviceService {

    public storage: string;

    constructor(private platform: Platform, private file: File) {
        if (platform.is('ios')) {
            this.storage = file.documentsDirectory;
        }else {
            this.storage = file.externalRootDirectory;
        }
    }

}
