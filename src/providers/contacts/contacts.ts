import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the ContactProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ContactsProvider {

  jwtHelper: JwtHelper = new JwtHelper();
  // private host: string = 'http://localhost:3000/';
  private host: string = 'http://10.0.2.2:3000/';

  private contacts_path = this.host + 'contacts';

  constructor(public http: Http, public authHttp: AuthHttp) {
    console.log('Hello ContactProvider Provider');
  }

  create(contact_params) {
    return this.authHttp.post(this.contacts_path + '.json', {contact: contact_params})
      .map(res => res.json());
  }

  index() {
    return this.authHttp.get(this.contacts_path + '.json')
      .map(res => res.json());
  }
}
