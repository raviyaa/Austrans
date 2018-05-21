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

  gh() {
    console.log('gh');
  }

  ghi() {
    console.log('ghq');
  }
}
