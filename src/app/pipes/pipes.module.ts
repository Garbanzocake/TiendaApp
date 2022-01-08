import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from "./imagen.pipe";
import { DisponibleItemPipe  } from "./disponible-item.pipe";
import { CompletadaVentaPipe } from './completa-venta.pipe';
import { DespachadoPedidoPipe } from './despachado-pedido.pipe';
import { generoPipe } from './genero.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    DisponibleItemPipe,
    CompletadaVentaPipe,
    DespachadoPedidoPipe,
    generoPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ImagenPipe,
    DisponibleItemPipe,
    CompletadaVentaPipe,
    DespachadoPedidoPipe,
    generoPipe
  ]
})
export class PipesModule { }
