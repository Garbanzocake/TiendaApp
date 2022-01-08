import { Component, OnInit, Input } from '@angular/core';



import { Sticker } from '../../../interfaces/stickers.interface';
import { StickersService } from '../../services/stickers.service';



@Component({
  selector: 'app-galleria-producto',
  templateUrl: './galleria-producto.component.html',
  styleUrls: ['./galleria-producto.component.css'],
})
export class GalleriaProductoComponent implements OnInit {
  @Input() productoGalleria!: Sticker;

  images: string[] = [];
  activeIndex: number = 0;
  fullscreen: boolean = false;
  displayCustom!: boolean;

  constructor(private stickersService: StickersService) {}

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
    this.stickersService.getStickerPorId(id).subscribe(({ sticker }) => {
      // console.log(producto.imgs);

      this.images = sticker.imgs!;

      // console.log(this.images);
    });
  }

  imageClick(index: number) {
    this.activeIndex = index;
    this.displayCustom = true;
  }
}
