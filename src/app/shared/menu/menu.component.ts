import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, OnChanges {
  items: MenuItem[] = [];
  itemsPublic: MenuItem[] = [];
  token: string | null = localStorage.getItem('x-token');
  usuario = {
    nombre: '',
    rol: '',
  };

  // expiradoToken: boolean = false;

  //Carrito articulos
  @Input() itemsCarrito: string[] = [];

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Verificar si el token esta activo aun o no

    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/store/tienda',
      },
      {
        label: 'Servicios',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Galeria Diseños',
            icon: 'pi pi-camera',
            routerLink: '/store/galleria',
          },
          {
            label: 'Productos',
            icon: 'pi pi-palette',
            routerLink: '/productos',
          },


        ],
      },
    ];

    this.itemsPublic = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: '/store/tienda',
      },
      {
        label: 'Servicios',
        icon: 'pi pi-desktop',
        items: [
          {
            label: 'Galeria',
            icon: 'pi pi-camera',
            routerLink: '/store/galleria',
          },
          {
            label: 'Productos',
            icon: 'pi pi-palette',
            routerLink: '/store/tienda',
          },

          {
            label: 'No Comunes',
            icon: 'pi pi-briefcase',
            routerLink: 'no-comunes',
          },
        ],
      },
    ];

    if (this.token) {
      this.verificarTiempoToken();

    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.verificarTiempoToken();

  }

  logout() {
    localStorage.setItem('x-token', '');

    this.router.navigate(['/home/']);
    window.location.reload();
  }
  login() {
    this.router.navigateByUrl('/auth/login');
  }

  establecerUsuario() {
    this.authService.validarSesion().subscribe((resp) => {
      this.usuario = {
        nombre: resp.nombre,
        rol: resp.rol,
      };
    });
  }

  verificarTiempoToken() {
    this.authService.validarTiempoToken().subscribe((resp) => {
      // console.log(resp,"respuesta de validartiempotoken")

      if (resp.ok === true) {
        // localStorage.removeItem('x-token');

        localStorage.setItem('x-token', '');
        window.location.reload();
      } else {
        this.establecerCarrito();
        this.establecerUsuario();
      }
      // console.log(resp, 'respuesta ok de verificartiempo');
    });
  }

  // Manejo de errores en las peticiones OwO
  // (resp) => {console.log(resp,"respuesta ok de verificartiempo")},
  // (error) => {
  //   console.log(error.error.ok,"respuesta error de verificarTiempo")
  //   // this.tiempoToken=error.error.ok;
  // }

  establecerCarrito() {
    let carrito = localStorage.getItem('carritoBlitz');

    if (carrito) {
      this.itemsCarrito = JSON.parse(carrito!);
    }
  }
}
