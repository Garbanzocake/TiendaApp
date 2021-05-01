import { NgModule } from '@angular/core';



//PrimeNG
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';


import {MenubarModule} from 'primeng/menubar';

import {RippleModule} from 'primeng/ripple';
import { FieldsetModule } from "primeng/fieldset";
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {CarouselModule} from 'primeng/carousel';
import {ToastModule} from 'primeng/toast';
import {BadgeModule} from 'primeng/badge';

@NgModule({
  declarations: [],
  exports: [
   ButtonModule,
   CardModule,
   MenubarModule,
   FieldsetModule,
   ToolbarModule,
   TableModule,
   RippleModule,
   CarouselModule,
   ToastModule,
   BadgeModule

  ]
})
export class PrimeNgModule { }
