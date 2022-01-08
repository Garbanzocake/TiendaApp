export interface Pedidos {
  total: number;
  pedidos: Pedido[];
}

export interface Pedido {
  _id?: string;
  despachado: boolean;
  estado: boolean;
  instrucciones: string[];
  producto?: Producto;
  stickers: string[];
  subtotal: number;
  talla: string;
  unidades: number;
  usuario?: UsuarioShort;
}

export interface PedidoEnvio {
  _id?: string;
  stickers?: string[];
  subtotal: number;
  instrucciones?: string[];
  producto: string;
  talla: string;
  unidades: number;
  despachado: boolean;

}

export interface PedidoPorID {
  pedido: Pedido;
}

export interface Producto {
  estado: boolean;
  precio: number;
  disponible: boolean;
  img: string;
  imgs: any[];
  etiquetas: string[];
  tallas: string[];
  genero: string;
  _id: string;
  nombre: string;
  usuario: UsuarioShort;
  categoria: CategoriaShort;
  descripcion: string;
  unidades: number;
}

export interface CategoriaShort {
  _id: string;
  nombre: string;
}
export interface UsuarioShort {
  _id?: string;
  nombre?: string;
  correo:string;
}
