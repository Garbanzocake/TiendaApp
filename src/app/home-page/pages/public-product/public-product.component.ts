import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoEnvio } from '../../../interfaces/producto.interface';

import { switchMap } from 'rxjs/operators';
import { ProductosService } from '../../../productos/services/productos.service';
import { PedidoEnvio } from 'src/app/interfaces/pedidos.interface';
import { PedidosService } from '../../../pedidos/services/pedidos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-public-product',
  templateUrl: './public-product.component.html',
  styleUrls: ['./public-product.component.css'],
})
export class PublicProductComponent implements OnInit {
  producto!: Producto;

  //Carrito articulos
  itemsCarrito: string[] = [];

  tallaSeleccionada: any;
  unidades: number = 1;

  pedidoEnvio: PedidoEnvio = {
    subtotal: 0,
    producto: '',
    talla: '',
    unidades: 0,
    despachado:false
  };

  seguirComprando: boolean = false;

  public constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private pedidosService: PedidosService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productosService.getProductoPorId(id)))
      .subscribe(({ producto }) => {
        // console.log(producto);
        this.producto = producto;
        // this.productos = productos;
      });

    // llenar si hay carrito anterior
    let carritoAnterior = localStorage.getItem('carritoBlitz');

    if (carritoAnterior) {
      let carrito = JSON.parse(carritoAnterior);
      this.itemsCarrito = carrito;
    }
  }

  regresar() {
    this.router.navigate(['/store/tienda']);
  }

  agregarAlCarrito() {
    let token = localStorage.getItem('x-token');

    if (!token) {
      Swal.fire(
        `Inicio de Sesion Requerido`,
        `Por Favor inicia sesion para realizar el pedido OwO!`,
        'warning'
      );
      return;
    }

    const pedidoEnv: PedidoEnvio = {
      subtotal: this.producto.precio * this.unidades,
      producto: this.producto._id!,
      talla: this.tallaSeleccionada,
      unidades: this.unidades,
      despachado:false
    };

    this.pedidosService.agregarPedido(pedidoEnv).subscribe((pedido) => {
      // llenar si hay carrito anterior
      let carritoAnterior = localStorage.getItem('carritoBlitz');

      if (carritoAnterior) {
        let carritoante = JSON.parse(carritoAnterior);
        this.itemsCarrito = carritoante;
      }

      //  Agregando al carrito localstorage
      this.itemsCarrito.push(pedido._id!);
      let carrito = JSON.stringify(this.itemsCarrito);
      localStorage.setItem('carritoBlitz', carrito);
    });

    // Actualizar las unidades de stock del producto

    const unidadesRestantes:number = this.producto.unidades-this.unidades;

    const productoEnv:ProductoEnvio={
      _id:this.producto._id,
      unidades: unidadesRestantes
    }

    this.productosService.actualizarProducto(productoEnv).subscribe(resp=>{
      console.log(resp,'producto con unidades modificadas')
    })

    // console.log(pedidoEnv);

    this.seguirComprando = true;
    // console.log(this.itemsCarrito);
    Swal.fire(
      `Producto Agregado al Carrito! `,
      `${this.producto.nombre}`,
      'success'
    );
  }

  irCarrito() {
    this.router.navigateByUrl('/checkout/cart');
  }
}
