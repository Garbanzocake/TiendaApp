import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { ProductosRoutingModule } from './productos-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { CargarArchivoComponent } from './components/cargar-archivo/cargar-archivo.component';
import { ChipsComponent } from './components/chips/chips.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { GalleriaProductoComponent } from './components/galleria-producto/galleria-producto.component';
import { GalleriaProductosComponent } from './components/galleria-productos/galleria-productos.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';


// Pipes
// import { ImagenPipe } from '../pipes/imagen.pipe';
// import { DisponibleItemPipe } from '../pipes/disponible-item.pipe';



// Imagenes zoom
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductoInfoComponent } from './components/producto-info/producto-info.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    ListadoComponent,
    ProductoComponent,
    HomeComponent,
    ProductoTarjetaComponent,
    ConfirmarComponent,
    CargarArchivoComponent,
    ChipsComponent,
    GalleriaProductoComponent,
    GalleriaProductosComponent,
    ProductoInfoComponent,


    // ImagenPipe,
    // DisponibleItemPipe,
  ],
  exports: [GalleriaProductoComponent, GalleriaProductosComponent,ProductoInfoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ProductosRoutingModule,
    MaterialModule,
    PrimeNgModule,
    HttpClientModule,
    SharedModule,
    PipesModule,
    NgxImageZoomModule,
    FlexLayoutModule
  ],
})
export class ProductosModule {}
