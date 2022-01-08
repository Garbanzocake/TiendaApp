import { Pipe, PipeTransform } from '@angular/core';
import { Pedido } from '../interfaces/pedidos.interface';

@Pipe({
  name: 'despachadoPedido'
})
export class DespachadoPedidoPipe implements PipeTransform {

  transform(pedido: Pedido  ): string {

    if (pedido.despachado  ) {
      return 'Despachado'
    }else{
      return ' Sin Despachar'
    }


  }

}
