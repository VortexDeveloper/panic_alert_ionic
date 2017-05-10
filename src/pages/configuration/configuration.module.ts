import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Configuration } from './configuration';

@NgModule({
  declarations: [
    Configuration,
  ],
  imports: [
    IonicPageModule.forChild(Configuration),
  ],
  exports: [
    Configuration
  ]
})
export class ConfigurationModule {}
