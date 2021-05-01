import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [
  ]
})
export class MenuComponent implements OnInit {

  items: MenuItem[]= [];
  constructor() { }

  ngOnInit(): void {

    this.items = [

      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'home/landingPage'
      },
     {
       label: 'Servicios',
       icon: 'pi pi-desktop',
       items:[
         {
           label: 'Galeria',
           icon: 'pi pi-camera',
           routerLink: ' '
        },
        {
          label: 'Productos',
          icon: 'pi pi-briefcase',
          routerLink: 'productos'
       },
       {
        label: 'No Comunes',
        icon: 'pi pi-align-left',
        routerLink: 'no-comunes'
     }]
      }
  ];
}
}
