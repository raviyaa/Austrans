import { DeliveryAddressPage } from './../delivery-address/delivery-address';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AstranService } from '../../providers/astran-service/astran-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import { Storage } from '@ionic/storage';
import * as _ from 'underscore';


@Component({
  selector: 'page-pickup-address',
  templateUrl: 'pickup-address.html',
})
export class PickupAddressPage {

  pickUpAddressForm: FormGroup
  user: any;
  recentAddresses: any;
  isNewAddressClicked: boolean = false;
  isSaveAddressChecked: boolean = false;
  isFromInternational: boolean = false;
  consObj: any;
  countries: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private fb: FormBuilder,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast,
    private storage: Storage
  ) {
    if (!_.isEmpty(this.navParams.data)) {
      this.consObj = this.navParams.data.consObj;
      this.isFromInternational = this.navParams.data.isFromInternational
    }
  }

  ngOnInit() {
    this.pickUpAddressForm = this.fb.group({
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      suburb: ['', Validators.required],
      state: ['', Validators.required],
      pin: ['', Validators.required],
      country: ['', Validators.required],
      pickupIns: ['',]
    });

    if (!this.isFromInternational) {
      this.getUserDataOnInit();
    }
    this.getListOfCountries();
  }

  savePickUpAddress() {
    if (!this.isSaveAddressChecked) {
      if (!_.isEmpty(this.user)) {
        this.consObj.user_id = this.user.id;
      }

      this.consObj.pickup_f_name = this.pickUpAddressForm.value.fName;
      this.consObj.pickup_l_name = this.pickUpAddressForm.value.lName;
      this.consObj.pickup_company_name = this.pickUpAddressForm.value.companyName;
      this.consObj.pickup_email = this.pickUpAddressForm.value.email;
      this.consObj.pickup_phone = this.pickUpAddressForm.value.phone;
      this.consObj.pickup_address = this.pickUpAddressForm.value.address;
      this.consObj.pickup_suburb = this.pickUpAddressForm.value.suburb;
      this.consObj.pickup_state = this.pickUpAddressForm.value.state;
      this.consObj.pickup_postcode = this.pickUpAddressForm.value.pin;

      this.navCtrl.push(DeliveryAddressPage, { consObj: this.consObj, isFromInternational: this.isFromInternational });
    }
  }

  addNewAddressClicked() {
    this.pickUpAddressForm.reset();
    this.isNewAddressClicked = true;
  }

  getUserDataOnInit() {
    this.astronPreloader.show();
    this.storage.get('user').then((user) => {
      this.astronPreloader.hide();
      if (!_.isEmpty(user)) {
        this.user = JSON.parse(user)[0];
        this.onUserReceived(this.user);
        this.getListOfRecentAddresses(this.user);
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
    });
  }

  onUserReceived(user) {
    this.pickUpAddressForm.patchValue({
      companyName: this.user.company_name,
      fName: this.user.first_name,
      lName: this.user.last_name,
      address: this.user.address1,
      email: this.user.email,
      phone: this.user.phone,
      pin: this.user.postal_code,
      suburb: this.user.city,
      state: this.user.state,
      country: this.user.country
    });
  }

  getListOfRecentAddresses(user) {
    this.astranService.getListOfRecentAddressesById(user.id).subscribe(data => {
      if (!_.isEmpty(data)) {
        this.recentAddresses = data;
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
    }, error => {
      this.astronToast.makeToast(error);
    });
  }

  selectItem($event, address) {
    if (!_.isEmpty(address)) {
      this.onUserReceived(address);
    } else {
      this.astronToast.makeToast("Something went wrong");
    }
  }
  checkBoxClicked(event) {
    if (event.checked) {
      this.isSaveAddressChecked = true;
    } else {
      this.isSaveAddressChecked = false;
    }
  }

  getListOfCountries() {
    this.astranService.getListOfCountries().subscribe(data => {
      this.countries = data;
    }, error => {
      this.astronToast.makeToast(error);
    });
  }
}

