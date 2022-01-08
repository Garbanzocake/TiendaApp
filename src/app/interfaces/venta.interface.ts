//Respuesta de ventas por usuario

export interface VentasUsuario {
  total: number;
  results: ResultVenta[];
}

export interface ResultVenta {
  estado: boolean;
  completada: boolean;
  pedidos: string[];
  direccion: string;
  detalleDireccion:string;
  total: number;
  subtotal: number;
  envio:number;
  _id: string;
  usuario: Usuario;
  fecha: Date;
}

export interface Usuario {
  _id: string;
  correo: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  rol: string;
  telefono: string;
  direccion?: string;
}
//Respuesta de ventas por usuario

//Resultado de ventas todas
export interface Ventas {
  total: number;
  ventas: Venta[];
}

export interface Venta {
  _id: string;
  completada: boolean;
  direccion: string;
  detalleDireccion:string;
  estado: boolean;
  fecha: Date;
  fechaEntrega?: Date;
  pedidos: string[];
  total: number;
  subtotal: number;
  envio:number;
  usuario?: Usuario;
}
export interface ObtenerVentaID {
  venta: Venta;
}

export interface VentaEnvio{
  _id?:string;
  completada: boolean;
  nombreComprador:string;
  direccion?: string;
  detalleDireccion?:string;
  estado: boolean;
  fecha?: Date;
  pedidos: string[];
  total: number;
  subtotal: number;
  envio:number;
  fechaEntrega?:Date;

}

//Resultado de ventas todas
