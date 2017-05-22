import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OpenPageDirective } from './open-page';

@NgModule({
  declarations: [
    OpenPageDirective
  ],
  imports: [
    IonicPageModule.forChild(OpenPageDirective),
  ],
  exports: [
    OpenPageDirective
  ]
})
export class OpenPageModule {}
