import { Pipe, PipeTransform } from '@angular/core';
import { ProductoClass as Producto } from '../../productos/interface/producto.interface';
import { ProductoElement } from '../../productos/interface/productos.interface';

@Pipe({
  name: 'disponibleItem'
})
export class DisponibleItemPipe implements PipeTransform {

  transform(producto: Producto | ProductoElement): string {

    if (producto.disponible  ) {
      return 'Disponible'
    }else{
      return 'No hay unidades'
    }


  }

}
