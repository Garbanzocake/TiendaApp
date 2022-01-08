import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Result } from "../interfaces/resultados.interface";
import { Sticker } from '../interfaces/stickers.interface';

@Pipe({
  name: 'disponibleItem'
})
export class DisponibleItemPipe implements PipeTransform {

  transform(producto: Producto  | Result | Sticker): string {

    if (producto.disponible  ) {
      return 'Disponible'
    }else{
      return 'No hay unidades'
    }


  }

}
