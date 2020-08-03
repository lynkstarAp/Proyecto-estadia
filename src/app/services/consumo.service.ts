import { Injectable } from '@angular/core';
import {Medidor, MedidorConsumos, MedidorInstantaneo} from "../models/Medidor";
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Comunicacion} from "../models/Comunicacion";
import {InfoService} from "./info.service";

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  baseURL = environment.apiURL;

  constructor(private _http: HttpClient, public info: InfoService) { }

  token = this.info.getToken();

  selectConsumoMedidor(mac): Observable<MedidorConsumos> {
    const options = {params: new HttpParams().set('mac', mac) };
    let headers = new HttpHeaders();
    headers = headers.append('token',this.token);
    // @ts-ignore
    return this._http.post( this.baseURL+'consumos-medidor', {'mac': mac}, {headers} );

  }
}
