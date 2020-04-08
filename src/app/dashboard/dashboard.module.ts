import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardComponent, Modal } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { ChartistModule } from 'ng-chartist';
import {AgmCoreModule} from '@agm/core';
import {FormsModule} from "@angular/forms";
import {AppComponent} from "../app.component";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";

@NgModule({
  imports: [
    CommonModule,
    DemoMaterialModule,
    FlexLayoutModule,
    ChartistModule,
    RouterModule.forChild(DashboardRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBDs9kcQ4s2JKfBCyZSgO9Q4CpJaGu4y2M'}),
    FormsModule,
    DragDropModule,
    ChartsModule
  ],
  declarations: [
    DashboardComponent,
    Modal
  ],
  entryComponents: [Modal]

})
export class DashboardModule {}

