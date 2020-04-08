import { Routes } from '@angular/router';

import { ButtonsComponent } from './admin/admin.component';
import { MedidoresComponent } from './medidores/medidores.component';
import { ColectoresComponent } from './colectores/colectores.component';
import { AreasComponent } from './areas/areas.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { KavisComponent } from './kavis/kavis.component';
import { FilterComponent } from './filter/filter.component';
import { TareasPendientesComponent } from './tareas-pendientes/tareas-pendientes.component';
import { LoginComponent } from "../login/login.component";
import { AdminEditarComponent } from "./admin-editar/admin-editar.component";
import { InstantaneosComponent } from "./instantaneos/instantaneos.component";
import { PerdidasEnergiaComponent } from "./perdidas-energia/perdidas-energia.component";
import { PerfilesComponent } from "./perfiles/perfiles.component";
import { ComunicacionesComponent } from "./comunicaciones/comunicaciones.component";
import { BalanceConsumosComponent } from "./balance-consumos/balance-consumos.component";
import {AdminMedidorComponent} from "./admin-medidor/admin-medidor.component";

export const MaterialRoutes: Routes = [
  {
    path: 'admin',
    component: ButtonsComponent
  },
  {
    path: 'admin_editar',
    component: AdminEditarComponent
  },
  {
    path: 'admin_medidor',
    component: AdminMedidorComponent
  },
  {
    path: 'medidores',
    component: MedidoresComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'colectores',
    component: ColectoresComponent
  },
  {
    path: 'areas',
    component: AreasComponent
  },
  {
    path: '',
    component: ServiciosComponent
  },
  {
    path: '',
    component: KavisComponent
  },
  {
    path: '',
    component: FilterComponent
  },
  {
    path: '',
    component: TareasPendientesComponent
  },
  {
    path: '',
    component: InstantaneosComponent
  },
  {
    path: '',
    component: PerdidasEnergiaComponent
  },
  {
    path: '',
    component: PerfilesComponent
  },
  {
    path: '',
    component: ComunicacionesComponent
  },
  {
    path: '',
    component: BalanceConsumosComponent
  }
];
