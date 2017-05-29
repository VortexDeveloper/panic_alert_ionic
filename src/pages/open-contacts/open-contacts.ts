import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { ContactsProvider } from '../../providers/contacts/contacts';

/**
 * Generated class for the OpenContactsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-open-contacts',
  templateUrl: 'open-contacts.html',
})
export class OpenContactsPage {
  openRequests: Array<any> = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private contactsProvider: ContactsProvider
  ) {
    this.load_requests();
  }

  acceptRequest(request) {
    this.contactsProvider.accept_emergency_contact_of(request).subscribe(
      (_) => request.aceito = true,
      (error) => {
        let data = error.json();
        this.presentToast(data.errors.message);
      }
    );
  }

  refuseRequest(request) {
    this.contactsProvider.refuse_emergency_contact_of(request).subscribe(
      (_) => request.aceito = false,
      (error) => {
        let data = error.json();
        this.presentToast(data.errors.message);
      }
    );
  }

  private load_requests() {
    this.contactsProvider.pending_dependent_requests().subscribe(
      (contacts) => this.openRequests = contacts.list,
      (error) => {
        let data = error.json();
        this.presentToast(data.errors.message);
      }
    );
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 9000
    });
    toast.present();
  }
}
