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
import {Medidor, MedidorConsumos, MedidorInstantaneo, MedidorUsu} from "../../models/Medidor";
import {UsuarioService} from "../../services/usuario.service";
import {Usuarios} from "../../models/Usuario";
import {Router} from "@angular/router";
import {MeterService} from "../../services/meter.service";
import {MedidorServiceService} from "../../service/medidor-service.service";
import {ConsumoService} from "../../services/consumo.service";
import {Comunicacion} from "../../models/Comunicacion";
import {ComunicacionService} from "../../services/comunicacion.service";

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
let medidorSeleccionado1: Medidor;

let dataInstantaneaVol: number[] = [];
let dataInstantaneoHr: string[] = [];
let dataInstantaneoCor: number[] = [];

let dataPerdidaDada: number = 0;
let dataPerdidaGen: number = 0;
let dataPerdidaCons: number = 0;
let dataPerdidaDadaT: number = 0;
let dataPerdidaGenT: number = 0;
let dataPerdidaConsT: number = 10;
let dataPerdidaTSuma: number[] = [];
let dataPerdidaT: number[] = [];

let fechaInicial: string = "";
let fechaFinal: string = "";

let datosPerfil: number[] = [];
let fechaPerfil: string[] = [];

let comunicacionEnviados: number[] = [];
let comunicacionPerdidos: number[] = [];
let comunicacionFecha: string[] = [];

let consumosEntregadaAcutal: number = 0;
let consumosEntregadaPasado: number = 0;
let consumosEntregadaTotal: number = 0;
let consumosRecibidaAcutal: number = 0;
let consumosRecibidaPasado: number = 0;
let consumosRecibidaTotal: number = 0;
let consumosNeteoAcutal: number = 0;
let consumosNeteoPasado: number = 0;
let consumosNeteoTotal: number = 0;

