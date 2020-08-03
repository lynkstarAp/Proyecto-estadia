import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AreaDetail} from "../models/Areas";
import {AreasService} from "../services/areas.service";

export interface UserData {
  id: string;
  serie: string;
  // dcu: string;
  tipo: string;
  fabricante: string;
  operacion: string;
  posicion: string;
  servicio: string;
  timestap: string;
  entregados: string;
  recibidos: string;
  neteo: string;
  estado: string;
}

/** Constants used to fill up our data base. */
const SERIES: string[] = [
  '000GPM', '000GTF', '000GTW', '000GTY', '000GUE', '000GUJ', '000GVA', '000GYW', '000JTP', '001GPG',
  '000GPM', '000GTF', '000GTW', '000GTY', '000GUE', '000GUJ', '000GVA', '000GYW', '000JTP', '001GPG',
];

const TIPOS: string[] = [
  '1S', '1S', '1S', '1S', '1S', '1S', '1S', '1S', '1S', '1S',
  '1S', '1S', '1S', '1S', '1S'
];

const FABRICANTES: string[] = [
  'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA',
  'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA', 'PROTECSA'
];

const OPERACION: string[] = [
  'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY',
  'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY', 'ENERGY'
];

const POSICION: string[] = [
  'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN',
  'UNKNOWN', 'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN', 'CORRECT', 'UNKNOWN'
];

const SERVICIO: string[] = [
  'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO',
  'CONECTADO', 'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO', 'DESCONECTADO', 'CONECTADO'
];

const TIMESTAP: string[] = [
  '1/1/2016', '4/19/2018', '5/21/2018', '5/21/2018', '4/22/2020', '7/13/2017', '2/26/2020', '1/1/2016', '4/19/2020', '5/21/2018',
  '4/19/2020',  '4/19/2018', '5/21/2018', '5/21/2018', '4/22/2020', '7/13/2017', '2/26/2020', '1/1/2016', '4/19/2020'
];

const ENTREGADOS: string[] = [
  '12345', '3456', '7654', '1236', '1643', '8757', '1245', '6467', '7678', '76678',
  '34567', '0987', '4567', '6533', '0568', '7664', '0356', '7578', '87667'
];

const RECIBIDOS: string[] = [
  '12345', '3456', '7654', '1236', '1643', '8757', '1245', '6467', '7678', '76678',
  '34567', '0987', '4567', '6533', '0568', '7664', '0356', '7578', '87667'
];

const NETEO: string[] = [
  '12345', '3456', '7654', '1236', '1643', '8757', '1245', '6467', '7678', '76678',
  '34567', '0987', '4567', '6533', '0568', '7664', '0356', '7578', '87667'
];

const ESTADO: string[] = [
  'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE',
  'OFFLINE', 'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE', 'ONLINE', 'OFFLINE'
];


@Component({
  selector: 'app-areas-detalles',
  templateUrl: './areas-detalles.component.html',
  styleUrls: ['./areas-detalles.component.scss']
})
export class AreasDetallesComponent implements OnInit {

  // displayedColumns: string[] = ['id', 'serie', 'dcu', 'tipo', 'fabricante', 'operacion', 'posicion', 'servicio', 'timestap', 'entregados', 'recibidos', 'neteo', 'estado', 'accion'];
  displayedColumns: string[] = ['id', 'serie', 'tipo', 'fabricante', 'operacion', 'posicion', 'servicio', 'timestap', 'entregados', 'recibidos', 'neteo', 'estado', 'accion'];
  dataSource: MatTableDataSource<AreaDetail>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  area: AreaDetail;
  tamaño: number;
  contador = 0;


  constructor(public areaMed: AreasService) {
    // Create 100 users

    this.selectAreaMedidor();
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

  selectAreaMedidor(){
    this.areaMed.selectAreaDetail(localStorage.getItem('area')).subscribe((areaMedidorFormAPI: AreaDetail) => {
      // console.log(areaMedidorFormAPI);
      this.area = areaMedidorFormAPI;
      // @ts-ignore
      this.tamaño = areaMedidorFormAPI.length;
      console.log("tamaño: " + this.tamaño);
      console.log(areaMedidorFormAPI);
      const users = Array.from({length: this.tamaño}, (_, k) => this.createNewUser(k + 1));

      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });




  }

  createNewUser(id: number): AreaDetail {
    this.contador ++;

    return {
      area_medidor_a: {
        descripcion: this.area[this.contador-1].area_medidor_a.descripcion,
        latitud: this.area[this.contador-1].area_medidor_a.latitud,
        longitud: this.area[this.contador-1].area_medidor_a.longitud,
        nombre: this.area[this.contador-1].area_medidor_a.nombre
      },
      area_medidor_m: {
        estado: this.area[this.contador-1].area_medidor_m.estado,
        estado_relevador: this.area[this.contador-1].area_medidor_m.estado_relevador,
        estatus: 0,
        fch_medidor: this.area[this.contador-1].area_medidor_m.fch_medidor,
        fch_registro: this.area[this.contador-1].area_medidor_m.fch_registro,
        id_medidor: 0,
        latitud: this.area[this.contador-1].area_medidor_m.latitud,
        longitud: this.area[this.contador-1].area_medidor_m.longitud,
        mac: this.area[this.contador-1].area_medidor_m.mac,
        num_serie: this.area[this.contador-1].area_medidor_m.num_serie,
        tipo_medidor: {estatus: this.area[this.contador-1].area_medidor_m.tipo_medidor.estatus, tipo: this.area[this.contador-1].area_medidor_m.tipo_medidor.tipo}
      },
      consumos: {
        cuadrante_cuatro: this.area[this.contador-1].consumos.cuadrante_cuatro,
        cuadrante_dos: this.area[this.contador-1].consumos.cuadrante_dos,
        cuadrante_tres: this.area[this.contador-1].consumos.cuadrante_tres,
        cuadrante_uno: this.area[this.contador-1].consumos.cuadrante_uno,
        demanda_maxima: this.area[this.contador-1].consumos.demanda_maxima,
        energia_entregada_actual: this.area[this.contador-1].consumos.energia_entregada_actual,
        energia_entregada_anterior: this.area[this.contador-1].consumos.energia_entregada_anterior,
        energia_entregada_total: this.area[this.contador-1].consumos.energia_entregada_total,
        energia_necta_actual: this.area[this.contador-1].consumos.energia_necta_actual,
        energia_necta_anterior: this.area[this.contador-1].consumos.energia_necta_anterior,
        energia_necta_total: this.area[this.contador-1].consumos.energia_necta_total,
        energia_recibida_actual: this.area[this.contador-1].consumos.energia_recibida_actual,
        energia_recibida_anterior: this.area[this.contador-1].consumos.energia_recibida_anterior,
        energia_recibida_total: this.area[this.contador-1].consumos.energia_recibida_total,
        fecha_hora: this.area[this.contador-1].consumos.fecha_hora
      },
      id_medidor: id

    };
  }
}

/** Builds and returns a new User. */




