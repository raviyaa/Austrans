import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';

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
      console.log(error)
    });
  }
  viewBooking(data) {
    console.log(data);
  }
}
