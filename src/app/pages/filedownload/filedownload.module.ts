import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FiledownloadPage } from './filedownload.page';
import {FileOpener} from "@ionic-native/file-opener/ngx";

const routes: Routes = [
  {
    path: '',
    component: FiledownloadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [FiledownloadPage],
  providers: [FileOpener]
})
export class FiledownloadPageModule {}
