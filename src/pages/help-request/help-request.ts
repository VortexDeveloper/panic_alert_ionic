import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HelpRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-help-request',
  templateUrl: 'help-request.html',
})
export class HelpRequestPage {
  notification: any;
  position: any;
  hour: any;
  address: any;
  sender_name: any;

  constructor(
    public nav: NavController,
    public navParams: NavParams
  ) {
    this.notification = navParams.data.notification;
    var payload = this.notification.additionalData.payload.data;
    this.position = {
      latitude: payload.position.latitude,
      longitude: payload.position.longitude,
      accuracy: payload.position.accuracy
    };
    this.hour = payload.hour;
    this.sender_name = payload.sender_name;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpRequestPage');
  }

  seeMap() {
    this.nav.push('MapPage', {position: this.position});
  }
}
