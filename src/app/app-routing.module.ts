import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'fileinfo/:key', loadChildren: './pages/fileinfo/fileinfo.module#FileinfoPageModule' },
  { path: 'fileshare/:key', loadChildren: './pages/fileshare/fileshare.module#FilesharePageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
