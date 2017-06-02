import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the NotificationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NotificationProvider {
  // private host: string = 'http://localhost:3000/';
  private host: string = 'http://10.0.2.2:3000/';
  // private host: string = 'https://alertadepanico.herokuapp.com/';
  private notifications_path = this.host + 'notifications';

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {
  }

  notify(message, options={}) {
    let parameters = {
      notifications: {
        message: message,
        options: options
      }
    };

    return this.authHttp.post(this.notifications_path + '.json', parameters)
      .map(res => res.json());
  }
}
