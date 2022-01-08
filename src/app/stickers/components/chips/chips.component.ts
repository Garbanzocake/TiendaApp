import { Component, OnInit } from '@angular/core';


export interface Etiqueta {
  name:string
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.css']
})
export class ChipsComponent implements OnInit {


  //chips component
  etiquetas: string[]=[];

  constructor() { }

  ngOnInit(): void {
  }




}
