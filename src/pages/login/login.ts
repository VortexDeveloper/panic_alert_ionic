import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersProvider } from '../../providers/users/users';

import { OpenPageDirective } from '../../components/open-page/open-page';

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
    private toastCtrl: ToastController
  ) {
    this.user = {username: "", password: ""}
  }

  login() {
    this.userProvider.login(this.user).subscribe(
      (data) => {
        if(data.authentication_token !== undefined) {
          localStorage.setItem("authentication_token", data.authentication_token);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.nav.setRoot(HomePage)
        }
      },
      (error) => {
        console.log(error.json() || 'Server error');
        this.presentToast(error.json().error);
      }
    );
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
