import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenContactsPage } from './open-contacts';

@NgModule({
  declarations: [
    OpenContactsPage,
  ],
  imports: [
    IonicPageModule.forChild(OpenContactsPage),
  ],
  exports: [
    OpenContactsPage
  ]
})
export class OpenContactsPageModule {}
