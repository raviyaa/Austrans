import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { ViewAddressPage } from './../view-address/view-address';
import { Address } from './../../models/address';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AstranService } from '../../providers/astran-service/astran-service';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-address',
  templateUrl: 'add-address.html',
})
export class AddAddressPage {

  addAddressForm: FormGroup;
  address: Address;
  countries: any;
  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astronToast: AstronToast,
    private fb: FormBuilder,
    private astranService: AstranService,
    private storage: Storage,
    public translateService: TranslateService,
    private astronPreloader: AstronPreloader) {

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
      state: ['', Validators.required],
      city: ['', Validators.required],
      type: ['', Validators.required],
      suburb: ['',],
      country: ['', Validators.required],
      pin: ['', Validators.required]
    });
    this.getListOfCountries();
    this.getUserData();
    if (!_.isEmpty(this.navParams.data)) {
      this.onAddressRetrived(this.navParams.data);
    }
  }

  saveAddress() {
    if (this.addAddressForm.dirty && this.addAddressForm.valid && !_.isEmpty(this.user)) {
      const p = Object.assign({}, this.address, this.addAddressForm.value);
      p.user_id = this.user.id;
      if (!_.isEmpty(this.navParams.data)) {
        if (!_.isEmpty(this.navParams.data)) {
          p.id = this.navParams.data.id;
          this.astranService.editAddresses(p).subscribe(data => {
            this.astronToast.makeToast("Update successful!");
            this.navCtrl.push(ViewAddressPage);
          }, error => {
            this.astronToast.makeToast(error);
          });
        } else {
          this.astronToast.makeToast("Something went wrong!!!");
        }
      } else {
        this.astranService.addAddresses(p).subscribe(data => {
          this.astronToast.makeToast("New Address successfully added!");
          this.navCtrl.push(ViewAddressPage);
        }, error => {
          this.astronToast.makeToast(error);
        }
        );
      }
    }
  }
  onAddressRetrived(address) {
    if (this.addAddressForm) {
      this.addAddressForm.reset();
    }
    this.addAddressForm.patchValue({
      ref: address.reference,
      companyName: address.company_name,
      fName: address.first_name,
      lName: address.last_name,
      address: address.address,
      email: address.email,
      phone: address.phone,
      country: address.country_id,
      pin: address.pincode,
      city: address.city,
      state: address.state,
      type: address.type,
      suburb: address.suburb_id
    });
  }

  getListOfCountries() {
    this.astronPreloader.show();
    this.astranService.getListOfCountries().subscribe(data => {
      this.astronPreloader.hide();
      this.countries = data;
    }, error => {
      this.astronToast.makeToast(error);
    });
  }
  getUserData() {
    this.storage.get('user').then((user) => {
      if (!_.isEmpty(user)) {
        this.user = JSON.parse(user)[0];
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
    });
  }
}