let consumosActualT: number[] = [];
let consumosAnteriorT: number[] = [];
let consumosTotales: number[] = [];
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
      // console.log(this.medidorSeleccionado.num_serie);
      num_serie = this.medidorSeleccionado.num_serie;
      medidorSeleccionado1 = meterFromApi;

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
  medidor: MedidorConsumos;
  mac: string;
  nuSerie: number;
  necteo: number;
  relevador: number;

  selected = '';

  final = 0;

  public lineChartData: ChartDataSets[] = [
    {data: dataInstantaneaVol, label: 'Voltaje'}
  ];

  public lineChartData2: ChartDataSets[] = [
    {data: dataInstantaneoCor, label: 'Corriente'}
  ];

  public lineChartLabels: Label[] = dataInstantaneoHr;

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
              @Inject(MAT_DIALOG_DATA) public data: any,
              public medidorService: MeterService,
              public consumosService: ConsumoService,
              public comunicacionService: ComunicacionService,) {
    this.selectMeterInfor();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectMeterInfor(){
    console.log("mac: " + this.macMed2);
    this.medidorService.selectOneMeter({'mac': this.macMed2} ).subscribe((meterFromApi: MedidorConsumos) => {
      console.log(meterFromApi);
      this.medidor = meterFromApi;
      this.mac = this.medidor['mac'];
      this.nuSerie = this.medidor['num_serie'];
      this.necteo = this.medidor['energia_necta_actual'];
      this.relevador = this.medidor['estado_relevador'];
    });
    // console.log(this.medidorSeleccionado2);
  }

  selectFechaInsta(myDatepicker) {
    dataInstantaneaVol.length = 0;
    dataInstantaneoHr.length = 0;
    dataInstantaneoCor.length = 0;
    let temp: string = "";
    temp = String(myDatepicker.startAt);
    let x = temp.split(" ");
    // console.log(x);
    if (x[1] === 'Jan') {
      x[1] = '01';
    }
    if (x[1] === 'Feb') {
      x[1] = '02';
    }
    if (x[1] === 'Mar') {
      x[1] = '03';
    }
    if (x[1] === 'Apr') {
      x[1] = '04';
    }
    if (x[1] === 'May') {
      x[1] = '05';
    }
    if (x[1] === 'Jun') {
      x[1] = '06';
    }
    if (x[1] === 'Jul') {
      x[1] = '07';
    }
    if (x[1] === 'Aug') {
      x[1] = '08';
    }
    if (x[1] === 'Sep') {
      x[1] = '09';
    }
    if (x[1] === 'Oct') {
      x[1] = '10';
    }
    if (x[1] === 'Nov') {
      x[1] = '11';
    }
    if (x[1] === 'Dec') {
      x[1] = '12';
    }
    if (x[2].length == 1) {
      x[2] = '0' + x[2];
    }

    temp = x[3] + "-" + x[1] + "-" + x[2];
    // console.log(temp);

    if (this.nuSerie != null) {
      this.selectInsta(temp);
    }
  }
  selectInsta(fecha) {
    let medidorIntenataneo: MedidorInstantaneo = null;
    this.medidorService.selectInstaMeter({"mac": this.mac, "fecha": fecha}).subscribe(
      (meterFromTheApi: MedidorInstantaneo) => {
        // @ts-ignore
        if (meterFromTheApi != null) {
          medidorIntenataneo = meterFromTheApi;
          // @ts-ignore
          for (let i of medidorIntenataneo) {
            dataInstantaneaVol.push(i['voltaje']);
            let fechaHoraIns = String(i['fecha_hora']);
            let temp = fechaHoraIns.split(" ");
            dataInstantaneoHr.push(temp[1]);
            dataInstantaneoCor.push(i['corriente']);
            // console.log(i + ' /// ' + dataInstantaneaVol + ' /// ' + dataInstantaneoHr + ' /// ' + dataInstantaneoCor);
          }
          // console.log(meterFromTheApi );
        }
      }, (err: any) => {
        console.error(err);
      }
    );

  }
//-------------------------------------GRAFICA DE PERDIDAS DE ENERGIA---------------------------------------------------
  public doughnutChartLabels: Label[] = ['Área', 'Testigo', 'Perdidas'];
  public doughnutChartData: ChartDataSets[] = [
    {data: dataPerdidaT, label: 'Corriente'}
  ];

  public doughnutChartData2: ChartDataSets[] = [
    {data: dataPerdidaTSuma}
  ];

  public doughnutChartType: ChartType = 'doughnut';

  selectLostEnergi() {
      this.selectLostEnergyMeter();
  }

  selectLostEnergyMeter() {
    dataPerdidaTSuma.length = 0;
    dataPerdidaT.length = 0;
    dataPerdidaGenT = 0;
    dataPerdidaDadaT = 0;
    dataPerdidaConsT = 0;
    let medidorIntenataneo: MedidorInstantaneo = null;
    this.medidorService.selectInstaMeter({'mac': this.mac, "fecha": '20'}).subscribe(
      (meterFromTheApi: MedidorInstantaneo) => {
        // @ts-ignore
        if (meterFromTheApi != null) {
          medidorIntenataneo = meterFromTheApi;
          let cons = 0;
          // @ts-ignore
          for (let i of medidorIntenataneo) {
            if (cons == 0) {
              dataPerdidaGen = i['energia_reactiva'];
              dataPerdidaDada = i['energia_aparente'];
              dataPerdidaCons = i['energia_activa'];
            }
            dataPerdidaGenT += i['energia_reactiva'];
            dataPerdidaDadaT = dataPerdidaDadaT + i['energia_aparente'];
            dataPerdidaConsT += i['energia_activa'];

            // console.log(' /// ' + dataPerdidaGenT + ' /// ' + dataPerdidaDadaT + ' /// ' + dataPerdidaConsT);
            this.final = dataPerdidaDadaT;
            cons = cons + 1;
          }
          dataPerdidaTSuma.push(dataPerdidaGenT);
          dataPerdidaTSuma.push(dataPerdidaDadaT);
          dataPerdidaTSuma.push(dataPerdidaConsT);
          dataPerdidaT.push(dataPerdidaGen);
          dataPerdidaT.push(dataPerdidaDada);
          dataPerdidaT.push(dataPerdidaCons);
          // console.log(meterFromTheApi );
        }
      }, (err: any) => {
        console.error(err);
      }
    );
  }

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

  public barChartLabels: Label[] = fechaPerfil;
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    {data: datosPerfil, label: 'Kwh'}
  ];

  selectFechaInicial(picker) {
    let temp: string = "";
    temp = String(picker.startAt);
    let x = temp.split(" ");
    // console.log(x);
    if (x[1] === 'Jan') {
      x[1] = '01';
    }
    if (x[1] === 'Feb') {
      x[1] = '02';
    }
    if (x[1] === 'Mar') {
      x[1] = '03';
    }
    if (x[1] === 'Apr') {
      x[1] = '04';
    }
    if (x[1] === 'May') {
      x[1] = '05';
    }
    if (x[1] === 'Jun') {
      x[1] = '06';
    }
    if (x[1] === 'Jul') {
      x[1] = '07';
    }
    if (x[1] === 'Aug') {
      x[1] = '08';
    }
    if (x[1] === 'Sep') {
      x[1] = '09';
    }
    if (x[1] === 'Oct') {
      x[1] = '10';
    }
    if (x[1] === 'Nov') {
      x[1] = '11';
    }
    if (x[1] === 'Dec') {
      x[1] = '12';
    }
    if (x[2].length == 1) {
      x[2] = '0' + x[2];
    }

    temp = x[3] + "-" + x[1] + "-" + x[2];
    fechaInicial = temp;

    if (this.nuSerie != null) {
      this.selectPerfil()
    } else {
    }
  }

  selectFechaFinal(picker) {
    let temp: string = "";
    temp = String(picker.startAt);
    let x = temp.split(" ");
    // console.log(x);
    if (x[1] === 'Jan') {
      x[1] = '01';
    }
    if (x[1] === 'Feb') {
      x[1] = '02';
    }
    if (x[1] === 'Mar') {
      x[1] = '03';
    }
    if (x[1] === 'Apr') {
      x[1] = '04';
    }
    if (x[1] === 'May') {
      x[1] = '05';
    }
    if (x[1] === 'Jun') {
      x[1] = '06';
    }
    if (x[1] === 'Jul') {
      x[1] = '07';
    }
    if (x[1] === 'Aug') {
      x[1] = '08';
    }
    if (x[1] === 'Sep') {
      x[1] = '09';
    }
    if (x[1] === 'Oct') {
      x[1] = '10';
    }
    if (x[1] === 'Nov') {
      x[1] = '11';
    }
    if (x[1] === 'Dec') {
      x[1] = '12';
    }
    if (x[2].length == 1) {
      x[2] = '0' + x[2];
    }

    temp = x[3] + "-" + x[1] + "-" + x[2];
    fechaFinal = temp;
    if (this.nuSerie != null) {
      this.selectPerfil();
    }
  }

  selectPerfil() {
    let medidorIntenataneo: MedidorInstantaneo = null;
    console.log("1: " + fechaInicial + " 2: " + fechaFinal);
    if (fechaInicial.length < 10 && fechaFinal.length < 10) {
      return null;
    } else if (fechaInicial.length == 10 && fechaFinal.length == 10) {
      datosPerfil.length = 0;
      fechaPerfil.length = 0;

      this.medidorService.selectPerfil(this.mac, fechaInicial, fechaFinal, {
        "fecha1": fechaInicial,
        "fecha2": fechaFinal,
        "mac1": this.mac
      }).subscribe(
        (meterFromTheApi: MedidorInstantaneo) => {
          // @ts-ignore
          if (meterFromTheApi != null) {
            medidorIntenataneo = meterFromTheApi;
            // @ts-ignore
            for (let i of medidorIntenataneo) {
              datosPerfil.push(i['energia_activa']);
              let fechaHoraIns = String(i['fecha_hora']);
              let temp = fechaHoraIns.split(" ");
              fechaPerfil.push(temp[1]);
              // console.log(i + ' /// ' + dataInstantaneaVol + ' /// ' + dataInstantaneoHr + ' /// ' + dataInstantaneoCor);
            }
            // console.log(meterFromTheApi );
          }
        }, (err: any) => {
          console.error(err);
        }
      );
      console.log(datosPerfil);
      console.log(fechaPerfil);
    }
  }
