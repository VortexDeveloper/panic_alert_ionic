import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Registration } from './registration';

import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { TwilioProvider } from '../../providers/twilio/twilio';

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
    LocationAccuracy,
    TwilioProvider
  ]
})
export class RegistrationModule {}
