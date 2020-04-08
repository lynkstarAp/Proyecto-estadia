import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ColectorService} from "../../services/colector.service";
import {ColectorConsumos} from "../../models/Colectores";

export interface UserData {
  id: string;
  colectores: string;
  serie: string;
  estado: string;
  neteo: string;
}

/** Constants used to fill up our data base. */
const ESTADO: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const COLECTORES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

const NETEO: string[] = [
  '23D', '2S1', '45E', '98W', 'A21', 'J15', 'C78', 'T09', 'I12', 'O23',
  'I23', 'J12', 'C00', 'L89', 'V78', 'A56', 'M56', 'T$5', 'E23'
];

// function createNewUser(id: number): ColectorConsumos {
//   // const colector = COLECTORES[Math.round(Math.random() * (COLECTORES.length - 1))] + ' ' +
//   //   COLECTORES[Math.round(Math.random() * (COLECTORES.length - 1))].charAt(0) + '.';
//
//   // const neteo = NETEO[Math.round(Math.random() * (NETEO.length - 1))] + ' ' +
//   //   NETEO[Math.round(Math.random() * (NETEO.length - 1))].charAt(0) + '.';
//
//   this.contador ++;
//   return {
//     energia_necteo: this.colectores[this.contador-1].energia_necteo ,
//     estado_relevador: this.colectores[this.contador-1].estado_relevador,
//     id_concentrador: this.contador-1,
//     mac: "",
//     nombre: this.colectores[this.contador-1].nombre ,
//   };
// }


@Component({
  selector: 'app-lists',
  templateUrl: './colectores.component.html',
  styleUrls: ['./colectores.component.scss']
})
export class ColectoresComponent implements OnInit {
  colectorCons: ColectorConsumos;
  tamanio: number;
  contador = 0;

  hi: any = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},
    {id: 6},
    {id: 7},
    {id: 8},
    {id: 9},
    {id: 10},
  ];

  displayedColumns: string[] = ['id', 'colector', 'estado', 'neteo' ];
  dataSource: MatTableDataSource<ColectorConsumos>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  createNewUser(id: number): ColectorConsumos {
    // const colector = COLECTORES[Math.round(Math.random() * (COLECTORES.length - 1))] + ' ' +
    //   COLECTORES[Math.round(Math.random() * (COLECTORES.length - 1))].charAt(0) + '.';

    // const neteo = NETEO[Math.round(Math.random() * (NETEO.length - 1))] + ' ' +
    //   NETEO[Math.round(Math.random() * (NETEO.length - 1))].charAt(0) + '.';

    this.contador ++;
    return {
      energia_necteo: this.colectorCons[this.contador-1].energia_necteo ,
      estado_relevador: this.colectorCons[this.contador-1].estado_relevador,
      id_concentrador: this.contador,
      mac: "",
      nombre: this.colectorCons[this.contador-1].nombre ,
    };
  }


  constructor(public colectorService: ColectorService) {
    // Create 100 users
    this.selectColector();


  }

selectColector(){
  this.colectorService.selectAllCol().subscribe((colectorFromTheApi: ColectorConsumos) => {
    this.colectorCons = colectorFromTheApi;
    // @ts-ignore
    this.tamanio = this.colectorCons.length;
    console.log(this.colectorCons[0].energia_necteo);

    const users = Array.from({length: this.tamanio}, (_, k) => this.createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    }, (err: any) => {
      console.error(err);
    }
  );
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

  // elements: any = [
  //   {id: 1, colectores: 'Mark', serie: 'Otto', estado: '@mdo', neteo: 'pop'},
  //   {id: 2, colectores: 'Jacob', serie: 'Thornton', estado: '@fat' , neteo: 'classic'},
  //   {id: 3, colectores: 'Larry', serie: 'the bird', estado: '@Facebook' , neteo: 'opera'}
  // ];
  // headElements = ['ID', 'Colectores', 'N° de Serie', 'Estado de Relevador', 'Neteo Energía'];
  // // position = 'before';
  //
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
}
