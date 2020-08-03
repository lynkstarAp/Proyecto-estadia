import { Component , OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Medidor, MedidorConsumos} from "../../models/Medidor";
import {MeterService} from "../../services/meter.service";
import {ColectorService} from "../../services/colector.service";


export interface UserData {
  id: string;
  medidor: string;
  serie: string;
  estado: string;
  neteo: string;
}

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const MEDIDORES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const NETEO: string[] = [
  'M098', 'A145', 'O567', 'A789', 'A234', 'J564', 'C145', 'T690', 'I144', 'O689',
  'I575', 'J565', 'C567', 'L234', 'V097', 'A675', 'M908', 'T456', 'E187'
];

function createNewUser1(id: number): Medidor {
  this.selectMeter();
  const medidor = MEDIDORES[Math.round(Math.random() * (MEDIDORES.length - 1))] + ' ' +
    MEDIDORES[Math.round(Math.random() * (MEDIDORES.length - 1))].charAt(0) + '.';

  const neteo = NETEO[Math.round(Math.random() * (NETEO.length - 1))] + ' ' +
    NETEO[Math.round(Math.random() * (NETEO.length - 1))].charAt(0) + '.';

  let est;
  let tamanioMeter = 0;
  for (let con of this.meter) {
    est += con.estado + ' ' ;
  }
  return {
    draggable: true,
    estado: est,
    estado_relevador: 0,
    estatus: 0,
    fch_medidor: "",
    fch_registro: "",
    id_medidor: 0,
    label: "",
    latitud: 0,
    longitud: 0,
    mac: "",
    num_serie: 0,
    url: "../../../assets/images/users/mcr_min.png",
    neteo: 0

    // id: id.toString(),
    // medidor: medidor,
    // neteo: neteo,
    // serie: Math.round(Math.random() * 100).toString(),
    // estado: COLORS[Math.round(Math.random() * (COLORS.length - 1))]

  };
}



@Component({
  selector: 'app-grid',
  templateUrl: './medidores.component.html',
  styleUrls: ['./medidores.component.scss']
})
export class MedidoresComponent implements OnInit{
  meter: Medidor;
  tamanio: number;
  contador = 0;

  displayedColumns: string[] = ['id', 'medidor', 'serie', 'estado', 'neteo'];
  dataSource: MatTableDataSource<Medidor>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
mac2;
  //---------------------------------------------------------------------------------------
  createNewUser(id: number) {
    this.contador ++;
    return {
      draggable: true,
      estado: "",
      estado_relevador: this.meter[this.contador-1].estado_relevador,
      estatus: 0,
      fch_medidor: "",
      fch_registro: "",
      id_medidor: this.contador,
      label: "",
      latitud: 0,
      longitud: 0,
      mac: this.meter[this.contador-1].mac,
      num_serie: this.meter[this.contador-1].num_serie,
      url: "../../../assets/images/users/mcr_min.png",
      neteo: this.meter[this.contador-1].neteo
    };
  }
  //---------------------------------------------------------------------------------------

  constructor(
    public medidorService: MeterService,
    public colectoresService: ColectorService
  ) {
    this.selectMeter();
;
  }


  ngOnInit(){
    // Create 100 users
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectMeter() {
    this.medidorService.selectAllMeter().subscribe(
      (meterFromTheApi: Medidor) => {
        this.meter = meterFromTheApi;
        // @ts-ignore
        this.tamanio = this.meter.length;
        const users = Array.from({length: this.tamanio}, (_, k) => this.createNewUser(k + 1));
        // @ts-ignore
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err: any) => {
        console.error(err);
      }
    );
  }
  // elements: any = [
  //   {id: 1, medidores: 'Mark', serie: 'Otto', estado: '@mdo', neteo: 'pop'},
  //   {id: 2, medidores: 'Jacob', serie: 'Thornton', estado: '@fat' , neteo: 'classic'},
  //   {id: 3, medidores: 'Larry', serie: 'the bird', estado: '@Facebook' , neteo: 'opera'}
  // ];
  // headElements = ['ID', 'Medidores', 'N° de Serie', 'Estado de Relevador', 'Neteo Energía'];
  // // position = 'before';
  //
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


}



