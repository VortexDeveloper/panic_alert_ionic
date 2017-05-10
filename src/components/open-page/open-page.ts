import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OpenPage directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
  selector: '[openPage]' // Attribute selector
})
export class OpenPageDirective {
  @Input() openPage: string;
  @Input() params: any = {};
  @Input() setRoot: boolean = false;

  constructor(private el: ElementRef, private nav: NavController, private navParams: NavParams) {}

  @HostListener('click') onClick() {
    if(this.setRoot)
      this.nav.setRoot(this.openPage, this.params);
    else
      this.nav.push(this.openPage, this.params);
  }
}
