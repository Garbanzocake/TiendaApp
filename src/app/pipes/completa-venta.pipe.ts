import { Pipe, PipeTransform } from '@angular/core';


import { Venta } from '../interfaces/venta.interface';

@Pipe({
  name: 'completadaVenta'
})
export class CompletadaVentaPipe implements PipeTransform {

  transform(venta: Venta ): string {

    if (venta.completada  ) {
      return 'Completada'
    }else{
      return 'Sin Completar'
    }


  }

}
