import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";

import { MessageService } from 'primeng/api';
import { PrimeNgModule } from './prime-ng/prime-ng.module';



import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home-page/home-page.module';
import { MaterialModule } from './material/material.module';
import { ProductosService } from './productos/services/productos.service';
import { MatNativeDateModule } from '@angular/material/core';


// Cambiar el locale de la app/lenguaje
import localeEsCo from '@angular/common/locales/es-CO';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeEsCo);
// Cambiar el locale de la app/lenguaje

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HomePageModule,
    PrimeNgModule,
    MaterialModule,
    MatNativeDateModule,



  ],
  providers: [MessageService, ProductosService,
    { provide: LOCALE_ID, useValue: 'es-CO' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
