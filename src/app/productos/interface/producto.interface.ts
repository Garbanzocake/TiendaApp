export interface Producto {
  producto: ProductoClass;
}

export interface ProductoClass {
  precio:     number;
  disponible: boolean;
  _id:        string;
  nombre:     string;
  usuario:    Categoria;
  categoria:  Categoria;
  img:        string;
}

export interface Categoria {
  _id:    string;
  nombre: string;
}
