import { Component, OnInit } from '@angular/core';
import {  ProductoElement } from '../../interface/productos.interface';
import { ProductosService } from '../../services/productos.service';


@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [

  ],
})
export class ListadoComponent implements OnInit {

  productos: ProductoElement[] = [];

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    // this.productosService.getHeroes().pipe(
    //   map(res => res[0].productos)
    // )
    // .subscribe( resproductos => {
    //          this.productos= resproductos;
    // });

    this.productosService.getProductos().subscribe(({productos}) => {

      console.log(productos);
      this.productos= productos;
    });
  }
}
