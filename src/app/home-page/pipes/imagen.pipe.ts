import { Pipe, PipeTransform } from '@angular/core';
import { ProductoElement } from '../../productos/interface/productos.interface';

@Pipe({
  name: 'imagen'

})



export class ImagenPipe implements PipeTransform {

  transform(producto: ProductoElement): string {




  if (!producto._id && !producto.img ) {
    return 'assets/no-image.jpg';
  }else if(producto.img){

    return producto.img;
  }
  else{
    return `assets/no-image.jpg` ;
  }

  }

}
