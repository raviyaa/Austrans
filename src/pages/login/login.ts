import { DashboardPage } from './../dashboard/dashboard';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder } from '@angular/forms';
import { APP_DI_CONFIG } from '../../app/app-config/app-config.constants';
import { Service } from '../../providers/service/service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  loginForm: FormGroup;
  logoUrl: string = APP_DI_CONFIG.LOGO_URL;
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    private fb: FormBuilder,
    private service: Service,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['',],
      password: ['',],

    });
  }
  // Attempt to login in through our User service
  doLogin() {
    //this.navCtrl.push(DashboardPage);
    this.service.getListOfUsers().subscribe(data => {
      console.log("fhasdklfjhdslfjhsdl");
      console.log(data);
    },
      error => { console.log(error) });
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
