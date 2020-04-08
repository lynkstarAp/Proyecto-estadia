import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'inicio', name: 'Inicio', type: 'link', icon: 'home' },
  { state: 'admin', type: 'link', name: 'ADMIN', icon: 'person' },
  { state: 'medidores', type: 'link', name: 'Medidores', icon: 'settings_input_svideo' },
  { state: 'colectores', type: 'link', name: 'Colectores', icon: 'router' },
  { state: 'areas', type: 'link', name: 'Áreas', icon: 'view_headline' },
  { state: 'servicios', type: 'link', name: 'Servicios', icon: 'tab' },
  { state: 'kavis', type: 'link', name: 'KAVIS', icon: 'web' },
  { state: 'filter', type: 'link', name: 'FILTER', icon: 'filter_list' },
  { state: 'tareas_pendientes', type: 'link', name: 'TAREAS PENDIENTES', icon: 'add_circle' }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
