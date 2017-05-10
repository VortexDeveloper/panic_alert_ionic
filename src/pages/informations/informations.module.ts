import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Informations } from './informations';

@NgModule({
  declarations: [
    Informations,
  ],
  imports: [
    IonicPageModule.forChild(Informations),
  ],
  exports: [
    Informations
  ]
})
export class InformationsModule {}
