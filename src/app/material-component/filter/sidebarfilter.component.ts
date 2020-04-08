import {
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  ViewChild,
  HostListener,
  Directive,
  AfterViewInit,
  Inject
} from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
//import { MenuItems } from '../../../shared/menu-items/menu-items';
import { MenuItems } from '../../shared/menu-items/menu-items';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {ChartDataSets, ChartOptions, ChartType} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'app-sidebarexpansion',
  templateUrl: './sidebarfilter.component.html',
  styleUrls: []
})
export class AppSidebarExpansionComponent implements OnDestroy {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
    public dialog: MatDialog
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  openDialog(filter): void {
      const dialogRef = this.dialog.open(ModalExpansion, {
        width: '35%',
        height: '50%',
        disableClose: false,
        hasBackdrop: false,
        position: { 'top': '60px' , 'left': '850px' },
        panelClass: 'my-dialog'
      } );

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });
    }
}

//const temp = '';

@Component({

  templateUrl: './filter.component.html'
})

export class ModalExpansion {

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };

  public barChartColors: Color[] = [
    { // orange
      backgroundColor: 'rgba(63, 160, 255, 1)',
      borderColor: 'rgba(222, 121, 0, 1)',
    },
    { //Green
      backgroundColor: 'rgba(255, 0, 0, 1)',
      borderColor: 'rgba(0, 176, 0, 0.8)',
    }
  ];

  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public randomize(): void {
    // Only Change 3 values
    const data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
    this.barChartData[0].data = data;
  }

  panelOpenState = false;
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}
