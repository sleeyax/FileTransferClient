import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DeviceModule} from "../modules/device.module";
import {File} from '@ionic-native/file/ngx';
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../services/settings.service";
import {NavController} from "@ionic/angular";
import {StatusService} from "../services/status.service";
import {LogModule} from "../modules/log.module";

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    public uploadForm: FormGroup;
    public fileObj: IFile;

    constructor(
        private formBuilder: FormBuilder,
        private device: DeviceModule,
        private file: File,
        private http: HttpClient,
        private settings: SettingsService,
        private nav: NavController,
        private status: StatusService,
        private logger: LogModule
    ) {
        this.uploadForm = formBuilder.group({
            maxDownloads: ['1', Validators.compose([
                Validators.max(999),
                Validators.min(0),
                Validators.required])
            ],
            filePath: ['', Validators.compose([])]
        });
    }

    /**
     * Let the device open file picker/chooser and browse to a file
     */
    public browse() {
        this.device.chooseFile().then(file => {
            // Parse local file as Entry
            return this.file.resolveLocalFilesystemUrl(file);
        }).then((fileEntry) => {
            this.fileObj = {name: fileEntry.name, pathNative: fileEntry.nativeURL, path: fileEntry.fullPath, blob: null};
            return this.readFileToBlob(fileEntry);
        }).then(blob => {
            this.fileObj.blob = blob;
        }).catch(err => {
            console.log(err);
        });
    }

    /**
     * Upload the file to the server
     */
    public upload() {
        // If no file was specified, show error
        if (this.fileObj == null) {
            this.uploadForm.controls.filePath.setErrors({msg: 'Please choose a file'});
            return;
        }

        if (this.uploadForm.valid) {
            this.settings.load().then(settings => {
                const formData = new FormData();
                formData.set('file', this.fileObj.blob, this.fileObj.name);
                formData.set('max_downloads', this.uploadForm.controls.maxDownloads.value);
                this.http.post(`${settings.server}/file/upload`, formData).subscribe(data => {
                    if (data['status'] == 200) {
                        this.nav.navigateForward(`fileshare/${data['key']}`);
                    }
                });
            });
        }
    }

    /**
     * Read contents of file entry to BLOB format
     * @param entry
     */
    private readFileToBlob(entry): Promise<Blob> {
        return new Promise(resolve => {
            entry.file((file) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    resolve(new Blob([reader.result], {type: file.type}));
                };
                reader.readAsArrayBuffer(file);
            });
        });
    }
}

interface IFile {
    pathNative: string,
    path: string,
    name: string,
    blob: Blob
}
