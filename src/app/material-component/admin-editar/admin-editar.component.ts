import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {Usuarios} from "../../models/Usuario";

@Component({
  selector: 'app-admin-editar',
  templateUrl: './admin-editar.component.html',
  styleUrls: ['./admin-editar.component.scss']
})
export class AdminEditarComponent implements OnInit {
  usuarioOne: Usuarios;

  nombre: string = "";
  apellido1: string = "";
  apellido2: string = "";
  usuario: string = "";
  contrasenia: string = "esto es una contraseña enncriptada ";
  estatus: number;
  tipoUsu: string = "";
  tipo: number;

  nombreValidacion = true;
  apellido1Validacion = true;
  apellido2Validacion = true;
  usuarioValidacion = true;
  contraseniaValidacion = true;
  tipoValidacion = true;

  constructor(public usuarioService: UsuarioService) {
    this.leerUsuarios();
  }

  leerUsuarios(){
    this.usuarioOne = this.usuarioService.readData();
    this.usuario = this.usuarioOne.usuario;
    this.nombre = this.usuarioOne.nombre;
    this.apellido1 = this.usuarioOne.apellido1;
    this.apellido2 = this.usuarioOne.apellido2;
    this.estatus = this.usuarioOne.estatus;
    this.tipoUsu = this.usuarioOne.tipo_usuario.tipo_usu;
    if( this.tipoUsu === "Super Usuario"){ this.tipo = 1;}
    if( this.tipoUsu === "Operador"){ this.tipo = 2;}
    if( this.tipoUsu === "Supervisor"){this.tipo = 3;}
    if( this.tipoUsu === "Solo Lectura"){this.tipo = 4;}

  }

  ngOnInit() {
  }

}
