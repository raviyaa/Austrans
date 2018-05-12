import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { ISericeUrl } from './app-config.interface';


export const APP_SERVICE_CONFIG: ISericeUrl = {

    // Local Dev

    USER_SERVICE_URL: 'http://localhost:3000/'



}

export class HttpConfig {
    static requestOptions() {
        // let bodyString = JSON.stringify(body); // Stringify payload
        const token = sessionStorage.getItem('Token')
        const headers = new Headers({
            'Content-Type': 'application/json'
        });
        // ... Set content type to JSON
        headers.append('Authorization', 'token ' + token);
        const options = new RequestOptions({ headers: headers }); // Create a request option
        return options;
    }
    static FileUploadRequestOptions() {
        const token = sessionStorage.getItem('Token');
        const headers = new Headers();
        /** No need to include Content-Type in Angular 4 */
        // headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'token ' + token);
        var options = new RequestOptions({ headers: headers });
        return options;
    }
}
