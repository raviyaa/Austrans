import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


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
    console.log('dom');
  }
  internationalClicked() {

  }
  bookingClicked() {

  }
}
