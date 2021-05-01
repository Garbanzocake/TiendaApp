import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductoClass as Producto } from '../../interface/producto.interface';

import { switchMap } from 'rxjs/operators';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
`

    img {
      width: 100%;
      border-radius: 5px;

    }
`


  ],
})
export class ProductoComponent implements OnInit {
  producto!: Producto ;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.productosService.getProductoPorId(id))

        )
      .subscribe( ({producto}) => {
        console.log(producto)
        this.producto =producto;
        // this.productos = productos;

      });
  }

  // this.productosService.getProductoPorId(producto._id)
  //     .subscribe(producto  =>this.productoSeleccionado = producto)


  regresar(){
    this.router.navigate(['/productos/listado']);
  }
}
