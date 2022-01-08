import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';

import { ProductosService } from '../../services/productos.service';

import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [],
})
export class ListadoComponent implements OnInit {
  productos: Producto[] = [];

  get usuario() {
    return this.authService.usuario;
  }

  constructor(
    private productosService: ProductosService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(({ productos }) => {
      // console.log(productos);
      this.productos = productos;
    });
  }
}
