import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ShippingComponent } from './pages/shipping/shipping.component';
import { PurchaseDetailsComponent } from './pages/purchase-details/purchase-details.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'cart', component: CartComponent },
      { path: 'shipping', component: ShippingComponent },
      { path: 'purchaseDetails/:id', component: PurchaseDetailsComponent },
      { path: '**', redirectTo: 'cart' },
    ],
  },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckoutRoutingModule { }
