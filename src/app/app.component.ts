import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'Login';
  pages: Array<{title: string, component: any, linkType: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private push: Push,
    private fb: Facebook
  ) {
    this.initializeApp();
    this.initializePages();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.setPageBasedOnLocalStorage();
    });
  }

  setPageBasedOnLocalStorage(){
    if (localStorage.getItem("user")){
      this.rootPage = HomePage;
    }
  }

  initializePages() {
    this.pages = [
      { title: 'Home', component: HomePage, linkType: 'internalLink' },
      { title: 'Contatos de Ajuda', component: 'ContactsPage', linkType: 'internalLink' },
      { title: 'Solicitações de Contato', component: 'OpenContactsPage', linkType: 'internalLink' },
      { title: 'Notificações', component: 'Notifications', linkType: 'internalLink' },
      { title: 'Configurações', component: 'Configuration', linkType: 'internalLink' },
      { title: 'Informações', component: 'Informations', linkType: 'internalLink' },
      { title: 'Ajuda', component: 'Help', linkType: 'internalLink' },
      { title: 'Cadastro', component: 'Registration', linkType: 'internalLink' },
      { title: 'Login', component: 'Login', linkType: 'internalLink' },
      { title: 'Facebook', component: 'http://facebook.com/alertadepanico', linkType: 'externalLink' }
    ];
  }

  isExternalLink(page){
    if(page.linkType == "externalLink"){
      this.openLink(page.component);
    }else{
      this.openPage(page);
    }
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
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

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Sair',
      message: 'Tem certeza que deseja sair?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Sim',
          handler: () => {
            // this.userProvider.logout().subscribe(
            //   (response) => {
                window.localStorage.removeItem("user");
                window.localStorage.removeItem("authentication_token");
                this.nav.setRoot(Login);
                this.logout();
            //   },
            //   (error) => console.log(error)
            // );
            // console.log('Abrir a página de sair');
          }
        }
      ]
    });
    alert.present();
  }

  logout() {
    this.push.unregister();
  }
}
