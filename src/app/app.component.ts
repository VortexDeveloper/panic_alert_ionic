import { Component, ViewChild } from '@angular/core';
import { Nav, Events, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Facebook } from '@ionic-native/facebook';
import { HomePage } from '../pages/home/home';
import { Login } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AlertController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';
import { UserModel } from '../model/user/user.model';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'Login';
  pages: Array<{title: string, component: any, linkType: any, hasBadge: any}>;
  contact_requests_size: any = "0";
  current_user: UserModel = new UserModel();

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private iab: InAppBrowser,
    private alertCtrl: AlertController,
    private push: Push,
    private fb: Facebook,
    private events: Events
  ) {
    this.initializeApp();
    this.initializePages();
    this.current_user = new UserModel(JSON.parse(window.localStorage.getItem("user")));
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
    this.contact_requests_size = window.localStorage.getItem("unread_accept_requests");
  }

  initializePages() {
    this.pages = [
      { title: 'Home', component: HomePage, linkType: 'internalLink', hasBadge: false },
      { title: 'Contatos de Ajuda', component: 'ContactsPage', linkType: 'internalLink', hasBadge: false },
      { title: 'Notificações', component: 'Notifications', linkType: 'internalLink', hasBadge: false },
      { title: 'Solicitações de Contato', component: 'OpenContactsPage', linkType: 'internalLink', hasBadge: this.contact_requests_size },
      { title: 'Configurações', component: 'Configuration', linkType: 'internalLink', hasBadge: false },
      { title: 'Informações', component: 'Informations', linkType: 'internalLink', hasBadge: false },
      { title: 'Ajuda', component: 'Help', linkType: 'internalLink', hasBadge: false },
      // { title: 'Cadastro', component: 'Registration', linkType: 'internalLink', hasBadge: false },
      // { title: 'Login', component: 'Login', linkType: 'internalLink', hasBadge: false },
      // { title: 'Help!', component: 'HelpRequestPage', linkType: 'internalLink', hasBadge: false },
      { title: 'Facebook', component: 'http://facebook.com/alertadepanico', linkType: 'externalLink', hasBadge: false }
    ];

    this.events.subscribe('contact_request:up', (amount) => {
      this.pages[2].hasBadge = amount;
    });
    this.events.subscribe('contact_request:down', (amount) => {
      this.pages[2].hasBadge = amount;
    });
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
                this.nav.setRoot('Login');
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