//-------------------------------------GRAFICA DE COMUNICACIONES--------------------------------------------------------
  public lineChartDataC: ChartDataSets[] = [
    {data: comunicacionEnviados, label: 'Paquetes Enviados'},
    {data: comunicacionPerdidos, label: 'Paquetes Perdidos'}
  ];

  public lineChartLabelsC: Label[] = comunicacionFecha;

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

  selectFechaComunicacion(picker) {
    let temp: string = "";
    temp = String(picker.startAt);
    let x = temp.split(" ");
    // console.log(x);
    if (x[1] === 'Jan') {
      x[1] = '01';
    }
    if (x[1] === 'Feb') {
      x[1] = '02';
    }
    if (x[1] === 'Mar') {
      x[1] = '03';
    }
    if (x[1] === 'Apr') {
      x[1] = '04';
    }
    if (x[1] === 'May') {
      x[1] = '05';
    }
    if (x[1] === 'Jun') {
      x[1] = '06';
    }
    if (x[1] === 'Jul') {
      x[1] = '07';
    }
    if (x[1] === 'Aug') {
      x[1] = '08';
    }
    if (x[1] === 'Sep') {
      x[1] = '09';
    }
    if (x[1] === 'Oct') {
      x[1] = '10';
    }
    if (x[1] === 'Nov') {
      x[1] = '11';
    }
    if (x[1] === 'Dec') {
      x[1] = '12';
    }
    if (x[2].length == 1) {
      x[2] = '0' + x[2];
    }

    temp = x[3] + "-" + x[1] + "-" + x[2];
    fechaFinal = temp;

    this.selectComunicacion(temp);
  }
  selectComunicacion(fecha) {

    comunicacionEnviados.length = 0;
    comunicacionPerdidos.length = 0;
    comunicacionFecha.length = 0;
    console.log("1: " + fechaInicial + " 2: " + fechaFinal);
    this.comunicacionService.selectComunicacionMedidor({"mac": this.mac, "fecha": fecha}).subscribe(
      (comunicacionFromTheApi: Comunicacion) => {
        // @ts-ignore
        if (comunicacionFromTheApi != null) {
          // @ts-ignore
          for (let i of comunicacionFromTheApi) {
            comunicacionEnviados.push(i['paquetes_env']);
            comunicacionPerdidos.push(i['paquetes_perd']);
            let fechaHoraIns = String(i['fecha_hora']);
            let hora = fechaHoraIns.split(" ");
            comunicacionFecha.push(hora[1]);

            // console.log(i + ' /// ' + dataInstantaneaVol + ' /// ' + dataInstantaneoHr + ' /// ' + dataInstantaneoCor);
          }
          // console.log(meterFromTheApi );
        }
      }, (err: any) => {
        console.error(err);
      }
    );
    console.log(datosPerfil);
    console.log(fechaPerfil);

  }
