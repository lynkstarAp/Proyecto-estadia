import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Usuarios} from "../models/Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseURL = environment.apiURL;

  usuario: Usuarios;

  constructor(private _http: HttpClient) { }

  leerUsuarios(){
    let headers = new HttpHeaders();
    headers = headers.append( 'token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc' );
    return this._http.post( this.baseURL + 'ver-t-usuario', { 'id':'null' }, {headers} );
  }

  agregarUsuario(model){
    let headers = new HttpHeaders();
    headers = headers.append( 'token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc' );
    return this._http.post( this.baseURL + 'registrar-usuario', {model}, {headers});
  }

  acctuzarUsuario(model){
    let headers = new HttpHeaders();
    headers = headers.append( 'token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc' );
    return this._http.post(this.baseURL + 'actualizar-usuario', {model}, {headers});
  }

  selectAllMeterUsu(model){
    let headers = new HttpHeaders();
    headers = headers.append( 'token','aovTUgvSrQQbDzOdHpLIvkvfRlN38WLlHGTeblT9beWk7RdFcv37XYJ1LYHc' );
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
