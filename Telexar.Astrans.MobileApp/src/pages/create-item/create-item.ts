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
  isFromInternational: boolean = false;
  measurements = [
    { name: 'cm' },
    { name: 'inch' },
    { name: 'feet' },
    { name: 'm' }
  ];
  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams,
    private astranService: AstranService,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast,
  ) {
    if (!_.isEmpty(this.navParams.data)) {
      this.isFromInternational = this.navParams.data.isFromInternational;
    }
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
    var conObj = {
      package_type: null,
      length: null,
      width: null,
      height: null,
      lwh_measurement: null,
      weight: null,
      weight_measurement: null,
      volume: null,
      total_volume: 0,
      total_weight: 0
    };

    var package_type = {};
    var length = {};
    var width = {};
    var height = {};
    var lwh_measurement = {};
    var weight = {};
    var weight_measurement = {};
    var volume = {};

    var total_volume = 0;
    var total_weight = 0;

    _.each(this.itemForm.value.items, function (item, key) {
      if (_.isEmpty(package_type) || _.isEmpty(length) || _.isEmpty(width) || _.isEmpty(height) || _.isEmpty(lwh_measurement) || _.isEmpty(weight) || _.isEmpty(weight_measurement) || _.isEmpty(volume)) {
        package_type = item.type;
        length = item.length;
        width = item.width;
        height = item.height;
        lwh_measurement = item.lenMeasure;
        weight = item.weight;
        weight_measurement = item.weiMeasure;
        volume = item.volume;
      } else {
        package_type = package_type + "," + item.type;
        length = length + "," + item.length;
        width = width + "," + item.width;
        height = height + "," + item.height;
        lwh_measurement = lwh_measurement + "," + item.lenMeasure;
        weight = weight + "," + item.weight;
        weight_measurement = weight_measurement + "," + item.weiMeasure;
        volume = volume + "," + item.volume;
      }
      /*      package_type.push(item.type);
           length.push(item.length);
           width.push(item.width);
           height.push(item.height);
           lwh_measurement.push(item.lenMeasure);
           weight.push(item.weight);
           weight_measurement.push(item.weiMeasure);
           volume.push(item.volume); */
      total_volume += item.volume * item.qty;
      total_weight += item.weight * item.qty;
    });

    conObj.package_type = package_type;
    conObj.length = length;
    conObj.width = width;
    conObj.height = height;
    conObj.lwh_measurement = lwh_measurement;
    conObj.weight = weight;
    conObj.weight_measurement = weight_measurement;
    conObj.volume = volume;
    conObj.total_volume = total_volume;
    conObj.total_weight = total_weight;
    
    if (this.isFromInternational) {
      this.navCtrl.push(PickupAddressPage, { consObj: conObj, isFromInternational: this.isFromInternational });
    } else {
      this.navCtrl.push(PickupAddressPage, { consObj: conObj, isFromInternational: this.isFromInternational });
    }

  }

  selectItem(event, measure) {
    this.itemForm.patchValue({
      widMeasure: measure.name,
      heiMeasure: measure.name
    });
  }


}
