import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

@Injectable()
export class AstronPreloader {
    loading: any;
    constructor(public loadingCtrl: LoadingController) { }

    show() {
        this.loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: 'Loading Please Wait...'
        });

        this.loading.present();
    }
    hide() {
        this.loading.dismiss();
    }
}