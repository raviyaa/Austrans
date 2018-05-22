import { GenerateQuotePage } from './../generate-quote/generate-quote';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';
import { AstronToast } from '../../providers/astraon-toast/astron-toast';
import * as _ from 'underscore';
import { AstranService } from '../../providers/astran-service/astran-service';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-delivery-address',
  templateUrl: 'delivery-address.html',
})
export class DeliveryAddressPage {

  deliveryAddressForm: FormGroup;
  consObj: any;
  isSaveAddressChecked: Boolean = false;
  isFromInternational: boolean = false;
  user: any;
  recentAddresses: any;

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

    if (this.isFromInternational) {
      console.log('inside');
      this.getUserDataOnInit();
    }
  }

  saveDeliveryAddress() {
    if (!this.isSaveAddressChecked) {

      if (!_.isEmpty(this.user)) {
        this.consObj.user_id = this.user.id;
      }

      this.consObj.delivery_f_name = this.deliveryAddressForm.value.fName;
      this.consObj.delivery_l_name = this.deliveryAddressForm.value.lName;
      this.consObj.delivery_company_name = this.deliveryAddressForm.value.companyName;
      this.consObj.delivery_email = this.deliveryAddressForm.value.email;
      this.consObj.delivery_phone = this.deliveryAddressForm.value.phone;
      this.consObj.delivery_address = this.deliveryAddressForm.value.address;
      this.consObj.delivery_suburb = this.deliveryAddressForm.value.suburb;
      this.consObj.delivery_state = this.deliveryAddressForm.value.state;
      this.consObj.delivery_postcode = this.deliveryAddressForm.value.pin;
      // this.consObj.delivery_instruction = this.deliveryAddressForm.value.pickupIns;


      this.navCtrl.push(GenerateQuotePage, this.consObj);
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
    this.deliveryAddressForm.patchValue({
      companyName: this.user.company_name,
      fName: this.user.first_name,
      lName: this.user.last_name,
      address: this.user.address1,
      email: this.user.email,
      phone: this.user.phone,
      pinS: this.user.postal_code,
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

}
