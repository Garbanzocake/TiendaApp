import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';




import { ProductosService } from '../../services/productos.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';
import { Categoria } from '../../../interfaces/categorias.interface';
import {
  Producto,
  ProductoEnvio,
} from '../../../interfaces/producto.interface';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .file-input {
        display: none;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  //chips component
  etiquetasInput: string[] = [];
  tallasInput: string[] = [];

  categorias: Categoria[] = [];

  // Para crear el producto solo necesito el nombre y el id de categoria

  producto: Producto = {
    precio: 0,
    disponible: true,
    estado: true,
    genero: '',
    nombre: '',
    descripcion: '',
    categoria: {
      _id: '',
      nombre: '',
    },
    etiquetas: this.etiquetasInput,
    tallas: this.tallasInput,
    unidades: 0
  };

  
  // Arreglo de completada o no

  generoOpciones = [
    { id: 'F', desc: 'Femenino' },
    { id: 'M', desc: 'Masculino' },
  ];


  constructor(
    private productosService: ProductosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    // Obtener las categorias
    this.productosService.getCategorias().subscribe((categorias) => {
      // console.log(categorias);
      this.categorias = categorias;
    });

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.productosService.getProductoPorId(id)))
      .subscribe(({ producto }) => {
        this.producto = producto;
        this.etiquetasInput = producto.etiquetas!;
        this.tallasInput = producto.tallas!;
      });
  }

  guardar() {
    // console.log(this.producto);
    // Crear Producto

    if (this.producto.nombre.trim().length === 0) {
      return;
    }

    if (this.producto._id) {
      const {
        _id,
        nombre,
        precio,
        categoria: { _id: categoria },
        descripcion,
        disponible,
        etiquetas,
        tallas,
        unidades, genero
      } = this.producto;

      const productoEnvAct: ProductoEnvio = {
        _id,
        nombre,
        precio,
        categoria,
        descripcion,
        disponible,
        etiquetas: this.etiquetasInput,
        tallas: this.tallasInput,
        unidades,
        genero
      };
      // Actualizar Producto

      this.productosService
        .actualizarProducto(productoEnvAct)
        .subscribe((resp) => {
          this.mostrarSnackBar('Producto Actualizado');
          console.log('respuesta Actualizando Producto', resp);
        });
    } else {
      const {
        nombre,
        precio,
        categoria: { _id },
        descripcion,
        disponible,
        unidades,genero
      } = this.producto;

      const productoEnv: ProductoEnvio = {
        nombre,
        precio,
        categoria: _id,
        descripcion,
        unidades,
        genero,
        disponible,
        etiquetas: this.etiquetasInput,
        tallas: this.tallasInput,
      };

      // Agregar el producto
      this.productosService
        .agregarProducto(productoEnv)
        .subscribe((producto) => {
          this.router.navigate(['/productos/editar', producto._id]);
          this.mostrarSnackBar('Producto Creado');
        });
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '550px',
      data: this.producto,
    });

    dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        this.productosService
          .borrarProducto(this.producto._id!)
          .subscribe((resp) => {
            this.router.navigate(['/productos']);
            console.log('Producto borrado', resp);
          });
      }
    });
  }

  limpiarImagenes() {
    this.productosService
      .limpiarImagenesProducto(this.producto._id!)
      .subscribe((resp) => {
        this.router.navigate(['/productos']);
        console.log('Imagenes eliminadas!', resp);
      });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackbar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
