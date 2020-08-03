import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AreaDetalleRoutes} from "./areas-detalles.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";
import {AreasDetallesComponent} from "./areas-detalles.component";
import {DemoMaterialModule} from "../demo-material-module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AreaDetalleRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DragDropModule,
    ChartsModule,
    NgxPaginationModule,
  ],
  declarations: [
AreasDetallesComponent

  ],
  providers: [
AreasDetallesComponent,
  ],
  exports: [
    AreasDetallesComponent

  ]
})
export class AreasDetallesModule { }
