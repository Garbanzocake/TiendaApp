import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';
import Swal from 'sweetalert2';

import { PedidosService } from '../../services/pedidos.service';
import { ProductosService } from '../../../productos/services/productos.service';
import { Pedido, PedidoEnvio } from '../../../interfaces/pedidos.interface';

import { Producto } from '../../../interfaces/producto.interface';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: [],
})
export class PedidoComponent implements OnInit {
  idVenta: string = '';

  pedido: Pedido = {
    _id: '',
    despachado: false,
    estado: true,
    instrucciones: [],
    stickers: [],
    subtotal: 0,
    talla: '',
    unidades: 0,
  };

  producto: Producto = {
    _id: '',
    categoria: {
      _id: '',
      nombre: '',
    },
    descripcion: '',
    disponible: true,
    estado: true,
    etiquetas: [''],
    genero: '',
    img: '',
    imgs: [''],
    nombre: '',
    precio: 0,
    tallas: [''],
    unidades: 0,
    usuario: {
      _id: '',
      nombre: '',
      correo: '',
    },
  };

  // Formulario reactivo
  miFormulario: FormGroup = this.fb.group({
    talla: ['', Validators.required],
    producto: ['', Validators.required],
    stickers: [[], [Validators.required, Validators.minLength(12)]],
    instrucciones: [[], [Validators.required, Validators.minLength(12)]],
    subtotal: [
      '',
      [Validators.required, Validators.min(0), Validators.minLength(5)],
    ],
    unidades: [
      '',
      [Validators.required, Validators.min(0), Validators.minLength(5)],
    ],
    despachado: [[], Validators.required],
  });
  // Formulario reactivo

  estadoPedido = [
    { id: true, desc: 'Despachado' },
    { id: false, desc: 'Sin Despachar' },
  ];

  constructor(
    private pedidosService: PedidosService,
    private activatedRoute: ActivatedRoute,
    private productosService: ProductosService,
    private fb: FormBuilder,
    private router: Router,
    private _location: Location
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(({id})=>{this.idVenta=id});

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.pedidosService.getPedidoPorId(id)))
      .subscribe(({ pedido }) => {
        this.pedido = pedido;

        this.miFormulario.reset({
          talla: this.pedido.talla,
          stickers: this.pedido.stickers,
          instrucciones: this.pedido.instrucciones,
          unidades: this.pedido.unidades,
          subtotal: this.pedido.subtotal,
          despachado: this.pedido.despachado,
          producto: this.pedido.producto!._id,
        });

        const idProducto = pedido.producto!._id;

        this.productosService
          .getProductoPorId(idProducto)
          .subscribe(({ producto }) => {
            this.producto = producto;
          });
      });
  }

  guardarPedido() {
    const {
      talla,
      producto,
      despachado,
      subtotal,
      instrucciones,
      stickers,
      unidades,
    } = this.miFormulario.value;
    const { _id } = this.pedido;

    const pedidoActEnvio: PedidoEnvio = {
      _id,
      talla,
      despachado,
      subtotal,
      instrucciones,
      producto,
      stickers,
      unidades,
    };

    this.pedidosService.actualizarPedido(pedidoActEnvio).subscribe((resp) => {
      Swal.fire(`Pedido Actualizado!`, ' ', 'success');
    });
  }

  borrar(pedido: string) {
    console.log('borrado!');
  }
  regresar() {
    this._location.back();
  }
}
