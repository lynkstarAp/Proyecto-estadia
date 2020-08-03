import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpHeaders, HttpParams, HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Usuarios} from "../models/Usuario";
import {InfoService} from "./info.service";
import {stringify} from "querystring";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  baseURL = environment.apiURL;

  usuario: Usuarios;

  constructor(private _http: HttpClient, public  info: InfoService) { }

  token = this.info.getToken();

  leerUsuarios(){
    let headers = new HttpHeaders();
    headers = headers.append( 'token',this.token );
    return this._http.post( this.baseURL + 'ver-t-usuario', { 'id':'null' }, {headers} );
  }

  agregarUsuario(nombre, apellido1, apellido2, usuario, contrasenia, tipoUs){
    let headers = new HttpHeaders();
    headers = headers.append( 'token',this.token );
    return this._http.post( this.baseURL + 'registrar-usuario', {
      "nombre": nombre,
      "apellido1": apellido1,
      "apellido2": apellido2,
      "usuario": usuario,
      "contraseña": contrasenia,
      "tipo_usuario": tipoUs }  , {headers}  );
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
