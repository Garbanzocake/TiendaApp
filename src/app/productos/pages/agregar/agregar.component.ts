import { Component, OnInit } from '@angular/core';
import { ProductoElement } from '../../interface/productos.interface';
import { ProductosService } from '../../services/productos.service';

import { switchMap, map } from 'rxjs/operators';

// import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Categoria } from '../../interface/categorias.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [],
})
export class AgregarComponent implements OnInit {
  categorias: Categoria[] = [];

  // Para crear el producto solo necesito el nombre y el id de categoria
  product = {
    nombre: '',
    categoria: '',
  };

  cat = {
    _id: '',
    nombre: '',
  };

  catu = {
    _id: '',
    nombre: '',
  };

  producto: ProductoElement = {
    precio: 0,
    disponible: true,
    _id: '',
    nombre: '',
    usuario: this.catu,
    categoria: this.cat,
    img: '',
  };

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.productosService.getCategorias().subscribe(({ categorias }) => {
      console.log(categorias);
      this.categorias = categorias;
    });
  }

  guardar() {}

  borrar() {}
}
