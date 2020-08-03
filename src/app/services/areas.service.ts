import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {InfoService} from "./info.service";
import {environment} from "../../environments/environment";
import {stringify} from "@angular/compiler/src/util";

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(public _http: HttpClient, public info: InfoService) {
  }

  baseURLL = environment.apiURL;
  token = this.info.getToken();

  selectAreas() {
    let headers = new HttpHeaders();
    headers = headers.append('token', this.token);
    return this._http.get(this.baseURLL + "areas", {headers});
  }

  createArea(nom, des, lat, lng) {
    const json = {
      nombre: nom,
      descripcion: des,
      latitud: lat,
      longitud: lng
    };
    const myObjStr = JSON.stringify(json);
    console.log(JSON.stringify(json));
    console.log("desde areas: token : " + this.token);
    let headers = new HttpHeaders();
    headers = headers.append('token', this.token);
    let temp1 = JSON.stringify(myObjStr);
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return this._http.post(this.baseURLL + "registrar-area", {

      nombre: nom,
      descripcion: des,
      latitud: lat,
      longitud: lng
    }, {headers});
  }

  desactivarArea(area){
    let headers = new HttpHeaders();
    headers = headers.append('token', this.token);
    return this._http.post( this.baseURLL + "borrar-area", {"area": area}, {headers});
  }

  selectAreaDetail(area){
    let headers = new HttpHeaders();
    headers = headers.append('token', this.token);
    localStorage.removeItem('area');
    return this._http.post( this.baseURLL + "area-medidor", {"area":area}, {headers});
  }
}
