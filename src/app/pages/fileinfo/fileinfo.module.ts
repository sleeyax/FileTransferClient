import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {FileinfoPage} from './fileinfo.page';
import {DeviceModule} from "../../modules/device.module";
import {StatusService} from "../../services/status.service";
import {LogModule} from "../../modules/log.module";
import {FileOpener} from "@ionic-native/file-opener/ngx";

const routes: Routes = [
    {
        path: '',
        component: FileinfoPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        DeviceModule,
        LogModule
    ],
    declarations: [FileinfoPage],
    providers: [FileOpener]
})
export class FileinfoPageModule {
}
