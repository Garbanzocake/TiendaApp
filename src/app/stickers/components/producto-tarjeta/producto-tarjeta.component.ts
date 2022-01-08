import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/resultados.interface';

import { Sticker } from '../../../interfaces/stickers.interface';


@Component({
  selector: 'app-producto-tarjeta',
  templateUrl: './producto-tarjeta.component.html',
  styles:[
    `
    mat-card{
      margin-top:20px;
    }
    `
  ]

})



export class ProductoTarjetaComponent implements OnInit {

  @Input()sticker!:Sticker ;
  @Input()productosCat!:Result ;
  @Input()modo!:string; //recibe admin o user

  constructor() { }

  ngOnInit(): void {



  }

}
