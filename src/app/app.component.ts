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



import { UsersProvider } from '../providers/users/users';
import { NotificationProvider } from '../providers/notification/notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = 'Login';
  pages: Array<{title: string, component: any, linkType: any, hasBadge: any, icon: string}>;
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
    private events: Events,
    private userProvider: UsersProvider,
    private notificationProvider: NotificationProvider,
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
      // { title: 'Home', component: HomePage, linkType: 'internalLink', hasBadge: false },
      // { title: 'Contatos de Ajuda', component: 'ContactsPage', linkType: 'internalLink', hasBadge: false },
      // { title: 'Solicitações de Contato', component: 'OpenContactsPage', linkType: 'internalLink', hasBadge: this.contact_requests_size },
      // { title: 'Notificações', component: 'Notifications', linkType: 'internalLink', hasBadge: false },
      // { title: 'Pedidos de Ajuda', component: 'HelpHistoryPage', linkType: 'internalLink', hasBadge: false },
      // { title: 'Configurações', component: 'Configuration', linkType: 'internalLink', hasBadge: false },
      // { title: 'Informações', component: 'Informations', linkType: 'internalLink', hasBadge: false },
      // { title: 'Ajuda', component: 'Help', linkType: 'internalLink', hasBadge: false },
      // { title: 'Cadastro', component: 'Registration', linkType: 'internalLink', hasBadge: false },
      // { title: 'Login', component: 'Login', linkType: 'internalLink', hasBadge: false },
      // { title: 'Help!', component: 'HelpRequestPage', linkType: 'internalLink', hasBadge: false },
      // { title: 'Facebook', component: 'http://facebook.com/alertadepanico', linkType: 'externalLink', hasBadge: false }

      { title: 'Notificações', component: 'Notifications', linkType: 'internalLink', hasBadge: false, icon: 'notifications' },
      { title: 'Pedidos de Ajuda', component: 'HelpHistoryPage', linkType: 'internalLink', hasBadge: false, icon: 'notifications' },
      { title: 'Informações', component: 'Informations', linkType: 'internalLink', hasBadge: false, icon: 'information' },
      { title: 'Ajuda', component: 'Help', linkType: 'internalLink', hasBadge: false, icon: 'help' },
      { title: 'Visite nossa página no Facebook', component: 'http://facebook.com/alertadepanico', linkType: 'externalLink', hasBadge: false, icon: 'logo-facebook' }
      // { title: 'Home', component: HomePage, linkType: 'internalLink', hasBadge: false },
      // { title: 'Contatos de Ajuda', component: 'ContactsPage', linkType: 'internalLink', hasBadge: false },
      // { title: 'Solicitações de Contato', component: 'OpenContactsPage', linkType: 'internalLink', hasBadge: this.contact_requests_size },
      // { title: 'Configurações', component: 'Configuration', linkType: 'internalLink', hasBadge: false },
      // { title: 'Cadastro', component: 'Registration', linkType: 'internalLink', hasBadge: false },
      // { title: 'Login', component: 'Login', linkType: 'internalLink', hasBadge: false },
      // { title: 'Help!', component: 'HelpRequestPage', linkType: 'internalLink', hasBadge: false },
    ];

    this.events.subscribe('contact_request:up', (amount) => {
      this.pages[2].hasBadge = amount;
    });
    this.events.subscribe('contact_request:down', (amount) => {
      this.pages[2].hasBadge = amount;
    });

    this.events.subscribe('register_for_notification', () => {
      this.register_for_notification();
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

  private register_for_notification() {
    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {
      this.subscribe_to_notifications(t);
      console.log('Saved token: ', (t));
    });
  }

  private subscribe_to_notifications(t: PushToken) {
    this.userProvider.saveNotificationToken(t).subscribe(
      (_) => {
        this.push.rx.notification().subscribe(
          (notification) => {
            let note = notification.raw;
            let payload = note.additionalData.payload;

            this.notificationProvider.mark_as_received(payload).subscribe(() => {});

            switch(payload.data.kind) {
              case "help_request":
                this.nav.push('HelpRequestPage', {notification: note});
                break;
              case "accept_request":
                this.nav.push('ContactsPage');
                break;
              case "contact_request":
                let unread = parseInt(localStorage.getItem("unread_accept_requests"));
                unread += 1;
                localStorage.setItem("unread_accept_requests", unread.toString());
                this.events.publish('contact_request:up', unread);
                break;

            }
          },
          (error) => {
            alert('Received a error ' + JSON.stringify(error));
          });
      },
      (error) => { alert(JSON.stringify(error)) }
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
