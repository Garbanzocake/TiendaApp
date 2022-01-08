import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { VentasService } from '../../../pedidos/services/ventas.service';
import { PedidosService } from '../../../pedidos/services/pedidos.service';
import { Venta } from '../../../interfaces/venta.interface';
import { Pedido } from '../../../interfaces/pedidos.interface';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.css']
})
export class PurchaseDetailsComponent implements OnInit {

  // Pedidos de la venta
  pedidosCarrito!: string[];
  // venta:Venta = {};
  venta: Venta = {
    _id: '',
    completada: false,
    direccion: '',
    detalleDireccion: '',
    estado: true,
    fecha: new Date(),
    pedidos: [''],
    total: 0,
    envio: 0,
    subtotal: 0,
  }

  pedidos: Pedido[] = [];



  constructor(private activatedRoute: ActivatedRoute, private ventasService: VentasService, private pedidosService: PedidosService) { }

  ngOnInit(): void {


    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.ventasService.getVentaPorId(id)))
      .subscribe(({ venta }) => {
        this.venta = venta;

        // console.log(this.venta);
        this.llenarPedidosCarrito(venta.pedidos);

      });



      // this.pedidosCarrito= this.venta.pedidos;
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

}
