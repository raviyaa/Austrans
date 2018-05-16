import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { ViewAddressPage } from './../view-address/view-address';
import { AddAddressPage } from './../add-address/add-address';
import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';
import { AstranService } from '../../providers/astran-service/astran-service';
import * as _ from 'underscore';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private astranService: AstranService,
    public translateService: TranslateService,
    private astronPreloader: AstronPreloader,
    private storage: Storage) {

  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],

    });
  }

  doLogin() {
    this.astronPreloader.show();
    if (this.loginForm.dirty && this.loginForm.valid) {
      var data = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.astranService.login(data).subscribe(data => {
        if (!_.isEmpty(data)) {
          if (data.status == 'OK') {
            this.astronPreloader.hide();
            this.storage.set('user', data.result);
            this.navCtrl.push(DashboardPage);
          } else {
            this.astronPreloader.hide();
            this.createToast("Check email & password");
          }
        } else {
          this.astronPreloader.hide();
          this.createToast("Something went wrong!!!");
        }
      }, error => {
        this.astronPreloader.hide();
        this.createToast("Something went wrong!!!");
      });
    } else {
      this.astronPreloader.hide();
      this.createToast("Please provide email and password");
    }

  }

  signUp() {
    this.createToast("Please try using web site");
  }
  createToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  ngOnDestroy(): void {
    this.loginForm.reset();
  }

}
