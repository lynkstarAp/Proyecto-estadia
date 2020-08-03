import {Component, OnInit} from '@angular/core';
import { LoginServices } from "./login.services";
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent  implements OnInit{

  constructor(
      public loginService: LoginService,
      public router: Router
    ) {
    localStorage.clear();
    // alert("hola xd")
  }

  usr = "";
  psw = "";
  ngOnInit(){

  }

  iniciarSesion(){
      this.loginService.login(this.usr, this.psw).subscribe((response) =>{
        if(response['error'] != null){
        } else {

          localStorage.setItem('authorization', response['token']);

          if(response['tipo_usuario'].tipo_usu == 'SuperUsuario'){
            localStorage.setItem('temp', '1');
          }
          if(response['tipo_usuario'].tipo_usu == 'Solo lectura'){
            localStorage.setItem('temp', '2');
          }
          if(response['tipo_usuario'].tipo_usu == 'Supervisor'){
            localStorage.setItem('temp', '3');
          }
          if(response['tipo_usuario'].tipo_usu == 'Operador'){
            localStorage.setItem('temp', '4');
          }

            localStorage.setItem('nombre', response['usuario']);


          this.redireccion();
        }

       // if(){}
     });
  }

  redireccion() {
    this.router.navigateByUrl('inicio').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
