import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
