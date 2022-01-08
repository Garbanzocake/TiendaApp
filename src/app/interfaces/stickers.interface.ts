// Sticker individual

export interface StickerOnly {
  ok:      boolean;
  sticker: Sticker;
}

export interface Sticker {
  precio:  number;
  imgs?:    string[];
  _id?:     string;
  disponible: boolean;
  nombre:  string;
  artista: string;
  usuario?: Usuario;
  img?:     string;
}

export interface StickerEnvio {
  _id?: string;
  nombre: string;
  precio: number;
  artista:string;
  disponible: boolean;



}


export interface Usuario {
  _id:    string;
  nombre: string;
}

// Sticker individual


// Todos los Stickers

export interface Stickers {
  total:    number;
  stickers: Sticker[];
}


//Stickers Respuesta ade agregar

export interface StickerAddResp {
  disponible: boolean;
  precio:     number;
  imgs:       any[];
  _id:        string;
  nombre:     string;
  artista:    string;
  usuario:    string;
}


//Respuesta de cargar imagenes del sticker

export interface StickerImgs {
  disponible: boolean;
  precio:     number;
  img:        string;
  imgs:       string[];
  _id:        string;
  nombre:     string;
  artista:    string;
  usuario:    string;
}

//Resp de borrar un sticker
export interface StickerRespDelete {
  disponible: boolean;
  precio:     number;
  img:        string;
  imgs:       any[];
  _id:        string;
  nombre:     string;
  artista:    string;
  usuario:    string;
}


