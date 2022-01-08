import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';

import { ProductosService } from '../../../productos/services/productos.service';
import { Galleria } from 'primeng/galleria';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-galleria-productos',
  templateUrl: './galleria-productos.component.html',
  styleUrls: ['./galleria-productos.component.scss'],
})
export class GalleriaProductosComponent implements OnInit,OnChanges {
  @Input() termino!: string;

  productos: any[] = [];
  imagenes: string[] = [];

  images: string[] = [];
  displayBasic: boolean = false;
  activeIndex: number = 0;
  fullscreen: boolean = false;

  showThumbnails!: boolean;
  onFullScreenListener: any;
  @ViewChild('galleria') galleria!: Galleria;

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
  responsiveOptions2: any[] = [
    {
      breakpoint: '1500px',
      numVisible: 5,
    },
    {
      breakpoint: '1024px',
      numVisible: 3,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
    },
    {
      breakpoint: '560px',
      numVisible: 1,
    },
  ];




  ngOnInit(): void {
    this.obtenerImagenes();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.obtenerImagenes();
  }


  // Metodos de llenado galleria
  obtenerImagenes() {
    if (this.termino !== '') {
      this.cargarProductosPorCategoria();
    } else {
      this.cargarAllProducts();
    }
  }


  cargarAllProducts() {
    this.productosService.getProductos().subscribe((resp) => {
      this.productos = resp.productos;
      console.log(this.productos);

      for (let i = 0; i < this.productos.length; i++) {
        const element = this.productos[i];

        this.imagenes.push(element.img!);
      }
      this.images = this.imagenes;
      // console.log(this.images);
    });
  }

  cargarProductosPorCategoria() {
    this.productosService
      .getProductosPorCategoria(this.termino!)
      .subscribe((producto) => {
        this.productos = producto.results;
        // console.log(this.productos);
      });
  }

  //  Funcionamiento basico de la galleria

  imageClick(index: number) {
    this.activeIndex = index;
  }

  OnfullScreenClick() {
    this.displayBasic = !this.displayBasic;
  }

  //METODOS DE PRIME NG

  toggleFullScreen() {
    if (this.fullscreen) {
      this.closePreviewFullScreen();
    } else {
      this.openPreviewFullScreen();
    }
  }

  openPreviewFullScreen() {
    let elem = this.galleria.element.nativeElement.querySelector('.p-galleria');
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem['mozRequestFullScreen']) {
      /* Firefox */
      elem['mozRequestFullScreen']();
    } else if (elem['webkitRequestFullscreen']) {
      /* Chrome, Safari & Opera */
      elem['webkitRequestFullscreen']();
    } else if (elem['msRequestFullscreen']) {
      /* IE/Edge */
      elem['msRequestFullscreen']();
    }
  }

  onFullScreenChange() {
    this.fullscreen = !this.fullscreen;
  }

  closePreviewFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    // else if (document['mozCancelFullScreen']) {
    //     document['mozCancelFullScreen']();
    // }
    // else if (document['webkitExitFullscreen']) {
    //     document['webkitExitFullscreen']();
    // }
    // else if (document['msExitFullscreen']) {
    //     document['msExitFullscreen']();
    // }
  }

  bindDocumentListeners() {
    this.onFullScreenListener = this.onFullScreenChange.bind(this);
    document.addEventListener('fullscreenchange', this.onFullScreenListener);
    document.addEventListener('mozfullscreenchange', this.onFullScreenListener);
    document.addEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.addEventListener('msfullscreenchange', this.onFullScreenListener);
  }

  unbindDocumentListeners() {
    document.removeEventListener('fullscreenchange', this.onFullScreenListener);
    document.removeEventListener(
      'mozfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'webkitfullscreenchange',
      this.onFullScreenListener
    );
    document.removeEventListener(
      'msfullscreenchange',
      this.onFullScreenListener
    );
    this.onFullScreenListener = null;
  }

  ngOnDestroy() {
    this.unbindDocumentListeners();
  }

  galleriaClass() {
    return `custom-galleria ${this.fullscreen ? 'fullscreen' : ''}`;
  }
}
