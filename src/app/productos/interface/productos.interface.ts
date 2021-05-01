export interface Producto {
  total:     number;
  productos: ProductoElement[];
}

export interface ProductoElement {
  precio:     number;
  disponible: boolean;
  _id:        string;
  nombre:     string;
  usuario:    Categoria;
  categoria:  Categoria;
  img?:       string;
}

export interface Categoria {
  _id:    string;
  nombre: string;
}
