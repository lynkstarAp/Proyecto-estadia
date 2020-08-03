import { Injectable } from '@angular/core';
import {Medidor, MedidorInstantaneo} from "../models/Medidor";
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {InfoService} from "./info.service";

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  baseURL = environment.apiURL;
  token = this.info.getToken();

  constructor(private _http: HttpClient, public  info: InfoService) { }

  selectAllMeter(): Observable<Medidor> {
    let temporal = localStorage.getItem("temp");
    let headers = new HttpHeaders().set('token', this.token);
    if( temporal === "1" ){
      // @ts-ignore
      return this._http.post( this.baseURL+'medidor-lista', { usuario: null}, {headers: headers} );
    } else {
      // @ts-ignore
      return this._http.post( this.baseURL+'medidor-lista',  { usuario: localStorage.getItem("nombre")}, {headers: headers} );
    }


  }

  selectInstaMeter(model): Observable<MedidorInstantaneo> {

    // const options = {params: new HttpParams().set('mac', mac).set('fecha', fecha) };
    let headers = new HttpHeaders();
    headers = headers.append('token',this.token);

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
    headers = headers.append('token',this.token);
    // @ts-ignore
    let temp = new Array;
    temp[0] = options;
    temp[1] = headers;
    // @ts-ignore
    return this._http.post( this.baseURL+'valores-instantaneos-med-fecha', {model} ,{ headers} );

  }

  selectAllMeterEnergy(){
    let headers = new HttpHeaders();
    headers = headers.append('token',this.token);
    // const options = {params: new HttpParams().set('mac', id) };
    return this._http.get(this.baseURL + 'consumos-medidor-all', { headers });
  }

  selectOneMeter(model) {
    let headers = new HttpHeaders().set('token', this.token);
    return this._http.post( this.baseURL+'medidor-usr', {model}, {headers} );

  }
}
