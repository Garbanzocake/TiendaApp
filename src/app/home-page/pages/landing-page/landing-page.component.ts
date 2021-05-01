import { Component, OnInit } from '@angular/core';
import { ProductoElement } from '../../../productos/interface/productos.interface';
import { ProductosService } from '../../../productos/services/productos.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  productos: ProductoElement[]=[];



  constructor(private productosService:ProductosService) {

   }

  ngOnInit(): void {



    this.productosService.getProductos().subscribe((producto) => {

      console.log(producto.productos);
      this.productos= producto.productos;
    });

  }

}
