import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login';

import { OpenPageModule } from '../../components/open-page/open-page.module';

@NgModule({
  declarations: [
    Login,
  ],
  imports: [
    OpenPageModule,
    IonicPageModule.forChild(Login),
  ],
  exports: [
    Login
  ]
})
export class LoginModule {}
