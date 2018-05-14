import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'page-create-item',
  templateUrl: 'create-item.html',
})

export class CreateItemPage {

  itemForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ngOnInit() {
    this.itemForm = this.fb.group({
      items: this.fb.array([
        this.initItems()
      ])
    });
  }

  initItems() {
    return this.fb.group({
      type: ['', Validators.required],
      qty: ['', Validators.required],
      length: ['', Validators.required],
      width: ['', Validators.required]
    });
  }
  removeState(i: number, reminder) {
    this.defaultRemoveState(i);
  }

  defaultRemoveState(i: number) {
    const control = <FormArray>this.itemForm.controls['items'];
    control.removeAt(i);
  }
  addItem(){
    const control = <FormArray>this.itemForm.controls['items'];
      control.push(this.initItems());
  }
}
