import {Component} from '@angular/core';
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
    styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
    constructor(private inAppBrowser: InAppBrowser) {}

    /**
     * Navigate to github repo of this app
     */
    showSourceCode() {
        this.inAppBrowser.create('https://github.com/sleeyax/FileTransferClient', '_system');
    }
}
