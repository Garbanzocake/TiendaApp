import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosRoutingModule } from './productos-routing.module';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';

import { FormsModule } from '@angular/forms';
import { ImagenPipe } from './pipes/imagen.pipe';
import { DisponibleItemPipe } from './pipes/disponible-item.pipe';

@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    ProductoComponent,
    HomeComponent,
    ListadoComponent,
    ProductoTarjetaComponent,
    ImagenPipe,
    DisponibleItemPipe,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    ProductosRoutingModule,
    MaterialModule,
  ],
})
export class ProductosModule {}
