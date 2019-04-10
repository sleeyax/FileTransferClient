import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../../services/settings.service";

@Component({
    selector: 'app-fileinfo',
    templateUrl: './fileinfo.page.html',
    styleUrls: ['./fileinfo.page.scss'],
})
export class FileinfoPage implements OnInit {

    public fileInfo: IFile;
    public error: boolean = false;

    constructor(private route: ActivatedRoute, private http: HttpClient, private settings: SettingsService) {}

    ngOnInit() {
        this.settings.load().then(() => {
            this.getFileInfo(this.route.snapshot.paramMap.get('key'));
        });
    }

    getFileInfo(key: string) {
        this.http.get(`${this.settings.server}/file/info/${key}`).subscribe(res => {
            if (res["status"] == 200) {
                this.fileInfo = res["file"];
            }else{
                this.error = true;
            }
        });
    }
}

interface IFile {
    name: string,
    downloads: number,
    last_modified: Date,
    size: string
}
