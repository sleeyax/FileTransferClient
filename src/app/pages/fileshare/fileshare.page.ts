import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@Component({
    selector: 'app-fileshare',
    templateUrl: './fileshare.page.html',
    styleUrls: ['./fileshare.page.scss'],
})
export class FilesharePage implements OnInit {

    public key: string;
    public qrCode;

    constructor(private route: ActivatedRoute, private barCodeScanner: BarcodeScanner) {}

    ngOnInit() {
        this.key = this.route.snapshot.paramMap.get('key');
    }

    private showQrCode() {
        this.barCodeScanner.encode(this.barCodeScanner.Encode.TEXT_TYPE, this.key).then()
            .catch(err => {console.log(err)});
    }

}
