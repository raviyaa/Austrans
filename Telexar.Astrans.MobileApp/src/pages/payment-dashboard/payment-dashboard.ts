import { CreatePaymentPage } from './../create-payment/create-payment';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-payment-dashboard',
  templateUrl: 'payment-dashboard.html',
})
export class PaymentDashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }
  payPalClicked() {
    this.navCtrl.push(CreatePaymentPage);
  }
  stripeClicked() {

  }
}
