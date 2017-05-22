import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Informations } from './informations';

import { OpenPageModule } from '../../components/open-page/open-page.module';

@NgModule({
  declarations: [
    Informations
  ],
  imports: [
    OpenPageModule,
    IonicPageModule.forChild(Informations),
  ],
  exports: [
    Informations
  ]
})
export class InformationsModule {}
