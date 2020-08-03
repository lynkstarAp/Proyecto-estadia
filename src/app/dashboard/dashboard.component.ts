import {Component, AfterViewInit, ChangeDetectorRef, Inject, ViewChild, OnInit} from '@angular/core';
import {MouseEvent} from '@agm/core';

import * as Chartist from 'chartist';
import {ChartEvent} from 'ng-chartist';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MenuItems} from "../shared/menu-items/menu-items";
import {MediaMatcher} from "@angular/cdk/layout";
import {BaseChartDirective, Color, Label, MultiDataSet} from "ng2-charts";
import { ActivatedRoute } from "@angular/router";
//----------------------------------------------------------------------------------------------------------------------
import {HttpClient} from "@angular/common/http";
import {MeterService} from "../services/meter.service";
import {Medidor, MedidorConsumos, MedidorInstantaneo} from "../models/Medidor";
import {ColectorService} from "../services/colector.service";
import {Colectores, ColectorInstantaneo} from "../models/Colectores";
import {MatTableDataSource} from "@angular/material/table";
import {Comunicacion} from "../models/Comunicacion";
import {ComunicacionService} from "../services/comunicacion.service";
import {ConsumoService} from "../services/consumo.service";
import {LoginService} from "../services/login.service";
//----------------------------------------------------------------------------------------------------------------------
import { LoginServices } from "../material-component/login/login.services";
import {LoginM} from "../material-component/login/login.models";
import {InfoService} from "../services/info.service";


declare var require: any;

const data: any = require('./data.json');
let noSerie: string = "";
let estadoRelevador: string = "";
const neteo: string = "";

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  login: LoginM[];
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public dialog: MatDialog,
    public medidorService: MeterService,
    public colectorService: ColectorService,
    public loginService: LoginService,
    private _route: ActivatedRoute,
    public loginS: LoginServices,
    public info: InfoService
  ) {

    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.selectMeter();
    this.selectColector();

  }


  ngOnInit(){
    let nombre = +this._route.snapshot.paramMap.get('nombre');

    this.login = this.loginS.getLogin();
    //console.log(this.login);
  }

  styles = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "rgb(255,255,255)"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    },
  ]

  zoom: number = 5;

  lat: number = 20.6758941;
  lng: number = -100.433166;

  checked = false;
  visible = false;
  nvl = localStorage.getItem("temp");

  medidor: Medidor;
  colector: Colectores;

  selectMeter() {
    this.medidorService.selectAllMeter().subscribe(
      (meterFromTheApi: Medidor) => {
        this.medidor = meterFromTheApi;
        //console.log(meterFromTheApi);
      }, (err: any) => {
        console.error(err);

      }
    );
  }

  getInfo(){
    try {
      let user = localStorage.getItem('nombre');
        let nombre = localStorage.getItem('nombre');
        let token = localStorage.getItem('authorization');
        let tipo = localStorage.getItem('temp');
        console.log(nombre + " " + token + " " + tipo);
        this.info.setInfo(nombre, tipo, token);
        localStorage.clear();
    } catch (e) {
      console.log(e);
    }
  }

// @ts-ignore
  urlM: marker = '../../../assets/images/users/mcr_min.png';

//----------------------------------------------------------------------------------------------------------------------
  clickedMarker(label: string, index: number) {
    // this.openDialog('Instántaneos');
  }

  controladorOpenModa = false;

  openDialog(v): void {
    if (this.controladorOpenModa == false) {
      this.controladorOpenModa = true;
      //console.log("mac -> " + v.mac);
      mac = v.mac;
      if (v.mac != null) {
        tipo = "medidor";
      } else {
        tipo = "colector";
      }
      noSerie = v.num_serie;
      estadoRelevador = v.estado_relevador;

      const dialogRef = this.dialog.open(Modal, {
        // width: '30%',
        // height: '90%',
        disableClose: false,
        hasBackdrop: false,
        position: {'bottom': '20px', 'left': '900px'},
        panelClass: 'my-dialog'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.controladorOpenModa = false;
      });
    }
  }

//----------------------------------------------------------------------------------------------------------------------
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }

//----------------------------------------------------MARCADOR----------------------------------------------------------
  selectColector() {
    this.colectorService.selectAllColectores().subscribe(
      (colectorFromTheApi: Colectores) => {
        this.colector = colectorFromTheApi;
        this.colectorService.llenarColectores(this.colector);
        // console.log(colectorFromTheApi);
      }, (err: any) => {
        console.error(err);
      }
    );
  }

  // @ts-ignore
  urlC: marker = '../../../assets/images/users/protcomm_i_max.png';
  clickedMarkers(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  markersDragEnd(c: colector, $event: MouseEvent) {
    console.log('dragEnd', c, $event);
  }
}

//---------------------------------------------INTERFACES---------------------------------------------------------------
interface marker {
  lat: number;
  lng: number;
  label: string;
  draggable: boolean;
  name: string;
  url: string;
}

