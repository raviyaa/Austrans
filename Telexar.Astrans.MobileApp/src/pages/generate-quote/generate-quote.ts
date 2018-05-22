import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'page-generate-quote',
  templateUrl: 'generate-quote.html',
})
export class GenerateQuotePage {

  generateQuoteForm: FormGroup

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.generateQuoteForm = this.fb.group({
      reference: ['', Validators.required],
      instructions: ['', Validators.required]
    });
  }

  saveBooking() {

  }

}
