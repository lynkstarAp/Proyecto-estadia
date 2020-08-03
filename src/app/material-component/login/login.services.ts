import { Injectable } from '@angular/core';
import { LoginM} from "./login.models";

@Injectable({
  providedIn: 'root'
})
export class LoginServices {

  login : LoginM[];

  constructor() {
     this.login = [

     ];
  }

  getLogin(){
    return this.login;
  }

  addLogin(loginA: LoginM){
  this.login.push(loginA);
  }

}
