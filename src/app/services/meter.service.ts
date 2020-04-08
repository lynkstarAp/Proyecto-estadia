import { Injectable } from '@angular/core';
import {Medidor, MedidorInstantaneo} from "../models/Medidor";
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  baseURL = environment.apiURL;


  constructor(private _http: HttpClient) { }

  selectAllMeter(): Observable<Medidor> {
    const url = 'http://192.168.100.6:8089/medidor-lista';
    const term = '';
    // tslint:disable-next-line:one-variable-per-declaration
    // const datos = {'name': 'pau', 'pass': '123'};
    // const temp = { body: { 'name': user, 'pass': '123' } };
    // const options = {params: new HttpParams().set('nombre', "a").set('pass', '123').set('name', 'pau <3') };
    // const options = {params: new HttpParams().set('nombre', user) };
    // const formData: any = new FormData();
    // formData.append('name', 'pau');
    // formData.append('pass', '123');
    let headers = new HttpHeaders().set('token', 'aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // headers: new HttpHeaders().set('token', 'aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    // console.log(formData.toString());
    // this._http.get<User>( url, options ).subscribe(response => {
    //     console.log(response);
    //   });
    return this._http.get( this.baseURL+'medidor-lista', {headers: headers} );

  }

  selectInstaMeter(model): Observable<MedidorInstantaneo> {

    // const options = {params: new HttpParams().set('mac', mac).set('fecha', fecha) };
    let headers = new HttpHeaders();
    headers = headers.append('token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    let params = new HttpParams();
    // params = params.append('mac', mac);
    // params = params.append('fecha', fecha);
    // let headers = new HttpHeaders().set('token', 'aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    let temp = new Array;
    // temp[0] = options;
    temp[1] = headers;
    // @ts-ignore
    return this._http.post( this.baseURL+'valores-instantaneos-med', { model }, {headers} );

  }

  selectPerfil(mac,fecha1, fecha2, model): Observable<MedidorInstantaneo> {
    const url = 'http://192.168.100.6:8089/medidor-lista';
    const options = {params: new HttpParams().set('mac', mac).set('fecha1', fecha1).set('fecha2', fecha2) };
    let headers = new HttpHeaders();
    headers = headers.append('token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    let temp = new Array;
    temp[0] = options;
    temp[1] = headers;
    // @ts-ignore
    return this._http.post( this.baseURL+'valores-instantaneos-med-fecha', {model} ,{ headers} );

  }

  selectAllMeterEnergy(){
    let headers = new HttpHeaders();
    headers = headers.append('token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // const options = {params: new HttpParams().set('mac', id) };
    return this._http.get(this.baseURL + 'consumos-medidor-all', { headers });
  }

  selectOneMeter(model) {
    let headers = new HttpHeaders().set('token', 'aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    return this._http.post( this.baseURL+'medidor-usr', {model}, {headers} );

  }
}
