import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminMedidorRoutes} from "./admin-medidor.routing";

import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";

import {AdminMedidorComponent, ModalM} from "./admin-medidor.component";
import {DemoMaterialModule} from "../demo-material-module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminMedidorRoutes),
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
AdminMedidorComponent,
    ModalM

  ],
  providers: [
    // LoginServices,
AdminMedidorComponent,
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // }
  ],
  exports: [
    AdminMedidorComponent
  ],
  entryComponents: [ModalM]
})
export class AdminMedidorModule { }
