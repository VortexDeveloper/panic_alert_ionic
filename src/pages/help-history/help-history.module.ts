import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HelpHistoryPage } from './help-history';

@NgModule({
  declarations: [
    HelpHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(HelpHistoryPage),
  ],
  exports: [
    HelpHistoryPage
  ]
})
export class HelpHistoryPageModule {}
