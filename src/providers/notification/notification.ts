import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import { RoutesProvider } from '../routes/routes';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificationProvider {

  private host: string;
  private notifications_path: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: RoutesProvider
  ) {
      this.host = this.routesProvider.host();
      this.setRoutes(this.host);
  }

  setRoutes(host){
    this.notifications_path = host + 'notifications';
  }

  index() {
    return this.authHttp.get(this.notifications_path + '.json')
      .map(res => res.json());
  }

  notify(position, options={}) {
    let parameters = {
      notifications: {
        position: position,
        options: options,
        kind: 'help_request'
      }
    };

    return this.authHttp.post(this.notifications_path + '.json', parameters)
      .map(res => res.json());
  }
}
