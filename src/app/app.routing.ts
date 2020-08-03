import {Routes} from '@angular/router';
import { FullComponent } from './layouts/full/full.component';

export const AppRoutes: Routes = [


  {
    path: '',
    component: FullComponent,

    children: [
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
      {
        path: 'admin_editar',
        loadChildren: () => import('./admin-editar/admin-editar.module').then(m => m.AdminEditarModule)
      },
      {
        path: 'admin_medidor',
        loadChildren: () => import('./admin-medidor/admin-medidor.module').then(m => m.AdminMedidorModule)
      },
      {
        path: 'medidores',
        loadChildren: () => import('./medidores/medidores.module').then(m => m.MedidoresModule)
      },
      {
        path: 'colectores',
        loadChildren: () => import('./colectores/colectores.module').then(m => m.ColectoresModule)
      },
      {
        path: 'areas',
        loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule)
      },
      {
        path: 'areas_detalle',
        loadChildren: () => import('./areas-detalles/areas-detalles.module').then(m => m.AreasDetallesModule)
      }
    ]
  }

];

