import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { HomepageRoutingModule } from './homepage-routing.module';

import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DisponibleItemPipe } from './pipes/disponibleitem.pipe';
import { ImagenPipe } from './pipes/imagen.pipe';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'landingPage', component: LandingPageComponent },
      // { path: 'listado', component:  },
      // { path: 'buscar', component:  },
      { path: '**', redirectTo: 'landingPage' },
    ],
  },
];

@NgModule({
  declarations: [
    LandingPageComponent,
    CarouselComponent,
    DisponibleItemPipe,
    ImagenPipe,
  ],
  exports: [RouterModule, LandingPageComponent],

  imports: [
    RouterModule.forChild(routes),
    PrimeNgModule,
    HomepageRoutingModule,
    CarouselModule,
    ButtonModule,
    ToastModule,
  ],
})
export class HomePageModule {}
