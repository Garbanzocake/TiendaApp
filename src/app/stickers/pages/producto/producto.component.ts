import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


import { switchMap } from 'rxjs/operators';
import {  StickersService } from '../../services/stickers.service';
import { Sticker } from '../../../interfaces/stickers.interface';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'],

})
export class ProductoComponent implements OnInit {
  sticker!: Sticker;



  constructor(
    private activatedRoute: ActivatedRoute,
    private stickersService: StickersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.stickersService.getStickerPorId(id)))
      .subscribe(({ sticker }) => {
        this.sticker = sticker;
        console.log(` producto component llego`, sticker);
        // this.productos = productos;
      });


  }

  // this.productosService.getProductoPorId(producto._id)
  //     .subscribe(producto  =>this.productoSeleccionado = producto)

  regresar() {
    this.router.navigate(['/stickers/listado']);
  }







}