interface colector {
  lat: number;
  lng: number;
  label: string;
  draggable: boolean;
  name: string;
  url: string;
}

let mac = "";
let tipo = "";
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

//-------------------------------------------------------GRAFICA INSTANTANEOS-------------------------------------------
@Component({
  templateUrl: '../material-component/graficas/graficas.component.html'
})

export class Modal implements OnInit {
  final = 0;

  ngOnInit(): void {

  }

// data: string[] = [];
  selectInsta(fecha) {
    let medidorIntenataneo: MedidorInstantaneo = null;
    this.medidorService.selectInstaMeter({"mac": mac, "fecha": fecha}).subscribe(
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

  selectInstaCol(fecha) {
    let medidorIntenataneo: ColectorInstantaneo = null;
    this.colectorService.selectInstaMeter(mac, fecha).subscribe(
      (meterFromTheApi: ColectorInstantaneo) => {
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
          }
        }
      }, (err: any) => {
        console.error(err);
      }
    );

  }

  selected = '';

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

  public chartHovered({event, active}: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  // @ts-ignore
  constructor(public dialogRef: MatDialogRef<Modal>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              public medidorService: MeterService,
              public comunicacionService: ComunicacionService,
              public consumosService: ConsumoService,
              public colectorService: ColectorService) {

  }

  onNoClick(): void {
    this.dialogRef.close();
  }

//-------------------------------------GRAFICA DE PERDIDAS DE ENERGIA---------------------------------------------------
  selectLostEnergi() {
    if (this.numeroSerie != null) {
      this.selectLostEnergyMeter();

    } else {
      this.selectLostEnergyConc();
    }
  }

  selectLostEnergyMeter() {
    dataPerdidaTSuma.length = 0;
    dataPerdidaT.length = 0;
    dataPerdidaGenT = 0;
    dataPerdidaDadaT = 0;
    dataPerdidaConsT = 0;
    let medidorIntenataneo: MedidorInstantaneo = null;
    this.medidorService.selectInstaMeter({'mac': mac, "fecha": '20'}).subscribe(
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

            this.final = dataPerdidaDadaT;
            cons = cons + 1;
          }
          dataPerdidaTSuma.push(dataPerdidaGenT);
          dataPerdidaTSuma.push(dataPerdidaDadaT);
          dataPerdidaTSuma.push(dataPerdidaConsT);
          dataPerdidaT.push(dataPerdidaGen);
          dataPerdidaT.push(dataPerdidaDada);
          dataPerdidaT.push(dataPerdidaCons);
        }
      }, (err: any) => {
        console.error(err);
      }
    );
  }

  selectLostEnergyConc() {
    dataPerdidaTSuma.length = 0;
    dataPerdidaT.length = 0;
    dataPerdidaGenT = 0;
    dataPerdidaDadaT = 0;
    dataPerdidaConsT = 0;
    let medidorIntenataneo: ColectorInstantaneo = null;
    this.colectorService.selectInstaMeter(mac, '20').subscribe(
      (colecFromTheApi: ColectorInstantaneo) => {
        // @ts-ignore
        if (colecFromTheApi != null) {
          medidorIntenataneo = colecFromTheApi;
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
            this.final = dataPerdidaDadaT;
            cons = cons + 1;
          }
          dataPerdidaTSuma.push(dataPerdidaGenT);
          dataPerdidaTSuma.push(dataPerdidaDadaT);
          dataPerdidaTSuma.push(dataPerdidaConsT);
          dataPerdidaT.push(dataPerdidaGen);
          dataPerdidaT.push(dataPerdidaDada);
          dataPerdidaT.push(dataPerdidaCons);
        }
      }, (err: any) => {
        console.error(err);
      }
    );
  }

  public doughnutChartLabels: Label[] = ['Área', 'Testigo', 'Perdidas'];
  public doughnutChartData: ChartDataSets[] = [
    {data: dataPerdidaT, label: 'Corriente'}
  ];

  public doughnutChartData2: ChartDataSets[] = [
    {data: dataPerdidaTSuma}
  ];

  public doughnutChartType: ChartType = 'doughnut';

