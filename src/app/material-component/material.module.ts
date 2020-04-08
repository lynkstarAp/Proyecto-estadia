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
import { ButtonsComponent } from './admin/admin.component';
import { MedidoresComponent } from './medidores/medidores.component';
import { ColectoresComponent } from './colectores/colectores.component';
import { AreasComponent } from './areas/areas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { KavisComponent } from './kavis/kavis.component';
import { FilterComponent } from './filter/filter.component';


import {
  TareasPendientesComponent,
} from './tareas-pendientes/tareas-pendientes.component';

import {DragDropModule} from '@angular/cdk/drag-drop';
import {ChartsModule} from 'ng2-charts';
import { AgmCoreModule } from "@agm/core";
import { LoginComponent } from '../login/login.component';
import { AdminEditarComponent } from './admin-editar/admin-editar.component';
import { InstantaneosComponent } from './instantaneos/instantaneos.component';
import { PerdidasEnergiaComponent } from './perdidas-energia/perdidas-energia.component';
import { PerfilesComponent } from './perfiles/perfiles.component';
import { ComunicacionesComponent } from './comunicaciones/comunicaciones.component';
import { BalanceConsumosComponent } from './balance-consumos/balance-consumos.component';
import { GraficasComponent } from './graficas/graficas.component';
import {NgxPaginationModule} from "ngx-pagination";
import { AdminMedidorComponent, ModalM } from './admin-medidor/admin-medidor.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(MaterialRoutes),
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
    ButtonsComponent,
    MedidoresComponent,
    ColectoresComponent,
    AreasComponent,
    ServiciosComponent,
    KavisComponent,
    FilterComponent,
    TareasPendientesComponent,
    LoginComponent,
    AdminEditarComponent,
    InstantaneosComponent,
    PerdidasEnergiaComponent,
    PerfilesComponent,
    ComunicacionesComponent,
    BalanceConsumosComponent,
    GraficasComponent,
    AdminMedidorComponent,
    ModalM
  ],
  entryComponents: [ModalM]
})
export class MaterialComponentsModule {}
