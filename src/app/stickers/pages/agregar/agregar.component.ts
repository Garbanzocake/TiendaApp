import { Component, OnInit } from '@angular/core';

import { StickersService } from '../../services/stickers.service';

import { switchMap } from 'rxjs/operators';

import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import {
  Sticker,
  StickerEnvio,
} from 'src/app/interfaces/stickers.interface';

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
  // etiquetasInput: string[] = [];
  // tallasInput: string[] = [];

  // Para crear el producto solo necesito el nombre y el id de categoria

  sticker: Sticker = {
    precio: 0,
    disponible: true,
    nombre: '',
    artista: '',
  };

  constructor(
    private stickersService: StickersService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // // Obtener las categorias
    // this.stickersService.getCategorias().subscribe((categorias) => {
    //   // console.log(categorias);
    //   this.categorias = categorias;
    // });

    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.stickersService.getStickerPorId(id)))
      .subscribe(({ sticker }) => {
        console.log(sticker,'sticker de oninit editar solo')
        this.sticker = sticker;
      });
  }

  guardar() {
    // console.log(this.producto);
    // Crear Producto

    if (this.sticker.nombre.trim().length === 0) {
      return;
    }

    if (this.sticker._id) {
      const { _id, nombre, precio, artista, disponible } = this.sticker;

      const stickerEnvAct: StickerEnvio = {
        _id,
        nombre,
        precio,
        artista,
        disponible,
      };
      // Actualizar Producto

      this.stickersService
        .actualizarSticker(stickerEnvAct)
        .subscribe((resp) => {
          this.mostrarSnackBar('Sticker Actualizado');
          console.log('respuesta Actualizando Sticker', resp);
        });
    } else {
      const { nombre, precio, artista, disponible } = this.sticker;

      const stickerEnv: StickerEnvio = {
        nombre,
        precio,
        artista,
        disponible,
      };
      // Agregar el producto
      this.stickersService.agregarSticker(stickerEnv).subscribe((sticker) => {


        this.mostrarSnackBar('Sticker Creado');
        this.router.navigate(['/stickers/editar', sticker._id]);
      });
    }
  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '550px',
      data: this.sticker,
    });

    dialog.afterClosed().subscribe((resp) => {
      if (resp) {
        this.stickersService
          .borrarSticker(this.sticker._id!)
          .subscribe((resp) => {
            this.router.navigate(['/stickers']);
            console.log('sticker borrado', resp);
          });
      }
    });
  }

  limpiarImagenes() {
    this.stickersService
      .limpiarImagenesSticker(this.sticker._id!)
      .subscribe((resp) => {
        this.router.navigate(['/stickers']);
        console.log('Imagenes eliminadas!', resp);
      });
  }

  mostrarSnackBar(mensaje: string) {
    this.snackbar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
