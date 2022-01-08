export interface UsuarioRegist {
  ok:      boolean;
  msg:     string;
  usuario: Usuario;
  token:   string;
}

export interface Usuario {
  rol:    string;
  estado: boolean;
  google: boolean;
  telefono:string;
  nombre: string;
  correo: string;
  uid:    string;
}
