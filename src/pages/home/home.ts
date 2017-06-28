import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { Geolocation } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactModel } from '../../model/contact/contact.model';
import { ContactsProvider } from '../../providers/contacts/contacts';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loader: any;

  constructor(
    public nav: NavController,
    private alertCtrl: AlertController,
    private push: Push,
    private toastCtrl: ToastController,
    private notificationProvider: NotificationProvider,
    private geolocation: Geolocation,
    private contacts: Contacts,
    private contactsProvider: ContactsProvider,
    public loading: LoadingController,
    private vibration: Vibration,
    private nativeGeocoder: NativeGeocoder
  ) {
    }

  openPage(page){
    this.nav.push(page);
  }

  showLoader(loadingText){
    this.loader = this.loading.create({
      content: loadingText,
    });
    this.loader.present();
  }

  showPrompt(retry=0, timeout=5000) {
    var options = { enableHighAccuracy: true, timeout:timeout, maximumAge: 0 };
    this.vibration.vibrate(1000);
    this.showLoader('Aguarde, enviando alerta...');
    this.geolocation.getCurrentPosition(options).then((position) => {
      let positionObj = {
        coords: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          altitudeAccuracy: position.coords.altitudeAccuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
        }
      };

      this.notificationProvider.notify(positionObj).subscribe(
        (data) => {
          this.loader.dismiss();
          let prompt = this.alertCtrl.create({
            title: 'Alerta enviado!',
            message: "A mensagem de alerta foi enviada para os seus contatos de emergência. Clique no botão para revisar seus contatos de emergência.",
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
          this.loader.dismiss();
          let errors = error.json().errors;
          this.presentToast(errors.message);
        }
      );

    }, (err) => {
      this.loader.dismiss();
      if (err.code == err.PERMISSION_DENIED) {
        this.presentToast("O Aplicativo não possui permissão para acessar a sua localização.");
      } else if (err.code == err.POSITION_UNAVAILABLE) {
        this.presentToast("Não estamos conseguindo capturar sua localização, verifique sua conexão com a internet.");
      } else if (err.code == err.TIMEOUT) {
        // alert(retry);
        if (retry > 3) {
          this.presentToast("O aplicativo está encontrando dificuldade para obter sua localização.");
        } else {
          this.showPrompt(++retry, timeout+1000);
        }
      }
    });


  }

  private presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 9000
    });
    toast.present();
  }

  registerContact() {
    this.contacts.pickContact().then(
      (contact) => {
        this.save(contact);
      }
    ).catch(
      (e) => this.presentToast(JSON.stringify(e))
    );
  }

  private save(contact) {
    contact = contact._objectInstance;
    let params = this.contact_params();
    params.name = contact.displayName;
    params.display_name = contact.displayName;
    params.kind = "contact_request";

    for(let info of contact.phoneNumbers) {
      params.numbers.push({value: info.value, type: info.type});
    }

    this.contactsProvider.create(params).subscribe(
      (contacts) => {
        this.presentToast(contacts.message);
      },
      (error) => {
        let data = error.json();
        this.presentToast(data.errors.message);
      }
    );
  }

  private contact_params() {
    return {
      name: "",
      display_name: "",
      kind: "",
      numbers: []
    };
  }

}
