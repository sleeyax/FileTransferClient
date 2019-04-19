import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastController} from "@ionic/angular";
import {File} from "@ionic-native/file/ngx";
import {DeviceModule} from "./device.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        DeviceModule
    ],
    providers: [File, ToastController]
})
export class LogModule {

    private readonly logPath: string;
    private readonly errorLogFile: string;

    constructor(private toast: ToastController, private file: File, private device: DeviceModule) {
        this.logPath = this.device.storage + 'FileTransfer/logs/';
        this.errorLogFile = 'error-log.txt'
    }

    // TODO: duplicate code: put in helper file (maybe add date helpers etc. to this file too)
    private createDir(path: string, dir: string) {
        return new Promise(resolve => {
            this.file.createDir(path, dir, false).then(() => resolve(false)).catch(() => resolve(true));
        });
    }

    /**
     * Check if the file exists
     * @param path
     * @param file
     */
    private fileExists(path: string, file: string): Promise<boolean> {
        return new Promise((resolve) => {
            this.file.checkFile(path, file)
                .then((exists) => {resolve(exists)})
                .catch(() => {resolve(false)});
        });
    }

    /**
     * Log an error message to the logs folder
     * @param error
     */
    public logError(error: string) {
        // Create filetransfer dir if it doesn't exist yet
        this.createDir(this.device.storage, 'FileTransfer').then(() => {
            // Create filetransfer/logs dir if it doesn't exist yet
            return this.createDir(this.device.storage, 'FileTransfer/logs')
        }).then(async () => {
            // Check if the log file exists
            return this.fileExists(this.logPath, this.errorLogFile);
        }).then(fileExists => {
            // Write to log file
            return fileExists ?
                this.file.writeExistingFile(this.logPath, this.errorLogFile, error) :
                this.file.writeFile(this.logPath, this.errorLogFile, error);
        });
    }
}
