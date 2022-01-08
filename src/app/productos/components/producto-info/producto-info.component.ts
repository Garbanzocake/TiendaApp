import { Component, OnInit,Input } from '@angular/core';
import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-info',
  templateUrl: './producto-info.component.html',
  styleUrls: ['./producto-info.component.css']
})
export class ProductoInfoComponent implements OnInit {

  @Input() producto!: Producto;

  constructor() { }

  ngOnInit(): void {





  }

}
