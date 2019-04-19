import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';
import {IonicModule} from '@ionic/angular';
import {FileinfoPage} from './fileinfo.page';
import {DeviceModule} from "../../modules/device.module";
import {LogModule} from "../../modules/log.module";

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
})
export class FileinfoPageModule {
}
