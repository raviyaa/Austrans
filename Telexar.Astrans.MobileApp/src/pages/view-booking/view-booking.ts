import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
    private astronPreloader: AstronPreloader,
    private alertCtrl: AlertController
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
      this.formatItemDetails(this.navParams.data);
    } else {
      this.presentAlert();
    }
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'Warning',
      subTitle: 'Something went wrong',
      buttons: ['Dismiss']
    });
    alert.present();
    this.navCtrl.pop();
  }

  formatItemDetails(data) {

    var itemArray = [];
    for (var i = 0; i < data.total_item; i++) {
      var item = {
        type: "",
        height: "",
        width: "",
        length: "",
        weight: "",
        quantity: "",
        weight_measurement: "",
        lwh_measurement: ""
      };

      if (_.isEmpty(this.splitString(data.package_type)[i])) {
        continue;
      }
      item.type = this.splitString(data.package_type)[i];
      item.height = this.splitString(data.height)[i];
      item.width = this.splitString(data.width)[i];
      item.length = this.splitString(data.length)[i];
      item.weight = this.splitString(data.weight)[i];
      item.quantity = this.splitString(data.quantity)[i];
      item.weight_measurement = this.splitString(data.weight_measurement)[i];
      item.lwh_measurement = this.splitString(data.lwh_measurement)[i];
      itemArray.push(item);
    }
    this.booking.itemDetail = itemArray;
  }



  splitString(data) {
    if (!_.isEmpty(data)) {
      var input = data;
      var split = input.split(',');
      return split;
    }
  }
}
