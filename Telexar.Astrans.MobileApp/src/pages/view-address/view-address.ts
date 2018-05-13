import { AddAddressPage } from './../add-address/add-address';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Service } from '../../providers/service/service';
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
    private service: Service) {
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.service.getListOfAddresses().subscribe(data => {
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
