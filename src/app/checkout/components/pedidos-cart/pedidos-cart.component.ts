import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PedidosService } from '../../../pedidos/services/pedidos.service';
import { Pedido } from '../../../interfaces/pedidos.interface';
import { Venta, VentaEnvio } from '../../../interfaces/venta.interface';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-pedidos-cart',
  templateUrl: './pedidos-cart.component.html',
  styleUrls: ['./pedidos-cart.component.css'],
})
export class PedidosCartComponent implements OnInit {
  @Input() pedidosCarrito!: string[];

  // Carrito para enviar al menu y actualizar
  @Output() onNuevoCarrito: EventEmitter<string[]> = new EventEmitter<
    string[]
  >();
  // Carrito para enviar al menu y actualizar

  pedidos: Pedido[] = [];
  // subtotalPedidos: number = 0;

  tarifaEnvio: number = 10000;

  venta: VentaEnvio = {
    completada: false,
    estado: true,
    fecha: new Date(),
    pedidos: [],
    total: 0,
    subtotal: 0,
    envio: 0,
    nombreComprador:this.usuario.nombre!
  };

  get usuario() {
    return this.authService.usuario;
  }

  constructor(
    private pedidosService: PedidosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.pedidosCarrito) {
      console.log(this.pedidosCarrito, 'llegue');
      this.llenarPedidosCarritoInicial(this.pedidosCarrito);
    }
  }

  agregarSubtotal(subtotalPedido: number) {
    this.venta.subtotal += subtotalPedido;
    // console.log(this.subtotalPedidos, 'calcular');
  }

  llenarPedidosCarritoInicial(pedidosCarrito: string[]) {
    this.pedidos = [];
    this.venta.pedidos = pedidosCarrito;

    for (let i = 0; i < pedidosCarrito.length; i++) {
      const idPedido = pedidosCarrito[i];

      this.pedidosService.getPedidoPorId(idPedido).subscribe(({ pedido }) => {
        this.pedidos.push(pedido);
        this.agregarSubtotal(pedido.subtotal);
      });
    }

    // console.log(this.pedidos, 'Respuesta de pedidos encontrados y metidos OwO');
  }

  llenarPedidosCarrito(pedidosCarrito: string[]) {
    this.pedidos = [];
    this.venta.pedidos = pedidosCarrito;
    // this.venta.pedidos = [];

    for (let i = 0; i < pedidosCarrito.length; i++) {
      const idPedido = pedidosCarrito[i];

      this.pedidosService.getPedidoPorId(idPedido).subscribe(({ pedido }) => {
        this.pedidos.push(pedido);
      });
    }

    // console.log(this.pedidos, 'Respuesta de pedidos encontrados y metidos OwO');
  }

  borrarPedidoCarrito(idPedido: string) {
    // Borrar el pedido de la bd
    this.eliminarPedido(idPedido);
    // Borrar el pedido de la bd

    // Acomodar el localstorage quitanto el pedido
    let carritoOld = localStorage.getItem('carritoBlitz');
    let words: string[] = JSON.parse(carritoOld!);
    let carritoFiltro = words.filter((word) => word != idPedido);

    // establecer el nuevo carrito filtrado
    this.venta.pedidos = carritoFiltro;
    this.llenarPedidosCarrito(carritoFiltro);
    // establecer el nuevo carrito filtrado

    // Emitir el nuevo carrito al menu
    this.onNuevoCarrito.emit(carritoFiltro);
    // Emitir el nuevo carrito al menu

    let carritoNew = JSON.stringify(carritoFiltro);
    localStorage.setItem('carritoBlitz', carritoNew);
    // Acomodar el localstorage quitanto el pedido
  }

  eliminarPedido(idPedido: string) {
    this.pedidosService.borrarPedido(idPedido).subscribe((resp) => {
      resp._id;
      // console.log(`Pedido ${resp._id}, Borrado OwO! `);
      this.venta.subtotal -= resp.subtotal;
    });
  }

  prepararCompra() {
    // console.log('id pedidos', this.pedidosCarrito);
    if (this.venta.subtotal > 50000) {
      this.tarifaEnvio = 0;
      this.venta.envio = 0;
    } else {
      this.venta.envio = this.tarifaEnvio;
    }

    const { estado, pedidos, subtotal, envio, fecha, total, completada } =
      this.venta;

    const ventaEnv: VentaEnvio = {
      estado,
      pedidos,
      total: total + subtotal + envio,
      fecha,
      subtotal,
      envio,
      completada,
      nombreComprador:this.usuario.nombre!
    };
    console.log(ventaEnv, 'venta preparada para lanzamiento! OwO');

    // establecer la venta en local para que el shipping la termine luego
    let json = JSON.stringify(ventaEnv);
    localStorage.setItem('ventaPreparada', json);
    // establecer la venta en local para que el shipping la termine luego

    // this.pedidosService.agregarVenta(ventaEnv).subscribe((venta) => {
    //   console.log('venta creada', venta);
    // });
  }
}
