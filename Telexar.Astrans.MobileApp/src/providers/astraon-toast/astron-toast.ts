import { Injectable } from "@angular/core";
import { ToastController } from "ionic-angular";

@Injectable()
export class AstronToast {
    constructor(
        private toastCtrl: ToastController
    ) { }

    makeToast(message) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }
}