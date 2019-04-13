import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FilesharePage } from './fileshare.page';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";

const routes: Routes = [
  {
    path: '',
    component: FilesharePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FilesharePage],
  providers: [BarcodeScanner]
})
export class FilesharePageModule {}
