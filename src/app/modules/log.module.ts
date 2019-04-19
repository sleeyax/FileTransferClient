import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToastController} from "@ionic/angular";
import {File} from "@ionic-native/file/ngx";
import {DeviceModule} from "./device.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ]
})
export class LogModule {

    private readonly logPath: string;
    private readonly errorLogFile: string;

    constructor(private toast: ToastController, private file: File, private device: DeviceModule) {
        this.logPath = this.device.storage + '/logs';
        this.errorLogFile = 'error-log.txt'
    }

    /**
     * Show an error message on the screen
     * @param message
     */
    public async showError(message?: string) {
        const toast = await this.toast.create({
            message: message ? message : 'Fatal error! Check your log file',
            duration: 5000,
            showCloseButton: true,
            closeButtonText: 'Close',
            color: 'danger'
        });
        toast.present();
    }

    /**
     * Log an error message to the logs folder
     * @param error
     */
    public async logError(error: string) {
        const logExists = this.file.checkFile(this.logPath, this.errorLogFile);
        if (logExists) {
            this.file.writeExistingFile(this.logPath, this.errorLogFile, error);
        } else {
            this.file.writeFile(this.logPath, this.errorLogFile, error);
        }
    }
}
