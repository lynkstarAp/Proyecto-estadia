import { Component , OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ActivatedRoute} from "@angular/router";

export interface UserData {
  id: string;
  areas: string;
  serie: string;
  estado: string;
  neteo: string;
}

/** Constants used to fill up our data base. */
const ESTADO: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const AREAS: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];
const NETEO: string[] = [
  'M123', 'A321', 'O234', 'A432', 'A345', 'J546', 'C554', 'T567', 'I890', 'O098',
  'I675', 'J156', 'C453', 'L345', 'V234', 'A098', 'M789', 'T567', 'E456'
];

function createNewUser(id: number): UserData {
  const area = AREAS[Math.round(Math.random() * (AREAS.length - 1))] + ' ' +
    AREAS[Math.round(Math.random() * (AREAS.length - 1))].charAt(0) + '.';

  const neteo = NETEO[Math.round(Math.random() * (NETEO.length - 1))] + ' ' +
    NETEO[Math.round(Math.random() * (NETEO.length - 1))].charAt(0) + '.';

  return {
    id: id.toString(),
    areas: area,
    neteo: neteo,
    serie: Math.round(Math.random() * 100).toString(),
    estado: ESTADO[Math.round(Math.random() * (ESTADO.length - 1))]
  };
}

@Component({
  selector: 'app-menu',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {

  hi: any = [
    {id: 1},
    {id: 2},
    {id: 3},
    {id: 4},
    {id: 5},

  ];


  displayedColumns: string[] = ['id', 'area', 'serie', 'estado', 'neteo'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute) {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(id);
    // Create 100 users
    const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }


  ngOnInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // elements: any = [
  //   {id: 1, areas: 'Mark', serie: 'Otto', estado: '@mdo', neteo: 'pop'},
  //   {id: 2, areas: 'Jacob', serie: 'Thornton', estado: '@fat' , neteo: 'classic'},
  //   {id: 3, areas: 'Larry', serie: 'the bird', estado: '@Facebook' , neteo: 'opera'}
  // ];
  // headElements = ['ID', 'Áreas', 'N° de Serie', 'Estado de Relevador', 'Neteo Energía'];
  //
  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
}
