import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../../services/settings.service";
import {DeviceService} from "../../services/device.service";
import { File } from '@ionic-native/file/ngx';


@Component({
    selector: 'app-fileinfo',
    templateUrl: './fileinfo.page.html',
    styleUrls: ['./fileinfo.page.scss'],
})
export class FileinfoPage implements OnInit {

    public fileInfo: IFile;
    private key: string;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private settings: SettingsService,
        private device: DeviceService,
        private file: File
    ) {}

    ngOnInit() {
        this.key = this.route.snapshot.paramMap.get('key');
        this.settings.load().then(() => {
            this.getFileInfo(this.key);
        });
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
    private createDir(path: string, dir: string)
    {
        return new Promise(resolve => {
            this.file.createDir(path, dir, false).then(() => resolve(false)).catch(() => resolve(true));
        });
    }

    /**
     * Finally download the file
     */
    public async download() {
        this.createDir(this.device.storage, "FileTransfer").then(() => {
            this.http.get(`${this.settings.server}/file/download/${this.key}`, {responseType: "blob"}).subscribe(data => {
                this.file.writeFile(this.device.storage + "/FileTransfer", this.fileInfo.name, data, {replace: true})
                    .then(msg => {console.log(msg)})
                    .catch(err => {console.log(err);});
            });
        });
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
    size: string
}
