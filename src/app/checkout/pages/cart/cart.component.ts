import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  pedidosCarrito: string[] = [];

  token: string | null = localStorage.getItem('x-token');

  carrito: boolean = true;

  constructor() {}

  ngOnInit(): void {
    if (this.token) {
      let pedidosLocal = localStorage.getItem('carritoBlitz');

      if (pedidosLocal) {
        this.pedidosCarrito = JSON.parse(pedidosLocal);
      } else {
        this.carrito = false;
      }
    }
  }

  establecerNuevoCarrito(carritoNuevo: string[]) {
    console.log(`${carritoNuevo} Hola carrito recibido!`);

    this.pedidosCarrito=carritoNuevo;
  }


}
