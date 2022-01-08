import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Result } from '../../../interfaces/resultados.interface';

import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';

  productos: Result[] = [];

  // productosCat: Producto[]=[];

  productoSeleccionado: Producto | undefined;

  tipoBusqueda: string = '';
  // ['Categoria', 'Producto'];
  filtros: any[];

  constructor(private productosService: ProductosService) {
    this.filtros = [
      {
        name: 'Seleccione opcion',
        cod: '',
      },
      {
        name: 'Categoria',
        cod: 'Categoria',
      },
    ];
  }

  ngOnInit(): void {}

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {
    if (!event.option.value) {
      this.productoSeleccionado = undefined;
      this.productos = [];
      console.log('No hay valor');
      return;
    }

    const producto: Result = event.option.value;
    this.termino = producto.nombre;

    if (this.tipoBusqueda === 'Categoria') {
      this.productosService
        .getProductosPorCategoria(this.termino.trim())
        .subscribe(({ results }) => {
          this.productos = results;
        });
    } else {
      this.productosService
        .getProductosPortermino(this.termino.trim())
        .subscribe(({ results }) => {
          this.productos = results;
        });
    }
  }

  buscando() {
    this.productos = [];
    if (!this.termino) {
      this.productos = [];
      return;
    } else {
      if (this.tipoBusqueda === 'Categoria') {
        this.productosService
          .getProductosPorCategoria(this.termino.trim())
          .subscribe(({ results }) => {
            this.productos = results;
          });
      } else {
        this.productosService
          .getProductosPortermino(this.termino.trim())
          .subscribe(({ results }) => {
            this.productos = results;
          });
      }
    }
  }
}
