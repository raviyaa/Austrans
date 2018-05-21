import { AstronToast } from './../../providers/astraon-toast/astron-toast';
import { PickupAddressPage } from './../pickup-address/pickup-address';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { AstranService } from '../../providers/astran-service/astran-service';
import { AstronPreloader } from '../../providers/astron-preloader/astron-preloader';
import * as _ from 'underscore';

@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})

export class CreateItemPage {
  packages: any;
  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast) {
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      items: this.fb.array([
        this.initItems()
      ])
    });
    this.getListPackageTypes();
  }

  initItems() {
    return this.fb.group({
      type: ['', Validators.required],
      qty: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required],
      height: ['', Validators.required],
      weight: ['', Validators.required],
      lenMeasure: ['', Validators.required],
      widMeasure: ['', Validators.required],
      heiMeasure: ['', Validators.required],
      weiMeasure: ['', Validators.required],
      volume: ['', Validators.required]
    });
  }
  removeState(i: number, reminder) {
    this.defaultRemoveState(i);
  }

  defaultRemoveState(i: number) {
    const control = <FormArray>this.itemForm.controls['items'];
    control.removeAt(i);
  }
  addItem() {
    const control = <FormArray>this.itemForm.controls['items'];
    control.push(this.initItems());
/*     if (this.itemForm.valid) {
      const control = <FormArray>this.itemForm.controls['items'];
      control.push(this.initItems());
    } else {
      this.astronToast.makeToast('Please fill the rre');
    } */

  }
  getListPackageTypes() {
    this.astranService.getListPackageTypes().subscribe(data => {
      if (!_.isEmpty(data)) {
        this.packages = data;
      }
    }, error => {
      console.log(error)
    });
  }
  saveItems() {
    console.log(this.itemForm.value);
    this.navCtrl.push(PickupAddressPage);
  }
}
