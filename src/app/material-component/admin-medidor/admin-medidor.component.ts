import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {Modal} from "../../dashboard/dashboard.component";
import {MediaMatcher} from "@angular/cdk/layout";
import {MenuItems} from "../../shared/menu-items/menu-items";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {BaseChartDirective, Color, Label, MultiDataSet} from "ng2-charts";
import * as Chartist from 'chartist';
import {MouseEvent} from "@agm/core";
import {ChartEvent} from "ng-chartist";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {Medidor, MedidorUsu} from "../../models/Medidor";
import {UsuarioService} from "../../services/usuario.service";
import {Usuarios} from "../../models/Usuario";
import {Router} from "@angular/router";
import {MeterService} from "../../services/meter.service";

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

//----------------------------------------------------------------------------------------------------------------------
export interface UserData {
  id: string;
  serie: string;
  estado: string;
  fecha: string;
}

const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];

const SERIES: string[] = [
  'FGH12', '12OKL', '90IJU', '34LPS', 'IJK98', '12LOS', '76TBN', 'T12NJ', 'I90MK', 'O23MJ',
  'I84RT', 'J19NM', 'CQW23', 'L20DU', 'V01AÑ', 'A56OZ', 'M56AS', 'T34MS', 'E54DS'
];

const FECHAS: string[] = [
  '24/09/19', '22/06/20', '04/06/19', '29/02/20', '24/03/19', '28/08/19', '24/03/19', '14/12/19', '13/11/19', '19/10/18',
  '20/09/18', '08/08/19', '05/05/20', '25/07/19', '24/01/20', '31/07/19', '02/02/18', '04/10/19', '14/04/20'
];

let macMed ;
//----------------------------------------------------------------------------------------------------------------------

@Component({
  selector: 'app-admin-medidor',
  templateUrl: './admin-medidor.component.html',
  styleUrls: ['./admin-medidor.component.scss']
})
export class AdminMedidorComponent implements OnInit {
  userMeter: MedidorUsu;
  usuarioSeleccionado: Usuarios;
  tamanio: number;
  contador = 0;

