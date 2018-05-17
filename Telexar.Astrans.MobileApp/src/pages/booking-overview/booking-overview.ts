import { ViewBookingPage } from './../view-booking/view-booking';
import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import { Storage } from '@ionic/storage';
import * as _ from 'underscore';

@Component({
  selector: 'page-booking-overview',
  templateUrl: 'booking-overview.html',
})
export class BookingOverviewPage {

  bookings: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private astronToast: AstronToast,
    private astronPreloader: AstronPreloader,
    private storage: Storage
  ) {
  }
  ngOnInit() {
    this.getUserData();
  }
  getInitData() {
    this.astranService.getListOfBookingsById(this.user.id).subscribe(data => {
      this.astronPreloader.hide();
      this.bookings = data;
      console.log(data);
    }, error => {
      this.astronPreloader.hide();
      this.astronToast.makeToast("Something went wrong!!!");
    });
  }
  viewBooking(data) {
    this.navCtrl.push(ViewBookingPage, data);
  }
  getUserData() {
    this.astronPreloader.show();
    this.storage.get('user').then((user) => {
      if (!_.isEmpty(user)) {
        this.user = JSON.parse(user)[0];
        this.getInitData();
      } else {
        this.astronPreloader.hide();
        this.astronToast.makeToast("Something went wrong");
      }
    });
  }
}
