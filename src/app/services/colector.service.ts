import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {Colectores, ColectorInstantaneo} from "../models/Colectores";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {MedidorInstantaneo} from "../models/Medidor";
import {InfoService} from "./info.service";


@Injectable({
  providedIn: 'root'
})
export class ColectorService {
  colectores: Colectores;
  baseURL = environment.apiURL;
  token = this.info.getToken();
  constructor(private _http: HttpClient, public info: InfoService) { }

  selectAllColectores(): Observable<Colectores> {
    let temp = localStorage.getItem("temp");
    let headers = new HttpHeaders().set('token', this.token);
    if( temp === "1" || temp === "3" ) {
      // @ts-ignore
      return this._http.post(this.baseURL + 'concentrador-lista',  { usuario: null},{headers: headers});
    } else {
      // @ts-ignore
      return this._http.post(this.baseURL + 'concentrador-lista',  { usuario: localStorage.getItem("nombre")},{headers: headers});
    }
  }

  selectInstaMeter(mac,fecha): Observable<ColectorInstantaneo> {

    const options = {params: new HttpParams().set('mac', mac).set('fecha', fecha) };
    let headers = new HttpHeaders().set('token', this.token);
    // @ts-ignore
    let temp = new Array;
    temp[0] = options;
    temp[1] = headers;
    // @ts-ignore
    return this._http.get( this.baseURL+'valores-instantaneos-col', options, {headers} );

  }

  selectPerfil(model): Observable<MedidorInstantaneo> {
    let headers = new HttpHeaders();
    headers = headers.append('token',this.token);
    // @ts-ignore
    return this._http.post( this.baseURL+'valores-instantaneos-col-fecha', {model} ,{ headers} );
  }


  selectAllCol(){
    let headers = new HttpHeaders();
    headers = headers.append('token',this.token);
    return this._http.post( this.baseURL + 'concentrador-lista', {'usuario':null}, { headers } );
  }
  llenarColectores(colecotr){
    // console.log(colecotr);
    this.colectores = colecotr;
  }

  leerColector(){
    return this.colectores;
  }

}

