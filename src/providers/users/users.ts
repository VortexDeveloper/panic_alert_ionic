import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as CryptoJS from 'crypto-js';
import { JwtHelper } from 'angular2-jwt';
import { AuthHttp } from 'angular2-jwt';
import { RoutesProvider } from '../routes/routes';

/*
  Generated class for the UsersProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UsersProvider {

  jwtHelper: JwtHelper = new JwtHelper();
  private host: string;
  private users_path: string;
  private login_path: string;
  private sign_up_path: string;
  private support_url: string;
  private save_notification_token_url: string;

  constructor(
    public http: Http,
    public authHttp: AuthHttp,
    public routesProvider: RoutesProvider
  ) {
    console.log('Hello UsersProvider Provider');
    this.host = this.routesProvider.host();
    this.setRoutes(this.host);
  }

  setRoutes(host){
    this.users_path = host + 'users/';
    this.login_path = this.users_path + 'sign_in.json';
    this.sign_up_path = this.users_path + 'sign_up.json';
    this.support_url =  this.users_path + 'send_support_email.json?message=';
    this.save_notification_token_url =  this.users_path + 'save_notification_token.json';
  }

  login(user) {
    var login_token = this.encodeJWT(user);

    let myHeader = new Headers();
    myHeader.append('AUTHORIZATION', 'Basic ' + login_token);
    let options = new RequestOptions({ headers: myHeader });

    return this.authHttp.get(this.login_path, options)
      .map(res => res.json());
  }

  sign_up(user) {
    return this.authHttp.post(this.sign_up_path, {user: user})
      .map(res => res.json());
  }

  saveNotificationToken(t) {
    return this.authHttp.post(this.save_notification_token_url, {user: t})
      .map(res => res.json());
  }

  encodeJWT(data, secret = "") {
    var header = {
      "alg": "HS256",
      "typ": "JWT"
    };
    var encodedHeader = this.base64url(JSON.stringify(header));
    var encodedData = this.base64url(JSON.stringify(data));

    return this.signToken(encodedHeader + "." + encodedData, secret);
  }

  signToken(token, secret) {
    var signature = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    return token + "." + signature;
  }

  private base64url(source) {
    // Encode in classical base64
    let encodedSource = btoa(source);

    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '');

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  send_support_email(message) {
    this.support_url += message;
    this.support_url += "&authentication_token="+this.jwtHelper.decodeToken(localStorage.getItem('authentication_token'));
    console.log(this.support_url);
    return this.authHttp.get(this.support_url).map(res => res.json());
  }
}
