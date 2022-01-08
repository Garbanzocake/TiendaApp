// RESPUESTA DE PRODUCTO SOLO POR ID
export interface ProductoID {
  producto: Producto;
}


export interface Producto {
  precio: number;
  disponible: boolean;
  imgs?: string[];
  _id?: string;
  nombre: string;
  usuario?: UsuarioShort;
  etiquetas?: string[];
  tallas?: string[];
  categoria: CategoriaShort;
  descripcion?: string;
  img?: string;
  estado: boolean;
  genero: string;
  unidades:number;

}
export interface CategoriaShort {
  _id: string;
  nombre: string;
}
export interface UsuarioShort {
  _id?: string;
  nombre?: string;
  correo?: string;
}
export interface ProductoEnvio {
  _id?: string;
  nombre?: string;
  precio?: number;
  unidades?:number;
  genero?:string;
  disponible?: boolean;
  categoria?: string;
  descripcion?: string;
  etiquetas?: string[];
  tallas?:string[]

}

// RESPUESTA DE PRODUCTO POR ID

//--------- RESPUESTA DE AGREGAR UN PRODUCTO-------------
export interface ProductoAddResp {
  precio: number;
  disponible: boolean;
  imgs?: string[];
  _id?: string;
  nombre: string;
  usuario: string;
  categoria: string;
  descripcion: string;
  img?: string;
}

//--------- RESPUESTA DE AGREGAR UN PRODUCTO-------------

//----- RESPUESTA DE CARGAR IMAGEN  A PRODUCTO----
export interface ProductoImg {
  precio: number;
  disponible: boolean;
  _id: string;
  nombre: string;
  usuario: string;
  categoria: string;
  img: string;
}

export interface ProductoImgs {
  precio: number;
  disponible: boolean;
  imgs: any[];
  _id: string;
  nombre: string;
  usuario: string;
  categoria: string;
  descripcion: string;
  img: string;
}
//----- RESPUESTA DE CARGAR IMAGEN  A PRODUCTO----


// Respuesta de traer varios productos

export interface Productos {
  total:     number;
  productos: Producto[];
}


// Respuesta de traer varios productos
