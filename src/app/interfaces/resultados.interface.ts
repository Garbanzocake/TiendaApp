export interface ResultadoProductos {
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

// Respuesta de borrar producto
export interface ProductoRespDelete {
  precio:      number;
  disponible:  boolean;
  _id:         string;
  nombre:      string;
  usuario:     string;
  categoria:   string;
  descripcion: string;
}


//Respuesta de buscar sticker

export interface ResultadoStickers {
  results: Result[];
}

export interface Result {
  disponible: boolean;
  precio:     number;
  imgs:       any[];
  _id:        string;
  nombre:     string;
  artista:    string;
  usuario:    string;
}

//Respuesta de buscar sticker
