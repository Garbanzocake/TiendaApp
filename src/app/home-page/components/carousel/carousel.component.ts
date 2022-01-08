import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Producto } from 'src/app/interfaces/producto.interface';

import { Result } from '../../../interfaces/resultados.interface';

import { ProductosService } from '../../../productos/services/productos.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() productosAll?: Producto[];
  @Input() productosPorCategoria?: Result[];
  @Input() termino!: string;

  productos: any[] = [];
  responsiveOptions: Object[] = [];

  constructor(private productosService: ProductosService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    this.cargarProductos();
  }

  cargarProductos() {
    if (this.productosAll) {
      this.productos = this.productosAll;
    }
    if (this.termino !== '') {
      this.cargarProductosPorCategoria();
    } else {
      return;
    }
  }

  cargarProductosPorCategoria() {
    this.productosService
      .getProductosPorCategoria(this.termino)
      .subscribe((producto) => {
        this.productos = producto.results;
        // console.log(this.termino);
        // console.log(this.productosCategorias);
      });
  }
}
