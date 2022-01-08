import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/app/interfaces/resultados.interface';

import { Producto } from '../../../interfaces/producto.interface';


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

  @Input()producto!:Producto ;
  @Input()productosCat!:Result ;
  @Input()modo!:string; //recibe admin o user

  constructor() { }

  ngOnInit(): void {



  }

}
