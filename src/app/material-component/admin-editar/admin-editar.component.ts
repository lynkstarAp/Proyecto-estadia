import { Component, OnInit } from '@angular/core';
import {UsuarioService} from "../../services/usuario.service";
import {UsuarioRe, Usuarios} from "../../models/Usuario";
import {Router} from "@angular/router";

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
  contrasenia: string = "";
  estatus: number;
  tipoUsu: string = "";
  tipo: number;

  nombreValidacion = true;
  apellido1Validacion = true;
  apellido2Validacion = true;
  usuarioValidacion = true;
  contraseniaValidacion = true;
  tipoValidacion = true;

  constructor(
    public usuarioService: UsuarioService,
    public router: Router,
  ) {
    this.leerUsuarios();
  }

  leerUsuarios(){
    if(this.usuarioService.readData() != null) {

      this.usuarioOne = this.usuarioService.readData();
      this.usuario = this.usuarioOne.usuario;
      this.nombre = this.usuarioOne.nombre;
      this.apellido1 = this.usuarioOne.apellido1;
      this.apellido2 = this.usuarioOne.apellido2;
      this.estatus = this.usuarioOne.estatus;
      this.tipoUsu = this.usuarioOne.tipo_usuario.tipo_usu;
      if (this.tipoUsu === "Super Usuario") {
        this.tipo = 1;
      }
      if (this.tipoUsu === "Operador") {
        this.tipo = 2;
      }
      if (this.tipoUsu === "Supervisor") {
        this.tipo = 3;
      }
      if (this.tipoUsu === "Solo Lectura") {
        this.tipo = 4;
      }
    }else {
      // alert("sin usuario");
      this.redireccion();

    }
  }

  redireccion() {

    this.router.navigateByUrl('admin').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }

  actualizarUsuario() {
    if (this.nombre.length < 3 || this.nombre.length === 0) {
      this.nombreValidacion = false;
    } else {
      this.nombreValidacion = true;
    }
    if (this.apellido1.length < 3 || this.apellido1.length === 0) {
      this.apellido1Validacion = false;
    } else {
      this.apellido1Validacion = true;
    }
    if (this.usuario.length < 3 || this.usuario.length === 0) {
      this.usuarioValidacion = false;
    } else {
      this.usuarioValidacion = true;
    }
    if (this.tipo === 0) {
      this.tipoValidacion = false;
    } else {
      this.tipoValidacion = true;
    }
    if (this.apellido2.length == 0) {
      this.apellido2 = " "
    }
    if(this.contrasenia.length == 0){
      this.contrasenia = " ";
    }
    if (this.nombreValidacion == true && this.apellido1Validacion == true && this.usuarioValidacion == true &&
      this.contraseniaValidacion == true && this.tipo != 0) {
      // console.log( { 'nombre': this.nombre, 'apellido1': this.apellido1, 'apellido2': this.apellido2, 'usuario': this.usuario, 'contraseña': this.contrasenia, 'tipo_usuario': this.tipoUsu } );
      this.usuarioService.acctuzarUsuario({
        'nombre': this.nombre,
        'apellido1': this.apellido1,
        'apellido2': this.apellido2,
        'usuario': this.usuarioOne.usuario,
        'usuario2': this.usuario,
        'contraseña': this.contrasenia,
        'estatus' : this.estatus,
        'tipo_usuario': this.tipo
      }).subscribe(
        (userFomApi: UsuarioRe) => {
          if (userFomApi['error'] != null) {
            console.log(userFomApi['error']);
            alert('El nombre de usuario ya existe');
          } else {
            alert("Usuario registrado exitosamente ");
            this.nombre = "";
            this.apellido1 = "";
            this.apellido1 = "";
            this.usuario = "";
            this.contrasenia = "";
            this.tipo = 0;
          }
        }
      );
    } else {
      alert('REVICE EL FORMULARIO');
    }

  }

  ngOnInit() {
  }

}
