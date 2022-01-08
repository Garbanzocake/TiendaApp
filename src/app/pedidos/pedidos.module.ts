import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';


import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { AgregarComponent } from './pages/agregar/agregar.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { HomeComponent } from './pages/home/home.component';
import { PedidoComponent } from './pages/pedido/pedido.component';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { TablaVentasComponent } from './components/tabla-ventas/tabla-ventas.component';
import { TablaPedidosComponent } from './components/tabla-pedidos/tabla-pedidos.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { ProductosModule } from '../productos/productos.module';
import { TablaangmaterialVentasComponent } from './components/tablaangmaterial-ventas/tablaangmaterial-ventas.component';
import { WorkingprogressComponent } from './components/workingprogress/workingprogress.component';



@NgModule({
  declarations: [
    AgregarComponent,
    BuscarComponent,
    ListadoComponent,
    HomeComponent,
    PedidoComponent,
    TablaVentasComponent,
    TablaPedidosComponent,
    ConfirmarComponent,
    TablaangmaterialVentasComponent,
    WorkingprogressComponent

  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialModule,
    HttpClientModule,
    SharedModule,
    PedidosRoutingModule,
    PipesModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    ProductosModule



  ],
  exports:[TablaVentasComponent,TablaPedidosComponent]
})
export class PedidosModule {}
