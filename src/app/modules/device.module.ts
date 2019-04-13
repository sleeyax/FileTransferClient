import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Platform} from "@ionic/angular";
import {File} from "@ionic-native/file/ngx";
import {FileChooser} from "@ionic-native/file-chooser/ngx";
import {IOSFilePicker} from "@ionic-native/file-picker/ngx";
import {FilePath} from "@ionic-native/file-path/ngx";
import {reject} from "q";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [FileChooser, IOSFilePicker, File, FilePath]
})
export class DeviceModule {
    public storage: string;
    public isAndroid: boolean = false;
    public isIOS: boolean = false;

    constructor(
        private platform: Platform,
        private file: File,
        private filePath: FilePath,
        private andchooser: FileChooser,
        private ioschooser: IOSFilePicker
    ) {
        if (platform.is('ios')) {
            this.isIOS = true;
            this.storage = file.documentsDirectory;
        } else if (platform.is('android')) {
            this.isAndroid = true;
            this.storage = file.externalRootDirectory;
        }
    }

    /**
     * Open file chooser/picker
     */
    public chooseFile(): Promise<string> {
        if (this.isAndroid) {
            return this.andchooser.open().then(file => {
                return this.filePath.resolveNativePath(file);
            });
        } else {
            // TODO: test on ios
            return this.ioschooser.pickFile();
        }
    }
}
