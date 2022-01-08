


export interface AuthResponse {
  msg:     string;
  usuario?: Usuario;
  token?:   string;
}

export interface Usuario {
  rol?:    string;
  estado?: boolean;
  google?: boolean;
  nombre?: string;
  correo?: string;
  uid?:    string;
  telefono?:string;
}

export interface UsuarioCustom {
  nombre: string;
  uid: string;
  correo:string;
  telefono:string;
}



export interface TiempoTokenResp {
  ok:  boolean;
  msg: string;
}

