import { Address } from './../../models/address';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AstranService } from '../../providers/astran-service/astran-service';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  addAddressForm: FormGroup;
  address: Address;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private astranService: AstranService,
    public translateService: TranslateService) {
  }
  ngOnInit() {
    this.addAddressForm = this.fb.group({
      ref: ['', Validators.required],
      companyName: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      /*   state: ['',], */
      pin: ['', Validators.required]
    });
  }

  saveAddress() {
    if (this.addAddressForm.dirty && this.addAddressForm.valid) {
      const p = Object.assign({}, this.address, this.addAddressForm.value);
      console.log(p);
      this.astranService.addAddresses(p).subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error)
      }
      );
    }
  }
}
