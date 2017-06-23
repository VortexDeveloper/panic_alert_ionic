import { Component } from '@angular/core';
<<<<<<< HEAD
import { IonicPage, Events, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
=======
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
>>>>>>> a6a02d8f94912c8727e6fca8e6a8f5e6cc9e00da
import { HomePage } from '../home/home';
import { UsersProvider } from '../../providers/users/users';

import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { TwilioProvider } from '../../providers/twilio/twilio';

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
  user: {
    name: string,
    username: string,
    email: string,
    password: string,
    password_confirmation: string,
    phone_number: string
  };
  show_verify_field: boolean = false;
  loader: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private userProvider: UsersProvider,
    private toastCtrl: ToastController,
    private locationAccuracy: LocationAccuracy,
    private platform: Platform,
    private twilio: TwilioProvider,
<<<<<<< HEAD
    private events: Events
=======
    public loading: LoadingController
>>>>>>> a6a02d8f94912c8727e6fca8e6a8f5e6cc9e00da
  ) {
    this.user = {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      phone_number: ""
    };
  }

  showLoader(loadingText){
    this.loader = this.loading.create({
      content: loadingText,
    });
    this.loader.present();
  }

  register() {
    this.showLoader('Registrando usuário...');
    this.userProvider.sign_up(this.user).subscribe(
      (data) => {
        if(data.authentication != "" || data.authentication != undefined) {
          localStorage.setItem("authentication_token", data.authentication);
          localStorage.setItem("user", JSON.stringify(data.user));

          if(this.platform.is('cordova')) {
            this.requestLocationAccuracy();
          }

          this.events.publish('register_for_notification');
          this.nav.setRoot('ContactsPage', {first_time: true});
          this.loader.dismiss();
        }
      },
      (error) => {
        this.loader.dismiss();
        console.log(error.json() || 'Server error');
        this.presentToast(error.json().error);
      }
    )
  }

  verifyNumber() {
    this.showLoader('Verificando número...');
    this.user.phone_number = this.user.phone_number.replace('-', '');
    this.twilio.send_verification_code(this.user).subscribe(
      (data) => {
        this.loader.dismiss();
        if(data.success) {
          this.show_verify_field = true;
        } else {
          this.presentToast("Não conseguimos enviar SMS para o seu número.");
        }
      },
      (error) => {
        this.loader.dismiss();
        this.presentToast(JSON.stringify(error));
      }
    );
  }

  checkVerificationCode() {
    this.showLoader('Verificando código informado...');
    this.twilio.check_verification_code(this.user).subscribe(
      (data) => {
        this.loader.dismiss();
        if(data.success) {
          this.presentToast(data.message);
          this.register();
        } else {
          this.presentToast("O código está errado.");
        }
      },
      (error) => {
        this.loader.dismiss();
        this.presentToast(JSON.stringify(error));
      }
    );
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
