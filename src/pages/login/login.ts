import { Component } from '@angular/core';
import { IonicPage, Events, NavController, NavParams, ToastController } from 'ionic-angular';
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

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private userProvider: UsersProvider,
    private toastCtrl: ToastController,
    private push: Push,
    private events: Events
  ) {
    this.user = {username: "", password: ""}
  }

  login() {
    this.userProvider.login(this.user).subscribe(
      (data) => {
        if(data.authentication != "" || data.authentication !== undefined) {
          localStorage.setItem("authentication_token", data.authentication);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("unread_accept_requests", "0");
          this.events.publish('register_for_notification');
          this.nav.setRoot(HomePage);
        }
      },
      (error) => {
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
}
