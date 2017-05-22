import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersProvider } from '../../providers/users/users';

import { LocationAccuracy } from '@ionic-native/location-accuracy';

/**
 * Generated class for the Registration page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-registration',
  templateUrl: 'registration.html',
})
export class Registration {
  user: {name: string, username: string, email: string, password: string, password_confirmation: string};

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private userProvider: UsersProvider,
    private toastCtrl: ToastController,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform
  ) {
    this.user = {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: ""
    };
  }

  register() {
    this.userProvider.sign_up(this.user).subscribe(
      (data) => {
        if(data.authentication_token !== undefined) {
          localStorage.setItem("authentication_token", data.authentication_token);
          localStorage.setItem("user", JSON.stringify(data.user));

          if(this.platform.is('cordova')) {
            this.requestLocationAccuracy();
          }

          this.nav.setRoot('Contacts')
        }
      },
      (error) => {
        console.log(error.json() || 'Server error');
        this.presentToast(error.json().error);
      }
    )
    // this.navCtrl.setRoot(HomePage);
  }

  requestLocationAccuracy() {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {

    if(canRequest) {
      // the accuracy option will be ignored by iOS
      this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
        () => console.log('Request successful'),
        error => console.log('Error requesting location permissions', error)
      );
    }

  });
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
