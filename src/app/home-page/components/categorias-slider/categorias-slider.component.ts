import { Component,  OnInit  } from '@angular/core';

import { Categoria } from '../../../interfaces/categorias.interface';
import { ProductosService } from '../../../productos/services/productos.service';




@Component({
  selector: 'app-categorias-slider',
  templateUrl: './categorias-slider.component.html',
  styleUrls: ['./categorias-slider.component.scss'],
})
export class CategoriasSliderComponent implements OnInit {
  // @Input() termino:string ='' ;

  // @Output() categoriaSeleccionada: EventEmitter<string> = new EventEmitter<string>();

  // productosCategorias: Result[] = [];


  categorias: Categoria[] = [];
  responsiveOptions: Object[] = [];
  termino: string = '';

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
    this.termino = 'JEANS';

    const categoriasResp = this.productosService
      .getCategorias()
      .subscribe((categorias) => {
        this.categorias = categorias;
        // console.log(this.categorias);
      });


  }

  emitirCategoria(categoria: string) {
    // console.log(categoria);
    // this.categoriaSeleccionada.emit(categoria);
    this.termino = categoria;
  }



}
