import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule, Http } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import { UsersProvider } from '../providers/users/users';
import { TwilioProvider } from '../providers/twilio/twilio';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Facebook } from '@ionic-native/facebook';
import { ContactsProvider } from '../providers/contacts/contacts';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { NotificationProvider } from '../providers/notification/notification';

import { GoogleMaps } from '@ionic-native/google-maps';

import { Vibration } from '@ionic-native/vibration';
import { RoutesProvider } from '../providers/routes/routes';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { Contacts } from '@ionic-native/contacts';



export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json', 'Content-Type': 'application/json'}],
    tokenGetter: (() => localStorage.getItem('authentication_token')),
  }), http);
};


const cloudSettings: CloudSettings = {
  'core': {
    'app_id': 'fc69a24b',
  },
  'push': {
    'sender_id': '71910231492',
    'pluginConfig': {
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    Facebook,
    StatusBar,
    SplashScreen,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsersProvider,
    {provide: AuthHttp, useFactory: getAuthHttp, deps: [Http]},
    TwilioProvider,
    ContactsProvider,
    Geolocation,
    GoogleMaps,
    NotificationProvider,
    Vibration,
    RoutesProvider,
    Contacts,
    NativeGeocoder
  ]
})
export class AppModule {}
