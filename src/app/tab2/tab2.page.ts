import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../services/settings.service";
import {AbstractControl, FormControl, Validators} from "@angular/forms";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{
    public keyFormControl: FormControl;

    constructor(private nav: NavController, private http: HttpClient, private settings: SettingsService, private qr: BarcodeScanner) {}

    ngOnInit(): void {
        // Validate user input of key input field
        this.keyFormControl = new FormControl('',
            Validators.compose([Validators.pattern('[a-zA-Z-0-9]+')]),
        );
    }
    /**
     * Navigate to file info page
     */
    public async navFileInfo() {
        if (this.keyFormControl.value == '') {
            this.keyFormControl.setErrors({msg: 'Please enter a key'});
            return;
        }

        const keyValid = await this.verifyKey(this.keyFormControl.value);
        if (keyValid) {
            this.nav.navigateForward(`fileinfo/${this.keyFormControl.value}`);
        }else{
            this.keyFormControl.setErrors({msg: 'Invalid key'});
        }
    }

    /**
     * Scan QR code and set textbox to its value
     */
    public scanQR() {
        this.qr.scan().then(data => {
            this.keyFormControl.setValue(data.text);
        }).catch(err => {console.log(err);});
    }

    /**
     * Check whether or not the key exists
     */
    public async verifyKey(key: string) {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.settings.server}/file/verify/${key}`).subscribe((res) => {
                resolve(res["found"]);
            }, (err) => {console.log(err); reject(false);});
        });
    }
}
