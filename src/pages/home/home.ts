import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: NavController, private alertCtrl: AlertController) {
  }

  showPrompt() {
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
  }
}
