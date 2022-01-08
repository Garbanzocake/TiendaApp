import { Component, OnInit,Input } from '@angular/core';
import { Producto } from '../../interfaces/producto.interface';


@Component({
  selector: 'app-whatsappbtn',
  templateUrl: './whatsappbtn.component.html',
  styleUrls: ['./whatsappbtn.component.css']
})
export class WhatsappbtnComponent implements OnInit {

  @Input() producto!:Producto;
  constructor() { }

  ngOnInit(): void {
  }

}
