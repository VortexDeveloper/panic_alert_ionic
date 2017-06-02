import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { NotificationProvider } from '../../providers/notification/notification';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public nav: NavController,
    private alertCtrl: AlertController,
    private push: Push,
    private toastCtrl: ToastController,
    private notificationProvider: NotificationProvider
  ) {}

  showPrompt() {
    this.notificationProvider.notify('SOCORRO').subscribe(
      (data) => {
        let prompt = this.alertCtrl.create({
          title: 'Enviando alerta!',
          message: "A mensagem de alerta foi enviada para 2 dos seus contatos de emergência. Clique no botão para revisar seus contatos de emergência.",
          buttons: [
            {
              text: 'Ok!',
              handler: data => {
                console.log('Cancel clicked');
              }
            },
            {
              text: 'Rever Contatos',
              handler: data => {
                this.nav.push('Contacts');
              }
            }
          ]
        });
        prompt.present();
      },
      (error) => {

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
