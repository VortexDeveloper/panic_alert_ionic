import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registration } from './registration';

import { LocationAccuracy } from '@ionic-native/location-accuracy';


@NgModule({
  declarations: [
    Registration,
  ],
  imports: [
    IonicPageModule.forChild(Registration),
  ],
  exports: [
    Registration
  ],
  providers: [
    LocationAccuracy
  ]
})
export class RegistrationModule {}
