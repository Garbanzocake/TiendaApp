import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get usuario() {
    return this.authService.usuario;
  }


    //Carrito articulos
    itemsCarritoPedido: string[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.establecerCarritoPedido();

  }

  logOut() {
    this.authService.logout();
    this.router.navigateByUrl('/home/landingPage');
  }

  establecerCarritoPedido() {
    let carrito = localStorage.getItem('carritoBlitz');
    if (carrito) {
      this.itemsCarritoPedido = JSON.parse(carrito!);
    }
  }
}
