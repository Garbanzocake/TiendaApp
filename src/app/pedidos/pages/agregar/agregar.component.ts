import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Venta } from 'src/app/interfaces/venta.interface';
import { Pedido, Producto } from '../../../interfaces/pedidos.interface';
import { PedidosService } from '../../services/pedidos.service';
import { VentaEnvio } from '../../../interfaces/venta.interface';
import { VentasService } from '../../services/ventas.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      .file-input {
        display: none;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit, AfterViewInit {
  //chips component
  pedidosInput: string[] = [];

  venta: Venta = {
    _id: '',
    estado: true,
    completada: false,
    pedidos: this.pedidosInput,
    total: 0,
    subtotal: 0,
    envio: 0,
    fecha: new Date(),
    direccion: '',
    detalleDireccion: '',
    usuario: {
      _id: '',
      nombre: '',
      correo: '',
      rol: '',
      telefono: '',
      estado: true,
      google: false,
    },
  };

  pedido: Pedido = {
    unidades: 0,
    stickers: [],
    subtotal: 0,
    instrucciones: [],
    estado: true,
    talla: '',
    despachado: false,
    producto: {
      precio: 0,
      disponible: true,
      imgs: [],
      estado: true,
      unidades: 0,
      genero: '',
      _id: '',
      nombre: '',
      usuario: {
        _id: '',
        correo: '',
        nombre: '',
      },
      etiquetas: [],
      tallas: [],
      categoria: {
        _id: '',
        nombre: '',
      },
      descripcion: 'string',
      img: '',
    },
  };

  producto: Producto = this.pedido.producto!;

  // Arreglo de completada o no

  estadoVenta = [
    { id: true, desc: 'Completada' },
    { id: false, desc: 'Sin Completar' },
  ];

  //  pedidosDespachados si o no
  despachados: Boolean = false;

  isDisabled = true;

  // Formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    direccion: ['', [Validators.required, Validators.minLength(4)]],
    detalleDireccion: ['', Validators.required],
    correo: ['', [Validators.required, Validators.minLength(12)]],
    telefono: [
      '',
      [Validators.required, Validators.min(0), Validators.minLength(7)],
    ],
    envio: [
      '',
      [Validators.required, Validators.min(0), Validators.minLength(5)],
    ],
    total: [
      '',
      [Validators.required, Validators.min(0), Validators.minLength(5)],
    ],
    subtotal: [
      '',
      [Validators.required, Validators.min(0), Validators.minLength(5)],
    ],
    fecha: [null, Validators.required],
    fechaEntrega: [null, Validators.required],
    completada: [[], Validators.required],
    pedidos: [[], Validators.required],
  });
  // Formulario reactivo

  constructor(
    private pedidosService: PedidosService,
    private ventasService: VentasService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    // Cuando se entra a editar el pedido hace esto

    if (!this.router.url.includes('editar')) {
      const carritoJSON = localStorage.getItem('carritoBlitz');

      if (!carritoJSON) {
        return;
      }
      const carrito = JSON.parse(carritoJSON);

      this.pedidosInput = carrito;
      // let subtotal = this.calcularSubtotal(carrito);

      let subtotalA=0;
      for (let i = 0; i < carrito.length; i++) {
        const element = carrito[i];

        this.pedidosService.getPedidoPorId(element).subscribe(({ pedido }) => {
          console.log(pedido);
          subtotalA = subtotalA + pedido.subtotal;
        });


      }
      console.log(subtotalA,'subtotalA')


      let envio = 0;

      if (subtotalA < 40000) {
        envio = 10000;
      }

      this.miFormulario.reset({
        envio,
        subtotal: subtotalA,
        total: subtotalA + envio,
        completada: this.venta.completada,
      });
    } else {
      this.establecerVentaPorID();
    }

    // Cuando se entra a editar el pedido hace esto
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    // console.log('afterview ejecutado')
    // this.revisarPedidosDespachados(this.pedidosInput);
  }

  establecerVentaPorID() {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.ventasService.getVentaPorId(id)))
      .subscribe(({ venta }) => {
        this.venta = venta;
        this.pedidosInput = venta.pedidos;

        this.miFormulario.reset({
          correo: this.venta.usuario!.correo,
          direccion: this.venta.direccion,
          detalleDireccion: this.venta.detalleDireccion,
          envio: this.venta.envio,
          fecha: this.venta.fecha,
          fechaEntrega: this.venta.fechaEntrega,
          pedidos: this.venta.pedidos,
          subtotal: this.venta.subtotal,
          telefono: this.venta.usuario!.telefono,
          total: this.venta.total,
          completada: this.venta.completada,
        });
      });
  }

  guardarVenta() {
    const {
      total,
      subtotal,
      envio,
      direccion,
      detalleDireccion,
      fecha,
      completada,
      pedidos,
    } = this.miFormulario.value;

    // console.log(ventaActEnvio);

    if (completada === true) {
      //Revisar sl todos los pedidos de la venta estan despachados
      const despachados = this.revisarPedidosDespachados(pedidos);

      console.log('Pedidos despachados guardarVenta', despachados);

      if (despachados === false) {
        Swal.fire({
          title: 'Pedidos sin Despacho',
          text: `No se puede Completar la venta sin despachar antes los pedidos de la venta!`,
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ok',
        });
      } else {
        // Actualizar la venta completandola
        const ventaEnvioCompletada: VentaEnvio = {
          fecha,
          fechaEntrega: new Date(),
          pedidos,
          detalleDireccion,
          direccion,
          envio,
          subtotal,
          total,
          _id: this.venta._id,
          completada,
          estado: this.venta.estado,
          nombreComprador: this.venta.usuario!.nombre,
        };

        this.ventasService
          .actualizarVenta(ventaEnvioCompletada)
          .subscribe((resp) => {
            console.log('Venta Actualizada', resp);
            Swal.fire('Venta Actualizada!', '', 'success');
          });
      }
    } else {
      // Actualizar la venta sin completarla
      const ventaEnvioSinCompletar: VentaEnvio = {
        fecha,
        pedidos,
        detalleDireccion,
        direccion,
        envio,
        subtotal,
        total,
        _id: this.venta._id,
        completada,
        estado: this.venta.estado,
        nombreComprador: this.venta.usuario!.nombre,
      };

      this.ventasService
        .actualizarVenta(ventaEnvioSinCompletar)
        .subscribe((resp) => {
          console.log('Venta Actualizada', resp);
          Swal.fire('Venta Actualizada!', '', 'success');
        });
      // Actualizar la venta sin completarla
    }
  }

  borrar(venta: Venta) {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '550px',
      data: venta,
    });

    dialog.afterClosed().subscribe((result) => {
      if (result === true) {
        // Borrar los pedidos de la venta
        const pedidos = venta.pedidos;
        for (let i = 0; i < pedidos.length; i++) {
          const pedido = pedidos[i];
          this.eliminarPedido(pedido);
        }
        // Borrar los pedidos de la venta

        // Borrar la venta
        this.ventasService.borrarVenta(venta._id).subscribe((resp) => {
          Swal.fire({
            title: 'Venta Eliminada',
            text: `La venta ${resp._id} ha sido borrada con exito`,
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Vale!',
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(['/pedidos/listado']);
            }
          });
        });
        // Borrar la venta
      }
    });
  }

  revisarPedidosDespachados(pedidosInput: string[]) {
    const pedidos = pedidosInput;
    let estadoDespacho;

    for (let i = 0; i < pedidos.length; i++) {
      const pedidoID = pedidos[i];

      this.pedidosService.getPedidoPorId(pedidoID).subscribe(({ pedido }) => {
        // console.log('estado pedidoPorId despachado', pedido.despachado);

        if (pedido.despachado === true) {
          estadoDespacho = true;
        } else {
          estadoDespacho = false;
        }
      });
    }
    console.log('Pedidos Despachados revisarPedidos:', estadoDespacho);
    return estadoDespacho;
  }

  borrarPedido(idPedido: string) {
    // Traer el pedido, asignarlo,ejecutar acciones respectivas de eliminacion
    this.pedidosService.getPedidoPorId(idPedido).subscribe(({ pedido }) => {
      // Obtener Valores del formulario
      const {
        total,
        subtotal,
        envio,
        direccion,
        detalleDireccion,
        fecha,
        completada,
      } = this.miFormulario.value;

      // Hacer las restas de saldos
      const nuevoSubtotal = subtotal - pedido.subtotal;
      const nuevoTotal = total - pedido.subtotal;

      // Filtar el arreglo de pedidos(quitar el pedido del listado)
      let pedidosFiltro = this.pedidosInput.filter((word) => word != idPedido);
      this.pedidosInput === pedidosFiltro;

      // Preparar la venta a enviar
      const ventaActEnvio: VentaEnvio = {
        fecha,
        pedidos: pedidosFiltro,
        detalleDireccion,
        direccion,
        envio,
        subtotal: nuevoSubtotal,
        total: nuevoTotal,
        _id: this.venta._id,
        completada,
        estado: this.venta.estado,
        nombreComprador: this.venta.usuario!.nombre,
      };

      // Ejecutar la actualizacion de la venta
      this.ventasService.actualizarVenta(ventaActEnvio).subscribe((resp) => {
        console.log('Venta Actualizada', resp);
      });
    });

    // Borrar el pedido
    this.eliminarPedido(idPedido);

    // Retroalimentacion al usuario
    Swal.fire({
      title: 'Venta Actualizada',
      text: 'La venta ha sido actualizada con exito',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Vale,Genial B)!',
    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }
    });
  }

  eliminarPedido(idPedido: string) {
    this.pedidosService.borrarPedido(idPedido).subscribe((pedido) => {
      console.log(pedido._id, 'pedido Eliminado');
    });
  }

  calcularSubtotal(carrito:[]): number {
    let subtotal: number = 0;

    for (let i = 0; i < carrito.length; i++) {
      const element = carrito[i];

      this.pedidosService.getPedidoPorId(element).subscribe(({ pedido }) => {
        console.log(pedido);
        subtotal = subtotal + pedido.subtotal;
      });
      console.log(subtotal,'subtotal');
    }

    return subtotal;
  }
}
