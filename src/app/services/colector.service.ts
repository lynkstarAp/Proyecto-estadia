import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Colectores, ColectorInstantaneo} from "../models/Colectores";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MedidorInstantaneo} from "../models/Medidor";


@Injectable({
  providedIn: 'root'
})
export class ColectorService {
  colectores: Colectores;
  baseURL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  selectAllColectores(): Observable<Colectores> {
    let headers = new HttpHeaders().set('token', 'aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    return this._http.get( this.baseURL+'concentrador-lista', {headers: headers} );

  }

  selectInstaMeter(mac,fecha): Observable<ColectorInstantaneo> {

    const options = {params: new HttpParams().set('mac', mac).set('fecha', fecha) };
    let headers = new HttpHeaders().set('token', 'aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    let temp = new Array;
    temp[0] = options;
    temp[1] = headers;
    // @ts-ignore
    return this._http.get( this.baseURL+'valores-instantaneos-col', options, {headers} );

  }

  selectPerfil(model): Observable<MedidorInstantaneo> {
    let headers = new HttpHeaders();
    headers = headers.append('token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    return this._http.post( this.baseURL+'valores-instantaneos-col-fecha', {model} ,{ headers} );
  }


  selectAllCol(){
    let headers = new HttpHeaders();
    headers = headers.append('token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    return this._http.get( this.baseURL + 'consumos-concentrador-all', { headers } );
  }
  llenarColectores(colecotr){
    console.log(colecotr);
    this.colectores = colecotr;
  }
  leerColector(){
    return this.colectores;
  }

}

