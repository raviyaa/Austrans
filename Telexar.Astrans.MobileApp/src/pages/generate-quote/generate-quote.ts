import { BookingOverviewPage } from './../booking-overview/booking-overview';
import { ConsignmentDashboardPage } from './../consignment-dashboard/consignment-dashboard';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'underscore';
import { AstranService } from '../../providers/astran-service/astran-service';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';

@Component({
  selector: 'page-generate-quote',
  templateUrl: 'generate-quote.html',
})
export class GenerateQuotePage {

  generateQuoteForm: FormGroup;
  isSaveAddressChecked: boolean = false;
  consObj: any;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private fb: FormBuilder,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast,
  ) {
    if (!_.isEmpty(this.navParams.data)) {
      this.consObj = this.navParams.data;
    }
  }

  ngOnInit() {
    this.generateQuoteForm = this.fb.group({
      reference: ['',],
      instructions: ['',],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  saveBooking() {
    if (this.isSaveAddressChecked) {
      this.consObj.delivery_instructions = this.generateQuoteForm.value.instructions,
        this.consObj.pickup_timezone_date = this.generateQuoteForm.value.date + "" + this.generateQuoteForm.value.time

      this.astronPreloader.show();
      this.astranService.addBooking(this.consObj).subscribe(data => {
        this.astronPreloader.hide();
        this.astronToast.makeToast("Successful!");
        this.navCtrl.push(BookingOverviewPage);
      }, error => {
        console.log(error);
        this.astronToast.makeToast(error);
      });
    } else {
      this.astronToast.makeToast("Please check all the fields");
    }
  }

  checkBoxClicked(event) {
    if (event.checked) {
      console.log('chcked');
      this.isSaveAddressChecked = true;
    } else {
      console.log('not');
      this.isSaveAddressChecked = false;
    }
  }
}
