import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../../services/settings.service";
import {FileEntry} from '@ionic-native/file/ngx';
import {NavController} from "@ionic/angular";


@Component({
    selector: 'app-fileinfo',
    templateUrl: './fileinfo.page.html',
    styleUrls: ['./fileinfo.page.scss'],
})
export class FileinfoPage implements OnInit {
    public fileInfo: IFile;
    public fileNotFound: boolean = false;
    private key: string;

    constructor(
        private route: ActivatedRoute,
        private http: HttpClient,
        private settings: SettingsService,
        private nav: NavController
    ) {}

    ngOnInit() {
        this.key = this.route.snapshot.paramMap.get('key');
        this.settings.load().then(() => {
            this.getFileInfo(this.key);
        });
    }

    /**
     * Navigate to download page
     */
    public async navDownload() {
        await this.nav.navigateForward(`filedownload/${this.key}/${this.fileInfo.name}`);
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
     * Fetch file info for the view
     * @param key
     */
    private getFileInfo(key: string) {
        this.http.get(`${this.settings.server}/file/info/${key}`).subscribe(res => {
            if (res['status'] == 404) {
                this.fileNotFound = true;
            }else{
                this.fileInfo = res["file"];
                this.fileInfo.last_modified = this.formatDate(this.fileInfo.last_modified);
            }
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
