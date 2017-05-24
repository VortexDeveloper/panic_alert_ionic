import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the Informations page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-informations',
  templateUrl: 'informations.html',
})
export class Informations {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    // private iab: InAppBrowser
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Informations');
  }

  // openLink(link){
  //   if(link){
  //     this.iab.create(link, '_system');
  //   }
  // }
}
