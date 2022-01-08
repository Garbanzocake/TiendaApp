import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';

import { Sticker,StickerOnly,StickerAddResp ,Stickers,StickerEnvio, StickerImgs, StickerRespDelete } from '../../interfaces/stickers.interface';

import { ResultadoStickers } from '../../interfaces/resultados.interface';
@Injectable({
  providedIn: 'root',
})
export class StickersService {
  private baseUrl: string = environment.baseUrl;

  private _sticker!: Sticker;

  get sticker() {
    return { ...this._sticker };
  }



  constructor(private http: HttpClient) {}

  getStickers(): Observable<Stickers> {
    return this.http.get<Stickers>(`${this.baseUrl}/stickers?limite=20`);
  }

  getStickerPorId(id: string): Observable<StickerOnly> {
    return this.http.get<StickerOnly>(`${this.baseUrl}/stickers/${id}`).pipe(
      tap((resp) => {
        resp.sticker;
      })
    );
  }

  getStickersPortermino(termino: string): Observable<ResultadoStickers> {
    return this.http.get<ResultadoStickers>(
      `${this.baseUrl}/buscar/stickers/${termino}`
    );
  }


  agregarSticker(sticker: StickerEnvio): Observable<StickerAddResp> {
    const url = `${this.baseUrl}/stickers`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.post<StickerAddResp>(url, sticker, { headers });
  }

  actualizarSticker(sticker: StickerEnvio) {
    const url = `${this.baseUrl}/stickers/${sticker._id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.put<StickerAddResp>(url, sticker, { headers });
  }

  cargarImgSticker(id: string, archivo: File) {
    // {{url}}/api/uploads/productos/608919df0664f516905707c8
    let formData: FormData = new FormData();
    formData.append('archivo', archivo);

    const url = `${this.baseUrl}/uploads/stickers/${id}`;

    console.log('respuesta de servicio archivo', archivo);
    return this.http.put(url, formData);
  }

  cargarImagenesSticker(id: string, archivo: File) {
    let formData: FormData = new FormData();
    formData.append('archivo', archivo);

    const url = `${this.baseUrl}/uploads/stickers/${id}/imgs`;
    console.log('respuesta de servicio archivo', archivo);
    return this.http.put(url, formData);
  }

  limpiarImagenesSticker(id: string) {
    const url = `${this.baseUrl}/uploads/stickers/${id}/imgs`;

    return this.http.delete<StickerImgs>(url);
  }

  borrarSticker(id: string) {
    const url = `${this.baseUrl}/stickers/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.delete<StickerRespDelete>(url, { headers });
  }
}
