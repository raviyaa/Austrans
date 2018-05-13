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

    _errorhandler(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server Error')
    }

}