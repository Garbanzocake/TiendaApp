import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Result } from '../../interface/resultados.interface';
import { ProductoElement  } from '../../interface/productos.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';

  productos: Result[] = [];

  productoSeleccionado: ProductoElement | undefined;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {}

  buscando() {

    if (!this.termino ) {
      this.productos = [];
      return;
    }else{

      this.productosService
        .getProductosPortermino(this.termino.trim())
        .subscribe(( {results} ) => {
          this.productos= results;
        });
    }
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){



      if (!event.option.value) {
        this.productoSeleccionado = undefined;
        console.log('No hay valor')
        return;
      }

      const producto:Result= event.option.value;
      this.termino= producto.nombre ;

      this.productosService.getProductoPorId(producto._id)
      .subscribe(({producto})  =>this.productoSeleccionado = producto)


  }
}
