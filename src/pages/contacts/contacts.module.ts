import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactsPage } from './contacts';

import { OpenPageModule } from '../../components/open-page/open-page.module';

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
    OpenPageModule,
    IonicPageModule.forChild(ContactsPage),
  ],
  exports: [
    ContactsPage
  ],
  providers: [
    Contacts
  ]
})
export class ContactsModule {}
