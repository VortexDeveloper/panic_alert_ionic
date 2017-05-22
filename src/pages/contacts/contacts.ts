import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactModel } from '../../model/contact/contact.model';

/**
 * Generated class for the Contacts page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contacts',
  templateUrl: 'contacts.html',
})
export class ContactsPage {
  public myContacts: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private contacts: Contacts,
    private toastCtrl: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Contacts');
  }

  registerContact() {
    this.contacts.pickContact().then(
      (contact) => {
        this.saveContact(contact);
      }
    ).catch(
      (e) => this.presentToast(JSON.stringify(e))
    );
  }

  saveContact(contact) {
    contact = contact._objectInstance;
    let params = {
      name: contact.displayName,
      numbers: []
    };

    for(let info of contact.phoneNumbers) {
      params.numbers.push({value: info.value});
    }
    
    this.myContacts.push(params);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
