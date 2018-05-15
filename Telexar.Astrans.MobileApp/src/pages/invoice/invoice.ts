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
    private astranService: AstranService
  ) {
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.astranService.getListOfInvoices().subscribe(data => {
      this.invoices = data;
      console.log(data);
    }, error => {
      console.log(error)
    });
  }

}
