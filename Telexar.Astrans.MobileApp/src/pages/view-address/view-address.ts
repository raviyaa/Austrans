import { AddressPopoverComponent } from './../../components/address-popover/address-popover';
import { AddAddressPage } from './../add-address/add-address';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';
import { FormBuilder } from '@angular/forms';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';

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
    private astranService: AstranService,  
    private popoverCtrl: PopoverController,
    private astronPreloader: AstronPreloader) {
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.astronPreloader.show();
    this.astranService.getListOfAddresses().subscribe(data => {
      this.astronPreloader.hide();
      console.log(JSON.parse(data));
      this.addresses = JSON.parse(data);
    }, error => {
      console.log(error)
    });
  }

  addAddress() {
    this.navCtrl.push(AddAddressPage);
  }

  presentPopover(myEvent, data) {
    let popover = this.popoverCtrl.create(AddressPopoverComponent, data);
    popover.present({
      ev: myEvent
    });
  }
}
