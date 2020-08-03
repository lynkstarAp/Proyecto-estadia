import { Injectable } from '@angular/core';
import {Medidor, MedidorInstantaneo} from "../models/Medidor";
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Comunicacion} from "../models/Comunicacion";
import {InfoService} from "./info.service";

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {
  baseURL = environment.apiURL;
  constructor(private _http: HttpClient, public info: InfoService) { }
  token = this.info.getToken();

  selectComunicacionMedidor(model): Observable<Comunicacion> {
    // const options = {params: new HttpParams().set('mac', mac).set('fecha', fecha) };
    let headers = new HttpHeaders();
    headers = headers.append('token',this.token);
    // @ts-ignore
    return this._http.post( this.baseURL+'comunicacion-med', {model}, {headers} );

  }
}
