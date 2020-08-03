import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {ColectorService} from "../services/colector.service";
import {ColectorConsumos} from "../models/Colectores";



@Component({
  selector: 'app-lists',
  templateUrl: './colectores.component.html',
  styleUrls: ['./colectores.component.scss']
})
export class ColectoresComponent implements OnInit {
  colectorCons: ColectorConsumos;
  tamanio: number;
  contador = 0;

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
      energia_necteo: this.colectorCons[this.contador-1].energia_necteo.total ,
      estatus: this.colectorCons[this.contador-1].estatus,
      id_concentrador: this.contador,
      mac: "",
      nombre: this.colectorCons[this.contador-1].nombre ,
    };
  }


  constructor(public colectorService: ColectorService,
              ) {
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


}



