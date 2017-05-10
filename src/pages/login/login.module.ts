import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';
import { OpenPageDirective } from '../../components/open-page/open-page';

@NgModule({
  declarations: [
    Login,
    OpenPageDirective
  ],
  imports: [
    IonicPageModule.forChild(Login),
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
