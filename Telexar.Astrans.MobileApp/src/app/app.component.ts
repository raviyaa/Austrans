import { UserProfilePage } from './../pages/user-profile/user-profile';
import { FinanceDashboardPage } from './../pages/finance-dashboard/finance-dashboard';
import { ViewAddressPage } from './../pages/view-address/view-address';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform, AlertController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { ConsignmentDashboardPage } from '../pages/consignment-dashboard/consignment-dashboard';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = LoginPage;
  pages: Array<{ title: string, component: any }>;
  @ViewChild(Nav) nav: Nav;
  constructor(
    private translate: TranslateService,
    public platform: Platform,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();

    this.pages = [
      { title: 'Home', component: DashboardPage },
      { title: 'Addrress Book', component: ViewAddressPage },
      { title: 'Consignment', component: ConsignmentDashboardPage },
      { title: 'Finance', component: FinanceDashboardPage },
      { title: 'My Profile', component: UserProfilePage },
      { title: 'Logout', component: '' }
    ];
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();

    if (browserLang) {
      if (browserLang === 'zh') {
        const browserCultureLang = this.translate.getBrowserCultureLang();

        if (browserCultureLang.match(/-CN|CHS|Hans/i)) {
          this.translate.use('zh-cmn-Hans');
        } else if (browserCultureLang.match(/-TW|CHT|Hant/i)) {
          this.translate.use('zh-cmn-Hant');
        }
      } else {
        this.translate.use(this.translate.getBrowserLang());
      }
    } else {
      this.translate.use('en'); // Set your language here
    }

    /*   this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
        this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
      }); */
  }

  openPage(page) {
    if (page.component) {
      this.nav.setRoot(page.component);
    } else {
      this.presentConfirm();
    }
  }
  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure want to logout?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'OK',
          handler: () => {
            this.storage.clear();
            this.nav.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }


}
