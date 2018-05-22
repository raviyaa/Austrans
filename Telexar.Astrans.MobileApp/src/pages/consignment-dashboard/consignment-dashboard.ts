import { BookingOverviewPage } from './../booking-overview/booking-overview';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CreateItemPage } from '../create-item/create-item';


@Component({
  selector: 'page-consignment-dashboard',
  templateUrl: 'consignment-dashboard.html',
})
export class ConsignmentDashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController
  ) {
  }

  domesticClicked() {
    var data = {
      isFromInternational: false
    }
    this.navCtrl.push(CreateItemPage, data);
  }
  internationalClicked() {
    this.presentConfirm();
  }
  bookingClicked() {
    this.navCtrl.push(BookingOverviewPage);
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'International',
      message: 'Please select pick the location?',
      buttons: [
        {
          text: 'Import',
          handler: () => {
            var data = {
              isFromInternational: true
            }
            this.navCtrl.push(CreateItemPage, data);
          }
        },
        {
          text: 'Export',
          handler: () => {
            var data = {
              isFromInternational: false
            }
            this.navCtrl.push(CreateItemPage, data);
          }
        }
      ]
    });
    alert.present();
  }
}
