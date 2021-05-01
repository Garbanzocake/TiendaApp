import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [MenuComponent],
  exports:[
    MenuComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    MaterialModule
  ]
})
export class SharedModule { }
