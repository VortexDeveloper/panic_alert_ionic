import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { NotificationProvider } from '../../providers/notification/notification';
import { Geolocation } from '@ionic-native/geolocation';
import { Vibration } from '@ionic-native/vibration';

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
    public loading: LoadingController,
    private vibration: Vibration
  ) {}

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
      if (err.code == err.PERMISSION_DENIED) {
        this.loader.dismiss();
        this.presentToast("O Aplicativo não possui permissão para acessar a sua localização.");
      } else if (err.code == err.POSITION_UNAVAILABLE) {
        this.loader.dismiss();
        this.presentToast("Não estamos conseguindo capturar sua localização, verifique sua conexão com a internet.");
      } else if (err.code == err.TIMEOUT) {
        if (retry > 3) {
          this.loader.dismiss();
          this.presentToast("O aplicativo está encontrando dificuldade para obter sua localização.");
        } else this.showPrompt(++retry, timeout+1000);
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
}
