import {Injectable} from '@angular/core';
import {ToastController} from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class StatusService {
    constructor(private toast: ToastController) {}

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
}
