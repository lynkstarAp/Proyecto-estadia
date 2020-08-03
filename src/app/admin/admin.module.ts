import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AdminRoutes} from "./admin.routing";
import {ButtonsComponent} from "./admin.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";
import {DemoMaterialModule} from "../../demo-material-module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
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
ButtonsComponent

  ],
  providers: [
    // LoginServices,
ButtonsComponent,
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // }
  ],
  exports: [
    ButtonsComponent

  ]
})
export class AdminModule { }
