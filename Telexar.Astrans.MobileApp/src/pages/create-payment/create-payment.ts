import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AstranService } from '../../providers/astran-service/astran-service';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';
import * as _ from 'underscore';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';

@Component({
  selector: 'page-create-payment',
  templateUrl: 'create-payment.html',
})
export class CreatePaymentPage {

  createPaymentForm: FormGroup;
  user: any;
  invoices: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private astranService: AstranService,
    private fb: FormBuilder,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast
  ) {
  }

  ngOnInit() {
    this.createPaymentForm = this.fb.group({
      companyName: ['', Validators.required],
      accountNo: ['', Validators.required],
      address: ['', Validators.required],
      contactName: ['', Validators.required],
      phone: ['', Validators.required],
      amount: ['', Validators.required],
      outAmount: ['', Validators.required],
      invoiceNo: ['', Validators.required]
    });
    this.getUserData();
  }
  savePayment() {

  }
  getUserData() {
    this.astronPreloader.show();
    this.storage.get('user').then((user) => {
      if (!_.isEmpty(user)) {
        this.user = JSON.parse(user)[0];
        this.getListOfInvoices();
      } else {
        this.astronPreloader.hide();
        this.astronToast.makeToast("Something went wrong");
      }
    });
  }

  getListOfInvoices() {
    this.astronPreloader.hide();
    this.astranService.getListInvoicesById(this.user.id).subscribe(data => {
      if (!_.isEmpty(data)) {
        this.invoices = data;
        this.onDataReceived();
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
    }, error => {
      this.astronToast.makeToast(error);
    });
  }

  onDataReceived() {
    this.createPaymentForm.patchValue({
      companyName: this.user.company_name,
      address: this.user.address1,
      phone: this.user.phone,
      accountNo: this.user.account_number,
      contactName: this.user.first_name + " " + this.user.last_name
    });
  }

  selectItem($event, invoice) {
    if (!_.isEmpty(invoice)) {
      this.onSelectedInvoiceReceived(invoice);
    } else {
      this.astronToast.makeToast("Something went wrong");
    }
  }

  onSelectedInvoiceReceived(invoice) {
    this.createPaymentForm.patchValue({
      amount: invoice.total_price,
      outAmount: invoice.outstanding_price
    });
  }
}