//-------------------------------------GRAFICA DE BALANCES DE CONSUMO---------------------------------------------------

  public doughnutChartLabelsBC: Label[] = ['Balance', 'Entregada', 'Recibida'];
  public doughnutChartData1: ChartDataSets[] = [
    {data: consumosActualT, label: 'Corriente'}
  ];

  public doughnutChartData11: ChartDataSets[] = [
    {data: consumosAnteriorT}
  ];

  public doughnutChartData3BC: ChartDataSets[] = [
    {data: consumosTotales}
  ];

  public doughnutChartTypeBC: ChartType = 'doughnut';

  selectConsumosMed() {
    consumosActualT.length = 0;
    consumosAnteriorT.length = 0;
    consumosTotales.length = 0;

    this.consumosService.selectConsumoMedidor(this.mac).subscribe(
      (consumosFromTheApi: MedidorConsumos) => {
        // @ts-ignore
        if (consumosFromTheApi != null) {
          // @ts-ignore
          for (let n of consumosFromTheApi) {
            consumosEntregadaAcutal = n['energia_entregada_actual'];
            consumosEntregadaPasado = n['energia_entregada_anterior'];
            consumosEntregadaTotal = n['energia_entregada_total'];
            consumosRecibidaAcutal = n['energia_recibida_actual'];
            consumosRecibidaPasado = n['energia_recibida_anterior'];
            consumosRecibidaTotal = n['energia_recibida_total'];
            consumosNeteoAcutal = n['energia_necta_actual'];
            consumosNeteoPasado = n['energia_necta_anterior'];
            consumosNeteoTotal = n['energia_necta_total'];
            console.log(consumosEntregadaAcutal + " " + consumosRecibidaAcutal + " " + consumosNeteoAcutal);
            consumosActualT.push(n['energia_entregada_actual']);
            consumosActualT.push(n['energia_recibida_actual']);
            consumosActualT.push(n['energia_necta_actual']);

            consumosAnteriorT.push(n['energia_entregada_anterior']);
            consumosAnteriorT.push(n['energia_recibida_anterior']);
            consumosAnteriorT.push(n['energia_necta_anterior']);

            consumosTotales.push(n['energia_entregada_total']);
            consumosTotales.push(n['energia_recibida_total']);
            consumosTotales.push(n['energia_necta_total']);

          }
        }
      }, (err: any) => {
        console.error(err);
      }
    );
    // console.log(consumosActualT);
  }


  num_serie2: string;
  macMed2 = macMed;
  medidorSeleccionado2 = medidorSeleccionado1;


}
