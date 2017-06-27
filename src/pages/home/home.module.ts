import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { HomePage } from './home';

import { OpenPageModule } from '../../components/open-page/open-page.module';

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    OpenPageModule,
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage
  ],
  providers: [
    Contacts
  ]
})
export class HomeModule {}
