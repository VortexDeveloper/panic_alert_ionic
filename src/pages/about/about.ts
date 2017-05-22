import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the AboutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  informations: Array<{title: string, description: string}>

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.informations = [
      {
        title: "Versão",
        description: "0.0.1"
      },
      {
        title: "Desenvolvimento",
        description: "Vortex Developer"
      },
      {
        title: "Site",
        description: "www.panicodoalerta.com.br"
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
  }

}
