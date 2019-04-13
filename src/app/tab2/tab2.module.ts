import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Tab2Page } from './tab2.page';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab2Page }]),
    ReactiveFormsModule
  ],
  declarations: [Tab2Page],
  providers: [BarcodeScanner]
})
export class Tab2PageModule {}
