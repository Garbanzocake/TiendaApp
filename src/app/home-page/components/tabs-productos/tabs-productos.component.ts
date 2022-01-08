import { Component, OnInit,Input } from '@angular/core';

import { Categoria } from '../../../interfaces/categorias.interface';
import { ProductosService } from '../../../productos/services/productos.service';

@Component({
  selector: 'app-tabs-productos',
  templateUrl: './tabs-productos.component.html',
  styleUrls: ['./tabs-productos.component.css']
})
export class TabsProductosComponent implements OnInit {

  @Input()termino:string ='' ;
  categorias: Categoria[] = [];

  constructor(private productosService: ProductosService) { }

  ngOnInit(): void {

    // this.productosService
    // .getProductosPorCategoria(this.termino)
    // .subscribe((producto) => {

    //   this.productosCategorias = producto.results;
    //   // console.log(this.termino);
    //   // console.log(this.productosCategorias);
    // });

    const categoriasResp = this.productosService
    .getCategorias()
    .subscribe((categorias) => {
      this.categorias = categorias;
      // console.log(this.categorias)
    });



  }

}
