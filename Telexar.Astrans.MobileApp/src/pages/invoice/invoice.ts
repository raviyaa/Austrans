import { AstronToast } from './../../providers/astraon-toast/astron-toast';
import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { AstranService } from './../../providers/astran-service/astran-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
})
export class InvoicePage {

  invoices: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast
  ) {
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.astronPreloader.show();
    this.astranService.getListOfInvoices().subscribe(data => {
      this.astronPreloader.hide();
      this.invoices = data;
    }, error => {
      this.astronToast.makeToast(error);
    });
  }

}
