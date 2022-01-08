import { Component, Input, OnInit } from '@angular/core';

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
  @Input()modo!:string; //recibe admin o user

  constructor() { }

  ngOnInit(): void {




  }

}
