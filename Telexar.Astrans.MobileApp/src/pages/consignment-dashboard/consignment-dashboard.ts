import { BookingOverviewPage } from './../booking-overview/booking-overview';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CreateItemPage } from '../create-item/create-item';


@Component({
  selector: 'page-consignment-dashboard',
  templateUrl: 'consignment-dashboard.html',
})
export class ConsignmentDashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  domesticClicked() {
    this.navCtrl.push(CreateItemPage);
  }
  internationalClicked() {

  }
  bookingClicked() {
    this.navCtrl.push(BookingOverviewPage);
  }
}
