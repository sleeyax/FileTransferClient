import {Component, OnInit} from '@angular/core';
import {File, FileEntry} from "@ionic-native/file/ngx";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";
import {DeviceModule} from "../../modules/device.module";
import {SettingsService} from "../../services/settings.service";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {NavController, Platform} from "@ionic/angular";

@Component({
    selector: 'app-filedownload',
    templateUrl: './filedownload.page.html',
    styleUrls: ['./filedownload.page.scss'],
})
export class FiledownloadPage implements OnInit {
    public downloadedFile;
    private key: string;
    private fileName: string;

    constructor(
        private file: File,
        private http: HttpClient,
        private route: ActivatedRoute,
        private device: DeviceModule,
        private settings: SettingsService,
        private fileOpener: FileOpener,
        private nav: NavController,
        private platform: Platform
    ) {}

    ngOnInit() {
        this.key = this.route.snapshot.paramMap.get('key');
        this.fileName = this.route.snapshot.paramMap.get('fileName');
        this.settings.load().then(settings => {
            this.download(settings.server);
        });
        // Go back to download page when back button is pressed
        this.platform.backButton.subscribeWithPriority(0, () => {
            this.nav.navigateBack('/tabs/tab2');
        });
    }

    /**
     * Create specified dir when it doesn't exist yet
     * @param path
     * @param dir
     */
    private createDir(path: string, dir: string) {
        return new Promise(resolve => {
            this.file.createDir(path, dir, false).then(() => resolve(false)).catch(() => resolve(true));
        });
    }

    /**
     * Open downloaded file
     */
    public openFile() {
        this.downloadedFile.file(file => {
            this.fileOpener.open(this.downloadedFile.nativeURL, file.type);
        })
    }

    /**
     * Download the file
     */
    public download(server: string) {
        this.createDir(this.device.storage, "FileTransfer").then(() => {
            this.http.get(`${server}/file/download/${this.key}`, {responseType: "blob"}).subscribe(async (data) => {
                this.downloadedFile = <FileEntry> await this.file.writeFile(this.device.storage + "/FileTransfer", this.fileName, data, {replace: true});
            });
        });
    }
}
