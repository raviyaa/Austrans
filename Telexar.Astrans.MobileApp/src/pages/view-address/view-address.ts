import { AddAddressPage } from './../add-address/add-address';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'page-view-address',
  templateUrl: 'view-address.html',
})
export class ViewAddressPage {

  addresses: any[];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private astranService: AstranService) {
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.astranService.getListOfAddresses().subscribe(data => {
      console.log(JSON.parse(data));
      this.addresses = JSON.parse(data);
    }, error => {
      console.log(error)
    });
  }

  addAddress() {
    this.navCtrl.push(AddAddressPage);
  }
}