  medidorSeleccionado: Medidor;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public dialog: MatDialog,
    public usuarioService: UsuarioService,
    public router: Router,
    public medidorServiceService: MeterService,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    this.selectAllMeter();
    this.leerUsuarios();

  }

  leerUsuarios() {
    if (this.usuarioService.readData() == null) {
      this.redireccion();
    }
  }

  redireccion() {

    this.router.navigateByUrl('').then(e => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
  }


  selectAllMeter() {

    this.usuarioSeleccionado = this.usuarioService.readData();
    this.usuarioService.selectAllMeterUsu({'usuario': this.usuarioSeleccionado.usuario}).subscribe(
      (meterFromApi: MedidorUsu) => {
        // console.log(meterFromApi);
        this.userMeter = meterFromApi;
        // @ts-ignore
        this.tamanio = this.userMeter.length;

        const users = Array.from({length: this.tamanio}, (_, k) => this.createNewUser(k + 1));
        this.dataSource = new MatTableDataSource(users);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  createNewUser(id: number): MedidorUsu {
    //['id', 'serie', 'estado', 'fecha', 'grafica'];
    this.contador++;
    return {
      estado: String(this.contador),
      estado_relevador: this.userMeter[this.contador - 1].estado_relevador,
      estatus: 0,
      fch_medidor: "",
      fch_registro: this.userMeter[this.contador - 1].fch_registro,
      latitud: 0,
      longitud: 0,
      mac: this.userMeter[this.contador - 1].mac,
      num_serie: this.userMeter[this.contador - 1].num_serie,
      tipo_medidor: {estatus: 0, tipo: ""}


    };
  }

//----------------------------------------------------------------------------------------------------------------------
  displayedColumns: string[] = ['id', 'serie', 'estado', 'fecha', 'grafica'];
  dataSource: MatTableDataSource<MedidorUsu>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  ngOnInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

//----------------------------------------------------------------------------------------------------------------------


  controladorOpenModa = false;

  openDialog(v): void {
    if (this.controladorOpenModa == false) {
      this.controladorOpenModa = true;
      macMed = v;
      this.selectMeterBasicInfo(macMed);
      const dialogRef = this.dialog.open(ModalM, {
        width: '90%',
        height: '80%',
        disableClose: false,
        hasBackdrop: false,
        position: {'bottom': '40px', 'left': '150px'},
        panelClass: 'my-dialog'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.controladorOpenModa = false;
      });
    }
  }

  selectMeterBasicInfo(mac){
  this.medidorServiceService.selectOneMeter({'mac':mac}).subscribe(
    (meterFromApi: Medidor) => {
      this.medidorSeleccionado = meterFromApi;
      console.log(this.medidorSeleccionado.num_serie);
      num_serie = this.medidorSeleccionado.num_serie;

    }
  );
  }

}
let num_serie;

//----------------------------------------------------------------------------------------------------------------------
@Component({
  templateUrl: '../grafica-medidor/grafica-medidor.component.html'
})

export class ModalM {

  selected = '';

  public lineChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 34, 56, 79, 12, 23], label: 'Voltaje'}
  ];

  public lineChartData2: ChartDataSets[] = [
    {data: [28, 48, 40, 19, 86, 27, 90, 45, 67, 12, 10, 12], label: 'Corriente'}
  ];

  public lineChartLabels: Label[] = ['00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00',
    '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: '#FFFFFF',
          },
          ticks: {
            fontColor: 'rgba(0,0,0,0)',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { //Green
      // backgroundColor: 'rgba(0, 176, 0, 0.4)',
      borderColor: 'rgba(0, 176, 0, 0.8)',
      pointBackgroundColor: 'rgb(0,176,0)',
      pointBorderColor: '#33BD0D',
      pointHoverBackgroundColor: '#33BD0D',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    }
  ];

  public lineChartColors2: Color[] = [
    { // orange
      // backgroundColor: 'rgba(255, 155, 0, 0.8)',
      borderColor: 'rgb(222,0,19)',
      pointBackgroundColor: 'rgb(222,0,6)',
      pointBorderColor: '#ff0700',
      pointHoverBackgroundColor: '#ff0018',
      pointHoverBorderColor: 'rgb(222,0,20)'
    }
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';

  @ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

  // /*constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
  //             @Inject(MAT_DIALOG_DATA) public data: any) { }*/

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  constructor(public dialogRef: MatDialogRef<Modal>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

//-------------------------------------GRAFICA DE PERDIDAS DE ENERGIA---------------------------------------------------
  public doughnutChartLabels: Label[] = ['Área', 'Testigo', 'Perdidas'];
  public doughnutChartData: MultiDataSet = [
    [350, 450, 100]
  ];

  public doughnutChartData2: MultiDataSet = [
    [134, 489, 300]
  ];

  public doughnutChartType: ChartType = 'doughnut';
//-------------------------------------GRAFICA DE PERFILES--------------------------------------------------------------
  public barChartOptions: ChartOptions = {
    responsive: true,

    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartColors: Color[] = [
    {
      backgroundColor: 'rgb(52,206,210)',
    }
  ];

  public barChartLabels: Label[] = ['04:45', '05:30', '06:15', '07:00', '07:45', '08:30', '09:15', '10:00', '10:45', '11:30'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {data: [65, 59, 80, 81, 56, 55, 40, 34, 67, 56], label: 'Kwh'}
  ];
//-------------------------------------GRAFICA DE COMUNICACIONES--------------------------------------------------------
  public lineChartDataC: ChartDataSets[] = [
    {data: [16, 17, 26, 35, 22, 11, 29, 23, 18, 33, 30, 27], label: 'Paquetes Enviados'},
    {data: [10, 11, 20, 29, 26, 5, 23, 17, 12, 27, 24, 21], label: 'Paquetes Perdidos'}
  ];

  public lineChartLabelsC: Label[] = ['00:00:00', '01:00:00', '02:10:00', '04:00:00', '05:00:00', '06:00:00', '07:05:00',
    '08:05:00', '09:50:00', '10:050:00', '11:50:00', '14:35:00'];

  public lineChartOptionsC: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: '#212121',
          },
          ticks: {
            fontColor: 'rgba(0,0,0,0)',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColorsC: Color[] = [
    { //Green
      // backgroundColor: 'rgba(0, 176, 0, 0.4)',
      borderColor: 'rgba(0, 176, 0, 0.8)',
      pointBackgroundColor: 'rgb(0,176,0)',
      pointBorderColor: '#33BD0D',
      pointHoverBackgroundColor: '#33BD0D',
      pointHoverBorderColor: 'rgb(31,255,8)'
    },
    { // orange
      // backgroundColor: 'rgba(255, 155, 0, 0.8)',
      borderColor: 'rgb(222,0,19)',
      pointBackgroundColor: 'rgb(222,0,6)',
      pointBorderColor: '#ff0700',
      pointHoverBackgroundColor: '#ff0018',
      pointHoverBorderColor: 'rgb(222,0,20)'
    }
  ];

  public lineChartLegendC = true;
  public lineChartTypeC = 'line';

//-------------------------------------GRAFICA DE BALANCES DE CONSUMO---------------------------------------------------

  public doughnutChartLabelsBC: Label[] = ['Balance', 'Entregada', 'Recibida'];
  public doughnutChartDataBC: MultiDataSet = [
    [350, 450, 100]
  ];

  public doughnutChartData2BC: MultiDataSet = [
    [134, 489, 300]
  ];

  public doughnutChartData3BC: MultiDataSet = [
    [239, 239, 239]
  ];

  public doughnutChartTypeBC: ChartType = 'doughnut';
  num_serie2: string;
  macMed2 = macMed;

}
