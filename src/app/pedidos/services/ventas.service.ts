import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import {
  Ventas,
  Venta,
  ObtenerVentaID,
  VentaEnvio,
} from '../../interfaces/venta.interface';

@Injectable({
  providedIn: 'root',
})
export class VentasService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getVentas(): Observable<Ventas> {
    return this.http.get<Ventas>(`${this.baseUrl}/ventas?limite=20`);
  }

  getVentasCompletadas():Observable<Ventas>{
    return this.http.get<Ventas>(`${this.baseUrl}/ventas/completadas`);
  }

  getVentasSinCompletar(): Observable<Ventas> {
    return this.http.get<Ventas>(`${this.baseUrl}/ventas/sinCompletar`);
  }

  getVentaPorId(id: string): Observable<ObtenerVentaID> {
    return this.http.get<ObtenerVentaID>(`${this.baseUrl}/ventas/${id}`);
  }
  agregarVenta(venta: VentaEnvio): Observable<Venta> {
    const url = `${this.baseUrl}/ventas`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );
    return this.http.post<Venta>(url, venta, { headers });
  }

  actualizarVenta(venta: VentaEnvio): Observable<Venta> {
    const url = `${this.baseUrl}/ventas/${venta._id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.put<Venta>(url, venta, { headers });
  }

  borrarVenta(id: string) {
    const url = `${this.baseUrl}/ventas/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.delete<Venta>(url, { headers });
  }
}
