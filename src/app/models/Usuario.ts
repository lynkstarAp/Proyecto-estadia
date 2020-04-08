export interface Usuarios {
  id: number;
  usuario: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  estatus: number;
  tipo_usuario: {
    tipo_usu: string;
  }
}


export interface UsuarioRe {
  usuario: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  contraseña: string;
  tipo_usuario: number;
  token: string;
}
