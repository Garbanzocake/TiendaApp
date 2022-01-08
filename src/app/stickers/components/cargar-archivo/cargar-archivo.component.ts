import { Component, OnInit, Input } from '@angular/core';

import Swal from 'sweetalert2';


import { StickersService } from '../../services/stickers.service';
import { Sticker } from '../../../interfaces/stickers.interface';

@Component({
  selector: 'app-cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.css'],
})
export class CargarArchivoComponent implements OnInit {
  @Input() producto!: Sticker;

  constructor(private stickersService: StickersService) {}

  ngOnInit(): void {}

  myUploader(id: string, event: any) {
    // console.log(event);

    let fileList: FileList = event.files;

    let archivo = fileList[0];

    // console.log(archivo);

    if (fileList.length > 1) {
      for (let i = 0; i < fileList.length; i++) {
        const element = fileList[i];

        this.stickersService
          .cargarImagenesSticker(id, element)
          .subscribe((resp) => {
            // console.log('correcto', resp);
          });

      }

      Swal.fire(`Imagenes de Stickers subidas!`, `Total de archivos subidos: ${fileList.length}`, 'success');
    } else {
      this.stickersService.cargarImgSticker(id, archivo).subscribe((resp) => {
        // console.log('Archivo Subido', resp);
        Swal.fire('Imagen de Sticker subida', '', 'success');
      });
    }

    // console.log('Archivo Subido', event);
  }
}
