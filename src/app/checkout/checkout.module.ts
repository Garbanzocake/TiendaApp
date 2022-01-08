import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { PipesModule } from '../pipes/pipes.module';
import { SharedModule } from '../shared/shared.module';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { CartComponent } from './pages/cart/cart.component';
import { PedidosCartComponent } from './components/pedidos-cart/pedidos-cart.component';
import { PurchaseDetailsComponent } from './pages/purchase-details/purchase-details.component';
import { FormularioShippingComponent } from './components/formulario-shipping/formulario-shipping.component';

import { HomePageModule } from '../home-page/home-page.module';

@NgModule({
  declarations: [
    HomeComponent,
    ShippingComponent,
    CartComponent,
    PedidosCartComponent,
    PurchaseDetailsComponent,
    FormularioShippingComponent,

  ],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    PipesModule,
    ReactiveFormsModule,
    SharedModule,
    PrimeNgModule,
    MaterialModule,
    HomePageModule
  ],
})
export class CheckoutModule {}
