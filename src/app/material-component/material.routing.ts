import { Routes } from '@angular/router';

import { ServiciosComponent } from './servicios/servicios.component';
import { KavisComponent } from './kavis/kavis.component';
import { FilterComponent } from './filter/filter.component';
import { TareasPendientesComponent } from './tareas-pendientes/tareas-pendientes.component';
import { LoginComponent } from "./login/login.component";

export const MaterialRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
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
  }
];
