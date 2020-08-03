import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { ServiciosComponent } from './servicios/servicios.component';
import { KavisComponent } from './kavis/kavis.component';
import { FilterComponent } from './filter/filter.component';
import {TareasPendientesComponent} from './tareas-pendientes/tareas-pendientes.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartsModule} from 'ng2-charts';
import { AgmCoreModule } from "@agm/core";
import { LoginComponent } from './login/login.component';
import { GraficasComponent } from './graficas/graficas.component';
import {NgxPaginationModule} from "ngx-pagination";
import { AreasDetallesComponent } from '../areas-detalles/areas-detalles.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MaterialRoutes),
        AgmCoreModule.forRoot({apiKey: 'AIzaSyBDs9kcQ4s2JKfBCyZSgO9Q4CpJaGu4y2M'}),
        DemoMaterialModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        CdkTableModule,
        DragDropModule,
        ChartsModule,
        NgxPaginationModule
    ],
  providers: [],
  declarations: [
    ServiciosComponent,
    KavisComponent,
    FilterComponent,
    TareasPendientesComponent,
    LoginComponent,
    GraficasComponent
  ],
  entryComponents: [LoginComponent]
})
export class MaterialComponentsModule {}
