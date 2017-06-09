import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { NotificationProvider } from '../../providers/notification/notification';

/**
 * Generated class for the Notifications page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class Notifications {
  notifications: Array<any>;

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
    private notificationProvider: NotificationProvider
  ) {
      this.loadNotifications();
  }

  loadNotifications() {
    this.notificationProvider.index().subscribe(
      (response) => {
        this.notifications = response.notifications;
      },
      (error) => this.presentToast(JSON.stringify(error))
    );
  }

  seeMap(notification) {
    let payload = this.getPayload(notification);
    var position = {
      latitude: payload.data.position.latitude,
      longitude: payload.data.position.longitude 
    }
    this.nav.push('MapPage', {position: position});
  }

  hasPosition(notification) {
    let payload = this.getPayload(notification);
    if (payload.data.position) return true;
    return false;
  }

  private getPayload(notification) {
    return JSON.parse(notification.android_payload).payload;
  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 5000
    });
    toast.present();
  }
}
