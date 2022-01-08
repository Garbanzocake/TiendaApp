import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PublicProductComponent } from './pages/public-product/public-product.component';

import { ServiciosComponent } from './pages/servicios/servicios.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { StartComponent } from './pages/ignition/start.component';
import { HomeComponent } from './pages/home/home.component';
import { GalleriaStickersComponent } from './pages/galleria-stickers/galleria-stickers.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'start', component: StartComponent },
      { path: 'servicios', component: ServiciosComponent },
      { path: 'tienda', component: TiendaComponent  },
      { path: 'landingPage', component: LandingPageComponent },
      { path: 'galleria', component: GalleriaStickersComponent },
      { path: ':id', component: PublicProductComponent },
      { path: 'sticker/:id', component: PublicProductComponent },
      { path: '**', redirectTo: 'start' },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomepageRoutingModule {}
