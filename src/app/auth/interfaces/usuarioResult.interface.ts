export interface UsuarioResult {
  ok:     boolean;
  _id:    string;
  nombre: string;
  correo: string;
  rol:    string;
  token:  string;
  telefono:string;

}

export interface usuarioEncontrado {
  usuario: Usuario;
}

export interface Usuario {
  rol:    string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid:    string;
  telefono:string;
}

export interface UsuarioEnvio{
  nombre: string;
  password:string;
  correo: string;
  rol:    string;
  telefono: string;
}
