import { Component, OnInit, Input } from '@angular/core';

import { ProductosService } from '../../../productos/services/productos.service';
import { Producto } from '../../../interfaces/producto.interface';



@Component({
  selector: 'app-galleria-producto',
  templateUrl: './galleria-producto.component.html',
  styleUrls: ['./galleria-producto.component.css'],
})
export class GalleriaProductoComponent implements OnInit {
  @Input() productoGalleria!: Producto;

  images: string[] = [];
  activeIndex: number = 0;
  fullscreen: boolean = false;
  displayCustom!: boolean;

  constructor(private productosService: ProductosService) {}

  responsiveOptions: any[] = [
    {
      breakpoint: '1024px',
      numVisible: 5,
    },
    {
      breakpoint: '960px',
      numVisible: 4,
    },
    {
      breakpoint: '768px',
      numVisible: 3,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];

  ngOnInit(): void {
    this.cargarProductoPorId();
  }

  cargarProductoPorId() {
    const id = this.productoGalleria!._id!;
    this.productosService.getProductoPorId(id).subscribe(({ producto }) => {
      // console.log(producto.imgs);

      this.images = producto.imgs!;

      // console.log(this.images);
    });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
