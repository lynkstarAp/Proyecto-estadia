
export interface Colectores {
  id_concentrador: number;
  tipo_concentrador: string;
  nombre: string;
  mac: string;
  latitud: number;
  longitud:number;
  estatus: number;
  url: '../../../assets/images/users/protcomm_i_max.png'
}

export interface ColectorInstantaneo {
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
}

export interface ColectorConsumos {
  id_concentrador: number;
  nombre: string;
  mac: string;
  estado_relevador: number;
  energia_necteo: number;
}
