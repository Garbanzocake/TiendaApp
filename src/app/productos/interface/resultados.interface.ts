export interface Producto {
  results: Result[];
}

export interface Result {
  precio:     number;
  disponible: boolean;
  _id:        string;
  nombre:     string;
  usuario:    string;
  categoria:  Categoria;
  img:        string;
}

export interface Categoria {
  _id:    string;
  nombre: string;
}
