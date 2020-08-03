import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {MedidorRoutes} from "./medidores.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";
import {MedidoresComponent} from "./medidores.component";
import {DemoMaterialModule} from "../demo-material-module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MedidorRoutes),
    DemoMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
    DragDropModule,
    ChartsModule,
    NgxPaginationModule,
    // MaterialComponentsModule
  ],
  declarations: [
MedidoresComponent

  ],
  providers: [
    // LoginServices,
MedidoresComponent,
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // }
  ],
  exports: [
    MedidoresComponent

  ]
})
export class MedidoresModule { }
