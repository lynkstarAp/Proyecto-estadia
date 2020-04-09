import { Injectable } from '@angular/core';
import {Medidor, MedidorConsumos, MedidorInstantaneo} from "../models/Medidor";
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Comunicacion} from "../models/Comunicacion";

@Injectable({
  providedIn: 'root'
})
export class ConsumoService {
  baseURL = environment.apiURL;
  constructor(private _http: HttpClient) { }

  selectConsumoMedidor(mac): Observable<MedidorConsumos> {
    const options = {params: new HttpParams().set('mac', mac) };
    let headers = new HttpHeaders();
    headers = headers.append('token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc');
    // @ts-ignore
    return this._http.post( this.baseURL+'consumos-medidor', {'mac': mac}, {headers} );

  }
}
