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
            showCloseButton: true,
            closeButtonText: 'Close',
            color: 'danger',
            position: 'top',
            duration: 5000
        });
        toast.present();
    }

    /**
     * Show success message
     * @param message
     */
    public async showSuccess(message?: string) {
        const toast = await this.toast.create({
            message: message ? message : 'Operation success',
            showCloseButton: true,
            closeButtonText: 'Close',
            color: 'success',
            position: 'top',
            duration: 3000
        });
        toast.present();
    }
}
