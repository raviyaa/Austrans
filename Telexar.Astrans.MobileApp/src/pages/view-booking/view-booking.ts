import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'underscore';

@Component({
  selector: 'page-view-booking',
  templateUrl: 'view-booking.html',
})
export class ViewBookingPage {

  booking: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astronPreloader: AstronPreloader
  ) {

  }

  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    this.astronPreloader.show();
    if (!_.isEmpty(this.navParams.data)) {
      this.astronPreloader.hide();
      this.booking = this.navParams.data;
    }
  }
}
