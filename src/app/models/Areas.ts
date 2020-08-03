
export interface Areas {
  id_area: number;
  nombre: string;
  descripcion: string;
  latitud: number;
  longitud: number;
  medidores: { total: number }
}

export interface AreaDetail {
  id_medidor: number;
  consumos: {
    energia_entregada_actual: number;
    energia_recibida_actual: number;
    energia_necta_actual: number;
    energia_entregada_anterior: number;
    energia_recibida_anterior: number;
    energia_necta_anterior: number;
    energia_entregada_total: number;
    energia_recibida_total: number;
    energia_necta_total: number;
    cuadrante_uno: number;
    cuadrante_dos: number;
    cuadrante_tres: number;
    cuadrante_cuatro: number;
    demanda_maxima: number;
    fecha_hora: string;
  };
  area_medidor_a: {
    nombre: string;
    descripcion: string;
    latitud: number;
    longitud: number;
  },
  area_medidor_m: {
    id_medidor: number;
    num_serie: string;
    mac: string;
    fch_registro: string;
    estado: string;
    estado_relevador: number;
    fch_medidor: string;
    latitud: number;
    longitud: number;
    estatus: number;
    tipo_medidor: {
      tipo: string;
      estatus: number;
    }
  }
}
