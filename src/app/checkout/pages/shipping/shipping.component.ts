import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import { AuthService } from '../../../auth/services/auth.service';
import { Venta, VentaEnvio } from '../../../interfaces/venta.interface';
import { PedidosService } from '../../../pedidos/services/pedidos.service';
import { VentasService } from '../../../pedidos/services/ventas.service';

@Component({
  selector: 'app-shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css'],
})
export class ShippingComponent implements OnInit {

  // Recoger la ventapreparada del localStorage
  ventaJSON = localStorage.getItem('ventaPreparada');
  ventaPreparada: Venta = JSON.parse(this.ventaJSON!);
  // Recoger la ventapreparada del localStorage

  // Formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    direccion: ['', [Validators.required, Validators.minLength(4)]],
    detalleDireccion: ['', Validators.required],
    correo: ['', [Validators.required, Validators.minLength(12)]],
    telefono: ['', [Validators.required, Validators.min(0), Validators.minLength(7)]],
  });
  // Formulario reactivo

  get usuario() {
    return this.authService.usuario;
  }

  //Carrito articulos
  itemsCarrito: string[] = [];
  token: string | null = localStorage.getItem('x-token');

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private pedidosService: PedidosService,
    private ventasService: VentasService
  ) { }

  ngOnInit(): void {
    // sii yo quiero establecer valores al formulario

    // console.log(this.usuario,'usuario de authservice');

    this.miFormulario.reset({
      correo: this.usuario.correo!,
      telefono: this.usuario.telefono!,

    })

    // console.log(this.ventaPreparada, 'ventapreparada');

    if (this.token) {
      let pedidosLocal = localStorage.getItem('carritoBlitz');

      if (pedidosLocal) {
        this.itemsCarrito = JSON.parse(pedidosLocal);
      }
    }
  }

  campoNoEsValido(campo: string) {
    return (
      this.miFormulario.controls[campo].errors &&
      this.miFormulario.controls[campo].touched
    );
  }

  finalizarCompra() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }

    const { estado, pedidos, total, fecha, completada, subtotal, envio } =
      this.ventaPreparada;

    const { direccion, detalleDireccion } = this.miFormulario.value;

    const ventaEnv: VentaEnvio = {
      estado,
      pedidos,
      total,
      subtotal,
      envio,
      direccion,
      detalleDireccion,
      fecha,
      completada,
      nombreComprador:this.usuario.nombre!
    };

    // console.log(ventaEnv, 'Hola venta finalizada');

    // Limpiando el carrito y la venta del localStorage
    localStorage.setItem('carritoBlitz', '');
    localStorage.removeItem('ventaPreparada');

    // una vez posteada la informacion reiniciar los valores al por defecto del formulario
    this.miFormulario.reset();

    // console.log(ventaEnv, 'Venta para enviar');

    // Creando la venta y luego redireccionar a los detalles de la venta
    this.ventasService.agregarVenta(ventaEnv).subscribe((venta) => {
      // console.log(venta, 'Hola venta creada ');
      this.router.navigate(['/checkout/purchaseDetails', venta._id]);
    });
    // Creando la venta y luego redireccionar a los detalles de la venta
  }
}
