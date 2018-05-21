import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-delivery-address',
  templateUrl: 'delivery-address.html',
})
export class DeliveryAddressPage {

  deliveryAddressForm: FormGroup
  
  constructor(
    public navCtrl: NavController, 
    private fb: FormBuilder,
    public navParams: NavParams
  ) {
  }
  ngOnInit() {
    this.deliveryAddressForm = this.fb.group({
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
  }

  saveDeliveryAddress() {

  }
}
