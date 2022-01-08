import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';

import {
  Pedidos,
  PedidoEnvio,
  Pedido,
} from '../../interfaces/pedidos.interface';

import { PedidoPorID } from '../../interfaces/pedidos.interface';

@Injectable({
  providedIn: 'root',
})
export class PedidosService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getPedidos(): Observable<Pedidos> {
    return this.http.get<Pedidos>(`${this.baseUrl}/pedidos?limite=20`);
  }

  getPedidosSinDespachar(): Observable<Pedidos> {
    return this.http.get<Pedidos>(`${this.baseUrl}/pedidos/sinDespachar`);
  }

  agregarPedido(pedido: PedidoEnvio): Observable<Pedido> {
    const url = `${this.baseUrl}/pedidos`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.post<Pedido>(url, pedido, { headers });
  }

  getPedidoPorId(id: string): Observable<PedidoPorID> {
    return this.http.get<PedidoPorID>(`${this.baseUrl}/pedidos/${id}`);
  }

  getPedidosPorUsuario(correo: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.baseUrl}/buscar/pedidosUsuarios/${correo}`
    );
  }

  getPedidosPorUsuarioSinDespachar(correo: string): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(
      `${this.baseUrl}/buscar/pedidosUsuariosSinDespacho/${correo}`
    );
  }

  actualizarPedido(pedido: PedidoEnvio) {
    const url = `${this.baseUrl}/pedidos/${pedido._id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.put<Pedido>(url, pedido, { headers });
  }

  borrarPedido(id: string) {
    const url = `${this.baseUrl}/pedidos/${id}`;

    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('x-token') || ''
    );

    return this.http.delete<Pedido>(url, { headers });
  }
}
