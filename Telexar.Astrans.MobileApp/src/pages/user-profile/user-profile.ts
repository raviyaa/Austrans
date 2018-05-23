import { AstronToast } from './../../providers/astraon-toast/astron-toast';
import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { AstranService } from './../../providers/astran-service/astran-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'underscore';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  userPofileForm: FormGroup;
  user: any;
  countries: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private astranService: AstranService,
    private fb: FormBuilder,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast
  ) {
  }

  ngOnInit() {
    this.getInitData();
    this.getListOfCountries();
    this.userPofileForm = this.fb.group({
      companyName: ['', Validators.required],
      fName: ['', Validators.required],
      lName: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],
      /*   state: ['',], */
      pin: ['', Validators.required],
      compName: ['', Validators.required],
      compAddress: ['', Validators.required],
      compPin: ['', Validators.required]
    });
  }
  getInitData() {
    this.astronPreloader.show();
    this.storage.get('user').then((user) => {
      this.astronPreloader.hide();
      if (!_.isEmpty(user)) {
        this.user = JSON.parse(user)[0];
        this.onUserReceived(this.user);
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
    });
  }

  onUserReceived(user) {
    this.userPofileForm.patchValue({
      companyName: this.user.company_name,
      fName: this.user.first_name,
      lName: this.user.last_name,
      address: this.user.address1,
      email: this.user.email,
      phone: this.user.phone,
      location: this.user.city,
      pin: this.user.postal_code,
      compName: this.user.company_name,
      country: this.user.country,
      compAddress: this.user.address1 + " " + user.city,
      compPin: this.user.postal_code
    });
  }
  saveUser() {
    this.astronPreloader.show();
    if (this.userPofileForm.dirty && this.userPofileForm.valid) {
      const userObj = this.userPofileForm.value;
      userObj.id = this.user.id;
      this.astranService.updateUser(userObj).subscribe(data => {
        if (!_.isEmpty(data)) {
          this.astronPreloader.hide();
          if (data.status === 'OK') {
            this.navCtrl.push(DashboardPage);
            this.astronToast.makeToast("Successfully updated!");
            this.storage.clear();
            this.astranService.getUserById(this.user.id).subscribe(data => {
              this.storage.set('user', data);
            }, error => {
              this.astronPreloader.hide();
              this.astronToast.makeToast("Something went wrong!!!");
            });
          } else {
            this.astronToast.makeToast("Something went wrong!!!");
          }
        } else {
          this.astronPreloader.hide();
          this.astronToast.makeToast("Something went wrong!!!");
        }
      }, error => {
        this.astronPreloader.hide();
        this.astronToast.makeToast("Something went wrong!!!");
      });
    } else {
      this.astronToast.makeToast("Please update the info");
    }
  }

  getListOfCountries() {
    //this.astronPreloader.show();
    this.astranService.getListOfCountries().subscribe(data => {
      //this.astronPreloader.hide();
      this.countries = data;
    }, error => {
      this.astronToast.makeToast(error);
    });
  }
}
