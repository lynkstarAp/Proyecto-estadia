import { Injectable } from '@angular/core';
import {Medidor} from '../other/variables';

@Injectable({
  providedIn: 'root'
})
export class MedidorServiceService {

  constructor() { }

  meter: Medidor;
}
