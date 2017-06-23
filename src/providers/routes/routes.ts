import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the RoutesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class RoutesProvider {

  constructor(public http: Http) {
    console.log('Rotas carregadas com sucesso!');
  }

  host(){
    // return 'http://localhost:3000/';
    return 'http://192.168.1.100:3000/';
    // return 'http://10.0.2.2:3000/';
    // return 'https://alertadepanico.herokuapp.com/';
  }

}
