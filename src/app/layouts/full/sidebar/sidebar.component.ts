import { ChangeDetectorRef, Component, NgZone, OnDestroy, ViewChild, HostListener, Directive, AfterViewInit, Inject
} from '@angular/core';

import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../shared/menu-items/menu-items';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import {Color, BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: []
})

export class AppSidebarComponent implements OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public dialog: MatDialog,
    public dialog2: MatDialog,
    public dialog3: MatDialog,
    public dialog4: MatDialog,
    public dialog5: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

// //----------------------------------------------IF OPEN DIALOG----------------------------------------------------------
//   openDialog(v): void {
//     if (v === "Instántaneos") {
//
//       const dialogRef = this.dialog.open(ModalI, {
//         width: '30%',
//         height: '72%',
//         disableClose: false,
//         hasBackdrop: false,
//         position: {'top': '60px', 'left': '900px'},
//         panelClass: 'my-dialog'
//       });
//
//       dialogRef.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//
//       });
// // //-------------------------------------------------------------------------------
//     } else if (v === "PerdidasEnergía") {
//       const dialogRef2 = this.dialog2.open(ModalPE, {
//         width: '30%',
//         height: '72%',
//         disableClose: false,
//         hasBackdrop: false,
//         position: {'top': '60px', 'left': '250px'},
//         panelClass: 'my-dialog'
//       });
//
//       dialogRef2.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//
//       });
// //-------------------------------------------------------------------------------
//     } else if(v === 'Perfiles'){
//       const dialogRef3 = this.dialog3.open(ModalP,{
//         width: '30%',
//         height: '40%',
//         disableClose: false,
//         hasBackdrop: false,
//         position: {'bottom': '60px', 'left': '700px'},
//         panelClass: 'my-dialog'
//       });
//
//       dialogRef3.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//
//       });
// //-------------------------------------------------------------------------------
//     } else if(v === 'Comunicaciones'){
//       const dialogRef4 = this.dialog4.open(ModalC,{
//         width: '30%',
//         height: '40%',
//         disableClose: false,
//         hasBackdrop: false,
//         position: {'bottom': '60px', 'left': '500px'},
//         panelClass: 'my-dialog'
//       });
//
//       dialogRef4.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//
//       });
// //-------------------------------------------------------------------------------
//     } else if(v === 'BalanceConsumos'){
//       const dialogRef5 = this.dialog5.open(ModalBC,{
//         width: '30%',
//         height: '100%',
//         disableClose: false,
//         hasBackdrop: false,
//         position: {'bottom': '60px', 'left': '400px'},
//         panelClass: 'my-dialog',
//       });
//
//       dialogRef5.afterClosed().subscribe(result => {
//         console.log('The dialog was closed');
//
//       });
//     }
//   }
// }
//
// //-------------------------------------------------------GRAFICA INSTANTANEOS-------------------------------------------
// @Component({
//   templateUrl: '../../../material-component/instantaneos/instantaneos.component.html'
// })
//
// export class ModalI {
//   public lineChartData: ChartDataSets[] = [
//        { data: [65, 59, 80, 81, 56, 55, 40, 34, 56, 79, 12, 23], label: 'Voltaje' }
//   ];
//
//   public lineChartData2: ChartDataSets[] = [
//     { data: [28, 48, 40, 19, 86, 27, 90, 45, 67, 12, 10, 12], label: 'Corriente' }
//   ];
//
//   public lineChartLabels: Label[] = ['00:00:00', '01:00:00', '02:00:00', '03:00:00', '04:00:00', '05:00:00', '06:00:00',
//                                      '07:00:00', '08:00:00', '09:00:00', '10:00:00', '11:00:00'];
//
//   public lineChartOptions: (ChartOptions & { annotation: any }) = {
//     responsive: true,
//     scales: {
//       // We use this empty structure as a placeholder for dynamic theming.
//       xAxes: [{}],
//       yAxes: [
//         {
//           id: 'y-axis-0',
//           position: 'left',
//         },
//         {
//           id: 'y-axis-1',
//           position: 'right',
//           gridLines: {
//             color: '#FFFFFF',
//           },
//           ticks: {
//             fontColor: 'rgba(0,0,0,0)',
//           }
//         }
//       ]
//     },
//     annotation: {
//       annotations: [
//         {
//           type: 'line',
//           mode: 'vertical',
//           scaleID: 'x-axis-0',
//           value: 'March',
//           borderColor: 'orange',
//           borderWidth: 2,
//           label: {
//             enabled: true,
//             fontColor: 'orange',
//             content: 'LineAnno'
//           }
//         },
//       ],
//     },
//   };
//
//   public lineChartColors: Color[] = [
//     { //Green
//       // backgroundColor: 'rgba(0, 176, 0, 0.4)',
//       borderColor: 'rgba(0, 176, 0, 0.8)',
//       pointBackgroundColor: 'rgb(0,176,0)',
//       pointBorderColor: '#33BD0D',
//       pointHoverBackgroundColor: '#33BD0D',
//       pointHoverBorderColor: 'rgba(77,83,96,1)'
//     }
//   ];
//
//   public lineChartColors2: Color[] = [
//        { // orange
//          // backgroundColor: 'rgba(255, 155, 0, 0.8)',
//          borderColor: 'rgb(222,0,19)',
//          pointBackgroundColor: 'rgb(222,0,6)',
//          pointBorderColor: '#ff0700',
//          pointHoverBackgroundColor: '#ff0018',
//          pointHoverBorderColor: 'rgb(222,0,20)'
//        }
//      ];
//
//   public lineChartLegend = true;
//   public lineChartType = 'line';
//
//   @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
//
//   // /*constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
//   //             @Inject(MAT_DIALOG_DATA) public data: any) { }*/
//
//   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }
//
// constructor(public dialogRef: MatDialogRef<ModalI>,
//        @Inject(MAT_DIALOG_DATA) public data: any){}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
//
// //-------------------------------------GRAFICA DE PERFILES--------------------------------------------------------------
// @Component({
//   templateUrl: '../../../material-component/perfiles/perfiles.component.html'
// })
//
// export class ModalP {
//   constructor(public dialogRef2: MatDialogRef<ModalP>,
//               @Inject(MAT_DIALOG_DATA) public data: any){}
//
//   public barChartOptions: ChartOptions = {
//     responsive: true,
//
//     scales: { xAxes: [{}], yAxes: [{}] },
//     plugins: {
//       datalabels: {
//         anchor: 'end',
//         align: 'end'
//       }
//     }
//   };
//
//   public barChartColors: Color[] = [
//     {
//       backgroundColor: 'rgb(52,206,210)',
//     }
//   ];
//
//   public barChartLabels: Label[] = ['04:45', '05:30', '06:15', '07:00', '07:45', '08:30', '09:15', '10:00', '10:45', '11:30'];
//   public barChartType: ChartType = 'bar';
//   public barChartLegend = true;
//
//   public barChartData: ChartDataSets[] = [
//     { data: [65, 59, 80, 81, 56, 55, 40, 34, 67, 56], label: 'Kwh' }
//   ];
//
//   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }
//
//   onNoClick(): void {
//     this.dialogRef2.close();
//   }
// }
// //-------------------------------------GRAFICA DE PERDIDAS DE ENERGIA---------------------------------------------------
// @Component({
//   templateUrl: '../../../material-component/perdidas-energia/perdidas-energia.component.html'
// })
//
// export class ModalPE {
//   constructor(public dialogRef3: MatDialogRef<ModalPE>,
//               @Inject(MAT_DIALOG_DATA) public data: any){}
//
//   public doughnutChartLabels: Label[] = ['Área', 'Testigo', 'Perdidas'];
//   public doughnutChartData: MultiDataSet = [
//     [350, 450, 100]
//   ];
//
//   public doughnutChartData2: MultiDataSet = [
//     [134, 489, 300]
//   ];
//
//   public doughnutChartType: ChartType = 'doughnut';
//
//   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }
//
//   onNoClick(): void {
//     this.dialogRef3.close();
//   }
// }
// //-------------------------------------GRAFICA DE COMUNICACIONES--------------------------------------------------------
// @Component({
//   templateUrl: '../../../material-component/comunicaciones/comunicaciones.component.html'
// })
//
// export class ModalC {
//   public lineChartData: ChartDataSets[] = [
//     { data: [16, 17, 26, 35, 22, 11, 29, 23, 18, 33, 30, 27], label: 'Paquetes Enviados' },
//     { data: [10, 11, 20, 29, 26, 5, 23, 17, 12, 27, 24, 21], label: 'Paquetes Perdidos' }
//   ];
//
//   public lineChartLabels: Label[] = ['00:00:00', '01:00:00', '02:10:00', '04:00:00', '05:00:00', '06:00:00', '07:05:00',
//                                      '08:05:00', '09:50:00', '10:050:00', '11:50:00', '14:35:00'];
//
//   public lineChartOptions: (ChartOptions & { annotation: any }) = {
//     responsive: true,
//     scales: {
//       // We use this empty structure as a placeholder for dynamic theming.
//       xAxes: [{}],
//       yAxes: [
//         {
//           id: 'y-axis-0',
//           position: 'left',
//         },
//         {
//           id: 'y-axis-1',
//           position: 'right',
//           gridLines: {
//             color: '#212121',
//           },
//           ticks: {
//             fontColor: 'rgba(0,0,0,0)',
//           }
//         }
//       ]
//     },
//     annotation: {
//       annotations: [
//         {
//           type: 'line',
//           mode: 'vertical',
//           scaleID: 'x-axis-0',
//           value: 'March',
//           borderColor: 'orange',
//           borderWidth: 2,
//           label: {
//             enabled: true,
//             fontColor: 'orange',
//             content: 'LineAnno'
//           }
//         },
//       ],
//     },
//   };
//
//   public lineChartColors: Color[] = [
//     { //Green
//       // backgroundColor: 'rgba(0, 176, 0, 0.4)',
//       borderColor: 'rgba(0, 176, 0, 0.8)',
//       pointBackgroundColor: 'rgb(0,176,0)',
//       pointBorderColor: '#33BD0D',
//       pointHoverBackgroundColor: '#33BD0D',
//       pointHoverBorderColor: 'rgb(31,255,8)'
//     },
//     { // orange
//       // backgroundColor: 'rgba(255, 155, 0, 0.8)',
//       borderColor: 'rgb(222,0,19)',
//       pointBackgroundColor: 'rgb(222,0,6)',
//       pointBorderColor: '#ff0700',
//       pointHoverBackgroundColor: '#ff0018',
//       pointHoverBorderColor: 'rgb(222,0,20)'
//     }
//   ];
//
//   public lineChartLegend = true;
//   public lineChartType = 'line';
//
//   @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
//
//   // /*constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
//   //             @Inject(MAT_DIALOG_DATA) public data: any) { }*/
//
//   public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//     console.log(event, active);
//   }
//
//   constructor(public dialogRef: MatDialogRef<ModalI>,
//               @Inject(MAT_DIALOG_DATA) public data: any){}
//
//   onNoClick(): void {
//     this.dialogRef.close();
//   }
// }
// //-------------------------------------GRAFICA DE BALANCES DE CONSUMO---------------------------------------------------
// @Component({
//   templateUrl: '../../../material-component/balance-consumos/balance-consumos.component.html'
// })
//
// export class ModalBC {
//     constructor(public dialogRef3: MatDialogRef<ModalPE>,
//                 @Inject(MAT_DIALOG_DATA) public data: any){}
//
//     public doughnutChartLabels: Label[] = ['Balance', 'Entregada', 'Recibida'];
//     public doughnutChartData: MultiDataSet = [
//       [350, 450, 100]
//     ];
//
//     public doughnutChartData2: MultiDataSet = [
//       [134, 489, 300]
//     ];
//
//     public doughnutChartData3: MultiDataSet = [
//       [239, 239, 239]
//     ];
//
//     public doughnutChartType: ChartType = 'doughnut';
//
//     public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
//       console.log(event, active);
//     }
//
//     onNoClick(): void {
//       this.dialogRef3.close();
//     }
}
