import {Component, OnInit} from '@angular/core';
import {NavController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {SettingsService} from "../services/settings.service";
import {FormControl, Validators} from "@angular/forms";
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
            Validators.compose([Validators.required, Validators.pattern('[a-zA-Z-0-9]+')]),
            Validators.composeAsync([(): any => {
                return new Promise(async resolve => {
                    const resolved = await this.verifyKey();
                    resolve(resolved ? resolved : {required: "Enter a valid key"});
                });
            }])
        );
    }
    /**
     * Navigate to file info page
     */
    public async navFileInfo() {
        if (this.keyFormControl.valid) {
            this.nav.navigateForward(`fileinfo/${this.keyFormControl.value}`);
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
    public async verifyKey() {
        return new Promise((resolve, reject) => {
            this.http.get(`${this.settings.server}/file/verify/${this.keyFormControl.value}`).subscribe((res) => {
                resolve(res["found"]);
            }, (err) => {console.log(err); reject(false);});
        });
    }
}
