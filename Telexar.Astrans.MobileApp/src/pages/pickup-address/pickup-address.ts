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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private fb: FormBuilder,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.pickUpAddressForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      suburb: ['', Validators.required],
      state: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      pickupIns: ['', Validators.required]
    });
    this.getUserDataOnInit();
  }

  savePickUpAddress() {

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
      firstName: this.user.first_name,
      lastName: this.user.last_name,
      address: this.user.address1,
      email: this.user.email,
      phone: this.user.phone,
      postalCode: this.user.postal_code,
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
      console.log('chcked');
      this.isSaveAddressChecked = true;
    } else {
      console.log('not');
      this.isSaveAddressChecked = false;
    }
  }
}

