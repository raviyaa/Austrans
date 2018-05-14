import { Injectable } from "@angular/core";
import { LoadingController } from "ionic-angular";

@Injectable()
export class AstronPreloader {
    loading: any;
    constructor(public loadingCtrl: LoadingController) { }

    show() {
        this.loading = this.loadingCtrl.create({
            content: 'Please Wait...'
        });

        this.loading.present();
    }
    hide() {
        this.loading.dismiss();
    }
}