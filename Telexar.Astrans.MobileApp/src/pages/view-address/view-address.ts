import { AddressPopoverComponent } from './../../components/address-popover/address-popover';
import { AddAddressPage } from './../add-address/add-address';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, PopoverController } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';
import { FormBuilder } from '@angular/forms';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';
import { Storage } from '@ionic/storage';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import * as _ from 'underscore';

@Component({
  selector: 'page-view-address',
  templateUrl: 'view-address.html',
})
export class ViewAddressPage {

  addresses: any[];
  user: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private storage: Storage,
    private astranService: AstranService,
    private popoverCtrl: PopoverController,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast) {
  }

  ngOnInit() {
    this.getInitData();
  }

  getInitData() {
    this.astronPreloader.show();
    this.storage.get('user').then((user) => {
      this.astronPreloader.hide();
      this.user = JSON.parse(user)[0];
      if (!_.isEmpty(user)) {
        console.log(user);
        this.astranService.getListOfAddressesById(this.user.id).subscribe(data => {
          console.log(JSON.parse(data));
          this.addresses = JSON.parse(data);
        }, error => {
          this.astronToast.makeToast(error);
        });
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
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
