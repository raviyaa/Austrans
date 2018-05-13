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
export class Service {

    constructor(private _http: Http) { }

    getListOfUsers() {
        return this._http.get('http://localhost:3000/getUsers', HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    getListOfAddresses() {
        return this._http.get('http://localhost:3000/getListOfAddress', HttpConfig.requestOptions())
            .map((response: Response) => response.json()).catch(this._errorhandler);
    }

    _errorhandler(error: Response) {
        console.error(error);
        return Observable.throw(error || 'Server Error')
    }

}
