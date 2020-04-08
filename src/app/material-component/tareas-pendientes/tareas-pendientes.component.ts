import {Component, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {timer} from 'rxjs';

import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
// import * as pluginAnnotations from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-dialog-overview-example-dialog',
  template: `./tareas-pendientes-overview-example.html`
})

export class TareasPendientesComponent {

}

