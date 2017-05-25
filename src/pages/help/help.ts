import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsersProvider } from '../../providers/users/users';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the Help page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class Help {
  hideQuestion: Array<boolean> = [];
  message: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UsersProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController
  ) {
    for (let i = 0; i < 3; i++) {
        this.hideQuestion[i] = true;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Help');
  }

  toggleTextHelp(i) {
    this.hideQuestion[i] = !this.hideQuestion[i];
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }

  sendSupportMail(message) {
    if (message != null) {
      let loader = this.loadingCtrl.create({
        content: "Enviando mensagem..."
      });
      loader.present();
      this.userProvider.send_support_email(message).subscribe(
        (_) => {
          this.presentToast('Sua mensagem foi enviada para a nossa central de suporte e em breve responderemos através do email cadastrado.');
          loader.dismiss();
        },
        (error) => {
          this.presentToast(error)
          console.log(error);
          loader.dismiss();
        },
        () => {
          this.message = null;
        }
      );
    } else {
      this.presentToast('O campo mensagem não pode ser vazio.');
    }
  }
}
