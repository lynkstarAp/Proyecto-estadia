import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(public router: Router){}

  // usuario: {
  //   name: "",
  //   tipoUs: "",
  //   token: "",
  // };

  usuario = null;

  token = "";

  setInfo(name, tipoU, token){
    // @ts-ignore
    this.usuario = {name: name, tipoUs: tipoU, token: token};
    this.token = token;
    // console.log("desde el service ");
    // console.log("ese: " + this.usuario);
    // console.log("token " + this.token);
  }
  getInfo(){
    return this.usuario;
  }
  getToken(){
    // if(this.token != "" && this.token != null){
    this.token = localStorage.getItem('authorization');
      return this.token;
    // } else {
    //   this.redireccion();
    // }
  }

  removeInfo(){
    this.usuario = null;
    this.token = "";
  }

  redireccion() {
    this.router.navigateByUrl('login').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }
}
