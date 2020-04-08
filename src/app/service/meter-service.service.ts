import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Medidor } from '../other/variables';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeterServiceService {
  headers = new HttpHeaders();

  // tslint:disable-next-line:variable-name
  constructor(public _http: HttpClient) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('token', 'VrGS6TJiuBL00tD3XCc37DgdncvA89H4dUPxLsHUEfRekmJXwDjTK32BqpUq');
  }

  // tslint:disable-next-line:variable-name
  api_url = 'http://localhost:8089/medidor';

  LeerMedidor(token: string): Observable<Medidor> {
    // localStorage.setItem('nombre', token);
    // localStorage.setItem('usuario', JSON.stringify(this.user));
    // this.datoUsuario = JSON.parse(localStorage.getItem('usuario'));
    // localStorage.removeItem('tutorial');
    // localStorage.clear();
    const headers = new HttpHeaders()
      .set('token', 'VrGS6TJiuBL00tD3XCc37DgdncvA89H4dUPxLsHUEfRekmJXwDjTK32BqpUq');

    // @ts-ignore
    return this._http.get<Medidor>(this.api_url, {headers} );
  }

  save_localstorage() {
    const nombre = 'Fernando';
    // tslint:disable-next-line:label-position no-unused-expression
    const edad = 19;
    // tslint:disable-next-line:label-position
    coords: {
      // tslint:disable-next-line:label-position no-unused-expression
      lat: 18;
      // tslint:disable-next-line:label-position
      lng: -10;
    }
  }


}
