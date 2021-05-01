import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Producto as Productos,

} from '../interface/productos.interface';
import { Observable } from 'rxjs';
import { Producto as Categorias } from '../interface/categorias.interface';
import { Producto as Producto } from '../interface/producto.interface';
import { environment } from '../../../environments/environment';
import { Producto as Resultados } from '../interface/resultados.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getProductos(): Observable<Productos> {
    return this.http.get<Productos>(`${this.baseUrl}/api/productos?limite=20`);
  }

  getProductoPorId(id: string): Observable<Producto> {
    return this.http.get<Producto>(`${this.baseUrl}/api/productos/${id}`);
  }

  getProductosPortermino(termino: string): Observable<Resultados> {
    return this.http.get<Resultados>(
      `${this.baseUrl}/api/buscar/productos/${termino}`
    );
  }

  getImagenProducto() {}

  getCategorias(): Observable<Categorias> {
    return this.http.get<Categorias>(`${this.baseUrl}/api/categorias`);
  }
}
