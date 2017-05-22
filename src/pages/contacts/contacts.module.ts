import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactsPage } from './contacts';

@NgModule({
  declarations: [
    ContactsPage,
  ],
  imports: [
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
