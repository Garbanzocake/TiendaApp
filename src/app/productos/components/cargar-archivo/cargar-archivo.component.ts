import { Component, OnInit, Input } from '@angular/core';

import Swal from 'sweetalert2';

import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductosService } from '../../services/productos.service';

@Component({
  selector: 'app-cargar-archivo',
  templateUrl: './cargar-archivo.component.html',
  styleUrls: ['./cargar-archivo.component.css'],
})
export class CargarArchivoComponent implements OnInit {
  @Input() producto!: Producto;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {}

  myUploader(id: string, event: any) {
    // console.log(event);

    let fileList: FileList = event.files;

    let archivo = fileList[0];

    // console.log(archivo);

    if (fileList.length > 1) {
      for (let i = 0; i < fileList.length; i++) {
        const element = fileList[i];

        this.productosService
          .cargarImagenesProducto(id, element)
          .subscribe((resp) => {
            // console.log('correcto', resp);
          });

      }

      Swal.fire(`Imagenes de Productos subidas!`, `Total de archivos subidos: ${fileList.length}`, 'success');
    } else {
      this.productosService.cargarImgProducto(id, archivo).subscribe((resp) => {
        // console.log('Archivo Subido', resp);
        Swal.fire('Imagen de Producto subida', '', 'success');
      });
    }

    // console.log('Archivo Subido', event);
  }
}
