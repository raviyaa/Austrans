import { ViewBookingPage } from './../view-booking/view-booking';
import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';

@Component({
  selector: 'page-booking-overview',
  templateUrl: 'booking-overview.html',
})
export class BookingOverviewPage {

  bookings: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private astronToast: AstronToast,
    private astronPreloader: AstronPreloader
  ) {
  }
  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    this.astronPreloader.show();
    this.astranService.getListOfBookings().subscribe(data => {
      this.astronPreloader.hide();
      this.bookings = data;
    }, error => {
      this.astronToast.makeToast("Something went wrong!!!");
    });
  }
  viewBooking(data) {
    this.navCtrl.push(ViewBookingPage, data);
  }
}
