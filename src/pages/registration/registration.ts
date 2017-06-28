import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UsersProvider } from '../../providers/users/users';
import { AlertController } from 'ionic-angular';
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
    ddd: string;
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
    public loading: LoadingController,
    public alertCtrl: AlertController
  ) {
      this.user = {
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
        ddd: "",
        phone_number: ""
      };
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
    let validation = this.validateUser(this.user);
    if (validation.status) {
      this.showLoader(
        'Enviando SMS para ' +
        '(' + this.user.ddd + ')' +
        this.user.phone_number + "..."
      );
      this.user.phone_number = this.user.phone_number.replace('-', '');
      this.twilio.send_verification_code(this.user).subscribe(
        (data) => {
          this.loader.dismiss();
          if(data.success) {
            this.showAlert(
              "SMS Enviado",
              "Foi enviado um SMS para" +
              "(" + this.user.ddd + ")" +
              this.user.phone_number +
              ", verifique sua caixa de mensagem e copie o código informado."
            );
            this.show_verify_field = true;
          } else {
            this.showAlert(
              "SMS não enviado",
              "Não foi possível enviar SMS para o número enviado, verifique o número e tente novamente."
            );
          }
        },
        (error) => {
          this.loader.dismiss();
          this.presentToast(JSON.stringify(error));
        }
      );
    }else{
      this.presentToast(validation.message);
    }
  }

  checkVerificationCode() {
    this.showLoader('Verificando código...');
    this.twilio.check_verification_code(this.user).subscribe(
      (data) => {
        this.loader.dismiss();
        if(data.success) {
          this.presentToast("Código de verificação correto.");
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

  showLoader(loadingText){
    this.loader = this.loading.create({
      content: loadingText,
    });
    this.loader.present();
  }

  showAlert(title, subTitle) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: ['OK']
    });
    alert.present();
  }

  validateUser(user){

    let emailRule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let validation: { status: boolean, message: string };
    validation = { status: true, message: "OK" };

    if(user.name == null || user.name == ""){
      return validation = { status: false, message: "O campo nome deve ser preenchido!" };
    }else if(user.username == null || user.username == ""){
      return validation = { status: false, message: "O campo username deve ser preenchido!" };
    }else if(user.email == null || user.email == "" || !user.email.match(emailRule)){
      return validation = { status: false, message: "O campo email deve ser preenchido corretamente!" };
    }else if(user.password == null || user.password == "" || user.password.length < 6){
      return validation = { status: false, message: "O campo senha deve ser preenchido com no mínimo 6 dígitos!" };
    }else if(user.password_confirmation != user.password){
      return validation = { status: false, message: "A confirmação da senha deve ser igual à senha!" };
    }else if(user.ddd == null || user.ddd == ""){
      return validation = { status: false, message: "O campo DDD deve ser preenchido" };
    }else if(user.phone_number == null || user.phone_number == ""){
      return validation = { status: false, message: "O campo Número de telefone deve ser preenchido" };
    }else{
      return validation;
    }

  }

}
