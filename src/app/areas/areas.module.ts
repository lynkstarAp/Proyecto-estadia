import { NgModule } from '@angular/core';
import {CommonModule, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {RouterModule} from "@angular/router";
import {AreaRoutes} from "./areas.routing";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CdkTableModule} from "@angular/cdk/table";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChartsModule} from "ng2-charts";
import {NgxPaginationModule} from "ngx-pagination";
import {AreasComponent} from "./areas.component";
import {AgmCoreModule} from "@agm/core";
import {DemoMaterialModule} from "../../demo-material-module";


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AreaRoutes),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBDs9kcQ4s2JKfBCyZSgO9Q4CpJaGu4y2M'}),
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
AreasComponent

  ],
  providers: [
    // LoginServices,
AreasComponent,
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // }
  ],
  exports: [
    AreasComponent

  ]
})
export class AreasModule { }
