import { NgModule } from '@angular/core';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';

import { MenubarModule } from 'primeng/menubar';

import { RippleModule } from 'primeng/ripple';
import { FieldsetModule } from 'primeng/fieldset';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import {CalendarModule} from 'primeng/calendar';
import { CarouselModule } from 'primeng/carousel';
import { GalleriaModule } from 'primeng/galleria';
import { ToastModule } from 'primeng/toast';
import { TagModule } from 'primeng/tag';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import {ChipsModule} from 'primeng/chips';
import {BadgeModule} from 'primeng/badge';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {DividerModule} from 'primeng/divider';

@NgModule({
  declarations: [],
  exports: [
    ButtonModule,
    CardModule,
    CarouselModule,
    DropdownModule,
    MenubarModule,
    FieldsetModule,
    FileUploadModule,
    RippleModule,
    ToolbarModule,
    TableModule,
    ToastModule,
    TagModule,
    TabViewModule,
    GalleriaModule,
    ChipsModule,
    BadgeModule,
    RadioButtonModule,
    InputNumberModule,
    DividerModule,
    CalendarModule
  ],
})
export class PrimeNgModule {}
