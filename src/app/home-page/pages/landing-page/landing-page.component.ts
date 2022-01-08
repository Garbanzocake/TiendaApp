import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../productos/services/productos.service';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  productos: Producto[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe((resp) => {
      this.productos = resp.productos;
      // console.log("productos de lading",this.productos);
    });
  }
}
