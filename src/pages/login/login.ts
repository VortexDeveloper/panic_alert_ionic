import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersProvider } from '../../providers/users/users';

import { OpenPageDirective } from '../../components/open-page/open-page';

import { Push, PushToken } from '@ionic/cloud-angular';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  user: {username: string, password: string};
  loader: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private userProvider: UsersProvider,
    private toastCtrl: ToastController,
    private push: Push,
    private events: Events,
    public loading: LoadingController
  ) {
    this.user = {username: "", password: ""}
  }

  showLoader(loadingText){
    this.loader = this.loading.create({
      content: loadingText,
    });
    this.loader.present();
  }

  login() {
    this.showLoader('Efetuando login...');
    this.userProvider.login(this.user).subscribe(
      (data) => {
        if(data.authentication != "" || data.authentication !== undefined) {
          localStorage.setItem("authentication_token", data.authentication);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("unread_accept_requests", "0");
          this.registerUserForPushNotification();
          this.nav.setRoot(HomePage);
          this.loader.dismiss();
        }
      },
      (error) => {
        this.loader.dismiss();
        console.log(error.json() || 'Server error');
        this.presentToast(error.json().error);
      }
    );
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  private registerUserForPushNotification() {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      this.subscribe_to_notifications(t);
      console.log('Saved token: ', (t));
    });
  }

  private subscribe_to_notifications(t: PushToken) {
    this.userProvider.saveNotificationToken(t).subscribe(
      (_) => {
        this.push.rx.notification().subscribe(
          (notification) => {
            let note = notification.raw;
            let payload = note.additionalData.payload;

            switch(payload.data.kind) {
              case "help_request":
                this.nav.push('HelpRequestPage', {notification: note});
                break;
              case "accept_request":
                this.nav.push('ContactsPage');
                break;
              case "contact_request":
                let unread = parseInt(localStorage.getItem("unread_accept_requests"));
                unread += 1;
                localStorage.setItem("unread_accept_requests", unread.toString());
                this.events.publish('contact_request:up', unread);
                break;

            }
          },
          (error) => {
            alert('Received a error ' + JSON.stringify(error));
          });
      },
      (error) => { alert(JSON.stringify(error)) }
    );
  }
}
