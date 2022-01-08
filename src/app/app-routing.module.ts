import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { AdminGuard } from './auth/guards/admin.guard';



const routes: Routes = [
  {
    path: 'store',
    loadChildren: () => import('./home-page/home-page.module').then((m) => m.HomePageModule),

  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'productos',
    loadChildren: () =>
      import('./productos/productos.module').then((m) => m.ProductosModule),
      canActivate: [AuthGuard,AdminGuard],
      canLoad: [AuthGuard]
  },
  {
    path: 'stickers',
    loadChildren: () =>
      import('./stickers/stickers.module').then((m) => m.StickersModule),
      canActivate: [AuthGuard,AdminGuard],
      canLoad: [AuthGuard]
  },
  {
    path: 'checkout',
    loadChildren: () =>
      import('./checkout/checkout.module').then((m) => m.CheckoutModule),
      canActivate: [AuthGuard],
      canLoad: [AuthGuard]
  },
  {
    path: 'pedidos',
    loadChildren: () =>
      import('./pedidos/pedidos.module').then((m) => m.PedidosModule),
      canActivate: [AuthGuard,AdminGuard],
      canLoad: [AuthGuard]
  },

  {
    path: '404',
    component: ErrorPageComponent,
  },
  {
    path: '**',
    // component: ErrorPageComponent,
    redirectTo: 'store',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
