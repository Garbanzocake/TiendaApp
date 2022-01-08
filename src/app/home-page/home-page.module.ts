import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';


import { CarouselComponent } from './components/carousel/carousel.component';
import { HomepageRoutingModule } from './homepage-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PipesModule } from '../pipes/pipes.module';
import { ProductoTarjetaComponent } from './components/producto-tarjeta/producto-tarjeta.component';
import { PublicProductComponent } from './pages/public-product/public-product.component';
import { SharedModule } from '../shared/shared.module';
import { PedidosModule } from '../pedidos/pedidos.module';
import { ProductosModule } from '../productos/productos.module';




import { CategoriasSliderComponent } from './components/categorias-slider/categorias-slider.component';
import { GalleriaStickersComponent } from './pages/galleria-stickers/galleria-stickers.component';
import { HomeComponent } from './pages/home/home.component';
import { MoonComponent } from './components/moon/moon.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { ServiciosComponent } from './pages/servicios/servicios.component';
import { SliderStickersComponent } from './components/slider-stickers/slider-stickers.component';
import { StartComponent } from './pages/ignition/start.component';
import { TabsProductosComponent } from './components/tabs-productos/tabs-productos.component';
import { Thebomb1Component } from './components/thebomb1/thebomb1.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { WorkingprogressComponent } from './components/workingprogress/workingprogress.component';




// import { DisponibleItemPipe } from './pipes/disponibleitem.pipe';
// import { ImagenPipe } from './pipes/imagen.pipe';






@NgModule({
  declarations: [
    LandingPageComponent,
    CarouselComponent,
    ProductoTarjetaComponent,
    PublicProductComponent,
    Thebomb1Component,
    ServiciosComponent,
    TiendaComponent,
    MoonComponent,
    StartComponent,
    HomeComponent,
    MoonComponent,
    WorkingprogressComponent,
    NavbarComponent,
    CategoriasSliderComponent,
    TabsProductosComponent,
    GalleriaStickersComponent,
    SliderStickersComponent,





    // DisponibleItemPipe,
    // ImagenPipe,
  ],
  imports: [
    CommonModule,
    HomepageRoutingModule,
    ReactiveFormsModule,
    PrimeNgModule,
    SharedModule,
    CarouselModule,
    ButtonModule,
    PipesModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ProductosModule,
    PedidosModule


  ],
  exports:[
    WorkingprogressComponent
  ]

})
export class HomePageModule {}
