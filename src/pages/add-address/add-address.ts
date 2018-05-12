import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from '../../providers/service/service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  addAddressForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private service: Service,
    public translateService: TranslateService) {
  }
  ngOnInit() {
    this.addAddressForm = this.fb.group({
      ref: ['',],
      companyName: ['',],
      fName: ['',],
      lName: ['',],
      address: ['',],
      email: ['',],
      phone: ['',],
      location: ['',],
      state: ['',],
      pin: ['',]
    });
  }

  saveAddress() {

  }
}
