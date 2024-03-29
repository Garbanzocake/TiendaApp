export interface Categorias {
  total:      number;
  categorias: Categoria[];
}

export interface Categoria {
  _id:     string;
  nombre:  string;
  usuario: Usuario;
}

export interface Usuario {
  _id:    string;
  nombre: string;
}
