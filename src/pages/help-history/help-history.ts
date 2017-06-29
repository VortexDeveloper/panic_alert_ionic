import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';

/**
 * Generated class for the HelpHistoryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-help-history',
  templateUrl: 'help-history.html',
})
export class HelpHistoryPage {
  public help_requests: Array<any>;

  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    public navParams: NavParams,
    private usersProvider: UsersProvider
  ) {
    this.loadHelpRequests();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpHistoryPage');
  }

  loadHelpRequests() {
    this.usersProvider.my_help_requests().subscribe(
      (help_requests) => {
        console.log(JSON.stringify(help_requests));
        this.help_requests = help_requests;
      },
      (error) => this.presentToast(JSON.stringify(error))
    );
  }

  getIconName(status) {
    switch(status) {
      case 'sent':
        return "paper-plane";
      case 'pending':
        return "more";
      case 'received':
        return "checkmark-circle";
      default:
        return "more";
    }
  }

  getIconColor(status) {
    switch(status) {
      case 'sent':
        return "danger";
      case 'pending':
        return "dark";
      case 'received':
        return "primary";
      default:
        return "dark";
    }
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  private getPayload(notification) {
    return JSON.parse(notification.android_payload).payload;
  }
}
