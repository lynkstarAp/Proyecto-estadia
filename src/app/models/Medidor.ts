export interface Medidor {
  id_medidor: number;
  num_serie: number;
  mac: string;
  fch_registro: string;
  estado: string;
  estado_relevador: number;
  fch_medidor: string;
  latitud: number;
  longitud: number;
  url: '../../../assets/images/users/mcr_min.png';
  neteo: number;
  draggable: true;
  label: '';
  estatus: number;
}

export interface MedidorInstantaneo {
  valores: string;
  corriente: number;
  energia_reactiva: number;
  energia_activa: number;
  energia_aparente: number;
  voltaje: number;
  corriente_face_uno: number;
  corriente_face_dos: number;
  id_medidor: number;
  fecha_hora: string;
  medidor_valor: {
    id_medidor: number;
    num_serie: number;
    mac: string;
    fch_registro: string;
    estado: string;
    estado_relevador: number;
    fch_medidor: string;
    latitud: number;
    longitud: number;
    url: '../../../assets/images/users/mcr_min.png';
    draggable: true;
    label: '';
    estatus: number;
  };
}

export interface MedidorConsumos {
  num_serie: number;
  mac: string;
  estado_relevador: number;
  energia_necta_actual: number;
}


export interface MedidorUsu {
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
