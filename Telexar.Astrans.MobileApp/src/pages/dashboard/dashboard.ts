import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
  }

  fbBtnClicked() {
    window.open('https://www.facebook.com/AustransTL/', '_system');
  }
  gPlusBtnClicked() {
    console.log('g');
  }
  twitterBtnClicked() {
    console.log('tw');
  }
  instaBtnClicked() {
    window.open('https://www.instagram.com/austranstl/', '_system');
  }
}
