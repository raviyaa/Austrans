import { AstronToast } from './../../providers/astraon-toast/astron-toast';
import { AstronPreloader } from './../../providers/astron-preloader/astron-preloader';
import { AstranService } from './../../providers/astran-service/astran-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import * as _ from 'underscore';


@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private astranService: AstranService,
    private astronPreloader: AstronPreloader,
    private astronToast: AstronToast
  ) {
  }

  ngOnInit() {
    this.getInitData();
  }
  getInitData() {
    this.astronPreloader.show();
    this.storage.get('user').then((user) => {
      this.astronPreloader.hide();
      if (!_.isEmpty(user)) {
        this.user = JSON.parse(user);
        this.astronToast.makeToast("Something went dgsdwrong");
      } else {
        this.astronToast.makeToast("Something went wrong");
      }
    });
  }

 
}
