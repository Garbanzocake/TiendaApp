import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Result } from '../../../interfaces/resultados.interface';

import { StickersService } from '../../services/stickers.service';

import { Sticker } from 'src/app/interfaces/stickers.interface';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {
  termino: string = '';

  stickers: Result[] = [];

  // productosCat: Producto[]=[];

  stickerSeleccionado: Sticker | undefined;

  tipoBusqueda: string = '';
  // ['Categoria', 'Producto'];
  filtros: any[];

  constructor(private stickersService: StickersService) {
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
      this.stickerSeleccionado = undefined;
      this.stickers = [];
      console.log('No hay valor');
      return;
    }

    const producto: Result = event.option.value;
    this.termino = producto.nombre;

    this.stickersService
      .getStickersPortermino(this.termino.trim())
      .subscribe(({ results }) => {
        this.stickers = results;
      });
  }

  buscando() {
    this.stickers = [];
    if (!this.termino) {
      this.stickers = [];
      return;
    } else {
      this.stickersService
        .getStickersPortermino(this.termino.trim())
        .subscribe(({ results }) => {
          this.stickers = results;
        });
    }
  }
}
