import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';



import { Productos } from '../../interfaces/producto.interface';
import { Categorias, Categoria } from '../../interfaces/categorias.interface';
import {
  Producto,
  ProductoAddResp,
  CategoriaShort,
} from '../../interfaces/producto.interface';
import {
  ResultadoProductos,
  ProductoRespDelete,
} from '../../interfaces/resultados.interface';
import {
  ProductoID,
  ProductoEnvio,
  ProductoImgs,
} from '../../interfaces/producto.interface';
@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl: string = environment.baseUrl;

  private _producto!: Producto;
  private _categoria!: CategoriaShort;

  get producto() {
    return { ...this._producto };
  }

  get categoria() {
    return { ...this._categoria };
  }

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Productos> {
    return this.http.get<Productos>(`${this.baseUrl}/productos?limite=20`);
  }

  getProductoPorId(id: string): Observable<ProductoID> {
    return this.http.get<ProductoID>(`${this.baseUrl}/productos/${id}`).pipe(
      tap((resp) => {
        resp.producto;
      })
    );
  }

  getProductosPortermino(termino: string): Observable<ResultadoProductos> {
    return this.http.get<ResultadoProductos>(
      `${this.baseUrl}/buscar/productos/${termino}`
    );
  }

  getProductosPorCategoria(termino: string): Observable<ResultadoProductos> {
    return this.http.get<ResultadoProductos>(
      `${this.baseUrl}/buscar/productosCategorias/${termino}`
    );
  }

  getCategorias(): Observable<Categoria[]> {
    return this.http
      .get<Categorias>(`${this.baseUrl}/categorias`)
      .pipe(map((resp) => resp.categorias));
  }

  agregarProducto(producto: ProductoEnvio): Observable<ProductoAddResp> {
    const url = `${this.baseUrl}/productos`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.post<ProductoAddResp>(url, producto, { headers });
  }

  actualizarProducto(producto: ProductoEnvio) {
    const url = `${this.baseUrl}/productos/${producto._id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.put<ProductoAddResp>(url, producto, { headers });
  }

  cargarImgProducto(id: string, archivo: File) {
    // {{url}}/api/uploads/productos/608919df0664f516905707c8
    let formData: FormData = new FormData();
    formData.append('archivo', archivo);

    const url = `${this.baseUrl}/uploads/productos/${id}`;

    console.log('respuesta de servicio archivo', archivo);
    return this.http.put(url, formData);
  }

  cargarImagenesProducto(id: string, archivo: File) {
    let formData: FormData = new FormData();
    formData.append('archivo', archivo);

    const url = `${this.baseUrl}/uploads/productos/${id}/imgs`;
    console.log('respuesta de servicio archivo', archivo);
    return this.http.put(url, formData);
  }

  limpiarImagenesProducto(id: string) {
    const url = `${this.baseUrl}/uploads/productos/${id}/imgs`;

    return this.http.delete<ProductoImgs>(url);
  }

  borrarProducto(id: string) {
    const url = `${this.baseUrl}/productos/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.delete<ProductoRespDelete>(url, { headers });
  }
}
