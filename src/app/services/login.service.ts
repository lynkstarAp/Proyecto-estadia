import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Usuarios} from "../models/Usuario";
import {parse} from "ts-node";
import {stringify} from "querystring";
import {InfoService} from "./info.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseURL = environment.apiURL;

  usuario: Usuarios;

  constructor(private _http: HttpClient, public info: InfoService) { }

  token = this.info.getToken();

  login(user, pass){
    // let headers = new HttpHeaders();
    // headers = headers.append( 'token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc' );
    const json = {
      usuario: user,
      contrasena: pass
    };
    const myObjStr = JSON.stringify(json);
// console.log(JSON.stringify(json));
    return this._http.post( this.baseURL + 'login', JSON.stringify(json) );
  }

  agregarUsuario(model){
    let headers = new HttpHeaders();
    headers = headers.append( 'token',this.token );
    return this._http.post( this.baseURL + 'registrar-usuario', {model}, {headers});
  }

  acctuzarUsuario(model){
    let headers = new HttpHeaders();
    headers = headers.append( 'token',this.token );
    return this._http.post(this.baseURL + 'actualizar-usuario', {model}, {headers});
  }

  selectAllMeterUsu(model){
    let headers = new HttpHeaders();
    headers = headers.append( 'token',this.token );
    return this._http.post( this.baseURL + 'ver-usuario-medidor', {model}, {headers});
  }

  saveData(user){
    this.usuario = user;
    // console.log("service: " + this.usuario);
  }

  readData(){
    // console.log(this.usuario);
    return this.usuario;
  }

}
