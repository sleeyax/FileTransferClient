import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../../services/settings.service";
import {File, FileEntry} from '@ionic-native/file/ngx';
import {DeviceModule} from "../../modules/device.module";
import {LogModule} from "../../modules/log.module";
import {StatusService} from "../../services/status.service";
import {FileOpener} from "@ionic-native/file-opener/ngx";


@Component({
    selector: 'app-fileinfo',
    templateUrl: './fileinfo.page.html',
    styleUrls: ['./fileinfo.page.scss'],
})
export class FileinfoPage implements OnInit {

    public fileInfo: IFile;
    private key: string;
    public downloadedFile: FileEntry;
    public isDownloading: boolean;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private settings: SettingsService,
        private device: DeviceModule,
        private file: File,
        private log: LogModule,
        private status: StatusService,
        private fileOpener: FileOpener
    ) {}

    ngOnInit() {
        this.key = this.route.snapshot.paramMap.get('key');
        this.settings.load().then(() => {
            this.getFileInfo(this.key);
        });
        this.isDownloading = false;
    }

    /**
     * Format date string into something human readable
     * @param date
     */
    private formatDate(date: string) {
        const d = new Date(date);
        return `${this.appendZero(d.getDay())}-${this.appendZero(d.getMonth())}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
    }

    /**
     * Add a zero in front of date/mont number when necessary
     * @param x
     */
    private appendZero(x: number) {
        return x < 10 ? '0' + x : x;
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
     * Finally download the file
     */
    public async download() {
        this.isDownloading = true;
        this.createDir(this.device.storage, "FileTransfer").then(() => {
            this.http.get(`${this.settings.server}/file/download/${this.key}`, {responseType: "blob"}).subscribe(async (data) => {
                // Check if max file downloads limit is reached
                if (data['status'] != null && data['status'] == 403) {
                    throw data['message']; // TODO: proper error handling
                }

                this.downloadedFile  = <FileEntry> await this.file.writeFile(this.device.storage + "/FileTransfer", this.fileInfo.name, data, {replace: true});
                this.isDownloading = false;
            });
        });
    }

    /**
     * Open folder of downloaded file
     */
    public openFolder() {
        // TODO: find out how to open folders
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
     * Fetch file info for the view
     * @param key
     */
    private getFileInfo(key: string) {
        this.http.get(`${this.settings.server}/file/info/${key}`).subscribe(res => {
            this.fileInfo = res["file"];
            this.fileInfo.last_modified = this.formatDate(this.fileInfo.last_modified);
        });
    }
}

interface IFile {
    name: string,
    downloads: number,
    max_downloads: number,
    last_modified: string,
    size: string,
}
