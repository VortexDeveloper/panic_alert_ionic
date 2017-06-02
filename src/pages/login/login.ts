import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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
    private push: Push
  ) {
    this.user = {username: "", password: ""}
  }

  login() {
    this.userProvider.login(this.user).subscribe(
      (data) => {
        if(data.authentication != "" || data.authentication !== undefined) {
          alert('oi');
          localStorage.setItem("authentication_token", data.authentication);
          localStorage.setItem("user", JSON.stringify(data.user));
          this.registerUserForPushNotification();
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
        alert('subscribing...');
        this.push.rx.notification().subscribe(
          (notification) => {
            alert('Received a notification ' + JSON.stringify(notification));
          },
          (error) => {
            alert('Received a error ' + JSON.stringify(error));
          });

        // this.push.plugin.on('error').subscribe(
        //   error => {
        //     alert('Received a notification ' + JSON.stringify(error));
        //   });
      },
      (error) => { alert(JSON.stringify(error)) }
    );
  }
}
