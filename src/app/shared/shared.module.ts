import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MaterialModule } from '../material/material.module';



import { MenuComponent } from './menu/menu.component';
import { FooterpublicComponent } from './footerpublic/footerpublic.component';
import { LoadingScreenComponent } from './loading-screen/loading-screen.component';
import { WhatsappbtnComponent } from './whatsappbtn/whatsappbtn.component';





@NgModule({
  declarations: [MenuComponent, FooterpublicComponent, LoadingScreenComponent, WhatsappbtnComponent],
  exports:[
    MenuComponent,
    FooterpublicComponent,LoadingScreenComponent,
    WhatsappbtnComponent,

  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialModule

  ]
})
export class SharedModule { }
