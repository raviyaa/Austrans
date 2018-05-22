import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import { Storage } from '@ionic/storage';
import * as _ from 'underscore';



@Component({
  selector: 'page-delivery-address',
  templateUrl: 'delivery-address.html',
})
export class DeliveryAddressPage {

  deliveryAddressForm: FormGroup;
  consObj: any;
  isSaveAddressChecked: Boolean = false;

  constructor(
    public navCtrl: NavController,
    private fb: FormBuilder,
    public navParams: NavParams
  ) {
    if (!_.isEmpty(this.navParams.data)) {
      this.consObj = this.navParams.data;
    }
  }
  ngOnInit() {
    this.deliveryAddressForm = this.fb.group({
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
      pickupIns: ['', Validators.required]
    });
  }

  saveDeliveryAddress() {
    if (!this.isSaveAddressChecked) {
      this.consObj.delivery_f_name = this.deliveryAddressForm.value.fName;
      this.consObj.delivery_l_name = this.deliveryAddressForm.value.lName;
      this.consObj.delivery_company_name = this.deliveryAddressForm.value.companyName;
      this.consObj.delivery_email = this.deliveryAddressForm.value.email;
      this.consObj.delivery_phone = this.deliveryAddressForm.value.phone;
      this.consObj.delivery_address = this.deliveryAddressForm.value.address;
      this.consObj.delivery_suburb = this.deliveryAddressForm.value.suburb;
      this.consObj.delivery_state = this.deliveryAddressForm.value.state;
      this.consObj.delivery_postcode = this.deliveryAddressForm.value.pin;
      this.consObj.delivery_instruction = this.deliveryAddressForm.value.pickupIns;


      console.log(this.consObj);
    }
  }

  checkBoxClicked(event) {
    if (event.checked) {
      console.log('chcked');
      this.isSaveAddressChecked = true;
    } else {
      console.log('not');
      this.isSaveAddressChecked = false;
    }
  }
}
