import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';

/*
  Generated class for the TwilioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TwilioProvider {
  verify_url = "https://api.authy.com/protected/json/phones/verification/start";
  check_url = "https://api.authy.com/protected/json/phones/verification/check";
  verification_parameters: {
    via: string,
    country_code: number,
    phone_number: string,
    code_length: number,
    locale: string
  };

  check_parameters: {
    country_code: number,
    phone_number: string,
    verification_code: string
  }
  options: RequestOptions;

  constructor(public http: Http, public authHttp: AuthHttp) {
    console.log('Hello TwilioProvider Provider');
    this.verification_parameters = {
      via: "sms",
      country_code: 55,
      phone_number: "",
      code_length: 4,
      locale: "pt"
    }

    this.check_parameters = {
      country_code: 55,
      phone_number: "",
      verification_code: ""
    }

    let myHeader = new Headers();
    myHeader.append('Access-Control-Allow-Origin', "*");
    myHeader.append('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    myHeader.append('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    this.options = new RequestOptions({ headers: myHeader });
  }

  send_verification_code(user) {
    this.verification_parameters.phone_number = user.phone_number;
    // this.verify_url += "&via=sms";
    // this.verify_url += "&country_code=55";
    // this.verify_url += "&phone_number="+user.phone_number;
    // this.verify_url += "&code_length=4";
    // this.verify_url += "&locale=pt";

    return this.http.post(this.verify_url, this.verification_parameters, this.options)
      .map(res => res.json());
  }

  check_verification_code(user) {
    this.check_parameters.phone_number = user.phone_number;
    this.check_parameters.verification_code = user.code;

    this.check_url += "&country_code=55";
    this.check_url += "&phone_number="+user.phone_number;
    this.check_url += "&verification_code="+user.code;

    return this.http.get(this.check_url, this.options)
      .map(res => res.json());
  }
}
