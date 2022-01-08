import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from '../../../interfaces/producto.interface';

import { switchMap } from 'rxjs/operators';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],

})
export class ProductoComponent implements OnInit {
  producto!: Producto;



  constructor(
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productosService.getProductoPorId(id)))
      .subscribe(({ producto }) => {
        this.producto = producto;
        // console.log(` producto component llego`, producto);
        // this.productos = productos;
      });


  }

  // this.productosService.getProductoPorId(producto._id)
  //     .subscribe(producto  =>this.productoSeleccionado = producto)

  regresar() {
    this.router.navigate(['/productos/listado']);
  }







}
