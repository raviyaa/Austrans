import { AddAddressPage } from './../../pages/add-address/add-address';
import { ViewAddressPage } from './../../pages/view-address/view-address';
import { NavParams, ToastController, AlertController, NavController, ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
import * as _ from 'underscore';
import { AstranService } from '../../providers/astran-service/astran-service';

@Component({
  selector: 'address-popover',
  templateUrl: 'address-popover.html'
})
export class AddressPopoverComponent {

  text: string;

  constructor(
    private navParams: NavParams,
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private astranService: AstranService,
    private alertCtrl: AlertController,
    public viewCtrl: ViewController
  ) { }
  editAddress() {
    this.navCtrl.push(AddAddressPage, this.navParams.data);
  }
  deleteAddress() {
    if (!_.isEmpty(this.navParams.data)) {
      this.presentConfirm();
    } else {
      this.createToast("Something went wrong!!!");
    }
  }

  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you want to delete this address?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.viewCtrl.dismiss();
          }
        },
        {
          text: 'Ok',
          handler: () => {
            this.astranService.deleteAddresses(this.navParams.data).subscribe(data => {
              this.createToast("Successfully deleted!!!");
              this.navCtrl.push(ViewAddressPage);;
            }, error => {
              console.log(error)
            });
          }
        }
      ]
    });
    alert.present();
  }
}