//-------------------------------------GRAFICA DE PERFILES--------------------------------------------------------------
  selectPerfil() {
    let medidorIntenataneo: MedidorInstantaneo = null;
    if (fechaInicial.length < 10 && fechaFinal.length < 10) {
      return null;
    } else if (fechaInicial.length == 10 && fechaFinal.length == 10) {
      datosPerfil.length = 0;
      fechaPerfil.length = 0;

      this.medidorService.selectPerfil(mac, fechaInicial, fechaFinal, {
        "fecha1": fechaInicial,
        "fecha2": fechaFinal,
        "mac1": mac
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
            }

          }
        }, (err: any) => {
          console.error(err);
        }
      );
    }
  }

  selectPerfilCol() {
    let colectorIntenataneo: ColectorInstantaneo = null;
    if (fechaInicial.length < 10 && fechaFinal.length < 10) {
      return null;
    } else if (fechaInicial.length == 10 && fechaFinal.length == 10) {
      datosPerfil.length = 0;
      fechaPerfil.length = 0;

      this.colectorService.selectPerfil({"fecha1": fechaInicial, "fecha2": fechaFinal, "mac1": mac}).subscribe(
        (colFromTheApi: ColectorInstantaneo) => {
          // @ts-ignore
          if (colFromTheApi != null) {
            colectorIntenataneo = colFromTheApi;
            // @ts-ignore
            for (let i of medidorIntenataneo) {
              datosPerfil.push(i['energia_activa']);
              let fechaHoraIns = String(i['fecha_hora']);
              let temp = fechaHoraIns.split(" ");
              fechaPerfil.push(temp[1]);
            }

          }
        }, (err: any) => {
          console.error(err);
        }
      );
    }
  }


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
//-------------------------------------GRAFICA DE COMUNICACIONES--------------------------------------------------------
  // @ts-ignore
  public lineChartDataC: ChartDataSets[] = [
    {data: comunicacionEnviados, label: 'Paquetes Enviados'},
    {data: comunicacionPerdidos, label: 'Paquetes Perdidos'}
  ];

  public lineChartLabelsC: Label[] = comunicacionFecha;

  public lineChartOptionsC: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
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

  public doughnutChartData3BC: ChartDataSets[] = [
    {data: consumosTotales}
  ];

  //--------------------------- CONSUMOS -------------------------------------------------------------
  public doughnutChartLabels1: Label[] = ['Área', 'Testigo', 'Perdidas'];
  public doughnutChartData1: ChartDataSets[] = [
    {data: consumosActualT, label: 'Corriente'}
  ];

  public doughnutChartData11: ChartDataSets[] = [
    {data: consumosAnteriorT}
  ];

  public doughnutChartType1: ChartType = 'doughnut';

  public doughnutChartColors: Color[] = [
    {
      backgroundColor: ['rgb(222,0,43)', 'rgb(16,255,0)', 'rgb(68,75,63)'],
    },
  ];

  //------------------------------------ PETICION ------------------------------------------------------------------------

  selectMeterConsumo() {
    // console.log('ejecuto metodo ' + mac);
  }


  startDate: string = "";
  date = new Date();
  dataPerdidaDadaT1 = dataPerdidaDadaT;
  estadoRelevador1 = estadoRelevador;
  numeroSerie = noSerie;
  macp = mac;

  fech(v) {
    console.log(v);
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

    if (noSerie != null) {
      this.selectInsta(temp);
    } else {
      this.selectInstaCol(temp);
    }
  }

  selectFechaPerdida() {
    // dataPerdidaCons.length = 0;
    // dataPerdidaDada.length = 0;
    // dataPerdidaGen.length = 0;
    // let temp: string = "";
    // temp = String( myDatepicker.startAt );
    // let x = temp.split(" ");
    // // console.log(x);
    // if ( x[1] === 'Jan'){ x[1] = '01'; }
    // if ( x[1] === 'Feb'){ x[1] = '02'; }
    // if ( x[1] === 'Mar'){ x[1] = '03'; }
    // if ( x[1] === 'Apr'){ x[1] = '04'; }
    // if ( x[1] === 'May'){ x[1] = '05'; }
    // if ( x[1] === 'Jun'){ x[1] = '06'; }
    // if ( x[1] === 'Jul'){ x[1] = '07'; }
    // if ( x[1] === 'Aug'){ x[1] = '08'; }
    // if ( x[1] === 'Sep'){ x[1] = '09'; }
    // if ( x[1] === 'Oct'){ x[1] = '10'; }
    // if ( x[1] === 'Nov'){ x[1] = '11'; }
    // if ( x[1] === 'Dec'){ x[1] = '12'; }
    // if(x[2].length == 1){ x[2] = '0'+x[2]; }
    //
    // temp = x[3] + "-" + x[1] + "-" + x[2];
    // // console.log(temp);

    this.selectLostEnergi();
  }

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

    if (this.numeroSerie != null) {
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
    if (this.numeroSerie != null) {
      this.selectPerfil();
    } else {
      this.selectPerfilCol();
    }
  }

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
     this.comunicacionService.selectComunicacionMedidor({"mac": mac, "fecha": fecha}).subscribe(
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

          }

         }
      }, (err: any) => {
        console.error(err);
      }
    );

  }

  selectConsumosMed() {

    consumosActualT.length = 0;
    consumosAnteriorT.length = 0;
    consumosTotales.length = 0;

    this.consumosService.selectConsumoMedidor(mac).subscribe(
      (consumosFromTheApi: MedidorConsumos) => {
        // @ts-ignore
        // console.log(consumosFromTheApi);
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
  }
}

