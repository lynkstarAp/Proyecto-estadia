import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {UsuarioService} from "../../services/usuario.service";
import {UsuarioRe, Usuarios} from "../../models/Usuario";
import {Router} from "@angular/router";


@Component({
  selector: 'app-buttons',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class ButtonsComponent implements OnInit {
  usuarios: Usuarios;
  tamanio: number;
  contador = 0;


  nombre: string = "";
  apellido1: string = "";
  apellido2: string = "";
  usuario: string = "";
  contrasenia: string = "";
  tipoUsu: number = 0;

  nombreValidacion = true;
  apellido1Validacion = true;
  apellido2Validacion = true;
  usuarioValidacion = true;
  contraseniaValidacion = true;
  tipoValidacion = true;

  displayedColumns: string[] = ['id', 'usuario', 'nombre', 'apellido1', 'apellido2', 'estatus', 'tipo', 'accion'];
  dataSource: MatTableDataSource<Usuarios>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  // private router: any;

  constructor(public usuarioService: UsuarioService) {

    this.verUsuarios();
  }

  verUsuarios() {
    this.usuarioService.leerUsuarios().subscribe(
      (userFromApi: Usuarios) => {
        this.usuarios = userFromApi;
        // @ts-ignore
        this.tamanio = this.usuarios.length;
        console.log(userFromApi);
        const users = Array.from({length: this.tamanio}, (_, k) => this.createNewUser(k + 1));
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  createNewUser(id: number): Usuarios {
    this.contador++;
    return {
      id: this.contador,
      apellido1: this.usuarios[this.contador - 1].apellido1,
      apellido2: this.usuarios[this.contador - 1].apellido2,
      nombre: this.usuarios[this.contador - 1].nombre,
      estatus: this.usuarios[this.contador - 1].estatus,
      tipo_usuario:
        {tipo_usu: this.usuarios[this.contador - 1].tipo_usuario.tipo_usu},
      usuario: this.usuarios[this.contador - 1].usuario
    };
  }

  registrarUsuario() {
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
    // if( this.apellido2.length < 3 || this.apellido2.length === 0){ this.apellido2Validacion = false;} else {this.apellido2Validacion = true;}
    if (this.usuario.length < 3 || this.usuario.length === 0) {
      this.usuarioValidacion = false;
    } else {
      this.usuarioValidacion = true;
    }
    if (this.contrasenia.length < 3 || this.contrasenia.length === 3) {
      this.contraseniaValidacion = false;
    } else {
      this.contraseniaValidacion = true;
    }
    if (this.tipoUsu === 0) {
      this.tipoValidacion = false;
    } else {
      this.tipoValidacion = true;
    }
    if (this.apellido2.length == 0) {
      this.apellido2 = " "
    }
    if (this.nombreValidacion == true && this.apellido1Validacion == true && this.usuarioValidacion == true &&
      this.contraseniaValidacion == true && this.tipoUsu != 0) {
      // console.log( { 'nombre': this.nombre, 'apellido1': this.apellido1, 'apellido2': this.apellido2, 'usuario': this.usuario, 'contraseña': this.contrasenia, 'tipo_usuario': this.tipoUsu } );
      this.usuarioService.agregarUsuario({
        'nombre': this.nombre,
        'apellido1': this.apellido1,
        'apellido2': this.apellido2,
        'usuario': this.usuario,
        'contraseña': this.contrasenia,
        'tipo_usuario': this.tipoUsu
      }).subscribe(
        (userFomApi: UsuarioRe) => {
          if (userFomApi['error'] != null) {
            console.log(userFomApi['error']);
            alert('El nombre de usuario ya existe');
          } else {
            alert("Usuario registrado exitosamente " + this.nombre + ' ' + this.apellido1 + " " + this.apellido2);
            this.nombre = "";
            this.apellido1 = "";
            this.apellido1 = "";
            this.usuario = "";
            this.contrasenia = "";
            this.tipoUsu = 0;
          }
        }
      );
    } else {
      alert('REVICE EL FORMULARIO');
    }

  }

  selectUsInfo(user){
    let usu: Usuarios;
    // this.usuarios[this.contador - 1].usuario
    for( let x = 0; x < this.tamanio; x++){
      if(this.usuarios[x].usuario === user){
        usu = this.usuarios[x];
      }

    }
    this.usuarioService.saveData(usu);
  }

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // gotoProductDetailsV2(url) {
  //
  //   var myurl = `inicio`;
  //   this.router.navigateByUrl(myurl).then(e => {
  //     if (e) {
  //       console.log("Navigation is successful!");
  //     } else {
  //       console.log("Navigation has failed!");
  //     }
  //   });
  // }
  // elements: any = [
  //   {id: 1, Usuario: 'yaja2', Nombre: 'Yajaira', Apellido1: 'Castañeda', Apellido2: 'León', Estatus: '1', Tipo_Usuario: 'Master', Acción: ''},
  //   {id: 2, Usuario: 'david5', Nombre: 'David', Apellido1: 'Mendieta', Apellido2: 'Morales', Estatus: '1', Tipo_Usuario: 'Master', Acción: ''},
  //   {id: 3, Usuario: 'aparicio4', Nombre: 'Alberto', Apellido1: 'Aparacio', Apellido2: 'Escobedo', Estatus: '1', Tipo_Usuario: 'Master', Acción: ''}
  // ];
  // headElements = ['ID', 'Usuario', 'Nombre','Apellido 1','Apellido 2','Estatus', 'Tipo Usuario', 'Acción'];
}
