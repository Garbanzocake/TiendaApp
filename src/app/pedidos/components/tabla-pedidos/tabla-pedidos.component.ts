import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import Swal from 'sweetalert2'

import { Pedido } from '../../../interfaces/pedidos.interface';
import { PedidosService } from '../../services/pedidos.service';

import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-tabla-pedidos',
  templateUrl: './tabla-pedidos.component.html',
  styleUrls: ['./tabla-pedidos.component.css'],
})
export class TablaPedidosComponent implements OnInit {
  @Input() pedidosInput?: Pedido[];
  @Input() Usuario?: string;
  @Input() pedidosCarrito?: string[];
  @Input() idVenta?: string;

  @Output() onIdPedidoDelete: EventEmitter<string>= new EventEmitter<string>();

  pedidos: Pedido[] = [];

  pedido: Pedido = {
    _id: '',
    unidades: 0,
    stickers: [],
    subtotal: 0,
    instrucciones: [],
    estado: true,
    despachado: false,
    talla: '',
  };

  constructor(
    private pedidosService: PedidosService,
    private ventasService: VentasService
  ) {}

  ngOnInit(): void {
    if (this.pedidosInput) {
      this.pedidos = this.pedidosInput;
    } else if (this.idVenta) {
      this.obtenerPedidosPorIdVenta(this.idVenta);
    } else if (this.Usuario) {
      this.obtenerPedidosUsuario(this.Usuario);
    } else {
      this.obtenerPedidosAll();
    }
  }

  obtenerPedidosUsuario(pedidoUsuario: string) {
    this.pedidosService
      .getPedidosPorUsuarioSinDespachar(pedidoUsuario)
      .subscribe((pedidos) => {
        this.pedidos = pedidos;
        console.log(this.pedidos);
      });
  }

  obtenerPedidosPorIdVenta(idVenta: string) {
    this.ventasService.getVentaPorId(idVenta).subscribe(({ venta }) => {
      // console.log(venta, 'respuesta de getventaporid');
      for (let i = 0; i < venta.pedidos.length; i++) {
        const element = venta.pedidos[i];

        // Agregando el pedido encontrado a pedidos
        this.pedidosService.getPedidoPorId(element).subscribe(({ pedido }) => {
          this.pedidos.push(pedido);
        });
      }
    });
  }

  obtenerPedidosAll() {
    this.pedidosService.getPedidos().subscribe(({ pedidos }) => {
      this.pedidos = pedidos;
      console.log(this.pedidos);
    });
  }

  llenarPedidosCarrito(pedidosCarrito: string[]) {
    for (let i = 0; i < pedidosCarrito.length; i++) {
      const idPedido = pedidosCarrito[i];

      this.pedidosService.getPedidoPorId(idPedido).subscribe(({ pedido }) => {
        this.pedidos.push(pedido);
      });
    }

    console.log(this.pedidos, 'Respuesta de pedidos encontrados y metidos OwO');
  }

  eliminarPedido(idPedido: string) {
    // console.log(idPedido, ' pedido a eliminar!');


    Swal.fire({
      title: 'Esta Seguro?',
      text: `Esto eliminara completamente el pedido ${idPedido} de la venta!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si, Borralo B) !'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onIdPedidoDelete.emit(idPedido);
        // Swal.fire(
        //   'Eliminado!',
        //   'El pedido ha sido eliminado',
        //   'success'
        // )
      }
    })



  }
}
