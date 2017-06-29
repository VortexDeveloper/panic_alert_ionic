import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Facebook } from '@ionic-native/facebook';
import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

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
    private iab: InAppBrowser,
    private fb: Facebook,
    private admobFree: AdMobFree
  ) {
      const bannerConfig: AdMobFreeBannerConfig = {
        id: 'ca-app-pub-9804853996011720/1367217498',
        isTesting: true,
        autoShow: true
      };
      this.admobFree.banner.config(bannerConfig);
      this.admobFree.banner.prepare()
      .then(() => {
      })
      .catch(e => console.log(e));
    }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Informations');
  }

  openLink(link){
    let browser = this.iab.create(link);
    browser
  }

  inviteFacebookFriends() {
    let options = {
      url: "https://fb.me/202248836944012",
      picture: "https://placehold.it/350x350"
    }
    this.fb.appInvite(options).then(
      (obj) => console.log(obj),
      (error) => {
        alert(error);
        console.log(error)
      }
    );
  }

}
