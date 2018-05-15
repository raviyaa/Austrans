import { InvoicePage } from './../pages/invoice/invoice';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule, Storage } from '@ionic/storage';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IonicApp, IonicErrorHandler, IonicModule, IonicPageModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { AstranService } from '../providers/astran-service/astran-service';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AddAddressPage } from '../pages/add-address/add-address';
import { ViewAddressPage } from '../pages/view-address/view-address';
import { AddressPopoverComponent } from '../components/address-popover/address-popover';
import { AstronPreloader } from '../providers/astron-preloader/astron-preloader';
import { ConsignmentDashboardPage } from '../pages/consignment-dashboard/consignment-dashboard';
import { CreateItemPage } from '../pages/create-item/create-item';
import { BookingOverviewPage } from '../pages/booking-overview/booking-overview';
import { ViewBookingPage } from '../pages/view-booking/view-booking';
import { FinanceDashboardPage } from '../pages/finance-dashboard/finance-dashboard';

// The translate loader needs to know where to load i18n files
// in Ionic's static asset pipeline.
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export function provideSettings(storage: Storage) {
  /**
   * The Settings provider takes a set of default settings for your app.
   *
   * You can add new settings options at any time. Once the settings are saved,
   * these values will not overwrite the saved values (this can be done manually if desired).
   */

}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    AddAddressPage,
    ViewAddressPage,
    AddressPopoverComponent,
    ConsignmentDashboardPage,
    CreateItemPage,
    BookingOverviewPage,
    ViewBookingPage,
    FinanceDashboardPage,
    InvoicePage
  ],
  imports: [
    FormsModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    AddAddressPage,
    ViewAddressPage,
    AddressPopoverComponent,
    ConsignmentDashboardPage,
    CreateItemPage,
    BookingOverviewPage,
    ViewBookingPage,
    FinanceDashboardPage,
    InvoicePage
  ],
  providers: [
    Camera,
    SplashScreen,
    StatusBar,
    AstranService,
    AstronPreloader,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
