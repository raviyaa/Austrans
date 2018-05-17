import { ISericeUrl } from './../../app/app-config/app-config.interface';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { APP_DI_CONFIG } from './../../app/app-config/app-config.constants';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpConfig, APP_SERVICE_CONFIG } from './../../app/app-config/app-serviceurl-config';
import { filter, map, catchError } from 'rxjs/operators';

@Injectable()
export class AstranService {

    constructor(private _http: Http) { }

    login(data) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'userLogin', data, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getListOfUsers() {
        return this._http.get(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getUsers', HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getListOfAddresses() {
        return this._http.get(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getListOfAddress', HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    addAddresses(data) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'addAddress', data, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    editAddresses(data) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'editAddress', data, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    deleteAddresses(data) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'deleteAddress', data, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getListPackageTypes() {
        return this._http.get(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getListPackageTypes', HttpConfig.requestOptions())
            .map((response: Response) => JSON.parse(response.json())).catch(this._errorhandler);
    }

    getListOfBookings() {
        return this._http.get(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getListOfBookings', HttpConfig.requestOptions())
            .map((response: Response) => JSON.parse(response.json())).catch(this._errorhandler);
    }

    getListOfInvoices() {
        return this._http.get(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getListOfInvoices', HttpConfig.requestOptions())
            .map((response: Response) => JSON.parse(response.json())).catch(this._errorhandler);
    }

    updateUser(data) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'updateUser', data, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getUserById(id) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getUserById/' + id, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getListOfAddressesById(id) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getListOfAddressesById/' + id, HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getListOfBookingsById(id) {
        return this._http.post(APP_SERVICE_CONFIG.USER_SERVICE_URL + 'getListOfBookingsById/' + id, HttpConfig.requestOptions())
            .map((response: Response) => JSON.parse(response.json())).catch(this._errorhandler);
    }
    _errorhandler(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server Error')
    }

}
