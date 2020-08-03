import { Component , OnInit, ViewChild } from '@angular/core';
import { AreasService } from "../services/areas.service";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";
import {Areas} from "../models/Areas";


@Component({
  selector: 'app-menu',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent {

  nombre = "";
  descripcion = "";
  latitud = 0;
  longitud = 0;

  nombreValidacion: boolean;
  descripcionValidacion: boolean;
  latitudValidacion: boolean;
  longitudValidacion: boolean;

  areas: Areas;
  constructor(
    public area: AreasService
  ) {
    this.selectAreas();
  }

  selectAreas(){
    this.area.selectAreas().subscribe( (areasFormAPI: Areas) => {
      //console.log(areasFormAPI);
      this.areas = areasFormAPI;
      this.lat = 20.6142159;
      this.lng = -100.392759;
    })

  }
  prueba(n){
    this.lat = n;
    this.lng = n;
  }

  validar(){
    if(this.nombre != null && this.nombre != "" && this.nombre.length >3 ){
      this.nombreValidacion = true;
    } else {
      this.nombreValidacion = false;
    }
    if(this.descripcion != null && this.descripcion != "" && this.descripcion.length >3 ){
      this.descripcionValidacion = true;
    } else {
      this.descripcionValidacion = false;
    }
    if(this.latitud != null &&  this.latitud != 0 ){
      this.latitudValidacion = true;
    } else {
      this.latitudValidacion = false;
    }
    if(this.longitud != null &&  this.longitud != 0 ){
      this.longitudValidacion = true;
    } else{
      this.longitudValidacion = false;
    }

    if(this.nombreValidacion == true && this.descripcionValidacion == true && this.latitudValidacion == true && this.longitudValidacion == true ){
      this.area.createArea(this.nombre, this.descripcion, this.latitud, this.longitud).subscribe( (areaFormAPI: Areas) =>{
        alert("Area agregada exitosamente");
        this.selectAreas();
        this.nombre = "";
        this.descripcion = "";
        this.latitud = 0;
        this.longitud = 0;
        this.selectAreas();

      });
    }
  }

  select(medidor){
    localStorage.setItem('area', medidor);
  }

  eliminar(area){
    let r = confirm("Desea borrarlo?");
    if( r == true ){
      this.area.desactivarArea(area).subscribe( (response) => {
        alert("Area borrada exitosamente");
        this.selectAreas();
      });
    }
    if( r == false ){

    }

  }

  hi: any = [
    {id: 1},
    {id: 2},
    {id: 3},

  ];

  zoom: number = 8;

  lat: number ;
  lng: number ;

}
