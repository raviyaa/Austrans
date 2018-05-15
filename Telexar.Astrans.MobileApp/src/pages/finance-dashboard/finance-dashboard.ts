import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InvoicePage } from '../invoice/invoice';


@Component({
  selector: 'page-finance-dashboard',
  templateUrl: 'finance-dashboard.html',
})
export class FinanceDashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  invoiceClicked() {
    this.navCtrl.push(InvoicePage);
  }
  paymentClicked() {
    console.log("pay");
  }
}
