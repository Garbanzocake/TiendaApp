import { Pipe, PipeTransform } from '@angular/core';
import { Producto } from '../interfaces/producto.interface';
import { Result } from '../interfaces/resultados.interface';
import { Sticker } from '../interfaces/stickers.interface';


@Pipe({
  name: 'imagen',


})



export class ImagenPipe implements PipeTransform {

  transform(objeto: Producto | Result | Sticker): string {




  if (!objeto._id && !objeto.img ) {
    return 'assets/no-image.jpg';
  }else if(objeto.img){

    return objeto.img;
  }
  else{
    return `assets/no-image.jpg` ;
  }

  }

}
