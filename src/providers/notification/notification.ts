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
  // private host: string = 'http://10.0.2.2:3000/'; // AVD
  private host: string = 'http://192.168.0.37:3000/'; // Casa Thiago
  // private host: string = 'http://192.168.1.107:3000/'; // Vortex
  // private host: string = 'https://alertadepanico.herokuapp.com/';
  private notifications_path = this.host + 'notifications';

  constructor(
    public http: Http,
    public authHttp: AuthHttp
  ) {
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
